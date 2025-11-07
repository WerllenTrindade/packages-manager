import { Mask } from "@/utils/masks";
import React, { forwardRef } from "react";
import { TextInput } from "react-native";

export interface InputProps
  extends React.ComponentPropsWithoutRef<typeof TextInput> {
  mask?: MasksTypes;
}

const InputMask = forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({ mask, onChangeText, defaultValue, ...rest }, ref) => {
    const handleMask = (text: string) => {
      if (mask) {
        const maskedText = Mask.format(mask, text);
        onChangeText?.(maskedText as any);
      } else {
        onChangeText?.(text);
      }
    };

    const handleDefaultValueMask = (defaultvalue?: string) => {
      if (mask && defaultvalue) {
        const maskedText = Mask.format(mask, defaultvalue);
        return maskedText;
      }
      return defaultvalue;
    };
    return (
      <TextInput
        ref={ref}
        onChangeText={mask ? handleMask : onChangeText}
        defaultValue={handleDefaultValueMask(defaultValue)}
        {...rest}
      />
    );
  }
);

InputMask.displayName = "InputMask";

export { InputMask };

