/*
2025-04-06 00:01:07

너가 dark 클래스를 루트 요소에 추가하고 하위요소에서는 daik: 접두어를
사용한다고 했는데,
colorScheme === 'dark' ? 'dark:bg-secondary-dark' : ''
이 코드가 작동하는 원리는 명백해. colorScheme 가 컨텍스트 프로바이더로
확보되기 때문이야.
하지만, ThemeContext 만 추가함으로써 dark:bg-secondary-dark 가 사용된다는
주장이 이해하기가 너무 어렵다. 
<View className={`flex-1 ${theme === 'dark' ? 'dark' : ''}`}>
이 프로바이더코드가 제공되고 있기 때문에, 다크 모드일 때, 'dark' 클래스가
확보되는 것이고, 현재 요소의 부모 요소에 클래스 dark 가 포함되어 있기 때문에
dark:bg-secondary-dark 가 적용되는 것인가? 
그렇다면 NativeWind 에서도 부모 요소의 클래스가 상속된다는 말 처럼 들린다.
내가 이해한 것이 맞아?


2025-04-06 16:32:35
useColorScheme from NativeWind 로 theme 관리를 간편화할 수 있다는 걸 알았다. 
system 테마를 추가하려고 코드가 복잡해졌는데, useColorScheme 에서는 system 을 기본지원한다.
useColorScheme 를 사용하는 버전으로 리팩토링 하자. 

*/

// /contexts/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme, View, Text } from "react-native";
import { useColorScheme as useNativewindColorScheme } from "nativewind";
import { MMKV } from "react-native-mmkv";

const THEME_MODE_KEY = "themeMode"; // 테마 모드 키

type TailwindThemeModeEnums = "light" | "dark" | "system";

type TailwindThemeContextType = {
  themeMode: TailwindThemeModeEnums;
  effectiveTheme: "light" | "dark";
  setTheme: (theme: TailwindThemeModeEnums) => void;
};

type TailwindThemeProviderProps = {
  children: React.ReactNode;
};

const TailwindThemeContext = createContext<TailwindThemeContextType>({
  themeMode: "system",
  effectiveTheme: "light",
  setTheme: () => {},
});

export const TailwindThemeProvider = ({
  children,
}: TailwindThemeProviderProps) => {
  const systemColorScheme = useColorScheme();
  //   const [theme, setTheme] = useState(systemColorScheme || "light");
  const [themeMode, setThemeMode] = useState<TailwindThemeModeEnums>("system"); // 테마 모드: 'light', 'dark', 'system'
  const [effectiveTheme, setEffectiveTheme] = useState(
    systemColorScheme || "light"
  ); // 실제 적용되는 테마

  const storage = new MMKV();
  // load theme mode incl. system mode
  useEffect(() => {
    const loadThemeMode = () => {
      const savedThemeMode = storage.getString(THEME_MODE_KEY);
      if (savedThemeMode) {
        setThemeMode(savedThemeMode as TailwindThemeModeEnums);
      }
    };
    loadThemeMode();
  }, []);

  // determine effective theme based on theme mode
  useEffect(() => {
    if (themeMode === "system") {
      setEffectiveTheme(systemColorScheme || "light");
    } else {
      setEffectiveTheme(themeMode as "light" | "dark");
    }
  }, [themeMode, systemColorScheme]);

  // Or as a hook
  const { setColorScheme } = useNativewindColorScheme();

  // 테마 모드 변경 함수
  const setTheme = (newThemeMode: TailwindThemeModeEnums) => {
    console.log("mew setTheme", newThemeMode);
    setThemeMode(newThemeMode);
    setColorScheme(newThemeMode);
    storage.set(THEME_MODE_KEY, newThemeMode);
  };

  return (
    <TailwindThemeContext.Provider
      value={{ themeMode, effectiveTheme, setTheme }}
    >
      <View className={`flex-1 ${effectiveTheme === "dark" ? "dark" : ""}`}>
        <Text className="text-2xl text-foreground dark:text-foreground-dark">
          {effectiveTheme ? effectiveTheme : "light"}
        </Text>
        {children}
      </View>
    </TailwindThemeContext.Provider>
  );
};

export const useTheme = () => useContext(TailwindThemeContext);
