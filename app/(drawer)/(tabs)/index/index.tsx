import { View, Text } from "react-native";
import React from "react";
import { CurtainMaskTriggerButton } from "@/components/app/CurtainMaskTriggerButton";
import { useColorScheme } from "nativewind";
const index = () => {
  const { colorScheme } = useColorScheme();
  return (
    <View
      collapsable={false}
      className="flex-1 items-center justify-center gap-md bg-background dark:bg-background-dark"
    >
      <Text className="text-2xl font-bold text-foreground dark:text-foreground-dark">
        index
      </Text>

      <CurtainMaskTriggerButton />
      <Text className="text-xl text-foreground dark:text-foreground-dark">
        {colorScheme}
      </Text>
    </View>
  );
};

export default index;
