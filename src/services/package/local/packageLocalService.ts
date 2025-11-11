import { useSessionPackagesStore } from "@/contexts/hooks/use-package-session";
import { usePackageDatabase } from "@/repositories/package/packageRepository";
import { packageStatusTypes } from "@/screens/privada/scanner/components/package-status-change/types";
import { PackageTypes } from "@/types/package";
import Toast from "react-native-toast-message";
import { createFromScan } from "../factory";
import { mapPackagesForStatusUpdate, mapPackagesWithDeliveryStatus } from "./helpers";

export function usePackagesService() {
  const { items, setItems, addItem } = useSessionPackagesStore();
  const {
    getAll,
    findByGtin,
    updatePackagesStatusAsync,
    insertPackage,
    updatePackageStatus,
    syncPackages,
    syncSinglePackage
  } = usePackageDatabase();

  async function getAllPackage() {
    return getAll();
  }

  async function findByGtinPackage(code: string) {
    try {
      const data = await findByGtin(code);
      return { success: !!data, data };
    } catch (err) {
      return { success: false, message: "Falha ao buscar pacote." };
    }
  }

  async function updatePackageStatusPackage(code: string, newState: string) {
    try {
      const data = await updatePackageStatus(code, newState);
      if (!data)
        return { success: false, message: "Pacote não encontrado no banco." };

      addItem(data);

      Toast.show({
        type: "success",
        text1: `Pacote ${code} marcado como ${newState}.`,
      });

      return { success: true, data };
    } catch (err) {
      console.error("Erro ao atualizar status:", err);
      Toast.show({
        type: "error",
        text1: "Erro ao atualizar pacote.",
      });
      return { success: false };
    }
  }

  async function createPackage(code: string) {
    try {
      const data = createFromScan(code);
      const id = await insertPackage(data);

      if (!id)
        return { success: false, message: "Erro ao inserir pacote no banco." };

      addItem({ ...data, id });

      Toast.show({
        type: "success",
        text1: `Pacote ${code} adicionado à lista.`,
      });

      return { success: true, data: { ...data, id } };
    } catch (err) {
      console.error("Erro ao criar pacote:", err);
      Toast.show({
        type: "error",
        text1: "Erro ao criar pacote.",
      });
      return { success: false };
    }
  }

  async function updatePackageStatusLocally(data: packageStatusTypes) {
    if (!items.length)
      return { success: false, message: "Nenhum pacote disponível." };

    try {
      const updatedPackages = mapPackagesForStatusUpdate(items, data);

      const localSuccess = await updatePackagesStatusAsync(updatedPackages);

      const syncResults = await syncPackages(updatedPackages);

      const overallSuccess = localSuccess && syncResults;

      if (overallSuccess) {
        const packagesWithSent = mapPackagesWithDeliveryStatus(updatedPackages, syncResults);

        console.log('packagesWithSent', JSON.stringify(packagesWithSent))
        setItems(packagesWithSent);
        Toast.show({
          type: "success",
          text1: "Pacotes atualizados!",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Falha ao atualizar pacotes.",
        });
      }

      return { success: overallSuccess };
    } catch (err) {
      console.error("Erro ao atualizar localmente:", err);
      return { success: false };
    }
  }

  async function updatePackageDetailsStatus(data: packageStatusTypes, pack: PackageTypes[]){

    try {

      const updatedPackages = mapPackagesForStatusUpdate(pack, data);

      const localSuccess = await updatePackagesStatusAsync(updatedPackages);


      if (localSuccess) {

        Toast.show({
          type: "success",
          text1: "Pacotes atualizados!",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Falha ao atualizar pacotes.",
        });
      }

      return { success: localSuccess };
    } catch (err) {
      console.error("Erro ao atualizar localmente:", err);
      return { success: false };
    }
  }

  async function updatePackageDetailsDelivery(pack: PackageTypes){
    if (!items.length)
      return { success: false, message: "Nenhum pacote disponível." };

    try {

      const item = {...pack, delivery_status: 'sent'} as PackageTypes

      const localSuccess = await updatePackagesStatusAsync([item]);
      const syncResults = await syncSinglePackage(pack);
      const overallSuccess = localSuccess && syncResults;

      if (overallSuccess) {
        Toast.show({
          type: "success",
          position: 'bottom',
          text1: "Pacotes atualizados!",
        });
      } else {
        Toast.show({
          type: "error",
          position: 'bottom',
          text1: "Falha ao atualizar pacotes.",
        });
      }

      return { success: overallSuccess };
    } catch (err) {
      console.error("Erro ao atualizar localmente:", err);
      return { success: false };
    }
  }

  return {
    getAllPackage,
    findByGtinPackage,
    updatePackageDetailsStatus,
    updatePackageStatusPackage,
    createPackage,
    updatePackageDetailsDelivery,
    updatePackageStatusLocally,
  };
}
