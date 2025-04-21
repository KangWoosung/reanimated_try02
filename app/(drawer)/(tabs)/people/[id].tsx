import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import shadowStyle from "@/components/shadowStyle";
import Animated, { FadeIn } from "react-native-reanimated";
import { useGlobalSearchParams } from "expo-router";

const PersonDetail = () => {
  const params = useGlobalSearchParams();

  return (
    <View className="flex-1 p-md bg-background dark:bg-background-dark">
      <View
        className="flex-col w-full 
    bg-background dark:bg-background-tertiaryDark rounded-lg p-4 gap-lg"
        style={shadowStyle.shadowThin}
        // sharedTransitionTag={`person-${params.id}`}
        // entering={FadeIn.duration(200).delay(200 * Number(params.id))}
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
    </View>
  );
};

export default PersonDetail;
