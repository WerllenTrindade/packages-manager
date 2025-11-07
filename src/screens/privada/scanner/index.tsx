import { Button } from "@/components/Button";
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
  Pressable,
  StatusBar,
  Text,
  useWindowDimensions,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { InfoBottomSheet } from "./components/info-bottom-sheet";
import { Overlay } from "./components/overlay";
import { s } from "./styles";

export function Scanner() {
  const [scannerBusy, setScannerBusy] = useState(false);
  const [scannedId, setScannedId] = useState<string | null>(null);
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();

  const productBottomSheetRef = useRef<BottomSheetModal>(null);
  const notFoundBottomSheetRef = useRef<BottomSheetModal>(null);
  const successAddBottomSheetRef = useRef<BottomSheetModal>(null);

  const onScanCode = useCallback(async ({ data: barcode }: BarcodeScanningResult) => {
    console.log("scanned", barcode);
    setScannerBusy(true);
    setScannedId(barcode);

    // Simulação de erro ou sucesso
    const hasError = false; // simule se necessário

    if (hasError) {
      notFoundBottomSheetRef.current?.present();
      return;
    }

    productBottomSheetRef.current?.present();
  }, []);

  const onScanBarcodeHandler = useCallback(() => {
    if (scannerBusy) return;
    return onScanCode;
  }, [scannerBusy]);

  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  if (!permission) {
    return <View />;
  }

  const loading = true;

  return (
    <SafeAreaView style={s.safeArea}>
      <StatusBar
        backgroundColor={theme.colors.gray[400]}
        barStyle="dark-content"
      />

      <View style={s.header}>
        <Pressable style={s.goBackButton} onPress={() => navigation.goBack()}>
          {/* <A
            family="MaterialIcons"
            name="arrow-back"
            size={24}
            color="#fff"
          /> */}
        </Pressable>
      </View>

      <CameraView
        style={[s.camera, { width, height }]}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ["ean13", "ean8", "code128", "itf14", "qr"],
        }}
        onBarcodeScanned={onScanBarcodeHandler()}
      >
        <Overlay
          bottomContent={
            <View>
              
            <View style={{ width: '100%', paddingHorizontal: 25, marginTop: 45}}>
              <Button description="Escanear"/>
            </View>

            <FlatList
            />
            </View>
          }
          topContent={
            <View style={s.titleContainer}>
              <Text style={s.titleText}>
                {loading
                  ? "Escaneando..."
                  : "Posicione o código na área abaixo"}
              </Text>

              {loading ? (
                <ActivityIndicator />
              ) : (
                <Text style={s.subtitleText}>
                  Alinhe o código de barras dentro da área{"\n"}abaixo e mantenha
                  o telefone estável.
                </Text>
              )}
            </View>
          }
        />

      </CameraView>

      <InfoBottomSheet
        ref={successAddBottomSheetRef}
        title="Produto adicionado com sucesso!"
        subtitle="Seu produto foi adicionado ao carrinho de compras."
        onClose={() => {
          setScannerBusy(false);
          setScannedId(null);
          successAddBottomSheetRef.current?.close();
        }}
      />
    </SafeAreaView>
  );
}
