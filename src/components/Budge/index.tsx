import theme from "@/theme";
import { DeliveryStatus, PackageStatus } from "@/types/package";
import React from "react";
import { Text, View } from "react-native";
import { s } from "./styles";

type BadgeProps = {
  status: PackageStatus | DeliveryStatus;
  style?: object;
  textStyle?: object;
};

export function Badge({ status, style, textStyle }: BadgeProps) {
  const { colors } = theme;

  const getBadgeStyle = (status: string) => {
    switch (status) {
      case "Coletado":
        return { color: colors.status.info, label: "Pacote foi coletado" };
      case "Em rota de entrega":
        return { color: colors.status.warning, label: "Pacote está em transporte" };
      case "Entregue":
        return { color: colors.status.success, label: "Pacote foi entregue" };
      case "pending":
        return { color: colors.status.warning, label: "Pendente" };
      case "sent":
        return { color: colors.status.success, label: "Processado" };
      default:
        return { color: colors.text.secondary, label: String(status) };
    }
  };

  const { color, label } = getBadgeStyle(status);

  return (
    <View style={[s.container, { backgroundColor: `${color}20` }, style]}>
      <Text style={[s.text, { color }, textStyle]}>{label}</Text>
    </View>
  );
}
