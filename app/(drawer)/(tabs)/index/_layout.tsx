/*




*/

import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { router, Stack, useGlobalSearchParams } from "expo-router";
import DrawerIcon from "@/components/navigator/DrawerIcon";
import { Ionicons } from "@expo/vector-icons";
import tailwindColors from "@/utils/tailwindColors";
import { useColorScheme } from "nativewind";
const IndexLayout = () => {
  const params = useGlobalSearchParams();

  // Clear the Stack
  // useEffect(() => {
  //   const clearStack = () => {
  //     router.dismissAll();
  //   };
  //   return clearStack();
  // }, []);

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
