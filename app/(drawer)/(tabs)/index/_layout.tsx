/*

Stack, Tabs, Drawer 등의 네비게이션 컴포넌트에서는 Nativewind className 을 사용할 수 없는데,
프로젝트의 디자인 시스템으로, tailwind.config.js 에 정의된 클래스의 컬러를 사용하고 싶다. 
Stack 의 screenOptions 에서 tailwind.config.js 에 정의된 클래스의 컬러를 사용할 수 있는 방법이 있을까?
일단 컬러만 확보할 수 있다면,
headerStyle: {
  backgroundColor: "red",
},
이런 식으로 네비게이션 헤더의 스타일을 지정할 수 있을 것 같은데...


*/

import { View, Text } from "react-native";
import React from "react";
import { Stack, useGlobalSearchParams } from "expo-router";
import DrawerIcon from "@/components/navigator/DrawerIcon";
import { Ionicons } from "@expo/vector-icons";
import tailwindColors from "@/utils/tailwindColors";
import { useColorScheme } from "nativewind";
const IndexLayout = () => {
  const params = useGlobalSearchParams();

  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const backgroundTheme =
    tailwindColors.background[isDark ? "secondaryDark" : "secondary"];
  const foregroundTheme =
    tailwindColors.foreground[isDark ? "secondaryDark" : "secondary"];

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: backgroundTheme,
        },
        headerTitleStyle: {
          color: foregroundTheme,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: "Index",
          headerLeft: () => <DrawerIcon color={foregroundTheme} size={24} />,
          headerStyle: {
            backgroundColor: backgroundTheme,
          },
          headerTitleStyle: {
            color: foregroundTheme,
          },
        }}
      />
    </Stack>
  );
};

export default IndexLayout;
