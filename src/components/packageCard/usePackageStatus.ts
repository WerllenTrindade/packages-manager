import { PackageTypes } from "@/types/package";

type StatusStyle = {
  backgroundColor: string;
  color: string;
};

export function usePackageStatus() {
  const getStatusStyle = (status: PackageTypes["status"]): StatusStyle => {
    switch (status) {
      case "Coletado":
        return { backgroundColor: "#FEF9C3", color: "#854D0E" };
      case "Em rota de entrega":
        return { backgroundColor: "#DBEAFE", color: "#1E3A8A" };
      case "Entregue":
        return { backgroundColor: "#DCFCE7", color: "#166534" };
      default:
        return { backgroundColor: "#F3F4F6", color: "#4B5563" };
    }
  };

  return { getStatusStyle };
}
