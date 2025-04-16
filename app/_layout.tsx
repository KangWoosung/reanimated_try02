/*
2025-03-25 07:17:03

	스토리지에도 'system' 을 그대로 존치하고, 
	theme 상태를 사용하는 effect 에서 prefers-color-scheme 를 확인하고
	결과에 따라 class 를 추가해준다.

*/
// import "expo-dev-client";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { MMKV } from "react-native-mmkv";
import "react-native-reanimated";
import "./styles/global.css";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import OnBoardingIndex from "./onboarding";
import { ONBOARDING_FLAG, THEME_STORAGE_KEY } from "@/constants/constants";
import { useOnboardingStore } from "@/contexts/onboardingZustand"; // Zustand
import {
  ReanimatedLogLevel,
  configureReanimatedLogger,
} from "react-native-reanimated";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  NativewindThemeProvider,
  useThemeProvider,
} from "@/contexts/NativewindThemeProvider";
import { Text, useColorScheme as useSystemColorScheme } from "react-native";
import { useColorScheme as useNativewindColorScheme } from "nativewind";

import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useDrawerStatus } from "@react-navigation/drawer";

// 2025-03-29 17:12:23
// disabled strict mode for reanimated
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [onBoardingFlag, setOnBoardingFlag] = useState(false);
  const { onBoardingActive, setOnBoardingActive } = useOnboardingStore();
  // const isDrawerOpen = useDrawerStatus() === "open";

  ////////////////////////////////////////////////
  // Dealing with Fonts
  // app will show splashScreen until all fonts are fully loaded
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  ////////////////////////////////////////////////
  // Dealing with SplashScreen
  useEffect(() => {
    if (error) throw error;
    // hide the splashScreen when all fonts are fully loaded
    if (fontsLoaded) {
      console.log("Fonts loaded successfully");
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  ////////////////////////////////////////////////
  // Dealing with OnBoarding
  const storage = new MMKV();
  // MMKV Check: Check if it's onBoarding case or not.
  // Storage will be negative because there's no value by default.
  // by factory default, onBoardingFlag is true
  useEffect(() => {
    setOnBoardingFlag(!storage.getBoolean(ONBOARDING_FLAG));
    if (!onBoardingActive) {
      setOnBoardingFlag(false);
    }
  }, [onBoardingActive]);

  ////////////////////////////////////////////////
  // Theme State
  const { nativewindColorScheme, nativeWindSetTheme } = useThemeProvider(); // Provider 가 제공하는 테마 상태
  const { colorScheme, setColorScheme } = useNativewindColorScheme();

  useEffect(() => {
    nativeWindSetTheme(nativewindColorScheme as "light" | "dark");
    console.log("colorScheme", nativewindColorScheme);
  }, [nativewindColorScheme]);

  // Render Main Screen when onBoardingFlag is false
  if (!onBoardingFlag) {
    return (
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 bg-background dark:bg-background-dark">
          <GestureHandlerRootView style={{ flex: 1 }}>
            <NativewindThemeProvider>
              <Stack initialRouteName="(drawer)">
                <Stack.Screen
                  name="(drawer)"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="(legacy)"
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="+not-found" />
              </Stack>
            </NativewindThemeProvider>
          </GestureHandlerRootView>
          <StatusBar
            // hidden={isDrawerOpen}
            // animated={false}
            style={colorScheme === "light" ? "dark" : "light"}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  // Send to OnBoarding for onBoarding case
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <OnBoardingIndex />
    </GestureHandlerRootView>
  );
}
