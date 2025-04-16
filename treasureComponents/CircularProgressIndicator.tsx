/*
2025-03-21 10:52:07
This Component is using Reanimated SharedValue and RN-SVG for the SVG animation.
And using ReText for the text animation.

Usage:
import {useSharedValue, withTiming} from 'react-native-reanimated';

  const percentage = useSharedValue(0);

  const animate = (toValue: number) => {
    percentage.value = withTiming(toValue, {
      duration: 1000,
    });
  };

  <CircularProgressBar
    circleStyle={{
      strokeColor: "#c2ecff",
      strokeColorBg: "#64697d",
      strokeWidth: STROKE_WIDTH,
      radius: RADIUS,
    }}
    // fontSize will be calculated based on the radius
    textStyle={{
      fontColor: "gray",
    }}
    percentage={percentage}
  />

*/
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Svg, { Circle, Text as SVGText } from "react-native-svg";
import Animated, {
  SharedValue,
  useDerivedValue,
  useAnimatedProps,
  useAnimatedReaction,
} from "react-native-reanimated";
import { ReText } from "react-native-redash";

import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";

// 2025-03-21 17:52:01
// having problem with useAnimatedProps
// sorry for adding this...
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});

type CircleStyle = {
  strokeColor?: string;
  strokeColorBg?: string;
  strokeWidth: number;
  radius: number;
};
type TextStyle = {
  fontColor: string;
  fontVariant?: (
    | "small-caps"
    | "oldstyle-nums"
    | "lining-nums"
    | "tabular-nums"
    | "proportional-nums"
  )[];
};

type Props = {
  circleStyle: CircleStyle;
  textStyle: TextStyle;
  percentage: SharedValue<number>;
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgressBar = ({ circleStyle, textStyle, percentage }: Props) => {
  const { radius, strokeWidth, strokeColor, strokeColorBg } = circleStyle;
  const { fontColor, fontVariant } = textStyle;
  const innerRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * innerRadius;

  // radius를 기반으로 fontSize 계산 (원의 크기에 비례)
  const calculatedFontSize = radius * 0.4; // radius의 40% 정도로 설정

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference - (circumference * percentage.value) / 100,
    stroke: strokeColor ? strokeColor : "#c2ecff",
  }));

  // 퍼센트 텍스트
  const animatedText = useDerivedValue(() => {
    return `${Math.round(percentage.value)}%`;
  });

  // useAnimatedReaction(
  //   () => percentage.value,
  //   (value) => {
  //     console.log("percentage changed:", value);
  //   }
  // );

  return (
    <View
      className="flex-1 items-center justify-center"
      style={{ width: radius * 2, height: radius * 2 }}
    >
      <ReText
        text={animatedText}
        style={{
          fontSize: calculatedFontSize,
          color: fontColor,
          fontVariant: fontVariant as TextStyle["fontVariant"],
        }}
      />
      <Svg
        style={{ position: "absolute" }}
        width={radius * 2}
        height={radius * 2}
      >
        <Circle
          cx={radius}
          cy={radius}
          r={innerRadius}
          stroke={strokeColorBg ? strokeColorBg : "#333438"}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <AnimatedCircle
          cx={radius}
          cy={radius}
          r={innerRadius}
          animatedProps={animatedProps}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          // 시작 위치를 12시 방향으로 조정
          transform={`rotate(-90 ${radius} ${radius})`}
        />
      </Svg>
    </View>
  );
};

export default CircularProgressBar;
