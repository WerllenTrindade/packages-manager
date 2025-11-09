import React from "react";
import { Image, Text, View } from "react-native";
import { s } from "./styles";

export function EmptyCardScanner() {
  return (
    <View style={s.container}>
      <Image
        style={s.image}
        source={require("@/assets/no-card-scanner.png")}
      />
      <View style={s.textContainer}>
        <Text style={s.title}>Nenhum pacote bipado ainda.</Text>
        <Text style={s.subtitle}>
          Aponte a câmera para o código no pacote
        </Text>
      </View>
    </View>
  );
}
