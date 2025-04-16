import { View, Text } from "react-native";
import React, { forwardRef } from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";

type Props = {
  children: React.ReactNode;
  defaultIndex?: number;
  backgroundColor?: string;
};

const BottomSheetModalForwardRef = forwardRef<BottomSheetModal, Props>(
  ({ children, defaultIndex = -1, backgroundColor = "white" }: Props, ref) => {
    return (
      <View>
        {/* <BottomSheetModal
          ref={ref}
          index={defaultIndex}
          backgroundStyle={{ backgroundColor }}
        >
          <BottomSheetView style={{ backgroundColor }}>
            {children}
          </BottomSheetView>
        </BottomSheetModal> */}
      </View>
    );
  }
);

// BottomSheetModalForwardRef.displayName = "BottomSheetModalForwardRef";

export default BottomSheetModalForwardRef;
