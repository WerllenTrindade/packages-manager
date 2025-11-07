
import { NO_INTERNET_MESSAGE } from "@/constants/messages";
import { useAuthDatabase } from "@/repositories/auth/authRepository";
import NetInfo from "@react-native-community/netinfo";
import { Alert } from "react-native";
import { IAuthService } from "./IAuthService";


export function useAuthService() {
  const { dbLogin } = useAuthDatabase();
 
  const checkConnection = async (): Promise<boolean> => {
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      Alert.alert("Ops!", NO_INTERNET_MESSAGE);
      return false;
    }
    return true;
  };

  const login = async (...args: Parameters<IAuthService["login"]>) => {
    if (!(await checkConnection())) return;
    return dbLogin(...args);
  };


  return { login };
}
