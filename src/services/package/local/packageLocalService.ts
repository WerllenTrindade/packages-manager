
import { usePackageDatabase } from "@/repositories/package/packageRepository";
import { PackageTypes } from "@/types/package";


export function usePackagesService() {
  const { getAll, findByGtin, updatePackageStatus, insertPackage } = usePackageDatabase();

  const getAllPackage = async () => {
    return await getAll();
  };

  const findByGtinPackage =  async (code: string) => {
      return await findByGtin(code)
  }

  const updatePackageStatusPackage = async(code: string, newState: string) => {
    return await updatePackageStatus(code, newState)
  }

  const createPackage = async(pack: Omit<PackageTypes, 'id'>) => {
    return await insertPackage(pack)
  }
  

  return { getAllPackage, findByGtinPackage, updatePackageStatusPackage, createPackage };
}
