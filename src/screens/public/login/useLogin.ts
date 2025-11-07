import { useSession } from "@/contexts/hooks/use-session";
import { PrivateNavigation, ROUTES_PRIVATE } from "@/utils/routers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "expo-router";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import { loginSchema } from "./schemas";
import { loginType } from "./types";

export const useLogin = () => {
 const {navigate} = useNavigation<PrivateNavigation>();
  const { setSession } = useSession();
  const form = useForm<loginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    },
    mode: "onChange",
  });

  const handleSignIn = async (data: loginType) => {
    try {
      await setSession({...data})

      navigate(ROUTES_PRIVATE.HOME)
      

    } catch (error) {

      if ((error as any).code) {
        Alert.alert("Erro de Login", "Verifique seu e-mail e senha e tente novamente.");
      } else {
        Alert.alert("Erro", "Ocorreu um erro inesperado. Tente novamente.");
      }
    }
  }

  return {
    form,
    handleSignIn,
  };
};