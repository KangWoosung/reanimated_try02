/*
2025-04-18 07:51:58



*/

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  SharedValue,
  useSharedValue,
  withTiming,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import { useEffect } from "react";

// 스토어에서는 SharedValue의 타입 정의만 포함하고 실제 값은 컴포넌트에서 생성합니다
type ScrollState = {
  // 현재 공유 값들
  scrollY: SharedValue<number> | null;
  headerOpacity: SharedValue<number> | null;

  // 값 설정 함수
  setScrollY: (value: SharedValue<number>) => void;
  setHeaderOpacity: (value: SharedValue<number>) => void;
};

// 기본 스토어 - 훅을 사용하지 않고 일반 상태만 관리
export const useScrollStore = create<ScrollState>()((set) => ({
  scrollY: null,
  headerOpacity: null,

  setScrollY: (value: SharedValue<number>) => set({ scrollY: value }),
  setHeaderOpacity: (value: SharedValue<number>) =>
    set({ headerOpacity: value }),
}));

// 실제 컴포넌트에서 사용할 커스텀 훅
export function useScrollValues() {
  // 스토어에서 값과 설정 함수 가져오기
  const { scrollY, headerOpacity, setScrollY, setHeaderOpacity } =
    useScrollStore();

  // 컴포넌트 내에서 SharedValue 생성
  useEffect(() => {
    if (!scrollY) {
      const newScrollY = useSharedValue(0);
      setScrollY(newScrollY);
    }

    if (!headerOpacity) {
      const newHeaderOpacity = useSharedValue(1);
      setHeaderOpacity(newHeaderOpacity);
    }
  }, [scrollY, headerOpacity]);

  // 스크롤 핸들러 생성 - 컴포넌트 내에서만 호출 가능
  const createScrollHandler = () => {
    if (!scrollY || !headerOpacity) return null;

    return useAnimatedScrollHandler({
      onScroll: (event) => {
        const y = event.contentOffset.y;
        scrollY.value = y;

        // 스크롤 Y값이 300 이상이면 헤더 페이드아웃
        if (y > 300) {
          headerOpacity.value = withTiming(0, { duration: 200 });
        } else {
          headerOpacity.value = withTiming(1, { duration: 200 });
        }
      },
    });
  };

  return {
    scrollY,
    headerOpacity,
    createScrollHandler,
  };
}
