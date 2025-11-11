export default "Icon";

export const FontAwesome = "Icon";

jest.mock("@expo/vector-icons/Feather", () => {
  return {
    __esModule: true,
    default: "Feather",
  };
});