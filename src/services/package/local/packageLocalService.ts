
import { usePackageDatabase } from "@/repositories/package/packageRepository";


export function usePackagesService() {
  const { getAll, findByGtin } = usePackageDatabase();

  const getAllPackage = async () => {
    return await getAll();
  };

  const findByGtinPackage =  async (gtin: string) => {
      return await findByGtin(gtin)
  }


  return { getAllPackage, findByGtinPackage };
}
