import { useSessionPackagesStore } from "@/contexts/hooks/use-package-session";
import { useBarcodeScanner } from "@/contexts/hooks/useBarcodeScanner";
import { usePackagesService } from "@/services/package/local/packageLocalService";
import { useIsFocused } from "@react-navigation/native";
import { useCameraPermissions } from "expo-camera";
import { useNavigation } from "expo-router";
import { useEffect, useMemo, useRef } from "react";
import { PackageStatusChangeRef } from "./components/package-status-change";
import { packageStatusTypes } from "./components/package-status-change/types";

export function useScanner() {
  const isFocused = useIsFocused();
  const { goBack } = useNavigation();
  const bottomSheetRef = useRef<PackageStatusChangeRef>(null);
  const { items, cleanInvalidPackages } = useSessionPackagesStore();
  const [permission, requestPermission] = useCameraPermissions();
  const { updatePackageStatusLocally } = usePackagesService();
  const { handleBarCodeScanned } = useBarcodeScanner();

  const modalOpen = () =>
    bottomSheetRef.current?.open(handleUpdatePackageStatus);

  async function handleUpdatePackageStatus(values: packageStatusTypes) {
    try {
      const result = await updatePackageStatusLocally(values);
      
      if (!result.success) return false;
      return true;
    } catch (error) {
      return false;
    }
  }

  const packages = useMemo(() => items.filter((x) => x.code && x.id), [items]);

  useEffect(() => {
    if (isFocused) cleanInvalidPackages();
  }, [isFocused]);
  
  useEffect(() => {
    if (!permission?.granted) requestPermission();
  }, [permission]);


  return { permission, goBack, handleBarCodeScanned, packages, items, modalOpen, bottomSheetRef};
}
