import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import "./styles/global.css";
import { ReanimatedLogLevel } from "react-native-reanimated";
import { configureReanimatedLogger } from "react-native-reanimated";
import { useOnboardingStore } from "@/contexts/onboardingZustand";
import { MMKV } from "react-native-mmkv";
import { ONBOARDING_FLAG, THEME_STORAGE_KEY } from "@/constants/constants";
import { useColorScheme as useNativewindColorScheme } from "nativewind";
import { useThemeProvider } from "@/contexts/NativewindThemeProvider";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NativewindThemeProvider } from "@/contexts/NativewindThemeProvider";
import { SafeAreaView } from "react-native";
import OnBoardingIndex from "./onboarding";
import MaskAnimationProvider from "@/contexts/MaskAnimationProvider";

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
      <GestureHandlerRootView>
        <MaskAnimationProvider>
          <NativewindThemeProvider>
            {/* <StatusBar
                // hidden={isDrawerOpen}
                // animated={false}
                style={colorScheme === "light" ? "dark" : "light"}
              /> */}
            <Stack initialRouteName="(drawer)">
              <Stack.Screen
                name="(drawer)"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen name="settings" />
              <Stack.Screen name="logout" />
              <Stack.Screen name="+not-found" />
            </Stack>
          </NativewindThemeProvider>
        </MaskAnimationProvider>
      </GestureHandlerRootView>
    );
  }

  // Send to OnBoarding for onBoarding case
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <OnBoardingIndex />
    </GestureHandlerRootView>
  );
}
