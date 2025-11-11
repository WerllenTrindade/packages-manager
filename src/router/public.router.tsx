import { Login } from '@/screens/public/login';
import { PublicStackParamList, ROUTES_PUBLIC } from '@/utils/routers';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

const { Screen, Navigator } = createNativeStackNavigator<PublicStackParamList>();

export function PublicStack() {

  return (
    <Navigator screenOptions={{ headerShown: false }} >
      <Screen
        name={ROUTES_PUBLIC.LOGIN}
        component={Login}
        options={{
          gestureEnabled: false,
        }}
      />
     
    </Navigator>
  );
}