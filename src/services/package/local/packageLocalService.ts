
import { usePackageDatabase } from "@/repositories/package/packageRepository";


export function usePackagesService() {
  const { getAll } = usePackageDatabase();

  const getAllPackage = async () => {
    return await getAll();
  };


  return { getAllPackage };
}
