import React, { useEffect } from "react";
import {
  router,
  Stack,
  useFocusEffect,
  useGlobalSearchParams,
} from "expo-router";
import DrawerIcon from "@/components/navigator/DrawerIcon";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tailwindColors from "@/utils/tailwindColors";
import { useColorScheme } from "nativewind";

const PeopleLayout = () => {
  const params = useGlobalSearchParams();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  // Clear the Stack
  // useEffect(() => {
  //   const clearStack = () => {
  //     router.dismissAll();
  //   };
  //   return clearStack; // 함수 자체를 리턴
  // }, []);

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
        headerTintColor: foregroundTheme,
        // detachInactiveScreens: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: "People",
          headerLeft: () => <DrawerIcon color={foregroundTheme} size={24} />,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          headerTitle: params.name ? `${params.name}` : "People detail",
          headerBackTitle: "목록으로",
          // unmountOnBlur: true, // ✅ 이거 추가
        }}
      />
    </Stack>
  );
};

export default PeopleLayout;
