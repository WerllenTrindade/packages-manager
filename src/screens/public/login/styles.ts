import theme from "@/theme";
import { Dimensions, StyleSheet } from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,

  },
  imageContainer: {
    height: SCREEN_HEIGHT * 0.4,
    paddingTop: "30%",
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  formWrapper: {
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  formContainer: {
    flex: 1,
    backgroundColor: theme.colors.white,

    padding: 24,
    gap: 40,
  },
  inputs: {
    gap: 12,
  },
  buttons: {
    gap: 12,
  },
  forgotPasswordText: {
    color: theme.colors.gray[600],
    textAlign: "right",
    fontFamily: theme.fonts.interRegular_400,
  },
  registerText: {
    color: theme.colors.gray[600],
    textAlign: "center",
    fontFamily: theme.fonts.interRegular_400,
  },
  registerHighlight: {
    fontFamily: theme.fonts.interSemiBold_600,
  },
});
