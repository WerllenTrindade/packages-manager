import theme from "@/theme";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  headerText: {
    color: theme.colors.white,
    fontSize: 22,
    textAlign: "center",
    fontWeight: "600",
  },
  searchContainer: {
    paddingHorizontal: 10,
    paddingTop: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  searchWrapper: {
    marginRight: 10,
    flex: 1,
  },
  scanButton: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 8,
    height: 52,
    width: 52,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    paddingHorizontal: 10,
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#F9FAFB",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#9CA3AF",
  },

});
