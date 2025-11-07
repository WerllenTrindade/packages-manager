import theme from "@/theme";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  description: string;
  isLoading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export function Button({
  description,
  isLoading = false,
  disabled = false,
  variant = "primary",
  style,
  textStyle,
  icon: Icon,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  const backgroundColor =
    variant === "primary" ? theme.colors.primary : theme.colors.white;
  const textColor =
    variant === "primary" ? theme.colors.white : theme.colors.primary;

    
  return (
    <TouchableOpacity
      testID="ui-button-test"
      style={[
        styles.button,
        { backgroundColor: isDisabled ? theme.colors.gray[300] : backgroundColor },
        { borderColor: isDisabled ? theme.colors.gray[300] : backgroundColor },
        {gap: 2},
        style,
      ]}
      activeOpacity={0.7}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={description}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <>
        {Icon && Icon}
        <Text style={[styles.text, { color: textColor }, textStyle]}>
          {description}
        </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 45,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1
  },
  text: {
    fontSize: 15,
    fontFamily: theme.fonts.interMedium_500,
  },
});
