/*
2025-04-18 05:18:14




*/

import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  runOnJS,
  SharedTransition,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import shadowStyle from "@/components/shadowStyle";

// import { Image } from "expo-image";
import { Link, router } from "expo-router";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SWIPE_THRESHOLD = -SCREEN_WIDTH * 0.3;
export type PersonDataType = {
  key: string;
  image: string;
  name: string;
  jobTitle: string;
  email: string;
};
export const AVATAR_SIZE = 70;

type RenderItemProps = {
  item: PersonDataType;
  removeItem: (id: string) => void;
  className?: string;
};

const RenderPersonItem = ({ item, removeItem, className }: RenderItemProps) => {
  // SharedValue...
  const positionX = useSharedValue(0);

  // Animated Style
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: positionX.value }],
    };
  });

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10]) // Activate X axis when swiping more than 10px
    .failOffsetY([-5, 5]) // Fail Y axis when swiping more than 5px -> This Makes parent scrollable active
    .onStart(() => {
      console.log("onStart");
    })
    .onUpdate((event) => {
      positionX.value = event.translationX;
    })
    .onEnd((event) => {
      // If the swipe is greater than the threshold, send the item to left for good
      if (event.translationX < SWIPE_THRESHOLD) {
        positionX.value = withTiming(-SCREEN_WIDTH);
        runOnJS(removeItem)(item.key);
      } else {
        positionX.value = withTiming(0);
      }
    })
    .onFinalize(() => {
      console.log("onFinalize");
    });

  const trashBinAnimatedStyle = useAnimatedStyle(() => {
    const opacity = withTiming(positionX.value < SWIPE_THRESHOLD ? 1 : 0, {
      duration: 200,
    });
    return {
      opacity,
    };
  });

  const customTransition = SharedTransition.custom((values) => {
    "worklet";
    return {
      width: withTiming(values.targetWidth, { duration: 800 }), // 800ms로 변경
      height: withTiming(values.targetHeight, { duration: 800 }),
      originX: withTiming(values.targetOriginX, { duration: 800 }),
      originY: withTiming(values.targetOriginY, { duration: 800 }),
    };
  });

  // console.log("=============");
  // console.log(item.name);

  return (
    <>
      <Animated.View
        className="absolute top-0 bottom-0 right-0 left-0 w-full h-full
          items-start justify-center px-10 bg-red-500"
        style={[trashBinAnimatedStyle]}
      >
        <Pressable
          className="bg-error/10 px-sm py-xs rounded-full"
          onPress={() => removeItem(item.key)}
        >
          <Ionicons name="trash" size={24} color="crimson" />
        </Pressable>
      </Animated.View>

      <GestureDetector gesture={panGesture}>
        {/* <View className="flex-row items-center p-md">
          <Text className="text-lg font-bold text-foreground dark:text-foreground-dark">
            {item.name}
          </Text>
          bg-background-blank dark:bg-background-blank        
          layout={LinearTransition.springify()}  
            <View
              className="flex-row justify-between items-center py-4 px-8 rounded-full bg-red-500
          gap-md"
            >
            </View>
        </View> */}
        <Pressable
          onPress={() => {
            router.push({
              pathname: "/(drawer)/(tabs)/people/[id]",
              params: {
                id: item.key,
                name: item.name,
                image: item.image,
                jobTitle: item.jobTitle,
                email: item.email,
              },
            });
          }}
        >
          <Animated.View style={[animatedStyle]}>
            <View
              className="flex-row items-center p-md my-md
          bg-background-blank dark:bg-background-blank
          border-background-secondary dark:border-background-secondaryDark 
          rounded-full "
              style={shadowStyle.shadowThin}
            >
              <Animated.Image
                source={{ uri: item.image }}
                style={{
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE,
                  borderRadius: AVATAR_SIZE / 2,
                }}
                sharedTransitionTag={`${item.key}-image`}
                sharedTransitionStyle={customTransition}
              />
              <View className="flex-1 gap-1 ">
                <Text className="text-lg font-bold text-foreground dark:text-foreground-dark ">
                  {item.name}
                </Text>
                <Text
                  className="text-sm 
                  text-foreground-tertiary dark:text-foreground-dark "
                >
                  {item.jobTitle}
                </Text>
                <Text className="text-sm text-foreground-tertiary dark:text-foreground-secondaryDark">
                  {item.email}
                </Text>
              </View>
            </View>
          </Animated.View>
        </Pressable>
      </GestureDetector>
    </>
  );
};

export default RenderPersonItem;
