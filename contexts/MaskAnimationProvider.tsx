/*
2025-04-22 08:16:46

Zustand 버전으로 분해조립 해보자

2025-04-24 05:19:22
오버레이의 종류를 두면, 여러 종류의 매스킹 애니메이션을 만들 수 있을 것 같다.
Wibowo 와 Candillion 의 애니메이션 두가지를 가능하게 해보자. 

*/

// MaskAnimationProvider.tsx
import {
  View,
  StyleSheet,
  AppState,
  SafeAreaView,
  PixelRatio,
  Dimensions,
} from "react-native";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  Image,
  Canvas,
  Circle,
  ImageShader,
  mix,
  Fill,
  Mask,
  Group,
  Rect,
} from "@shopify/react-native-skia";
import { StatusBar } from "expo-status-bar";
import { useColorScheme as useNativewindColorScheme } from "nativewind";
import { useMaskAnimationStore } from "@/contexts/maskAnimationZustand";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { SystemBars } from "react-native-bars";

export const { width: SCRN_WIDTH, height: SCRN_HEIGHT } =
  Dimensions.get("screen");
export const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } =
  Dimensions.get("window");

type ColorSchemeProviderProps = {
  children: ReactNode;
};

const MaskAnimationProvider = ({ children }: ColorSchemeProviderProps) => {
  const inset = useSafeAreaInsets();
  const insideHeight = SCRN_HEIGHT - (inset.top + inset.bottom);
  const { colorScheme, setColorScheme } = useNativewindColorScheme();

  // Pixel Density for Snapshot Image Scaling
  const pd = PixelRatio.get();

  // SharedValue for Mask Animation
  const curtainWidth = useSharedValue(0);
  const circleRadius = useSharedValue(0);
  const circleCoordX = useSharedValue(0);
  const circleCoordY = useSharedValue(0);

  // create ref
  const ref = useRef<View>(null);

  // Zustand hook
  const {
    statusBarStyle,
    curtainOverlay,
    circleOverlay,
    setRef,
    setCurtainOverlay,
    setCircleOverlay,
    setCurtainWidth,
    setCircleRadius,
    setCircleCoordX,
    setCircleCoordY,
  } = useMaskAnimationStore();

  // set ref
  useEffect(() => {
    setRef(ref);
    setCurtainOverlay(curtainOverlay);
    setCurtainWidth(curtainWidth);
    setCircleOverlay(circleOverlay);
    setCircleRadius(circleRadius);
    setCircleCoordX(circleCoordX);
    setCircleCoordY(circleCoordY);
    return () => {
      setRef(null);
      setCurtainOverlay(null);
      setCurtainWidth(curtainWidth);
      setCircleOverlay(null);
      setCircleRadius(circleRadius);
      setCircleCoordX(circleCoordX);
      setCircleCoordY(circleCoordY);
    };
  }, []);

  useEffect(() => {}, []);

  return (
    <SafeAreaProvider>
      <View ref={ref} style={StyleSheet.absoluteFill} collapsable={false}>
        {/* <SafeAreaView className="flex-1 bg-background dark:bg-background-dark"> */}
        <View style={{ flex: 1 }} collapsable={false}>
          {children}
        </View>
        {/* </SafeAreaView> */}

        {curtainOverlay && (
          <Canvas style={StyleSheet.absoluteFill} pointerEvents="none">
            <Mask
              mode="luminance"
              mask={
                <Group>
                  <Rect
                    x={0}
                    y={0}
                    width={SCRN_WIDTH}
                    height={SCRN_HEIGHT}
                    color="white"
                  />
                  <Rect
                    x={0}
                    y={0}
                    // Give the sharedValue itself, not sharedValue.value
                    width={curtainWidth}
                    height={SCRN_HEIGHT}
                    color="black"
                  />
                </Group>
              }
            >
              <Image
                image={curtainOverlay}
                x={0}
                y={0}
                width={curtainOverlay.width() / pd}
                height={curtainOverlay.height() / pd} // Device Pixel Ratio Correction
                fit="cover"
              />
            </Mask>
          </Canvas>
        )}

        {circleOverlay && (
          <Canvas style={StyleSheet.absoluteFill} pointerEvents="none">
            <Mask
              mode="luminance"
              mask={
                <Group>
                  <Rect
                    x={0}
                    y={0}
                    width={SCRN_WIDTH}
                    height={SCRN_HEIGHT}
                    color="white"
                  />
                  <Circle
                    cx={circleCoordX}
                    cy={circleCoordY}
                    r={circleRadius}
                    color="black"
                  />
                </Group>
              }
            >
              <Image
                image={circleOverlay}
                x={0}
                y={0}
                width={circleOverlay.width() / pd}
                height={circleOverlay.height() / pd} // Device Pixel Ratio Correction
                fit="cover"
              />
            </Mask>
          </Canvas>
        )}
      </View>
    </SafeAreaProvider>
  );
};

export default MaskAnimationProvider;
