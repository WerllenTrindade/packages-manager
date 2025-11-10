import theme from "@/theme";
import { MasksTypes } from "@/utils/masks";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import React, { useState } from "react";
import { Control, Controller } from "react-hook-form";
import {
  Text,
  TextInputProps,
  TouchableOpacity,
  View
} from "react-native";
import { InputMask } from "../InputMask";
import { s } from "./styles";

interface InputProps extends TextInputProps {
  name: string;
  control: Control<any>;
  title?: string;
  mask?: MasksTypes;
  loading?: boolean
  clearable?: boolean
  secureTextEntry?: boolean;
  require?: boolean;
  acitveBottomSheet?: boolean
}

export function InputForm({ name, control, mask, require = false, acitveBottomSheet = false, title, style, clearable = false, secureTextEntry = false, ...rest }: InputProps) {
  const [eye, setEye] = useState(secureTextEntry)
  return (
    <View style={{  position: "relative" }}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value, }, fieldState: { error } }) => (
          <View>
            <Text numberOfLines={1} style={s.title}>{title}{require && '*'}</Text>
            <View>
              {
                acitveBottomSheet ?
                <BottomSheetTextInput
              placeholderTextColor={theme.colors.gray[300]}
                style={[
                  s.input,
                  style,
                  error && { borderColor: theme.colors.red[500], color: theme.colors.red[500] },
                ]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={eye}
                {...rest}
              />

                :
                 <InputMask
                placeholderTextColor={theme.colors.gray[300]}
                style={[
                  s.input,
                  style,
                  error && { borderColor: theme.colors.red[500], color: theme.colors.red[500] },
                ]}
                onBlur={onBlur}
                onChangeText={onChange}
                mask={mask}
                value={value}
                secureTextEntry={eye}
                {...rest}
              />
              }
              
             
              <View style={s.actionContainer}>
                {clearable && !!value ?
                  <TouchableOpacity
                  testID="clear-button"
                    style={s.clearButton}
                    onPress={() => onChange("")}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <MaterialIcons name="close" size={18} color="#6a6a6a" />
                  </TouchableOpacity>
                  :
                  null
                }

                {secureTextEntry ?
                  <TouchableOpacity
                  testID="eye-button"
                    onPress={() => setEye(prev => !prev)}
                    style={s.secretButton}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Ionicons
                      name={eye ? "eye-outline" : "eye-off-outline"}
                      size={22}
                      color={'#6a6a6a'}
                    />
                  </TouchableOpacity>
                  :
                  null
                }
              </View>
            </View>
            {error ? <Text style={s.error}>{error.message}</Text> : null}
          </View>
        )}
      />
    </View>
  );
}

