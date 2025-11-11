import { NO_INTERNET_MESSAGE } from "@/constants/messages";
import { useAuthDatabase } from "@/repositories/auth/authRepository";
import NetInfo from "@react-native-community/netinfo";
import { Alert } from "react-native";
import { useAuthService } from "../useAuthService";

jest.mock("@/repositories/auth/authRepository");
jest.mock("@react-native-community/netinfo");
jest.spyOn(Alert, "alert").mockImplementation(jest.fn());

describe("useAuthService", () => {
  const mockDbLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuthDatabase as jest.Mock).mockReturnValue({
      dbLogin: mockDbLogin,
    });
  });

  it("deve chamar dbLogin quando há conexão", async () => {
    (NetInfo.fetch as jest.Mock).mockResolvedValue({ isConnected: true });
    mockDbLogin.mockResolvedValueOnce({ token: "abc123" });

    const { login } = useAuthService();

    const result = await login("user", "1234");

    expect(NetInfo.fetch).toHaveBeenCalled();
    expect(mockDbLogin).toHaveBeenCalledWith("user", "1234");
    expect(result).toEqual({ token: "abc123" });
    expect(Alert.alert).not.toHaveBeenCalled();
  });

  it("deve exibir alerta e não chamar dbLogin quando não há conexão", async () => {
    (NetInfo.fetch as jest.Mock).mockResolvedValue({ isConnected: false });

    const { login } = useAuthService();

    await login("user", "1234");

    expect(NetInfo.fetch).toHaveBeenCalled();
    expect(mockDbLogin).not.toHaveBeenCalled();
    expect(Alert.alert).toHaveBeenCalledWith("Ops!", NO_INTERNET_MESSAGE);
  });
});
