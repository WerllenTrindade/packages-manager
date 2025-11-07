import { useBarcodeScanner } from "@/contexts/hooks/use-barcode-scanner";
import { CameraView, useCameraPermissions } from "expo-camera";
import React from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";

export function Scanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const { handleBarCodeScanned } = useBarcodeScanner((code) => {
    Alert.alert("Código lido", code);
  });

  if (!permission) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Verificando permissões...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    // Caso o usuário não tenha permitido
    return (
      <View style={styles.center}>
        <Text style={{ marginBottom: 10 }}>Permissão da câmera é necessária.</Text>
        <Text onPress={requestPermission} style={{ color: "#007AFF", fontWeight: "600" }}>
          Conceder permissão
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "code128", "ean13"],
        }}
      />
      <View style={styles.overlay}>
        <Text style={styles.text}>Aponte para o código</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 18,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
