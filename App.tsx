import theme from "@/theme";
import { toastConfig } from "@/utils/toastConfig";
import {
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/inter";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { NavigationContainer } from "@react-navigation/native";
import { SQLiteProvider } from "expo-sqlite";
import React, { Suspense } from "react";
import { ActivityIndicator, StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { db } from "./src/repositories/database/database";
import { Router } from "./src/router";

function App() {
 const [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  if (!fontsLoaded) return;


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle={"dark-content"} />
      <Suspense
        fallback={
          <ActivityIndicator size="large" color={theme.colors.primary} />
        }
      >
        <BottomSheetModalProvider>
          <NavigationContainer>
            <SQLiteProvider databaseName="packages.db" onInit={db}>
              <Router />
              <Toast config={toastConfig} visibilityTime={1500} />
            </SQLiteProvider>
          </NavigationContainer>
        </BottomSheetModalProvider>
      </Suspense>
    </GestureHandlerRootView>
  );
}
export default App;
