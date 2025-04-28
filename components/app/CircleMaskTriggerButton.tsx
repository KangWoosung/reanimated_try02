import { View, Text } from "react-native";
import React from "react";
import { useColorScheme } from "nativewind";
import { useThemeProvider } from "@/contexts/NativewindThemeProvider";
import tailwindColors from "@/utils/tailwindColors";
import { useMaskAnimationStore } from "@/contexts/maskAnimationZustand";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { wait } from "@/utils/timeFunctions";
import { takeSnapshot } from "@/utils/takeSnapshot";
import { SCRN_WIDTH } from "@/contexts/MaskAnimationProvider";
import { withTiming } from "react-native-reanimated";
import {
  MASK_ANIMATE_DURATION,
  THEME_TOGGLER_BUTTON_SIZE,
} from "@/constants/constants";
import { Feather } from "@expo/vector-icons";

export const CircleMaskTriggerButton = () => {
  const { colorScheme } = useColorScheme();
  const { nativewindColorScheme, nativeWindSetTheme } = useThemeProvider();
  const {
    active,
    ref,
    setCircleOverlay,
    setActive,
    circleRadius,
    circleCoordX,
    circleCoordY,
  } = useMaskAnimationStore();

  const isDark = colorScheme === "dark";
  const foregroundTheme =
    tailwindColors.foreground[isDark ? "dark" : "DEFAULT"];

  const tap = Gesture.Tap()
    .runOnJS(true)
    .onStart(async (e) => {
      console.log("circleRadius", circleRadius);
      // Store event coordinates
      console.log("x", e.x);
      console.log("y", e.y);

      if (circleCoordX) {
        circleCoordX.value = e.x;
      }
      if (circleCoordY) {
        circleCoordY.value = e.y;
      }

      if (!active) {
        setActive(true);
        // Wait for just 1 frame
        await wait(16);
        const snapshot2 = await takeSnapshot(ref);
        if (snapshot2) {
          setCircleOverlay(snapshot2);
        }
        // await wait(80);
        nativeWindSetTheme(nativewindColorScheme === "dark" ? "light" : "dark");

        console.log("circleRadius", circleRadius);
        if (circleRadius) {
          circleRadius.value = withTiming(800, {
            duration: MASK_ANIMATE_DURATION,
          });
        }
        await wait(MASK_ANIMATE_DURATION);
        setCircleOverlay(null);
        if (circleRadius) circleRadius.value = 0;
        if (circleCoordX) circleCoordX.value = 0;
        if (circleCoordY) circleCoordY.value = 0;
        setActive(false);
      }
    });
  return (
    <GestureDetector gesture={tap}>
      <View collapsable={false}>
        <Feather
          name={colorScheme === "dark" ? "moon" : "sun"}
          color={foregroundTheme}
          size={THEME_TOGGLER_BUTTON_SIZE}
        />
      </View>
    </GestureDetector>
  );
};
