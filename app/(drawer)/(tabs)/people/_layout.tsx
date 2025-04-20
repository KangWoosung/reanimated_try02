import React from "react";
import { Stack, useGlobalSearchParams } from "expo-router";
import DrawerIcon from "@/components/navigator/DrawerIcon";

const PeopleLayout = () => {
  const params = useGlobalSearchParams();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: "People",
          headerLeft: () => <DrawerIcon color="gray" size={24} />,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          headerTitle: params.name ? `${params.name}` : "People detail",
          headerBackTitle: "목록으로",
        }}
      />
    </Stack>
  );
};

export default PeopleLayout;
