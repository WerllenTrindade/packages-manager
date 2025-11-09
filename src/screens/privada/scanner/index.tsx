import { Button } from "@/components/Button";
import { useSessionPackagesStore } from "@/contexts/hooks/use-package-session";
import { usePackagesService } from "@/services/package/local/packageLocalService";
import theme from "@/theme";
import { useScanFeedback } from "@/utils/feedback";
import { AntDesign } from "@expo/vector-icons";
import { format } from "date-fns";
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import * as Haptics from "expo-haptics";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StatusBar,
  Text,
  useWindowDimensions,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { EmptyCardScanner } from "./components/card-empty-scanner";
import { Overlay } from "./components/overlay";
import { s } from "./styles";

export function Scanner() {
  const {  top, bottom } = useSafeAreaInsets()
  const [scannerBusy, setScannerBusy] = useState(false);
  const [loading, setLoading] = useState(false);
const { playFeedback } = useScanFeedback();
  const { items, addItem } = useSessionPackagesStore();
  const { findByGtinPackage, updatePackageStatusPackage, createPackage } = usePackagesService();

  const [permission, requestPermission] = useCameraPermissions();
  const { width, height } = useWindowDimensions();

  async function feedbackScanSuccess() { await Promise.all([ playFeedback(), Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light), ]); }

const onScanCode = useCallback(
  async ({ data }: BarcodeScanningResult) => {
    if (!data || scannerBusy) return;
    setScannerBusy(true);
    setLoading(true);

    try {
      const exists = await findByGtinPackage(data);

      if (exists) {
        if (exists.status !== "Coletado") {
          feedbackScanSuccess()
          const pack = await updatePackageStatusPackage(data, "Coletado");

          
          addItem({
            id: pack?.id!,
            code: pack?.code || '',
            scanned_at: new Date().toISOString(),
            status: "Coletado",
            delivery_status: "pending",
            created_at: new Date().toISOString(),
          });

          Toast.show({
            type: "success",
            text1: `Pacote ${data} marcado como coletado.`,
            position: "bottom",
          });
        } else {
          Toast.show({
            type: "info",
            text1: `Pacote já coletado`,
            position: "bottom",
          });
          console.log("Atenção", "Este pacote já foi coletado.");
          return;
        }
      } else {
            feedbackScanSuccess()
        const newPack = await createPackage({
          code: data,
          status: "Coletado",
          delivery_status: "pending",
          created_at: new Date().toISOString(),
          scanned_at: new Date().toISOString(),
          
        });

        addItem({
          id: newPack?.id!,
          code: newPack?.code!,
          scanned_at: newPack?.scanned_at || '',
          status: "Coletado",
          delivery_status: "pending",
          created_at: newPack?.created_at || '',
        });
      }
    } catch (err) {
      console.error("Erro ao escanear:", err);
    } finally {
      setLoading(false);
      setTimeout(() => setScannerBusy(false), 1000);
    }
  },
  [scannerBusy, addItem, findByGtinPackage, createPackage, updatePackageStatusPackage,     playFeedback()]
);
  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  if (!permission) return <View />;



  return (
    <View style={[s.safeArea, {paddingTop: top}]}>
      <StatusBar barStyle="light-content"
      />
       <View
        style={{
          backgroundColor: '#000',
          width: width,
          paddingHorizontal: 15,
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <AntDesign name="arrow-left" size={24} color="white" />
        <Text
          style={{
            color: theme.colors.white,
            fontSize: 18,
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Scanner
        </Text>
        <AntDesign name="arrow-left" size={24} color="transparent" />
      </View>
      <CameraView
        style={[s.camera, { width, height }]}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ["ean13", "ean8", "code128", "itf14", "qr"],
        }}
        onBarcodeScanned={onScanCode}
      >
        <View style={{flex: 1, }}>
          <Overlay/>
        </View>
      </CameraView>
         <View style={{flex: 1, paddingBottom: bottom, backgroundColor: '#FFF'}}>
          <FlatList
            data={items}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) =>index.toString()}
            renderItem={({ item }) => (
              <View style={s.card}>
                <View style={s.cardLeft}>
                  <Text style={s.codeText}>{item?.code}</Text>
                  <Text
                    style={[
                      s.status,
                      item.status === "Coletado" ? s.statusCollected : s.statusPending,
                    ]}
                  >
                    {item.status}
                  </Text>
                </View>

                <View style={s.cardRight}>
                 <Text style={s.time}>{format(new Date(item.scanned_at), 'HH:mm')}</Text>
                </View>
              </View>
            )}
            ListEmptyComponent={<EmptyCardScanner />}
            contentContainerStyle={{ padding: 16}}
          />

        {
          items?.length > 0 &&
          <View style={{flexDirection: "row", paddingHorizontal: 16, paddingBottom: 8, zIndex: 99999}}>
            <Button  onPress={() => Alert.alert('93812903812093')} description="Alterar status" style={{width: '100%'}}/>
          </View>
        }

        </View>

    </View>
  );
}
