import { PackageTypes } from "@/types/package";
import { getStatusColor } from "@/utils/statusColor";
import { LinearGradient } from "expo-linear-gradient";
import React, { memo } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { Badge } from "../Budge";
import { s } from "./styles";

type Props = {
  item: PackageTypes;
} & TouchableOpacityProps;

export const PackageCard = memo(function PackageCard({ item, ...rest }: Props) {
  const packageColor = getStatusColor(item.status);
  const deliveryColor = getStatusColor(item.delivery_status);

  return (
    <TouchableOpacity activeOpacity={0.7} {...rest} style={s.card}>
      <LinearGradient
        colors={[packageColor, deliveryColor]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={s.gradient}
      />

      <View style={s.content}>
        <View style={s.header}>
          <Text style={s.code}>{item.code}</Text>
          <Badge status={item.status} />
        </View>

        <View style={s.clientRow}>
          {item.client_name ? (
            <Text style={s.clientName}>{item.client_name}</Text>
          ) : (
            <View />
          )}
          <Badge status={item.delivery_status} />
        </View>

        {item.sent_at && (
          <Text style={s.date}>
            Enviado: {new Date(item.sent_at).toLocaleDateString()}
          </Text>
        )}

        <View style={s.footer}>
          <Text style={s.date}>
            Criado: {new Date(item.created_at).toLocaleDateString()}
          </Text>
          <Text style={s.date}>
            Escaneado: {new Date(item.scanned_at).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});
