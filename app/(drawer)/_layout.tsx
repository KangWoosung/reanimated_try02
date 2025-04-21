import { View, Text, Animated, Platform } from "react-native";
import React from "react";
import Drawer from "expo-router/drawer";
import CustomDrawerContent from "@/components/app/CustomDrawerContent";
import tailwindColors from "@/utils/tailwindColors";
import { useColorScheme } from "nativewind";

const DrawerLayout = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const backgroundTheme =
    tailwindColors.background[isDark ? "dark" : "DEFAULT"];
  const foregroundTheme =
    tailwindColors.foreground[isDark ? "dark" : "DEFAULT"];
  const drawerActiveBackgroundColor =
    tailwindColors.primary[isDark ? "activeDark" : "active"];
  const drawerActiveTintColor =
    tailwindColors.primary[isDark ? "activeDark" : "active"];
  const drawerInactiveTintColor =
    tailwindColors.foreground[isDark ? "secondaryDark" : "secondary"];

  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: 280, // Set the desired width
          backgroundColor: backgroundTheme,
        },
        drawerHideStatusBarOnOpen: false,
        drawerActiveBackgroundColor: drawerActiveBackgroundColor,
        drawerActiveTintColor: drawerActiveTintColor,
        drawerInactiveTintColor: drawerInactiveTintColor,
        drawerLabelStyle: {
          marginLeft: Platform.OS === "ios" ? -20 : 0,
          color: foregroundTheme,
        },
      }}
      drawerContent={CustomDrawerContent}
    >
      <Drawer.Screen name="(tabs)" />
    </Drawer>
  );
};

export default DrawerLayout;
