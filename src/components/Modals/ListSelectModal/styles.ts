import theme from "@/theme";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  overlay: {
    flex: 1,
    zIndex: 2,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "100%",
    justifyContent: "flex-end",
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "#F0F2F5",
    paddingHorizontal: 20,
    maxHeight: "90%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  handleContainer: {
    alignItems: "center",
    paddingVertical: 10,
  },
  handle: {
    width: 80,
    borderRadius: 10,
    backgroundColor: "#6D737F",
    height: 4,
  },
  title: {
    fontFamily: theme.fonts.interSemiBold_600,
    fontSize: 18,
    color: theme.colors.primary,
    paddingBottom: 10,
  },
  optionButton: {
    paddingVertical: 15,
  },
  optionText: {
    fontFamily: theme.fonts.interRegular_400,
    color: theme.colors.text.primary,
    fontSize: 16,
    lineHeight: 40,
  },
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  emptyContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: "gray",
    textAlign: "center",
  },
  listContent: {
    paddingBottom: 20,
  },
});
