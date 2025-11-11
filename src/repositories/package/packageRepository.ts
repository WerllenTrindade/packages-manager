import { sendPackageToWebhook } from "@/services/package/api/packageApi";
import { PackageTypes, SyncResult } from "@/types/package";
import { useSQLiteContext } from "expo-sqlite";

export function usePackageDatabase() {
  const db = useSQLiteContext();

  async function getAll(): Promise<PackageTypes[]> {
    const query = `SELECT * FROM packages ORDER BY created_at DESC`;
    return await db.getAllAsync<PackageTypes>(query);
  }

  async function findByGtin(gtin: string): Promise<PackageTypes | null> {
    try {
      const query = "SELECT * FROM packages WHERE code = ?";
      const result = await db.getAllAsync<PackageTypes>(query, [gtin]);
      return result?.[0] || null;
    } catch (error) {
      console.error("Erro ao buscar produto no banco:", error);
      return null;
    }
  }

  async function updatePackageStatus(code: string, newStatus: string): Promise<PackageTypes | null> {
    try {
      await db.runAsync("UPDATE packages SET status = ? WHERE code = ?", [newStatus, code]);
      const updated = await db.getFirstAsync<PackageTypes>(
        "SELECT * FROM packages WHERE code = ?",
        [code]
      );
      return updated ?? null;
    } catch (error) {
      console.error("Erro ao atualizar produto no banco:", error);
      return null;
    }
  }

  async function insertPackage(pack: Omit<PackageTypes, "id">) {
    const { code, status, created_at, scanned_at } = pack;
    try {
      const statement = await db.prepareAsync(`
        INSERT INTO packages (code, status, created_at, scanned_at, delivery_status)
        VALUES ($code, $status, $created_at, $scanned_at, 'pending')
      `);
      const result = await statement.executeAsync({
        $code: code,
        $status: status,
        $created_at: created_at,
        $scanned_at: scanned_at,
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
             SET status = ?, client_name = ?, updated_at = datetime('now'), delivery_status = ?
             WHERE id = ?`,
            [item.status, item.client_name ?? null, item.delivery_status, item.id]
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

  async function syncPackages(packages: PackageTypes[]): Promise<SyncResult[]> {
    const results: SyncResult[] = [];

    for (const pkg of packages) {
      if (pkg.delivery_status === "sent") {
        console.log(`Pacote ${pkg.code} já foi processado, ignorando...`);
        results.push({ packageId: pkg.id!, sent: true });
        continue;
      }

      try {
        const sent = await sendPackageToWebhook(pkg);
        if (sent) await updateDeliveryStatus(pkg.id!, "sent");

        results.push({ packageId: pkg.id!, sent });
      } catch (error) {
        console.error(`Erro ao sincronizar pacote ${pkg.code}:`, error);
        results.push({ packageId: pkg.id!, sent: false });
      }
    }

    return results;
  }

  const syncSinglePackage = async (pkg: PackageTypes): Promise<boolean> => {
    const sent = await sendPackageToWebhook(pkg);
    if (sent) await updateDeliveryStatus(pkg.id!, "sent");
    return sent;
  };

  async function processPendingPackages() {
    const pending = await db.getAllAsync<PackageTypes>(
      "SELECT * FROM packages WHERE delivery_status = 'pending'"
    );
    await syncPackages(pending);
  }

  return {
    getAll,
    findByGtin,
    updatePackageStatus,
    insertPackage,
    updatePackagesStatusAsync,
    updateMultipleDeliveryStatus,
    updateDeliveryStatus,
    syncPackages,
    syncSinglePackage,
    processPendingPackages,
  };
}
