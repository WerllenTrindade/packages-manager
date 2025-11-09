import theme from "@/theme";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "20%",
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  textContainer: {
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontFamily: theme.fonts.interBold_700,
    fontSize: 16,
    color: theme.colors.gray[900],
  },
  subtitle: {
    textAlign: "center",
    fontFamily: theme.fonts.interRegular_400,
    fontSize: 14,
    color: theme.colors.gray[600],
  },
});
