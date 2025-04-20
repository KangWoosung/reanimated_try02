import { View, Text } from "react-native";
import React from "react";
import Drawer from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
const DrawerLayout = () => {
  return (
    <Drawer screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="(tabs)" />
    </Drawer>
  );
};

export default DrawerLayout;
