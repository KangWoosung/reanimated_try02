import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { faker } from "@faker-js/faker";
import Animated, {
  LinearTransition,
  useAnimatedStyle,
  useScrollViewOffset,
  withTiming,
} from "react-native-reanimated";
import RenderPersonItem, {
  PersonDataType,
} from "@/components/app/RenderPersonItem";
import { useAnimatedRef } from "react-native-reanimated";
import shadowStyle from "@/components/shadowStyle";
import { Ionicons } from "@expo/vector-icons";

faker.seed(10);

export const DATA = [...Array(30).keys()].map((_, i) => {
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

const PeopleIndex = () => {
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
    <View className="flex-1 bg-background dark:bg-background-dark ">
      <Animated.FlatList
        ref={scrollRef}
        data={items}
        renderItem={({ item }) => (
          <RenderPersonItem item={item} removeItem={removeItem} />
        )}
        keyExtractor={(item) => item.key}
        itemLayoutAnimation={LinearTransition.springify()}
        className="flex-1 gap-md p-md "
        // contentContainerClassName="flex-1 gap-md p-sm"
      />

      <Animated.View
        style={[animatedButtonStyle]}
        className="absolute bottom-2xl right-xl"
      >
        <TouchableOpacity
          onPress={scrollToTop}
          className="bg-background-tertiary dark:bg-background-tertiaryDark rounded-full p-sm"
          // style={shadowStyle.shadowThin}
        >
          <Ionicons name="arrow-up" size={24} color="white" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default PeopleIndex;
