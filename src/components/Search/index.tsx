import theme from "@/theme";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { TextInput, TextInputProps, View, ViewStyle } from "react-native";
import { s } from "./styles";

interface SearchProps extends TextInputProps {
  icon?: React.ReactNode;
  containerStyle?: ViewStyle;
}

export function Search({ icon, containerStyle, style, ...rest }: SearchProps) {
  return (
    <View testID="search-container" style={[s.container, containerStyle]}>
      {icon ?? <Feather name="search" size={20} color={theme.colors.gray[600]} style={s.icon} testID="search-icon" />}
      <TextInput
        testID="search-input"
        {...rest}
        style={[s.input, style]}
        placeholderTextColor={theme.colors.gray[600]}
      />
    </View>
  );
}
