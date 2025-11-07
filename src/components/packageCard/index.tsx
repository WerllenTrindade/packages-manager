import Package from "@/assets/icon-box.svg";
import { PackageTypes } from "@/types/package";
import React, { memo } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { s } from "./styles";
import { usePackageStatus } from "./usePackageStatus";

type Props = {
  item: PackageTypes;
} & TouchableOpacityProps;

export const PackageCard = memo(function PackageCard({ item, ...rest }: Props) {
  const { getStatusStyle } = usePackageStatus();
  const { backgroundColor, color } = getStatusStyle(item.status);


  return (
    <TouchableOpacity activeOpacity={0.7} {...rest} style={[s.card, {borderLeftWidth: 15, borderLeftColor: color}]}>
        <View style={{flexDirection: 'row', alignItems: 'stretch',justifyContent: "space-between"}}>
       <View>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
       <Package width={32} height={32} />
      <Text style={s.code}>{item.code}</Text>
     </View>
      {item.client_name && <Text style={s.clientName}>{item.client_name}</Text>}

      </View>
      <View>
         <Text style={[s.statusText, { backgroundColor, color }]}>{item.status}</Text>
      </View>
     </View>
           {item.sent_at && (
        <Text style={s.date}>
          Enviado: {new Date(item.sent_at).toLocaleDateString()}
        </Text>
      )}

 <View style={{flexDirection: 'row', paddingTop: 4, alignItems: 'stretch',justifyContent: "space-between"}}>
      <Text style={s.date}>
        Criado: {new Date(item.created_at).toLocaleDateString()}
      </Text>

      <Text style={s.date}>
        Escaneado: {new Date(item.scanned_at).toLocaleDateString()}
      </Text>
 </View>

    </TouchableOpacity>
  );
});
