import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import shadowStyle from "@/components/shadowStyle";
import Animated, { FadeIn } from "react-native-reanimated";
import { useGlobalSearchParams } from "expo-router";

const PersonDetail = () => {
  const params = useGlobalSearchParams();

  return (
    <View>
      <Text>PersonDetail</Text>

      <Animated.View
        className="flex-row w-full 
    bg-background dark:bg-background-dark rounded-lg p-4 "
        style={shadowStyle.shadowThin}
        sharedTransitionTag={`person-${params.id}`}
        // entering={FadeIn.duration(200).delay(200 * Number(params.id))}
      >
        <Text>{params.name}</Text>
        <Image
          source={{ uri: params.image as string }}
          className="w-40 h-40 rounded-full"
        />
        <View className="">
          <Text className="text-lg font-bold">{params.name}</Text>
          <Text className="text-sm text-gray-500">{params.age} years old</Text>
          <Text className="text-sm text-gray-500">{params.gender}</Text>
        </View>
      </Animated.View>
    </View>
  );
};

export default PersonDetail;
