import React from "react";
import Drawer from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import CustomDrawerContent from "@/components/CustomDrawerContent";
import { Platform } from "react-native";
const DrawerLayout = () => {
  return (
    <Drawer
      drawerContent={CustomDrawerContent}
      screenOptions={{
        headerStyle: {
          height: 60, // 원하는 높이
          // backgroundColor: "#dde3fe",
        },
        drawerStyle: {
          width: 280, // 원하는 너비 지정
        },
        headerTitleContainerStyle: {
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: "center",
          justifyContent: "flex-start",
        },
        headerLeftContainerStyle: {
          height: "50%", //
          alignItems: "center",
          justifyContent: "flex-start",
        },
        headerRightContainerStyle: {
          alignItems: "center",
          justifyContent: "flex-start",
        },
        // drawerHideStatusBarOnOpen: true,
        drawerActiveBackgroundColor: "#5363df",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#000",
        drawerLabelStyle: {
          marginLeft: Platform.OS === "ios" ? -20 : 0,
        },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          headerStyle: {
            height: 60, // 원하는 높이
            backgroundColor: "#dde3fe",
          },

          drawerLabel: "Home",
          headerTitle: "Home Screen",
          drawerIcon: ({ size, color }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="movies"
        options={{
          drawerLabel: "Movies",
          headerTitle: "Movies Screen",
          drawerIcon: ({ size, color }) => (
            <Ionicons name="film-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="profile"
        // redirect={authState.role !== Roll.USER}
        options={{
          drawerLabel: "Profile",
          headerTitle: "Profile Screen",
          drawerIcon: ({ size, color }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="detail"
        options={{
          drawerLabel: "Detail",
          headerTitle: "Detail Screen",
          drawerItemStyle: { display: "none" },
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;
