import { View, Text, Animated, Platform } from "react-native";
import React from "react";
import Drawer from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import CustomDrawerContent from "@/components/app/CustomDrawerContent";

const DrawerLayout = () => {
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: 280, // Set the desired width
        },
        drawerActiveBackgroundColor: "#5363df",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#000",
        drawerLabelStyle: {
          marginLeft: Platform.OS === "ios" ? -20 : 0,
        },
      }}
      drawerContent={CustomDrawerContent}
    >
      <Drawer.Screen name="(tabs)" />
    </Drawer>
  );
};

export default DrawerLayout;
