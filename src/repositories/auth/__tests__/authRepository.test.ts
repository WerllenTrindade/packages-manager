import { useAuthDatabase } from "@/repositories/auth/authRepository";
import { renderHook } from "@testing-library/react-native";

const mockRunAsync = jest.fn();
const mockGetFirstAsync = jest.fn();

jest.mock("expo-sqlite", () => ({
  useSQLiteContext: () => ({
    runAsync: mockRunAsync,
    getFirstAsync: mockGetFirstAsync,
  }),
}));

describe("useAuthDatabase", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("retorna true quando o usuário existe e senha é igual", async () => {
    mockGetFirstAsync.mockResolvedValueOnce({ email: "test@test.com", password: "123" });

    const { result } = renderHook(() => useAuthDatabase());
    const response = await result.current.dbLogin("test@test.com", "123");

    expect(response).toBe(true);
    expect(mockRunAsync).not.toHaveBeenCalled();
  });

  it("atualiza senha quando diferente", async () => {
    mockGetFirstAsync.mockResolvedValueOnce({ email: "test@test.com", password: "oldpass" });

    const { result } = renderHook(() => useAuthDatabase());
    const response = await result.current.dbLogin("test@test.com", "newpass");

    expect(response).toBe(true);
    expect(mockRunAsync).toHaveBeenCalledWith(
      "UPDATE users SET password = ? WHERE email = ?",
      ["newpass", "test@test.com"]
    );
  });

  it("cria novo usuário quando não existe", async () => {
    mockGetFirstAsync
      .mockResolvedValueOnce(undefined)
      .mockResolvedValueOnce({ id: 1, email: "new@test.com" });

    const { result } = renderHook(() => useAuthDatabase());
    const response = await result.current.dbLogin("new@test.com", "abc");

    expect(response).toBe(true);
    expect(mockRunAsync).toHaveBeenCalledWith(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      ["new@test.com", "abc"]
    );
  });

  it("retorna false quando ocorre erro", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    mockGetFirstAsync.mockRejectedValueOnce(new Error("DB error"));

    const { result } = renderHook(() => useAuthDatabase());
    const response = await result.current.dbLogin("err@test.com", "123");

    expect(response).toBe(false);
    expect(console.error).toHaveBeenCalledWith(
      "Erro fatal no processo de credenciais de usuário:",
      "DB error"
    );
  });

});
