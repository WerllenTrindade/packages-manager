import { useAudioPlayer } from "expo-audio";
import * as Haptics from "expo-haptics";
import { useCallback } from "react";

const beepSound = require("@/assets/sounds/beep.mp3");

export function useScanFeedback() {
  const player = useAudioPlayer(beepSound);

  const playFeedback = useCallback(async () => {
    try {
      await player.play();

      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (err) {
      console.log("Erro ao tocar feedback:", err);
    }
  }, [player]);

  return { playFeedback };
}
