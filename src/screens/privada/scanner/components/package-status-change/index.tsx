import { BottomSheetFooter, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef, ReactNode, useImperativeHandle, useRef, useState } from "react";
import {
  Pressable,
  Text,
  View
} from "react-native";
import { s } from "./styles";
import { InputSelect } from "@/components/Inputs/InputSelect";

export interface RecoverBottomSheetProps {
  open: (email: string) => void;
  close: () => void;
}

export const PackageStatusChange = forwardRef<RecoverBottomSheetProps>((_, ref) => {

     const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [email, setEmail] = useState("");

  useImperativeHandle(ref, () => ({
    open: (email: string) => {
      setEmail(email);
      bottomSheetRef.current?.present();
    },
    close: () => {
      bottomSheetRef.current?.dismiss();
    },
  }));

  const navigate = () => {
    bottomSheetRef.current?.dismiss();
  };

    return (
      <BottomSheetModal
        ref={bottomSheetRef}
        enableDynamicSizing={false}
        snapPoints={[240]}
        footerComponent={(props) => (
          <BottomSheetFooter {...props}>
            <View style={s.footerContainer}>
              <Pressable style={s.okButton} onPress={() => null}>
                <Text style={s.okButtonText}>OK</Text>
              </Pressable>
            </View>
          </BottomSheetFooter>
        )}
      >
        <BottomSheetView style={s.container}>
            <InputSelect arrItems={[1,2]} control={} name="" selectItem={() => null} title="Status" />
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);


PackageStatusChange.displayName = "PackageStatusChange";