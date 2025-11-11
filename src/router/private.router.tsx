import { useSyncOnReconnect } from '@/contexts/hooks/useSyncOnReconnect';
import { Home } from '@/screens/privada/home';
import { PackageDetails } from '@/screens/privada/packageDetails';
import { Scanner } from '@/screens/privada/scanner';
import { PrivateStackParamList, ROUTES_PRIVATE } from '@/utils/routers';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

const { Screen, Navigator } = createNativeStackNavigator<PrivateStackParamList>();

export function PrivateStack() {
    useSyncOnReconnect();

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name={ROUTES_PRIVATE.HOME}
        component={Home}
        options={{
          gestureEnabled: false,
        }}
      />
     
      <Screen
        name={ROUTES_PRIVATE.SCANNER}
        component={Scanner}
        options={{
          gestureEnabled: false,
        }}
      />
     
      <Screen
        name={ROUTES_PRIVATE.PACKAGE_DETAILS}
        component={PackageDetails}
        options={{
          gestureEnabled: false,
        }}
      />
     
    </Navigator>
  );
}