import theme from "@/theme";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  title: {
    fontFamily: theme.fonts.interMedium_500,
    fontSize: 14,
    color: theme.colors.gray[800],
    marginBottom: 2,

  },
  actionContainer: {
    position: "absolute",
    height: 60,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 10
  },
  clearButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  secretButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 60,
    borderWidth: 1,
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.borderGray,
    color: theme.colors.gray[900],
    borderRadius: 14,
    paddingLeft: 18,
    paddingRight: 45,
    fontSize: 16,
    fontFamily: theme.fonts.interRegular_400
  },
  error: {
    marginTop: 6,
    fontSize: 10,
    fontFamily: theme.fonts.interMedium_500,
    color: theme.colors.red[500],
  },
});