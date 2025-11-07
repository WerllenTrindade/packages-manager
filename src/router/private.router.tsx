import { Home } from '@/screens/privada/home';
import { Scanner } from '@/screens/privada/scanner';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

const { Screen, Navigator } = createNativeStackNavigator();

export function PrivateStack() {

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name="home"
        component={Home}
        options={{
          gestureEnabled: false,
        }}
      />
     
      <Screen
        name="scanner"
        component={Scanner}
        options={{
          gestureEnabled: false,
        }}
      />
     
    </Navigator>
  );
}