import { View, Text, Platform } from "react-native";
import React from "react";
import {
  DrawerItemList,
  DrawerItem,
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";

import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";

const getRandomAvatarUri = () => {
  const randomNum = Math.floor(Math.random() * (99 - 10 + 1)) + 10;
  return `https://randomuser.me/api/portraits/men/${randomNum}.jpg`;
};

const AVATAR_URI = getRandomAvatarUri();

// const AVATAR_URI = "https://randomuser.me/api/portraits/men/75.jpg";
// CustomDrawerContent
const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const router = useRouter();
  const { top, bottom } = useSafeAreaInsets();

  return (
    <View className="flex-1 flex-col  ">
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={{
          flex: 1,
          paddingTop: top + 10,
          backgroundColor: "#f0f0f0",
          paddingBottom: 0,
        }}
      >
        <View
          className="flex-col items-center justify-start gap-4 pt-5"
          style={{ backgroundColor: "#f0f0f0" }}
        >
          <View className="shadow-lg shadow-gray-500 rounded-full">
            <Image
              source={{ uri: AVATAR_URI }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 100,
              }}
            />
          </View>
          <Text className="text-2xl font-bold">John Doe</Text>
        </View>
        <View className="bg-slate-200">
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View
        style={{
          borderTopColor: "#b6b9c2",
          backgroundColor: "#ced3de",
          borderTopWidth: 1,
          paddingBottom: bottom + 30,
        }}
      >
        <DrawerItem
          label="Settings"
          icon={({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          )}
          onPress={() => router.push("/settings")}
          labelStyle={{
            fontWeight: "bold",
            marginLeft: Platform.OS === "ios" ? -20 : 0,
          }}
        />
        <DrawerItem
          label="Logout"
          icon={({ color, size }) => (
            <Ionicons name="exit-outline" size={size} color={color} />
          )}
          onPress={() => router.replace("/")}
          labelStyle={{
            fontWeight: "bold",
            marginLeft: Platform.OS === "ios" ? -20 : 0,
          }}
        />
      </View>
    </View>
  );
};

export default CustomDrawerContent;
