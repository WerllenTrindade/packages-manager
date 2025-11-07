import { PackageTypes } from "@/types/package";
import React, { memo } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { s } from "./styles";
import { usePackageStatus } from "./usePackageStatus";

type Props = {
  item: PackageTypes;
} & TouchableOpacityProps;

export const PackageCard = memo(function PackageCard({ item, ...rest }: Props) {
  const { getStatusStyle } = usePackageStatus();
  const { backgroundColor, color } = getStatusStyle(item.status);

  return (
    <TouchableOpacity activeOpacity={0.7} {...rest} style={s.card}>
      <Text style={s.code}>{item.code}</Text>
      {item.client_name && <Text style={s.clientName}>{item.client_name}</Text>}

      <Text style={[s.statusText, { backgroundColor, color }]}>{item.status}</Text>

      <Text style={s.date}>
        Criado: {new Date(item.created_at).toLocaleDateString()}
      </Text>
      {item.sent_at && (
        <Text style={s.date}>
          Enviado: {new Date(item.sent_at).toLocaleDateString()}
        </Text>
      )}
      <Text style={s.date}>
        Escaneado: {new Date(item.scanned_at).toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  );
});
