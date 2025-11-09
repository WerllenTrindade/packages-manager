import React, { useState } from "react";
import { Control, Controller } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";


import { ListSelectModal } from "@/components/Modals/ListSelectModal";
import theme from "@/theme";
import Octicons from '@expo/vector-icons/Octicons';
interface InputSelectProps extends TouchableOpacityProps {
  name: string;
  control: Control<any>;
  title: string;
  arrItems: any[];
  selectItem: (item: any) => void;
  showOptionsCallback?: () => void;
  selectOptionCallback?: (item: any) => void;
}

export function InputSelect({
  name,
  control,
  title,
  arrItems,
  selectItem,
  style,
  showOptionsCallback,
  selectOptionCallback,
  ...rest
}: InputSelectProps) {
  const [visibleModal, setVisibleModal] = useState(false);

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TouchableOpacity
            {...rest}
            onPress={() => {
              setVisibleModal(true)
              if (showOptionsCallback) showOptionsCallback()
            }}
            style={{ marginBottom: 10 }}
          >
            <Text style={styles.title}>{title}</Text>
            <View style={[styles.inputContainer, style, error && { borderColor: theme.colors.red[200] }]}>
              <Text style={[styles.inputText, !value && { color: "#AAA" }]}>
                {value || "Selecionar"}
              </Text>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <View style={{ borderWidth: 0.5, backgroundColor: theme.colors.primary, borderColor: theme.colors.primary }} />

                <Octicons name="triangle-down" size={24} color="#747474" />
              </View>
            </View>
            {error && <Text style={styles.error}>{error.message}</Text>}
          </TouchableOpacity>
        )}
      />

      {visibleModal && (
        <ListSelectModal
          arrItems={arrItems}
          closeModal={() => setVisibleModal(false)}
          selectItem={(item) => {
            selectItem(item);
            setVisibleModal(false);
            if (selectOptionCallback) selectOptionCallback(item)
          }}
          title={title}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: theme.fonts.interRegular_400,
    fontSize: 13,
    color: "#363636",
    marginBottom: 2,
  },
  inputContainer: {
    height: 50,
    borderWidth: 1,
    borderColor: "#D8D8D8",
    borderRadius: 5,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputText: {
    fontSize: 14,
    color: "#363636",
  },
  error: {
    marginTop: 6,
    fontSize: 10,
    fontFamily: theme.fonts.interRegular_400,
    color: theme.colors.red[200],
  },
});
