import { sendPackageToWebhook } from "@/services/package/api/packageApi";
import { PackageTypes, SyncResult } from "@/types/package";
import { useSQLiteContext } from "expo-sqlite";

export function usePackageDatabase() {
  const db = useSQLiteContext();

  async function getAll(): Promise<PackageTypes[]> {
    const query = 
    `SELECT * FROM packages
      ORDER BY created_at DESC`;
    return await db.getAllAsync<PackageTypes>(query);
  }

  async function findByGtin(gtin: string): Promise<PackageTypes | null>{
      try {
      const query = "SELECT * FROM packages WHERE code = ?";
      const result = await db.getAllAsync<PackageTypes>(query, [gtin]);
      return result?.[0] || null;
    } catch (error) {
      console.error("Erro ao buscar produto no banco:", error);
      return null;
    }
  }

  async function updatePackageStatus(code: string, newStatus: string): Promise<PackageTypes | null>{
     try {
      await db.runAsync("UPDATE packages SET status = ? WHERE code = ?", [
        newStatus,
        code,
      ]);

      const updated = await db.getFirstAsync<PackageTypes>(
        "SELECT * FROM packages WHERE code = ?",
        [code]
      );

      return updated ?? null;
    } catch (error) {
      console.error("Erro ao buscar produto no banco:", error);
      return null;
    }
  }

  async function insertPackage(pack: Omit<PackageTypes, 'id'>) {
    const { code, status, created_at, scanned_at } = pack
    let statement;
    
      try {
      statement = await db.prepareAsync(
        `
        INSERT INTO packages (code, status, created_at, scanned_at)
        VALUES ($code, $status, $created_at, $scanned_at)
      `);

      const result = await statement.executeAsync({
        $code: code,
        $status: status,
        $created_at: created_at,
        $scanned_at: scanned_at
      });

      return result?.lastInsertRowId ?? null;
    } catch (error) {
      console.error("❌ Erro ao inserir pacote:", error);
      return null;
    }
  }

  async function updatePackagesStatusAsync(items: PackageTypes[]): Promise<boolean> {
    if (!items?.length) return false;

    try {
      await db.withTransactionAsync(async () => {
        for (const item of items) {
          await db.runAsync(
            `UPDATE packages
            SET status = ?, client_name = ?, updated_at = datetime('now')
            WHERE id = ?`,
            [item.status, item.client_name ?? null, item.id]
          );
        }
      });

      return true;
    } catch (error) {
      console.error("Erro ao atualizar pacotes localmente:", error);
      return false;
    }
  }

  async function updateMultipleDeliveryStatus(items: { id: number; status: string }[]): Promise<boolean> {
    if (!items?.length) return false;

    try {
      await db.withTransactionAsync(async () => {
        for (const item of items) {
          await db.runAsync(
            `UPDATE packages
             SET status = ?, updated_at = datetime('now')
             WHERE id = ?`,
            [item.status, item.id]
          );
        }
      });

      return true;
    } catch (error) {
      console.error("Erro ao atualizar múltiplos pacotes:", error);
      return false;
    }
  }

  async function updateDeliveryStatus(packageId: number, status: "pending" | "sent") {
    try {
      await db.runAsync(
        `UPDATE packages SET delivery_status = ?, sent_at = datetime('now'), updated_at = datetime('now') WHERE id = ?`,
        [status, packageId]
      );
    } catch (error) {
      console.error("Erro ao atualizar delivery_status:", error);
    }
  }

  async function addToSyncQueue(packageId: number) {
    try {
      const existing = await db.getFirstAsync<{ id: number }>(
        "SELECT id FROM sync_queue WHERE package_id = ?",
        [packageId]
      );

      if (existing) {
        await db.runAsync(
          `UPDATE sync_queue SET retries = retries + 1, last_attempt_at = datetime('now') WHERE id = ?`,
          [existing.id]
        );
      } else {
        await db.runAsync(
          `INSERT INTO sync_queue (package_id, retries, last_attempt_at) VALUES (?, 1, datetime('now'))`,
          [packageId]
        );
      }
    } catch (error) {
      console.error("Erro ao adicionar pacote na sync_queue:", error);
    }
  }

  /**
   * Tenta enviar pacotes para o webhook e atualiza status ou fila de retry
   */
 async function syncPackages(packages: PackageTypes[]): Promise<SyncResult[]> {
  const results: SyncResult[] = [];

  for (const pkg of packages) {
    try {
      const sent = await sendPackageToWebhook(pkg);

      if (sent) {
        await updateDeliveryStatus(pkg.id!, "sent");
      } else {
        await addToSyncQueue(pkg.id!);
      }

      results.push({ packageId: pkg.id!, sent });
    } catch (error) {
      console.error(`Erro ao sincronizar pacote ${pkg.code}:`, error);
      await addToSyncQueue(pkg.id!);
      results.push({ packageId: pkg.id!, sent: false });
    }
  }

  return results;
}

  /**Processa pacotes pendentes na sync_queue */
  async function processSyncQueue() {
    const pendingPackages = await db.getAllAsync<PackageTypes & { queueId: number }>(
      `SELECT p.*, q.id as queueId
       FROM packages p
       JOIN sync_queue q ON p.id = q.package_id`
    );

    for (const pkg of pendingPackages) {
      const sent = await sendPackageToWebhook(pkg);
      if (sent) {
        await updateDeliveryStatus(pkg.id!, "sent");
        await db.runAsync("DELETE FROM sync_queue WHERE id = ?", [pkg.queueId]);
      } else {
        await addToSyncQueue(pkg.id!);
      }
    }
  }

  return { getAll, findByGtin, updatePackageStatus, updateMultipleDeliveryStatus, syncPackages, processSyncQueue, insertPackage, updatePackagesStatusAsync };
}
