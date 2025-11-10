import { PackageTypes } from "@/types/package";
import { format } from "date-fns";
import React, { memo } from "react";
import { Text, View } from "react-native";
import { Badge } from "../Budge";
import { s } from "./styles";

interface CardScannerProps {
  item: PackageTypes;
}

export const CardScanner = memo(function CardScanner({ item }: CardScannerProps) {
  return (
    <View style={s.card}>
      <View style={s.cardLeft}>
        <Text style={s.codeText}>{item?.code}</Text>
        <Badge status={item.status} />
      </View>
      <View style={s.cardRight}>
        <Badge status={item.delivery_status} />
        <Text style={s.time}>
          {format(new Date(item?.scanned_at), "dd/MM/yyyy HH:mm")}
        </Text>
      </View>
    </View>
  );
});
