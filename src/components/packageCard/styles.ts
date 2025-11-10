import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 16,
    paddingRight: 16,
    paddingLeft: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    flexDirection: "row",
    overflow: "hidden",
  },
  gradient: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 12,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  content: {
    flex: 1,
    paddingLeft: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  code: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  clientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  clientName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: 6,
  },
  date: {
    color: "#9CA3AF",
    fontSize: 12,
  },
});
