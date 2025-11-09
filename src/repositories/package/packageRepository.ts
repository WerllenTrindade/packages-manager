import { PackageTypes } from "@/types/package";
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

      const inserted = await db.getFirstAsync<PackageTypes>(
        "SELECT * FROM packages WHERE id = ?",
        [result.lastInsertRowId]
      );

      return inserted ?? null;
    } catch (error) {
      console.error("❌ Erro ao inserir pacote:", error);
      return null;
    }
  }

  return { getAll, findByGtin, updatePackageStatus, insertPackage };
}
