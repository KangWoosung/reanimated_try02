import { View, Text, Platform, Pressable } from "react-native";
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
import { useThemeProvider } from "@/contexts/NativewindThemeProvider";
import tailwindColors from "@/utils/tailwindColors";
import { useColorScheme } from "nativewind";
import { THEME_TOGGLER_BUTTON_SIZE } from "@/constants/constants";
import { CurtainMaskTriggerButton } from "./CurtainMaskTriggerButton";
import { CircleMaskTriggerButton } from "./CircleMaskTriggerButton";
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
  const { nativewindColorScheme, nativeWindSetTheme } = useThemeProvider();

  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const backgroundTheme =
    tailwindColors.background[isDark ? "dark" : "DEFAULT"];
  const foregroundTheme =
    tailwindColors.foreground[isDark ? "dark" : "DEFAULT"];
  const backgroundSecondaryTheme =
    tailwindColors.background[isDark ? "secondaryDark" : "secondary"];
  const foregroundSecondaryTheme =
    tailwindColors.foreground[isDark ? "secondaryDark" : "secondary"];

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
          backgroundColor: backgroundTheme,
          paddingBottom: 0,
          gap: 10,
        }}
      >
        {/* Drawer Header */}
        {/* Theme Toggler */}
        <View className="flex-row w-full items-center justify-between gap-4 pt-5">
          <View className="flex-row items-center justify-end gap-4">
            <Text></Text>
          </View>
          <CircleMaskTriggerButton />
          {/* <Pressable
            onPress={() => {
              console.log("Theme Toggler");
              nativeWindSetTheme(
                nativewindColorScheme === "dark" ? "light" : "dark"
              );
            }}
          >
            {nativewindColorScheme === "dark" ? (
              <Ionicons
                name="moon-outline"
                size={THEME_TOGGLER_BUTTON_SIZE}
                color={foregroundTheme}
              />
            ) : (
              <Ionicons
                name="sunny-outline"
                size={24}
                color={foregroundTheme}
              />
            )}
          </Pressable> */}
        </View>
        <View
          className="flex-col items-center justify-start gap-4 pt-5"
          style={{ backgroundColor: backgroundTheme }}
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
          <Text className="text-2xl font-bold text-foreground dark:text-foreground-dark">
            John Doe
          </Text>
        </View>

        {/* Drawer Item List */}
        <View className="">
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
          borderTopColor: backgroundSecondaryTheme,
          backgroundColor: backgroundSecondaryTheme,
          borderTopWidth: 1,
          paddingBottom: bottom + 40,
        }}
      >
        {/* Drawer Footers */}
        <DrawerItem
          label="Settings"
          icon={({ color, size }) => (
            <Ionicons
              name="settings-outline"
              size={size}
              color={foregroundTheme}
            />
          )}
          onPress={() => props.navigation.navigate("settings")}
          labelStyle={{
            fontWeight: "bold",
            color: foregroundTheme,
            marginLeft: Platform.OS === "ios" ? -20 : 0,
          }}
        />
        <DrawerItem
          label="Logout"
          icon={({ color, size }) => (
            <Ionicons name="exit-outline" size={size} color={foregroundTheme} />
          )}
          onPress={() => props.navigation.navigate("logout")}
          labelStyle={{
            fontWeight: "bold",
            color: foregroundTheme,
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
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const backgroundTheme =
    tailwindColors.background[isDark ? "tertiary" : "tertiaryDark"];
  const foregroundTheme =
    tailwindColors.foreground[isDark ? "tertiary" : "secondaryDark"];
  const backgroundSecondaryTheme =
    tailwindColors.background[isDark ? "secondaryDark" : "secondary"];
  const foregroundSecondaryTheme =
    tailwindColors.foreground[isDark ? "secondaryDark" : "secondary"];

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
      activeBackgroundColor={backgroundTheme}
      activeTintColor={foregroundTheme}
      inactiveTintColor={foregroundSecondaryTheme}
      inactiveBackgroundColor={backgroundSecondaryTheme}
    />
  );
}
