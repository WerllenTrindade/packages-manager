import theme from "@/theme";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    backgroundColor: theme.colors.background.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1,
    borderColor: theme.colors.border.default,
  },
  cardLeft: {
    flexDirection: "column",
    gap: 4,
  },
  cardRight: {
    alignItems: "flex-end",
    gap: 4,
  },
  codeText: {
    fontFamily: theme.fonts.interExtraBold_800,
    fontSize: 14,
    color: theme.colors.text.secondary,
    marginRight: 4,
  },
  time: {
    fontFamily: theme.fonts.interRegular_400,
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
});
