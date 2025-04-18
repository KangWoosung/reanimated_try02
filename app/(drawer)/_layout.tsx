import React from "react";
import Drawer from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import CustomDrawerContent from "@/components/app/CustomDrawerContent";
import { Platform } from "react-native";
import Animated, {
  useAnimatedRef,
  useScrollViewOffset,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useScrollValues } from "@/contexts/scrollSharedValueZustand";

// Header position adjustments for iOS and Android
const getHeaderAdjustments = () => {
  if (Platform.OS === "ios") {
    return {
      headerTitleContainerTop: -46,
      headerLeftContainerTop: -52,
    };
  } else if (Platform.OS === "android") {
    return {
      headerTitleContainerTop: -44,
      headerLeftContainerTop: -50,
    };
  }
  // Default values
  return {
    headerTitleContainerTop: -43,
    headerLeftContainerTop: -48,
  };
};

const DrawerLayout = () => {
  const headerAdjustments = getHeaderAdjustments();

  // // 새로운 커스텀 훅 사용
  // const { headerOpacity, createScrollHandler } = useScrollValues();

  // // 컴포넌트 마운트 시 스크롤 핸들러 생성
  // React.useEffect(() => {
  //   // 훅이 컴포넌트 내에서 호출되도록 변경
  //   const handler = createScrollHandler();
  // }, [createScrollHandler]);

  // Animated Style for headerOpacity
  // const animatedHeaderStyle = useAnimatedStyle(() => {
  //   // headerOpacity가 존재할 때만 사용
  //   const opacity = headerOpacity?.value ?? 1;
  //   return {
  //     opacity,
  //     // When fading out, move the header slightly above
  //     transform: [{ translateY: (1 - opacity) * -20 }],
  //   };
  // });

  return (
    <Drawer
      drawerContent={CustomDrawerContent}
      screenOptions={{
        headerStyle: {
          height: 60, //
          // backgroundColor: "#dde3fe",
        },
        headerBackground: () => (
          <Animated.View
            style={[
              {
                flex: 1,
                backgroundColor: "#dde3fe",
              },
            ]}
          />
        ),
        drawerStyle: {
          width: 280, // Set the desired width
        },
        headerTitleContainerStyle: {
          padding: 10,
          position: "absolute",
          left: 0,
          right: 0,
          top: headerAdjustments.headerTitleContainerTop,
          alignItems: "center",
          justifyContent: "flex-start",
        },
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: "bold",
        },
        // headerBlurEffect: "regular",
        // headerTransparent: true,
        headerLeftContainerStyle: {
          padding: 10,
          position: "absolute",
          left: 0,
          right: 0,
          top: headerAdjustments.headerLeftContainerTop,
          alignItems: "center",
          justifyContent: "flex-start",
        },
        headerRightContainerStyle: {
          alignItems: "flex-start",
          justifyContent: "flex-start",
        },
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
            height: 60, //
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
