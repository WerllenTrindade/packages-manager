import { PackageTypes } from "@/types/package";
import { formatISO } from "date-fns";

export function createFromScan(code: string): Omit<PackageTypes, "id"> {
  const now = formatISO(new Date());
  return {
    code,
    scanned_at: now,
    created_at: now,
    status: "Coletado",
    delivery_status: "pending",
  };
}
