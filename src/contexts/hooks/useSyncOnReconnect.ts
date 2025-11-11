import { usePackageDatabase } from "@/repositories/package/packageRepository";
import NetInfo from "@react-native-community/netinfo";
import { useEffect, useRef } from "react";
import Toast from "react-native-toast-message";

export function useSyncOnReconnect() {
    const {processPendingPackages } = usePackageDatabase()
  const isSyncing = useRef(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(async (state) => {
      const isOnline = !!state.isConnected && !!state.isInternetReachable;

      if (isOnline && !isSyncing.current) {
        try {
          isSyncing.current = true;
          console.log("🌐 Conexão restabelecida — iniciando sincronização...");
          await processPendingPackages();

           Toast.show({
                  type: "success",
                  text1: "Sincronização concluída com sucesso.",
                });
        } catch (err) {
          console.error("Erro durante a sincronização:", err);
        } finally {
          isSyncing.current = false;
        }
      }
    });

    return () => unsubscribe();
  }, []);
}
