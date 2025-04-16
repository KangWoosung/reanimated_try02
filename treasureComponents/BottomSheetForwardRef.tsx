/*
2025-03-19 11:40:21

Usage:

<BottomSheetForwardRef
  defaultIndex={-1}
  ref={bottomSheetRef}
  backgroundColor={"white"}
>
  <View>
    <Text>Hello</Text>
  </View>
</BottomSheetForwardRef>

*/
import { View, StyleSheet, TouchableOpacity } from "react-native";
import React, { forwardRef, useState, MutableRefObject } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";

export type Ref = BottomSheet;

type Props = {
  children: React.ReactNode;
  defaultIndex?: number;
  snapPoints?: string[];
  backgroundColor?: string;
};

const BottomSheetForwardRef = forwardRef<Ref, Props>(
  (
    {
      children,
      defaultIndex = -1,
      snapPoints = ["25%", "50%", "70%"],
      backgroundColor,
    },
    ref
  ) => {
    // 추후, Keyboard API 를 사용해 키보드 상태를 관리할 수 있도록 수정

    // 현재 BottomSheet의 index를 추적하기 위한 state 추가
    const [currentIndex, setCurrentIndex] = useState(defaultIndex);

    const close = () => {
      (ref as MutableRefObject<Ref>).current?.close();
    };

    return (
      <BottomSheet
        ref={ref}
        snapPoints={snapPoints}
        index={defaultIndex}
        detached
        enablePanDownToClose
        animateOnMount
        backgroundStyle={{ backgroundColor: backgroundColor }}
      >
        <BottomSheetView className="flex-1 overflow-hidden">
          <View className="flex-1 overflow-hidden">{children}</View>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

export default BottomSheetForwardRef;

const CloseBtn = ({
  className,
  close,
}: {
  className: string;
  close: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={close}
      className={`${className} p-2 rounded-full bg-white/10`}
    >
      <Ionicons name="close" size={24} color="#fff" />
    </TouchableOpacity>
  );
};
