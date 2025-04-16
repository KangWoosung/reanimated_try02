import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image as ImageExpo } from "expo-image";

import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { useOnboardingStore } from "@/contexts/onboardingZustand";
import { MMKV } from "react-native-mmkv";
import { ONBOARDING_FLAG } from "@/constants/constants";
import { Link, router, useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
// import Header from "../_components/Header";
import { useFonts } from "expo-font";
import { useThemeProvider } from "@/contexts/NativewindThemeProvider";
const { width: WIDTH } = Dimensions.get("window");

export default function HomeScreen() {
  const navigation = useNavigation();
  const { setOnBoardingActive } = useOnboardingStore();

  const onToggleDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const storage = new MMKV();

  const animDegreeSharedValue = useSharedValue(0);

  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${animDegreeSharedValue.value}deg` }],
    };
  });

  const { nativewindColorScheme, nativeWindSetTheme } = useThemeProvider();

  return (
    <ScrollView className="flex-1 gap-8 bg-background dark:bg-background-dark">
      <View
        className="flex-row items-center justify-center
            bg-background dark:bg-background-dark"
      >
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </View>
      <View className="flex flex-row items-center justify-center gap-4 p-8">
        <TouchableOpacity
          className="items-center justify-center bg-primary dark:bg-primary-dark rounded-2xl"
          onPress={() => {
            setOnBoardingActive(true);
            storage.set(ONBOARDING_FLAG, false);
          }}
        >
          <Text
            className=" p-4 px-6 rounded-2xl text-lg font-bold w-full 
              text-foreground dark:text-foreground-dark"
          >
            Onboarding Activate
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex flex-row items-center justify-center gap-4 my-4">
        <Link
          href="../(screens)/Chat"
          className="text-white bg-slate-500 p-4 px-6 rounded-2xl flex-row items-center gap-2"
        >
          <Text className="font-pblack text-2xl text-foreground dark:text-foreground-dark">
            Chat..
          </Text>
        </Link>
      </View>

      <Text className="font-pblack text-3xl text-secondary-200 dark:text-secondary-200">
        Font Style test1
      </Text>
      <Text className="font-pblack text-2xl text-secondary-200 dark:text-secondary-200">
        Font Style test2
      </Text>

      {/* <ActivityIndicator size="large" color="#00ff00" /> */}

      <View className="flex-1">
        <View className="flex flex-col items-center justify-center gap-4">
          <View className="flex flex-row items-center justify-center gap-4">
            <TouchableOpacity
              className="flex flex-row items-center justify-center gap-4"
              onPress={() => {
                animDegreeSharedValue.value = withSpring(100);
              }}
            >
              <Text
                className="p-4 px-6 rounded-2xl text-lg font-bold
                   bg-secondary dark:bg-secondary-dark 
                   text-foreground dark:text-foreground-dark
                  "
              >
                Animate!
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex flex-row items-center justify-center gap-4
                   bg-secondary dark:bg-secondary-dark 
                   text-foreground dark:text-foreground-dark"
              onPress={() => {
                animDegreeSharedValue.value = withSpring(0);
              }}
            >
              <Text className=" p-4 px-6 rounded-2xl text-lg font-bold">
                Stop!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex flex-col items-center justify-center gap-4 my-16 bg-background dark:bg-background-dark">
          <Animated.Image
            source={require("@/assets/images/3659792.png")}
            style={[
              {
                width: WIDTH * 0.5,
                height: WIDTH * 0.5,
              },
              animatedImageStyle,
            ]}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
