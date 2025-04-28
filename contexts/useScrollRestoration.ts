/*
2025-04-28 10:12:07
Store Scroll Position to AsyncStorage via expo-zustand-persist.

2025-04-28 10:42:38
Removed persist

*/

// 스크롤 위치 저장

import { create } from "zustand";
import { createJSONStorage, persist } from "expo-zustand-persist";
// AsynStorage
// AsyncStorage 의 지원이 끊김에 따라, 임포트 위치가 바뀌었습니다.
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ScrollRestorationState {
  scrollPosition: number;
  setScrollPosition: (position: number) => void;
}
// create & persist 로 바꿔주고, 온로딩에 복원해주도록 하면 되겠다.
const useScrollRestoration = create<ScrollRestorationState>((set) => ({
  scrollPosition: 0,
  setScrollPosition: (position) => set({ scrollPosition: position }),
}));

// persist removed 2025-04-28 10:44:16
// const useScrollRestoration = create<ScrollRestorationState>()(
//   persist(
//     (set) => ({
//       scrollPosition: 0,
//       setScrollPosition: (position) => set({ scrollPosition: position }),
//     }),
//     {
//       name: "scroll-restoration",
//       storage: createJSONStorage(() => AsyncStorage), // Storage 의 종류 지정
//     }
//   )
// );

export default useScrollRestoration;
