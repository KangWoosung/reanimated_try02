/*
2025-04-21 10:03:15

** Dark mode masked overlay transition

Following the instruction from 
https://www.youtube.com/watch?v=vKYEFpO06Tk&ab_channel=WilliamCandillon

// Step 0: Mark the transition active
circle.value = { x, y, r};
dispatch({
    active: true,
});

// Step 1: Take view snapshot
const overlay1 = await makeImageFromView(ref);

// Step 2: wait for overlay to be displayed
// and switch to dark mode
await wait(10);
dispatch({
    colorScheme: newColorScheme,
})

// Step 3: Take new view snapshot
const overlay2 = await makeImageFromView(ref);

// Step 4: animate transition
transition.value = withTiming(1, { duration: 1000 });

// Step 5: mark as inactive
dispatch({
    active: false,
    overlay1: null,
    overlay2: null,
});

내 환경과 좀 다른게.. Nativewind 가 사용되지 않고 있다. 
내 스텝을 정리해보자..
1. Nativewind Dark Theme toggler 를 Drawer 에 추가한다. 
2. Dark Theme className 들 모두 점검


*/
import { View, Text } from "react-native";
import React from "react";

const index = () => {
  return (
    <View>
      <Text>ind ex</Text>
    </View>
  );
};

export default index;
