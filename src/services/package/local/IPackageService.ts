import { packageStatusTypes } from "@/screens/privada/scanner/components/package-status-change/types";
import { PackageTypes } from "@/types/package";

export interface IPackageService {
  getAllPackage(): Promise<PackageTypes[]>;
  upgradeStatusPackage(): Promise<PackageTypes>;
  getIdPackage(): Promise<PackageTypes>;
  findByGtin(gtin: string): Promise<PackageTypes | null>;
  insertPackage(item: PackageTypes): Promise<PackageTypes | null>;
  pdatePackageStatusLocally(packages: packageStatusTypes): Promise<PackageTypes | null>;
}
