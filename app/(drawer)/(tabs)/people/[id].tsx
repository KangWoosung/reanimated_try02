import { View, Text, Pressable, Image, ScrollView } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import shadowStyle from "@/components/shadowStyle";
import { useFocusEffect, useGlobalSearchParams } from "expo-router";
import { useIsFocused } from "@react-navigation/native";

const PersonDetail = () => {
  const params = useGlobalSearchParams();
  const [shouldHide, setShouldHide] = useState(false);

  useFocusEffect(() => {
    setShouldHide(false);
    return () => {
      setShouldHide(true);
    };
  });

  // Restore scroll position when the screen is focused back.
  const scrollRef = useRef<ScrollView>(null);

  // const isFocused = useIsFocused();
  // useEffect(() => {
  //   if (isFocused) {
  //     scrollRef.current?.scrollTo({ y: 0, animated: true });
  //   }
  // }, [isFocused]);

  return shouldHide ? (
    <View className="flex-1 p-md bg-background dark:bg-background-dark"></View>
  ) : (
    <ScrollView
      ref={scrollRef}
      className="flex-1 p-md bg-background dark:bg-background-dark"
    >
      <View
        className="flex-col w-full 
      bg-background dark:bg-background-tertiaryDark rounded-lg p-4 gap-lg"
        style={shadowStyle.shadowThin}
      >
        <View className="flex-row gap-md">
          <Image
            source={{ uri: params.image as string }}
            className="w-40 h-40 rounded-full"
          />
          <View className="gap-sm justify-center">
            <Text className="text-lg font-bold text-foreground dark:text-foreground-dark  ">
              {params.name}
            </Text>
            <Text className="text-sm text-foreground-tertiary dark:text-foreground-dark">
              {params.jobTitle}
            </Text>
            <Text className="text-sm text-foreground-tertiary dark:text-foreground-dark">
              {params.email}
            </Text>
          </View>
        </View>
        <View className="flex-row gap-md">
          <Pressable className="bg-primary rounded-full p-sm">
            <Text className="text-sm text-foreground-dark">Edit</Text>
          </Pressable>
          <Pressable className="bg-primary rounded-full p-sm">
            <Text className="text-sm text-foreground-dark">Edit</Text>
          </Pressable>
        </View>
        <View className="flex-row gap-md">
          <Text className="text-lg text-foreground-tertiary dark:text-foreground-dark">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quisquam, quos.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default PersonDetail;
