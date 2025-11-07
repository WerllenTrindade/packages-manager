import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export enum ROUTES_PUBLIC {
  LOGIN = "login"
}

export enum ROUTES_PRIVATE {
  HOME = "home",
  SCANNER = "scanner",
}


export type PublicStackParamList = {
  [ROUTES_PUBLIC.LOGIN]: undefined;

};


export type PrivateStackParamList = {
  [ROUTES_PRIVATE.HOME]: undefined;
};

export type PublicNavigation = NativeStackNavigationProp<PublicStackParamList>;
export type PrivateNavigation = NativeStackNavigationProp<PrivateStackParamList>;
