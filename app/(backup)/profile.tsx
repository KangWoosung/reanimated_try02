import { StyleSheet, Image, Platform, View, Text } from "react-native";
import Animated, {
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { faker } from "@faker-js/faker";
import {
  ScrollView,
  TouchableOpacity,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import { useState, useRef, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
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

const AVATAR_SIZE = 70;

export default function TabTwoScreen() {
  const [items, setItems] = useState(DATA);
  const openItemRef = useRef<string | null>(null);
  const listItemsRef = useRef<{ [key: string]: () => void }>({});

  const handleDelete = (key: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.key !== key));
    if (openItemRef.current === key) {
      openItemRef.current = null;
    }
  };

  const registerItem = useCallback((key: string, closeFunction: () => void) => {
    listItemsRef.current[key] = closeFunction;
  }, []);

  const closeOtherItems = useCallback((currentKey: string) => {
    if (openItemRef.current && openItemRef.current !== currentKey) {
      const closeFunction = listItemsRef.current[openItemRef.current];
      if (closeFunction) {
        closeFunction();
      }
    }
    openItemRef.current = currentKey;
  }, []);

  return (
    <ScrollView className="flex-1 p-4 gap-8 bg-background-secondary dark:bg-background-dark">
      <Animated.View
        layout={LinearTransition.springify().damping(10).stiffness(100)}
        className="flex-1 gap-4"
      >
        {items.map((item) => (
          <ListItem
            key={item.key}
            item={item}
            handleDelete={handleDelete}
            registerItem={registerItem}
            closeOtherItems={closeOtherItems}
          />
        ))}
      </Animated.View>
    </ScrollView>
  );
}

const ListItem = ({
  item,
  handleDelete,
  registerItem,
  closeOtherItems,
}: {
  item: (typeof DATA)[0];
  handleDelete: (key: string) => void;
  registerItem: (key: string, closeFunction: () => void) => void;
  closeOtherItems: (currentKey: string) => void;
}) => {
  const translateX = useSharedValue(0);
  const isDeleting = useSharedValue(false);
  const buttonVisible = useSharedValue(false);

  const closeItem = useCallback(() => {
    translateX.value = withSpring(0);
    buttonVisible.value = false;
  }, []);

  // 컴포넌트 마운트 시 이 항목의 close 함수를 등록
  useRef(() => {
    registerItem(item.key, closeItem);
  }).current();

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (isDeleting.value) return;

      // 삭제 버튼이 이미 보이는 상태
      if (buttonVisible.value) {
        // 오른쪽으로 스와이프하면 0부터 -100 사이로 설정 (삭제 버튼이 닫히는 방향)
        translateX.value = Math.max(
          -100,
          Math.min(0, -100 + event.translationX)
        );
      } else {
        // 삭제 버튼이 보이지 않는 상태에서 왼쪽으로 스와이프
        translateX.value = Math.min(0, event.translationX);
      }
    })
    .onEnd((event) => {
      // 삭제 버튼이 이미 보이는 상태에서
      if (buttonVisible.value) {
        // 오른쪽으로 충분히 스와이프했으면 닫기
        if (event.translationX > 50) {
          closeItem();
        } else {
          // 아니면 다시 삭제 버튼 보이게 유지
          translateX.value = withSpring(-100);
        }
      } else {
        // 왼쪽으로 충분히 스와이프했으면 삭제 버튼 보이기
        if (event.translationX < -50) {
          // 다른 열린 항목 닫기
          closeOtherItems(item.key);
          translateX.value = withSpring(-100);
          buttonVisible.value = true;
        } else {
          // 아니면 원위치
          translateX.value = withSpring(0);
        }
      }
    });

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const deleteButtonStyle = useAnimatedStyle(() => ({
    width: Math.abs(Math.min(-100, translateX.value)),
  }));

  const onDelete = () => {
    isDeleting.value = true;
    translateX.value = withTiming(-1000, { duration: 300 });
    setTimeout(() => handleDelete(item.key), 100);
  };

  return (
    <Animated.View
      layout={LinearTransition.springify().damping(10).stiffness(100)}
    >
      <View className="relative">
        <Animated.View
          className="absolute right-0 top-0 bottom-0 b
          g-background-tertiary dark:bg-background-tertiaryDark 
          flex items-center justify-center"
          style={deleteButtonStyle}
        >
          <TouchableOpacity
            onPress={onDelete}
            className="w-full h-full items-center justify-center"
          >
            <Ionicons name="trash-outline" size={24} color="red" />
          </TouchableOpacity>
        </Animated.View>

        <GestureDetector gesture={panGesture}>
          <Animated.View style={rStyle}>
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
          </Animated.View>
        </GestureDetector>
      </View>
    </Animated.View>
  );
};
