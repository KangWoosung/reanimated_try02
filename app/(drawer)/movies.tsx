/*
2025-04-16 16:34:59

https://randomuser.me/api/portraits/women/31.jpg
https://randomuser.me/api/portraits/men/31.jpg


*/
import { StyleSheet, Image, Platform, View, Text } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";

import { faker } from "@faker-js/faker";
import { ScrollView } from "react-native-gesture-handler";

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
  return (
    <ScrollView className="flex-1 p-4 gap-8 bg-background-secondary dark:bg-background-dark">
      <View className="flex-1 gap-4">
        {DATA.map((item) => (
          <View
            key={item.key}
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
            <View className="flex-1 gap-1 ">
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
        ))}
      </View>
    </ScrollView>
  );
}
