import theme from "@/theme";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000",
  },
  headerRow: {
    backgroundColor: "#000",
    width: "100%",
    paddingHorizontal: 15,
    marginVertical: 15,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  headerTitle: {
    color: theme.colors.white,
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  camera: {
    flex: 1,
  },

  footerButton: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingBottom: 8,
    zIndex: 99999,
  },
});
