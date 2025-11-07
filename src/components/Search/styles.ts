import theme from "@/theme";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.searchBorder,
    borderRadius: 10,
    backgroundColor: theme.colors.white,
    paddingHorizontal: 10,
    height: 52,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
});
