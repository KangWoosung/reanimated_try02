import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import DrawerIcon from "@/components/navigator/DrawerIcon";

const ProfileLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Profile",
          headerLeft: () => <DrawerIcon color="gray" size={24} />,
        }}
        name="index"
      />
      <Stack.Screen name="[id]" />
    </Stack>
  );
};

export default ProfileLayout;
