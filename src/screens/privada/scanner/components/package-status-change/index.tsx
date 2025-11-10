import { Button } from "@/components/Button";
import { CustomBottomSheetModal } from "@/components/CustomBottomSheetModal";
import { InputForm } from "@/components/Inputs/InputForm";
import { InputSelect } from "@/components/Inputs/InputSelect";
import { listStatus } from "@/constants/status";
import theme from "@/theme";
import { TouchableWithoutFeedback } from "@gorhom/bottom-sheet";
import React, { forwardRef, useEffect } from "react";
import { Keyboard, Text, View } from "react-native";
import { s } from "./styles";
import { packageStatusTypes } from "./types";
import { usePackageStatusChange } from "./usePackageStatusChange";

export interface PackageStatusChangeRef {
  open: (onSubmit: (data: packageStatusTypes) => Promise<boolean>) => void;
  close: () => void;
}

export const PackageStatusChange = forwardRef<PackageStatusChangeRef>((_, ref) => {
  const { bottomSheetRef, handleConfirm, control, status, selectStatus, errors, isLoading} = usePackageStatusChange({ ref });

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      bottomSheetRef.current?.snapToIndex(0);
    });

    return () => {
      keyboardDidHideListener?.remove();
    };
  }, []);

  return (
    <CustomBottomSheetModal ref={bottomSheetRef}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={s.container}>
          <View style={{ marginBottom: 25, gap: 10 }}>
            <InputSelect
              control={control}
              name="status"
              title="Status"
              arrItems={listStatus}
              selectItem={selectStatus}
            />

            {status === "Entregue" && (
              <InputForm
                acitveBottomSheet={true}
                control={control}
                name="clientName"
                title="Nome do Recebedor"
                placeholder="Digite o nome do recebedor"
              />
            )}

            {errors.status && <Text style={{ color: "red", marginTop: 4 }}>{errors.status.message}</Text>}
          </View>

          <View style={s.footerContainer}>
            <Button
              disabled={isLoading}
              style={{ backgroundColor: isLoading ? theme.colors.gray[100] : theme.colors.gray[500], borderColor: isLoading ? theme.colors.gray[100] : theme.colors.gray[500] }}
              description="Cancelar"
              onPress={() => bottomSheetRef.current?.dismiss()}
            />
            <Button
              disabled={isLoading}
              isLoading={isLoading}
              style={{ flex: 1, backgroundColor: theme.colors.button.primary, borderColor: theme.colors.button.primary }}
              description="Confirmar"
              onPress={handleConfirm}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </CustomBottomSheetModal>
  );
});

PackageStatusChange.displayName = "PackageStatusChange";
