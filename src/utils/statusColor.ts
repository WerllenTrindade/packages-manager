import theme from "@/theme";
import { DeliveryStatus, PackageStatus } from "@/types/package";

export function getStatusColor(status: PackageStatus | DeliveryStatus): string {
  const { colors } = theme;

  switch (status) {
    case "Coletado":
      return colors.status.info;
    case "Em rota de entrega":
      return colors.status.warning;
    case "Entregue":
      return colors.status.success;
    case "pending":
      return colors.status.warning;
    case "sent":
      return colors.status.success;
    default:
      return colors.text.secondary;
  }
}
