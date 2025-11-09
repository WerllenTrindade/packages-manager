import theme from "@/theme";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ToastConfig } from "react-native-toast-message";

export const toastConfig: ToastConfig = {
  success: ({ text1, onPress }) => (
    <Pressable style={[s.container, { backgroundColor: "green" }]} onPress={onPress}>
      <View style={s.contain}>
        <Feather name="check-circle" size={20} color={'#FFF'} />
        <Text style={s.text}>{text1}</Text>
      </View>
    </Pressable>
  ),
  error: ({ text1, onPress }) => (
    <Pressable style={[s.container, { backgroundColor: "red" }]} onPress={onPress}>
      <View style={s.contain}>
        <Feather name="alert-circle" size={24} color={'#FFF'} />
        <Text style={s.text}>{text1}</Text>
      </View>
    </Pressable>
  ),
  info: ({ text1, onPress }) => (
    <Pressable style={[s.container, { backgroundColor: theme.colors.primary }]} onPress={onPress}>
      <View style={s.contain}>
        <Feather name="info" size={24} color={'#FFF'} />
        <Text style={s.text}>{text1}</Text>
      </View>
    </Pressable>
  ),
  warning: ({ text1, onPress }) => (
    <Pressable style={[s.container, { backgroundColor: "orange" }]} onPress={onPress}>
      <View style={s.contain}>
        <Feather name="alert-triangle" size={24} color={'#FFF'} />
        <Text style={s.text}>{text1}</Text>
      </View>
    </Pressable>
  ),
};

export const s = StyleSheet.create({
  container: {
    borderRadius: 8,
    pointerEvents: 'box-none',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
    alignSelf: "center",
    bottom: 100,
    maxWidth: '80%',
  },
  contain: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 13,
    paddingHorizontal: 20,
  },
  text: {
    flex: 1,
    color: '#FFF',
    fontSize: 14,
    fontFamily: theme.fonts.interMedium_500,
  },
});
