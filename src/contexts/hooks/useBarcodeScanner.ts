import { usePackagesService } from "@/services/package/local/packageLocalService";
import { useScanFeedback } from "@/utils/feedback";
import * as Haptics from "expo-haptics";
import { useCallback, useState } from "react";
import Toast from "react-native-toast-message";

type Options = {
  onSuccess?: (code: string) => void;
};

export function useBarcodeScanner(options?: Options) {
  const [scanned, setScanned] = useState(false);
  const { playFeedback } = useScanFeedback();
  const { findByGtinPackage, updatePackageStatusPackage, createPackage } = usePackagesService();

  const handleBarCodeScanned = useCallback(
    async ({ data: code }: { data: string }) => {
      if (!code || scanned) return;

      setScanned(true);

      async function feedback() {
        await Promise.all([
          playFeedback(),
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
        ]);
      }

      try {
        const exists = await findByGtinPackage(code);

        if (exists.success && exists.data) {
          const pkg = exists.data;

          if (pkg.status !== "Coletado") {
            await feedback();

            const result = await updatePackageStatusPackage(code, "Coletado");
            if (!result.success) {
              Toast.show({
                type: "error",
                text1: result.message ?? "Erro ao atualizar pacote.",
                position: "bottom",
              });
            }
          } else {
            Toast.show({ type: "info", text1: `Pacote ${code} já está coletado.`, position: "bottom" });
          }
        } else {
          await feedback();

          const created = await createPackage(code);
          if (!created.success) {
            Toast.show({
              type: "error",
              text1: created.message ?? "Erro ao criar pacote.",
              position: "bottom",
            });
          }
        }

        options?.onSuccess?.(code);
      } catch (err) {
        console.error("Erro ao escanear:", err);
        Toast.show({ type: "error", text1: "Erro inesperado ao processar o código.", position: "bottom" });
      } finally {
        setTimeout(() => setScanned(false), 2000);
      }
    },
    [scanned, playFeedback, findByGtinPackage, updatePackageStatusPackage, createPackage, options]
  );

  return { handleBarCodeScanned };
}
