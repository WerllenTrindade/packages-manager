
import { Button } from "@/components/Button";
import { InputForm } from "@/components/Inputs/InputForm";
import { Image, StatusBar, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "./styles";
import { useLogin } from "./useLogin";

const logo = require("@/assets/icone-2.png")

export function Login() {
  const {
    handleSignIn,
    form: {
      control,
      handleSubmit,
      formState: { isSubmitting },
    },
  } = useLogin();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.formWrapper}
        extraScrollHeight={50}
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.imageContainer}>
          <Image
            source={logo}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputs}>
            <InputForm
              title="E-mail"
              control={control}
              placeholder="Digite seu e-mail"
              name="email"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              returnKeyType="next"
            />

            <View style={{ gap: 8 }}>
              <InputForm
                title="Senha"
                control={control}
                clearable
                placeholder="Digite sua senha"
                name="password"
                secureTextEntry
                editable={!isSubmitting}
                autoCapitalize="none"
                returnKeyType="send"
              />

            </View>
          </View>

          <View style={styles.buttons}>
            <Button
              onPress={handleSubmit(handleSignIn)}
              description="Acessar"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
