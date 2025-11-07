import theme from "@/theme";
import { NavigationContainer } from "@react-navigation/native";
import { SQLiteProvider } from "expo-sqlite";
import React, { Suspense } from "react";
import { ActivityIndicator, StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { db } from "./src/repositories/database/database";
import { Router } from "./src/router";

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle={"dark-content"} />
      <Suspense fallback={<ActivityIndicator size="large" color={theme.colors.primary} />}>
          <NavigationContainer>
        <SQLiteProvider databaseName="packages.db" onInit={db}>
            <Router />
        </SQLiteProvider>
          </NavigationContainer>
      </Suspense>
    </GestureHandlerRootView>
  );
}
export default App;
