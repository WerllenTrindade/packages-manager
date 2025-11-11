import { PackageTypes } from "@/types/package";

export const mockPackage = {
  id: 1,
  code: "PKG-123",
  status: "Coletado" as PackageTypes["status"],
  delivery_status: "Entregue" as PackageTypes["delivery_status"],
  client_name: "Cliente Teste",
  sent_at: "2025-11-10T00:00:00Z",
  created_at: "2025-11-09T00:00:00Z",
  scanned_at: "2025-11-09T00:00:00Z",
};
