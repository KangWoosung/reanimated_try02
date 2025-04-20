/*


*/

import React from "react";
import { View, Text, Pressable } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import shadowStyle from "@/components/shadowStyle";

export type Item = {
  id: string;
  text: string;
};
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SWIPE_THRESHOLD = -SCREEN_WIDTH * 0.3;

type RenderItemProps = {
  item: Item;
  removeItem: (id: string) => void;
};

const RenderListItem = ({ item, removeItem }: RenderItemProps) => {
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
        runOnJS(removeItem)(item.id);
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

  return (
    <>
      <Animated.View
        className="absolute top-0 left-0 w-full h-full
          items-end justify-center px-10"
        style={[trashBinAnimatedStyle]}
      >
        <Pressable
          className="bg-error/10 px-sm py-xs rounded-md"
          onPress={() => removeItem(item.id)}
        >
          <Ionicons name="trash" size={24} color="black" />
        </Pressable>
      </Animated.View>

      <GestureDetector gesture={panGesture}>
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          layout={LinearTransition.springify()}
          className="bg-background-secondary dark:bg-background-secondaryDark rounded-lg p-md m-sm"
          style={[shadowStyle.shadowThin, animatedStyle]}
        >
          <View className="flex-row justify-between items-center">
            <Text className="font-pmedium text-body-1 text-foreground dark:text-foreground-dark">
              {item.text}
            </Text>
          </View>
        </Animated.View>
      </GestureDetector>
    </>
  );
};

export default RenderListItem;
