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

  return { getAll };
}
