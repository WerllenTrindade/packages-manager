import theme from "@/theme";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
  },
  goBackButton: {
    padding: 8,
  },
  camera: {
    flex: 1,
  },
  titleContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 32,
    gap: 12,
  },
  titleText: {
    fontFamily: theme.fonts.interBold_700,
    fontSize: 16,
    lineHeight: 32,
    color: theme.colors.white,
    textAlign: "center",
  },
  subtitleText: {
    fontFamily: theme.fonts.interBold_700,
    fontSize: 14,
    lineHeight: 20,
    color: theme.colors.white,
    textAlign: "center",
  },
});
