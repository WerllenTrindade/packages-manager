import { PackageTypes } from "@/types/package";

export interface IPackageService {
  getAllPackage(): Promise<PackageTypes[]>;
  upgradeStatusPackage(): Promise<PackageTypes>;
  getIdPackage(): Promise<PackageTypes>;
}
