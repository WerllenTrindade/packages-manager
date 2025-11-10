import { packageStatusTypes } from "@/screens/privada/scanner/components/package-status-change/types";
import { PackageTypes, SyncResult } from "@/types/package";

export function mapPackagesForStatusUpdate(
  items: PackageTypes[],
  data: packageStatusTypes
): PackageTypes[] {
  return items.map((pkg) => ({
    ...pkg,
    status: data.status,
    client_name: data.status === "Entregue" ? data.clientName ?? null : null,
    updated_at: new Date().toISOString(),
  }));
}

export function mapPackagesWithDeliveryStatus(
  updatedPackages: PackageTypes[],
  syncResults: SyncResult[]
): PackageTypes[] {
  const sentIds = new Set(
    syncResults
      .filter((r) => r.sent === true)
      .map((r) => r.packageId)
  );

  return updatedPackages.map((pkg) =>
    sentIds.has(pkg.id!)
      ? { ...pkg, delivery_status: "sent" }
      : pkg
  );
}