import theme from "@/theme";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
    container: {
      paddingHorizontal: 24,
      paddingVertical: 10,
      gap: 24,
    },
    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    title: {
      fontFamily: theme.fonts.interBold_700,
      fontSize: 16,
      lineHeight: 24,
      color: theme.colors.gray[900],
    },
    subtitle: {
      fontFamily: theme.fonts.interRegular_400,
      fontSize: 14,
      lineHeight: 20,
      color: theme.colors.gray[800],
    },
    footerContainer: {
      flexDirection: "row",
      paddingHorizontal: 16,
      paddingBottom: 32,
      gap: 16,
    },
    okButton: {
      flexDirection: "row",
      backgroundColor: theme.colors.primary,
      borderRadius: 99,
      paddingHorizontal: 16,
      paddingVertical: 8,
      justifyContent: "center",
      alignItems: "center",
      flexGrow: 1,
    },
    okButtonText: {
      fontFamily: theme.fonts.interBold_700,
      fontSize: 14,
      lineHeight: 24,
      color: theme.colors.white,
    },
  });
