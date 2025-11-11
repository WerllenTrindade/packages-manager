import { Badge } from "@/components/Budge";
import { Button } from "@/components/Button";
import { usePackagesService } from "@/services/package/local/packageLocalService";
import theme from "@/theme";
import { colors } from "@/theme/colors";
import { PackageTypes } from "@/types/package";
import { formatDate } from "@/utils/formatDate";
import { PrivateStackParamList, ROUTES_PRIVATE } from "@/utils/routers";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useRef, useState } from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  PackageStatusChange,
  PackageStatusChangeRef,
} from "../scanner/components/package-status-change";
import { packageStatusTypes } from "../scanner/components/package-status-change/types";
import { s } from "./styles";

type PackageDetailsScreenProps = NativeStackScreenProps<
  PrivateStackParamList,
  ROUTES_PRIVATE.PACKAGE_DETAILS
>;

export function PackageDetails({ route }: PackageDetailsScreenProps) {
  const { goBack } = useNavigation();
  const { top, bottom } = useSafeAreaInsets();
  const { code } = route.params;

  const bottomSheetRef = useRef<PackageStatusChangeRef>(null);
  const {
    updatePackageDetailsStatus,
    findByGtinPackage,
    updatePackageDetailsDelivery,
  } = usePackagesService();

  const [packageData, setPackageData] = useState<PackageTypes | null>(null);
  const [loading, setLoading] = useState(true);
const [isSendingWebhook, setIsSendingWebhook] = useState(false);

  const getPackage = async () => {
    try {
      const { success, data } = await findByGtinPackage(code);

      if (success && data) {
        setPackageData(data);
      } else {
        setPackageData(null);
      }
    } catch (err) {
      console.error("Falha na busca:", err);
      setPackageData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPackage();
  }, [code]);

  const onAlterStatus = () =>
    bottomSheetRef.current?.open(handleUpdatePackageStatus);

  async function handleUpdatePackageStatus(values: packageStatusTypes) {
    if (!packageData) return false;
    try {
      const result = await updatePackageDetailsStatus(values, [packageData]);

      if (!result.success) return false;

      await getPackage();
      return true;
    } catch (error) {
      return false;
    }
  }

async function onSendToWebhook() {
    if (!packageData) return false;

    setIsSendingWebhook(true); 

    try {
      const { success } = await updatePackageDetailsDelivery(packageData); 

      if (!success) {
        setIsSendingWebhook(false);
        return false;
      }

      await getPackage();

      return true;
    } catch (error) {
      return false;
    } finally {
      setIsSendingWebhook(false); 
    }
  }


  if (loading) return null;

  return (
    <View style={[s.container, { paddingBottom: bottom }]}>
          <StatusBar barStyle={"light-content"} />
      <View
        style={[
          s.navigationRow,
          { paddingTop: top + 20, paddingBottom: 20, paddingHorizontal: 16 },
        ]}
      >
        <TouchableOpacity onPress={goBack} style={s.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>

        <Text style={s.titleText}>Detalhes do pacote</Text>

        <View style={{ width: 40 }} />
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.white,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <View style={s.header}>
          <Text style={s.headerTitle}>{code}</Text>
        </View>

        <View style={s.card}>
          <View style={s.badgesRow}>
            <View style={s.badgeWrapper}>
              <Text style={s.badgeLabel}>Status:</Text>
              <Badge status={packageData?.status!} />
            </View>
            <View style={s.badgeWrapper}>
              <Text style={s.badgeLabel}>Envio:</Text>
              <Badge status={packageData?.delivery_status!} />
            </View>
          </View>

          <View style={s.detailRow}>
            <Text style={s.detailLabel}>Hora bipado:</Text>
            <Text style={s.detailValue}>
              {formatDate(packageData?.scanned_at)}
            </Text>
          </View>

          <View style={s.detailRow}>
            <Text style={s.detailLabel}>Hora envio:</Text>
            <Text style={s.detailValue}>
              {packageData?.sent_at
                ? formatDate(packageData?.sent_at)
                : "Pendente"}
            </Text>
          </View>

          {packageData?.status === "Entregue" && packageData?.client_name && (
            <View style={s.detailRow}>
              <Text style={s.detailLabel}>Nome do recebedor:</Text>
              <Text style={s.detailValue}>{packageData?.client_name}</Text>
            </View>
          )}
        </View>

        <View style={s.buttonsContainer}>

               <Button description={"Alterar Status"} 
               
            disabled={isSendingWebhook}
            style={s.button}
            onPress={onAlterStatus}
                        isLoading={isSendingWebhook}
                        textStyle={s.buttonText}
              />

          <Button description={packageData?.delivery_status === "sent"
                ? "Enviado"
                : "Enviar para webhook"} 
            style={s.buttonTwo}
            onPress={onSendToWebhook}
                        disabled={isSendingWebhook}
                        isLoading={isSendingWebhook}
                        textStyle={s.buttonTextTwo}
                        variant="secondary"
              />
  
        </View>
      </View>

      <PackageStatusChange ref={bottomSheetRef} />
    </View>
  );
}
