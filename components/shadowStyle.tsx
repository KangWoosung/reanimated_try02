/*
2025-04-18 05:11:25
Nativewind makes app crash when using shadowStyle... thnks Nativewind.


*/
import { StyleSheet } from "react-native";

const shadowStyle = StyleSheet.create({
  shadowThin: {
    shadowColor: "#ccc",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    elevation: 2,
  },
  shadowMedium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,

    elevation: 3,
  },
});
export default shadowStyle;
