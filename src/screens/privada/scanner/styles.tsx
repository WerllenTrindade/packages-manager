import theme from "@/theme";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: '#000'
  },
  header: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
  },
  goBackButton: {
    padding: 8,
  },
  camera: {
    flex: 1,
  },
  titleContainer: {
    flex: 1,
    justifyContent: "flex-end",
    gap: 12,
    
  },
  titleText: {
    fontFamily: theme.fonts.interBold_700,
    fontSize: 16,
    lineHeight: 32,
    color: theme.colors.white,
    textAlign: "center",
    marginTop: 25
  },
  subtitleText: {
    fontFamily: theme.fonts.interBold_700,
    fontSize: 14,
    lineHeight: 20,
    color: theme.colors.white,
    textAlign: "center",
  },
   listContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

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

  // LEFT SIDE
  cardLeft: {
    flexDirection: "column",
  },

  code: {
    fontFamily: theme.fonts.interBold_700,
    fontSize: 16,
    color: theme.colors.text.primary,
  },

  status: {
    fontFamily: theme.fonts.interRegular_400,
    fontSize: 14,
    marginTop: 4,
  },

  statusCollected: {
    color: theme.colors.status.success,
  },

  statusPending: {
    color: theme.colors.status.warning,
  },
  codeText: {
    fontFamily: theme.fonts.interExtraBold_800,
    fontSize: 14,
    color: theme.colors.text.secondary,
    marginRight: 4,
  },
  cardRight: {
    alignItems: "flex-end",
  },

  time: {
    fontFamily: theme.fonts.interRegular_400,
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
});
