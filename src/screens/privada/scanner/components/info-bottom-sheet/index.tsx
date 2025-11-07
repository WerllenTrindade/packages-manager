import { BottomSheetFooter, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef, ReactNode } from "react";
import {
  Pressable,
  Text,
  View
} from "react-native";
import { s } from "./styles";

export interface InfoBottomSheetProps {
  icon?: ReactNode;
  title: string;
  subtitle: string;
  onClose: () => void;
}

export const InfoBottomSheet = forwardRef<BottomSheetModal, InfoBottomSheetProps>(
  ({ icon, title, subtitle, onClose }, ref) => {

    return (
      <BottomSheetModal
        ref={ref}
        enableDynamicSizing={false}
        snapPoints={[240]}
        footerComponent={(props) => (
          <BottomSheetFooter {...props}>
            <View style={s.footerContainer}>
              <Pressable style={s.okButton} onPress={onClose}>
                <Text style={s.okButtonText}>OK</Text>
              </Pressable>
            </View>
          </BottomSheetFooter>
        )}
      >
        <BottomSheetView style={s.container}>
          <View style={s.titleContainer}>
            {icon}
            <Text style={s.title}>{title}</Text>
          </View>
          <Text style={s.subtitle}>{subtitle}</Text>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);


InfoBottomSheet.displayName = "InfoBottomSheet";