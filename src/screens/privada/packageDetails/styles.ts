import theme from "@/theme";
import { colors } from "@/theme/colors";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: theme.colors.background.header,
  },
  header: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 28,
    paddingTop: 10,
    fontFamily: theme.fonts.interExtraBold_800,
    color: colors.text.primary,
  },
  card: {
    backgroundColor: colors.background.card,
    borderRadius: 12,
    padding: 20,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    marginBottom: 30,
  },
  badgesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
    paddingBottom: 15,
  },
  badgeWrapper: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  badgeLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  badgeContainer: {
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
    minWidth: 100,
    alignItems: 'center',
  },
  badgeText: {
    color: colors.text.white,
    fontWeight: 'bold',
    fontSize: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[50],
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  detailValue: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  buttonsContainer: {
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 15
  },
  button: {
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
    borderColor: colors.button.primary,
    backgroundColor: colors.button.primary
  },
  buttonTwo: {
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
    borderColor: theme.colors.button.primary,
    borderWidth: 1,
    backgroundColor: theme.colors.white
  },
  buttonText: {
    color: colors.text.white,
    fontSize: 18,
    fontFamily: theme.fonts.interRegular_400
  },
  buttonTextTwo: {
    color: colors.button.primary,
    fontFamily: theme.fonts.interRegular_400
  },
  navigationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    paddingRight: 10,
    width: 40,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.white,
    flex: 1, 
    textAlign: 'center',
  },
});