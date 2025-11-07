import { useCallback, useState } from "react";

export function useBarcodeScanner(onScan: (data: string) => void) {
  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = useCallback(
    ({ data }: { data: string }) => {
      if (!scanned) {
        setScanned(true);
        onScan(data);
        setTimeout(() => setScanned(false), 2000);
      }
    },
    [scanned, onScan]
  );

  return { handleBarCodeScanned };
}
