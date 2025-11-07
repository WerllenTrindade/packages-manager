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
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  headerLeft: {
    flexShrink: 1,
  },
  code: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  clientName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
  },
  statusContainer: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
    textTransform: "capitalize",
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 5
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
