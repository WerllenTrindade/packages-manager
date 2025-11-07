import { Button } from "@/components/Button";
import { useSessionPackagesStore } from "@/contexts/hooks/use-package-session";
import theme from "@/theme";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { useNavigation } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { InfoBottomSheet } from "./components/info-bottom-sheet";
import { Overlay } from "./components/overlay";
import { s } from "./styles";

export function Scanner() {
  const [scannerBusy, setScannerBusy] = useState(false);
  const [scannedId, setScannedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();

  const { items, addItem, clear } = useSessionPackagesStore();

  const productBottomSheetRef = useRef<BottomSheetModal>(null);
  const notFoundBottomSheetRef = useRef<BottomSheetModal>(null);
  const successAddBottomSheetRef = useRef<BottomSheetModal>(null);

  const [permission, requestPermission] = useCameraPermissions();

  // ====> Função principal de leitura
  const onScanCode = useCallback(
    async ({ data: barcode }: BarcodeScanningResult) => {
      if (!barcode || scannerBusy) return;
      setScannerBusy(true);
      setLoading(true);

      try {
        console.log("📦 Código escaneado:", barcode);

        // Simula consulta ao SQLite
        const existsInDb = false; // TODO: SELECT * FROM packages WHERE gtin = ?

        if (existsInDb) {
          notFoundBottomSheetRef.current?.present();
        } else {
          addItem({
            id: barcode,
            gtin: barcode,
            createdAt: new Date().toISOString(),
          });
          successAddBottomSheetRef.current?.present();
        }
      } catch (e) {
        console.error("Erro ao escanear:", e);
        notFoundBottomSheetRef.current?.present();
      } finally {
        setLoading(false);
        setTimeout(() => setScannerBusy(false), 1000);
      }
    },
    [addItem, scannerBusy]
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

      <InfoBottomSheet
        ref={successAddBottomSheetRef}
        title="Produto adicionado com sucesso!"
        subtitle="Seu produto foi adicionado à lista temporária."
        onClose={() => {
          setScannerBusy(false);
          setScannedId(null);
          successAddBottomSheetRef.current?.close();
        }}
      />
    </SafeAreaView>
  );
}
