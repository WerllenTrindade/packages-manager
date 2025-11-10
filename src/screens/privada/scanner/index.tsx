import { Button } from "@/components/Button";
import { CardScanner } from "@/components/CardScanner";
import { PackageTypes } from "@/types/package";
import Feather from "@expo/vector-icons/Feather";
import { CameraView } from "expo-camera";
import React, { useCallback } from "react";
import {
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { EmptyCardScanner } from "./components/card-empty-scanner";
import { Overlay } from "./components/overlay";
import { PackageStatusChange } from "./components/package-status-change";
import { s } from "./styles";
import { useScanner } from "./useScanner";

export function Scanner() {
  const { top, bottom } = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const {
    permission,
    goBack,
    handleBarCodeScanned,
    packages,
    items,
    modalOpen,
    bottomSheetRef,
  } = useScanner();

  const renderItem = useCallback(
    ({ item }: { item: PackageTypes }) => <CardScanner item={item} />,
    []
  );

  if (!permission) return <View />;

  return (
    <View style={[s.safeArea, { paddingTop: top }]}>
      <StatusBar barStyle="light-content" />
      <View style={s.headerRow}>
        <TouchableOpacity onPress={goBack}>
          <Feather name="arrow-left-circle" size={30} color="white" />
        </TouchableOpacity>
        <Text style={s.headerTitle}>Scanner</Text>
        <Text style={{ color: "transparent" }}>{"<"}</Text>
      </View>

      <CameraView
        style={[s.camera, { width, height }]}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ["ean13", "ean8", "code128", "itf14", "qr"],
        }}
        onBarcodeScanned={handleBarCodeScanned}
      >
        <View style={{ flex: 1 }}>
          <Overlay />
        </View>
      </CameraView>

      <View style={{ flex: 1, paddingBottom: bottom, backgroundColor: "#FFF" }}>
        <FlatList
          data={packages}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          ListEmptyComponent={<EmptyCardScanner />}
          contentContainerStyle={{ padding: 16 }}
        />

        {items?.length > 0 && (
          <View style={s.footerButton}>
            <Button
              onPress={modalOpen}
              description="Alterar status"
              style={{ width: "100%" }}
            />
          </View>
        )}
      </View>

      <PackageStatusChange ref={bottomSheetRef} />
    </View>
  );
}
