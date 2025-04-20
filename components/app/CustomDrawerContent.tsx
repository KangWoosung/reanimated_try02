import { View, Text, Platform } from "react-native";
import React from "react";
import {
  DrawerItemList,
  DrawerItem,
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";

import { useRouter, usePathname, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";

const getRandomAvatarUri = () => {
  const randomNum = Math.floor(Math.random() * (99 - 10 + 1)) + 10;
  return `https://randomuser.me/api/portraits/men/${randomNum}.jpg`;
};

const AVATAR_URI = getRandomAvatarUri();

// !! Important: This is a custom drawer item.
// Declare all drawer items here.
const customDrawerItem = [
  {
    label: "Home",
    iconName: "home-outline",
    route: "/",
  },
  {
    label: "People",
    iconName: "people-outline",
    route: "/people",
  },
  {
    label: "Profile",
    iconName: "person-outline",
    route: "/profile",
  },
];

// const AVATAR_URI = "https://randomuser.me/api/portraits/men/75.jpg";
// CustomDrawerContent
const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const router = useRouter();
  const { top, bottom } = useSafeAreaInsets();
  const pathname = usePathname();

  // Hide routes that include 'drawer' in the name
  // const routes = props.state.routes.filter(
  //   (route) => !route.name.includes("drawer ") && !route.name.includes("tabs")
  // );
  // const filteredState = { ...props.state, routes };

  return (
    <View className="flex-1 flex-col  ">
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={{
          flex: 1,
          paddingTop: top + 30,
          backgroundColor: "#f0f0f0",
          paddingBottom: 0,
          gap: 10,
        }}
      >
        {/* Drawer Header */}
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

        {/* Drawer Item List */}
        <View className="bg-slate-200">
          {/* Hiding all DrawerItemList because of folder structure */}
          {/* <DrawerItemList {...props} state={filteredState} /> */}
        </View>

        {/* CustomDrawerItem */}
        {customDrawerItem.map((item) => (
          <CustomDrawerItem
            key={item.route}
            {...item}
            focused={pathname === item.route}
          />
        ))}
      </DrawerContentScrollView>
      {/* End of CustomDrawerItem */}

      {/* Style for Drawer Footer */}
      <View
        style={{
          borderTopColor: "#b6b9c2",
          backgroundColor: "#ced3de",
          borderTopWidth: 1,
          paddingBottom: bottom + 40,
        }}
      >
        {/* Drawer Footers */}
        <DrawerItem
          label="Settings"
          icon={({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          )}
          onPress={() => props.navigation.navigate("settings")}
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
          onPress={() => props.navigation.navigate("logout")}
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

// CustomDrawerItem
type CustomDrawerItemProps = {
  label: string;
  iconName: string;
  route: string;
  focused: boolean;
};

// Each CustomDrawerItem
function CustomDrawerItem({
  label,
  iconName,
  route,
  focused,
}: CustomDrawerItemProps) {
  return (
    <DrawerItem
      label={label}
      icon={({ color, size }) => (
        <Ionicons name={iconName as any} size={size} color={color} />
      )}
      onPress={() => router.push(route as any)}
      focused={focused}
      labelStyle={{
        fontWeight: "bold",
        marginLeft: Platform.OS === "ios" ? -20 : 0,
      }}
      activeBackgroundColor="#5363df"
      activeTintColor="#fff"
      inactiveTintColor="#000"
      inactiveBackgroundColor="#fff"
    />
  );
}
