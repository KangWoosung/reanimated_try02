// /utils/calculateMaxRadius.ts
import { Dimensions } from "react-native";
import { vec, dist } from "@shopify/react-native-skia";

const { width, height } = Dimensions.get("screen");
export const corners = [
  vec(0, 0),
  vec(width, 0),
  vec(width, height),
  vec(0, height),
];

export const calculateMaxRadius = (x: number, y: number): number => {
  return Math.max(...corners.map((corner) => dist(corner, { x, y })));
};
