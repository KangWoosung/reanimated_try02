import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  FlatList,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import Animated, {
  LinearTransition,
  FadeIn,
  FadeOut,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  interpolate,
} from "react-native-reanimated";
import shadowStyle from "@/components/shadowStyle";
import { Ionicons } from "@expo/vector-icons";
import RenderListItem, { Item } from "@/components/app/RenderListItem";
const initialItems: Item[] = new Array(20).fill(null).map((_, index) => ({
  id: (index + 1).toString(),
  text: `항목 ${index + 1}`,
}));

const AnimatedList = () => {
  const [items, setItems] = useState<Item[]>(initialItems);

  // 일반 useRef 사용
  const flatListRef = useRef<FlatList>(null);

  // 새 항목 추가
  const addItem = () => {
    // 모든 ID를 숫자로 변환한 후 최대값 찾기
    const maxId =
      items.length > 0
        ? Math.max(...items.map((item) => parseInt(item.id)))
        : 0;
    const newId = (maxId + 1).toString();
    setItems([...items, { id: newId, text: `항목 ${newId}` }]);
  };

  // 항목 제거
  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // 항목 랜덤 정렬
  const shuffleItems = () => {
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    setItems(shuffled);
  };

  const scrollToTop = () => {
    console.log("scrollToTop");
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  return (
    <View className="flex-1 bg-background dark:bg-background-dark p-md">
      <Text className="font-pbold text-h2 text-foreground dark:text-foreground-dark mb-lg">
        애니메이션 리스트
      </Text>

      <View className="flex-row mb-md">
        <Pressable
          className="bg-primary dark:bg-primary-dark rounded-md px-md py-sm mr-sm"
          onPress={addItem}
        >
          <Text className="font-pmedium text-foreground dark:text-foreground-dark">
            항목 추가
          </Text>
        </Pressable>

        <Pressable
          className="bg-secondary dark:bg-secondary-dark rounded-md px-md py-sm"
          onPress={shuffleItems}
        >
          <Text className="font-pmedium text-foreground dark:text-foreground-dark">
            순서 섞기
          </Text>
        </Pressable>
      </View>

      <Animated.FlatList
        ref={flatListRef}
        data={items}
        renderItem={({ item }) => (
          <RenderListItem item={item} removeItem={removeItem} />
        )}
        keyExtractor={(item) => item.id}
        itemLayoutAnimation={LinearTransition.springify()}
        className="flex-1"
      />

      <TouchableOpacity
        onPress={scrollToTop}
        className="bg-primary dark:bg-primary-dark rounded-full p-sm absolute bottom-8 right-8"
        style={shadowStyle.shadowThin}
      >
        <Ionicons name="arrow-up" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default AnimatedList;
