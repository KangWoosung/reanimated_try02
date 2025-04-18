/*
2025-04-16 16:34:59

https://randomuser.me/api/portraits/women/31.jpg
https://randomuser.me/api/portraits/men/31.jpg

*/
import {
  StyleSheet,
  Image,
  Platform,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Animated, {
  LinearTransition,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  withTiming,
  runOnJS,
} from "react-native-reanimated";

import { faker } from "@faker-js/faker";
import { useRef, useState, useEffect } from "react";
import RenderPersonItem from "@/components/app/RenderPersonItem";
import shadowStyle from "@/components/shadowStyle";
import { Ionicons } from "@expo/vector-icons";
import { PersonDataType } from "@/components/app/RenderPersonItem";
import { Stack } from "expo-router";
import { AnimatedScrollView } from "react-native-reanimated/lib/typescript/component/ScrollView";

faker.seed(10);

const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key: faker.string.uuid(),
    image: `https://randomuser.me/api/portraits/${faker.helpers.arrayElement([
      "women",
      "men",
    ])}/${faker.number.int({ min: 1, max: 60 })}.jpg`,
    name: faker.person.fullName(),
    jobTitle: faker.person.jobTitle(),
    email: faker.internet.email(),
  };
});
const initialItems = DATA;

export default function TabTwoScreen() {
  const [items, setItems] = useState<PersonDataType[]>(initialItems);

  // useAnimatedRef
  const scrollRef = useAnimatedRef<Animated.FlatList<PersonDataType>>();
  const scrollOffset = useScrollViewOffset(scrollRef as any);

  // Top Button Animated Style
  const animatedButtonStyle = useAnimatedStyle(() => {
    const opacity = scrollOffset.value > 300 ? 1 : 0;

    return {
      opacity: withTiming(opacity, { duration: 300 }),
      transform: [
        {
          scale: withTiming(opacity, { duration: 300 }),
        },
      ],
    };
  });

  // Header Animated Style
  const animatedHeaderStyle = useAnimatedStyle(() => {
    const opacity = scrollOffset.value > 300 ? 1 : 0;

    return {
      opacity: withTiming(opacity, { duration: 300 }),
    };
  });

  // Remove Item
  const removeItem = (key: string) => {
    setItems(items.filter((item) => item.key !== key));
    // Add server code if needed
    // ...
  };

  // Scroll to top
  const scrollToTop = () => {
    scrollRef.current?.scrollToIndex({ index: 0, animated: true });
  };

  return (
    <View className="flex-1 bg-background dark:bg-background-dark">
      <Animated.FlatList
        ref={scrollRef}
        data={items}
        renderItem={({ item }) => (
          <RenderPersonItem item={item} removeItem={removeItem} />
        )}
        keyExtractor={(item) => item.key}
        itemLayoutAnimation={LinearTransition.springify()}
        className="flex-1 gap-md p-md"
        contentContainerClassName="gap-md"
      />

      <Animated.View
        style={[animatedButtonStyle]}
        className="absolute bottom-2xl right-xl"
      >
        <TouchableOpacity
          onPress={scrollToTop}
          className="bg-background-tertiary dark:bg-background-tertiaryDark rounded-full p-sm"
          style={shadowStyle.shadowThin}
        >
          <Ionicons name="arrow-up" size={24} color="white" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

/* 

        {items.map((item, index) => (
          <RenderPersonItem
            item={item}
            removeItem={removeItem}
            key={item.key} // index 대신 고유 키 사용
            className="relative gap-md mb-md"
          />
        ))}

data={items}
        renderItem={({ item }) => (
          <RenderPersonItem item={item} removeItem={removeItem} />
        )}
        keyExtractor={(item) => item.key}
        itemLayoutAnimation={LinearTransition.springify()}
        contentContainerClassName="gap-md  p-md" */
/*
<Animated.View className="flex-1 gap-4">
        {items.map((item) => (
          <Animated.View
            key={item.key}
            layout={LinearTransition.springify().damping(10).stiffness(100)}
          >
            <Swipeable
              renderRightActions={() => renderRightActions(item.key)}
              friction={2}
              rightThreshold={40}
            >
              <View
                className="flex-row gap-4 items-center p-4 
                border border-gray-200 bg-background-blank dark:bg-background-secondaryDark
                drop-shadow-lg rounded-lg"
              >
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: AVATAR_SIZE,
                    height: AVATAR_SIZE,
                    borderRadius: AVATAR_SIZE / 2,
                  }}
                />
                <View className="flex-1 gap-1">
                  <Text className="text-lg font-bold text-foreground dark:text-foregroundDark">
                    {item.name}
                  </Text>
                  <Text className="text-sm text-tertiary dark:text-tertiaryDark">
                    {item.jobTitle}
                  </Text>
                  <Text className="text-sm text-success-hoverDark dark:text-hover">
                    {item.email}
                  </Text>
                </View>
              </View>
            </Swipeable>
          </Animated.View>
        ))}
      </Animated.View>

*/
