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
      const query = "SELECT * FROM packages WHERE gtin = ?";
      const result = await db.getAllAsync<PackageTypes>(query, [gtin]);
      return result?.[0] || null;
    } catch (error) {
      console.error("Erro ao buscar produto no banco:", error);
      return null;
    }
  }

  return { getAll, findByGtin };
}
