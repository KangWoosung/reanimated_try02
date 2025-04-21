import { View, Text } from "react-native";
import React from "react";

const index = () => {
  return (
    <View className="flex-1 items-center justify-center bg-background dark:bg-background-dark">
      <Text className="text-2xl font-bold text-foreground dark:text-foreground-dark">
        index
      </Text>
    </View>
  );
};

export default index;
