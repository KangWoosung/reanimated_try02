import { Stack } from "expo-router";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function LegacyLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Stack.Screen
        name="explore"
        options={{
          title: "Explore",
        }}
      />
    </Stack>
  );
}
