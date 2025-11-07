import { Login } from '@/screens/public/login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

const { Screen, Navigator } = createNativeStackNavigator();

export function PublicStack() {

  return (
    <Navigator screenOptions={{ headerShown: false }} >
      <Screen
        name="login"
        component={Login}
        options={{
          gestureEnabled: false,
        }}
      />
     
    </Navigator>
  );
}