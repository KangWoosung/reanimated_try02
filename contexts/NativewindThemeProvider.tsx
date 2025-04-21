/*
2025-04-06 00:01:07

*/

// /contexts/NativewindThemeContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { View } from "react-native";
import {
  useColorScheme as useNativewindColorScheme,
  cssInterop,
} from "nativewind";
import { MMKV } from "react-native-mmkv";
import { THEME_STORAGE_KEY } from "@/constants/constants";

type NativewindThemeModeEnums = "light" | "dark";

type NativewindThemeContextType = {
  nativewindColorScheme: NativewindThemeModeEnums;
  nativeWindSetTheme: (theme: NativewindThemeModeEnums) => void;
};

type NativewindThemeProviderProps = {
  children: React.ReactNode;
};

// Context
const NativewindThemeContext = createContext<NativewindThemeContextType>({
  nativewindColorScheme: "light",
  nativeWindSetTheme: () => {},
});

// Provider
export const NativewindThemeProvider = ({
  children,
}: NativewindThemeProviderProps) => {
  // colorScheme from nativewind
  const {
    colorScheme: nativewindColorScheme,
    setColorScheme: setNativewindColorScheme,
  } = useNativewindColorScheme();

  const [themeMode, setThemeMode] = useState<NativewindThemeModeEnums>("light");

  const storage = new MMKV();

  // load theme mode from storage
  useEffect(() => {
    const storagedThemeMode = storage.getString(THEME_STORAGE_KEY);
    if (storagedThemeMode) {
      setThemeMode(storagedThemeMode as NativewindThemeModeEnums);

      setNativewindColorScheme(storagedThemeMode as "light" | "dark");
    }
  }, []);

  // function that changes theme mode
  const nativeWindSetTheme = (newThemeMode: NativewindThemeModeEnums) => {
    setThemeMode(newThemeMode);

    // update and store new theme mode
    setNativewindColorScheme(newThemeMode as "light" | "dark");
    storage.set(THEME_STORAGE_KEY, newThemeMode as "light" | "dark");
  };

  // themeMode가 변경될 때마다 실행됩니다
  useEffect(() => {
    console.log("themeMode updated:", themeMode);
  }, [themeMode]);

  return (
    <NativewindThemeContext.Provider
      value={{
        nativewindColorScheme: themeMode, // 사용자가 선택한 테마 모드 전달
        nativeWindSetTheme,
      }}
    >
      <View
        className={`flex-1 ${nativewindColorScheme === "dark" ? "dark" : ""}`}
      >
        {children}
      </View>
    </NativewindThemeContext.Provider>
  );
};

// Hook
export const useThemeProvider = () => useContext(NativewindThemeContext);
