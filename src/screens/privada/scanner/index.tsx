import { Button } from "@/components/Button";
import { useSessionPackagesStore } from "@/contexts/hooks/use-package-session";
import { usePackagesService } from "@/services/package/local/packageLocalService";
import theme from "@/theme";
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Overlay } from "./components/overlay";
import { s } from "./styles";

export function Scanner() {
  const [scannerBusy, setScannerBusy] = useState(false);
  const [loading, setLoading] = useState(false);

  const { items, addItem, clear } = useSessionPackagesStore();
  const { findByGtinPackage } = usePackagesService();

  const [permission, requestPermission] = useCameraPermissions();
  const { width, height } = useWindowDimensions();

  const onScanCode = useCallback(
    async ({ data }: BarcodeScanningResult) => {
      if (!data || scannerBusy) return;
      setScannerBusy(true);
      setLoading(true);

      try {
        // 🔍 Busca no banco
        const exists = await findByGtinPackage(data);

        if (exists) {
          console.log("📦 Produto já existe no banco:", exists);
        } else {
          // ➕ Adiciona à lista temporária
          addItem({
            id: data,
            gtin: data,
            createdAt: new Date().toISOString(),
          });
        }
      } catch (err) {
        console.error("Erro ao escanear:", err);
      } finally {
        setLoading(false);
        setTimeout(() => setScannerBusy(false), 1000);
      }
    },
    [scannerBusy, addItem, findByGtinPackage]
  );

  const onScanBarcodeHandler = useCallback(() => {
    if (scannerBusy) return;
    return onScanCode;
  }, [scannerBusy, onScanCode]);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  if (!permission) return <View />;

  return (
    <SafeAreaView style={s.safeArea}>
      <StatusBar
        backgroundColor={theme.colors.gray[400]}
        barStyle="dark-content"
      />

      <CameraView
        style={[s.camera, { width, height }]}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ["ean13", "ean8", "code128", "itf14", "qr"],
        }}
        onBarcodeScanned={onScanBarcodeHandler()}
      >
        <Overlay
          topContent={
            <Text style={s.titleText}>
              {loading ? "Escaneando..." : "Posicione o código na área abaixo"}
            </Text>
          }
          bottomContent={
            <View style={{ top: 30 }}>
              <View style={s.titleContainer}>
                {loading ? (
                  <ActivityIndicator />
                ) : (
                  <Text style={s.subtitleText}>
                    Alinhe o código de barras dentro da área{"\n"}abaixo e
                    mantenha o telefone estável.
                  </Text>
                )}
              </View>

              <View
                style={{
                  width: "100%",
                  paddingHorizontal: 25,
                  marginTop: 25,
                  gap: 10,
                }}
              >
                <Button
                  description="Escanear"
                  onPress={() => setScannerBusy(false)}
                />
                <Button
                  description="Limpar Sessão"
                  onPress={clear}
                  style={{ backgroundColor: theme.colors.red[500] }}
                />
              </View>

              <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                style={{ marginTop: 25 }}
                renderItem={({ item }) => (
                  <View
                    style={{
                      padding: 10,
                      backgroundColor: theme.colors.gray[200],
                      borderRadius: 10,
                      marginBottom: 8,
                    }}
                  >
                    <Text style={{ color: "#000" }}>{item.gtin}</Text>
                  </View>
                )}
              />
            </View>
          }
        />
      </CameraView>
    </SafeAreaView>
  );
}
