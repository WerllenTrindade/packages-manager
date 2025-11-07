import { Camera, PermissionStatus } from "expo-camera";
import { useCallback, useEffect, useState } from "react";

export function useBarcodeScanner(onScan: (data: string) => void) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === PermissionStatus  .GRANTED);
    })();
  }, []);

  const handleBarCodeScanned = useCallback(
    ({ type, data }: { type: string; data: string }) => {
      if (!scanned) {
        setScanned(true);
        onScan(data);
        setTimeout(() => setScanned(false), 2000);
      }
    },
    [scanned, onScan]
  );

  return { hasPermission, scanned, handleBarCodeScanned };
}
