import theme from "@/theme";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import {
  BackdropPressBehavior,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import React, { forwardRef, useCallback, useMemo } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { s } from "./styles";

export interface CustomBottomSheetModalProps extends BottomSheetModalProps {
  onClose?: () => void;
  children: React.ReactNode | React.ReactNode[];
  showBackdrop?: boolean;
  header?: React.ReactNode;
  scrollStyle?: StyleProp<ViewStyle>;
  scrollContentContainerStyle?: StyleProp<ViewStyle>;
  backdropAppearsOnIndex?: number;
  backdropDisappearsOnIndex?: number;
  backgroundHeader?: string;
  useScroll?: boolean;
  useBottomSheetModal?: boolean;
  backdropPressBehavior?: BackdropPressBehavior;
  custom?: boolean;
}

export const CustomBottomSheetModal = forwardRef<
  BottomSheetModal | BottomSheet | null,
  CustomBottomSheetModalProps
>(
  (
    {
      onClose,
      children,
      useScroll = true,
      showBackdrop = true,
      custom = true,
      useBottomSheetModal = true,
      header,
      style,
      scrollStyle,
      scrollContentContainerStyle,
      backdropAppearsOnIndex = 0,
      backdropDisappearsOnIndex = -1,
      backgroundHeader = theme.colors.gray[100],
      backdropPressBehavior,
      ...rest
    },
    ref
  ) => {
    const BottomSheetModalComponent = useMemo(
      () => (useBottomSheetModal ? BottomSheetModal : BottomSheet),
      [useBottomSheetModal]
    );

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          pressBehavior="close"
        />
      ),
      []
    );

    return (
      <BottomSheetModalComponent
        ref={ref as React.RefObject<BottomSheetModal | null>}
        onDismiss={onClose}
        index={0}
        enableDynamicSizing={useBottomSheetModal}
        style={[style]}
        handleIndicatorStyle={s.indicator}
        backgroundStyle={{ backgroundColor: theme.colors.white }}
        keyboardBehavior="fillParent"
        keyboardBlurBehavior="none"
        enablePanDownToClose={true}
        enableOverDrag={false}
        enableHandlePanningGesture={true}
        enableContentPanningGesture={true}
        backdropComponent={renderBackdrop}
        {...rest}
      >
        <BottomSheetScrollView style={{ flex: 1, width: "100%" }}>
          {children}
        </BottomSheetScrollView>
      </BottomSheetModalComponent>
    );
  }
);

CustomBottomSheetModal.displayName = "CustomBottomSheetModal";
