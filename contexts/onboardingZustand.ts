/*
2025-03-28 10:35:44

Zustand 로 onboarding 전역상태 관리



    */

import { create } from "zustand";
import {
  ONBOARDING_STATE_DEFAULT,
  ONBOARDING_INDEX_DEFAULT,
} from "@/constants/constants";

export type OnboardingState = {
  onBoardingActive: boolean;
  setOnBoardingActive: (onBoardingActive: boolean) => void;

  onBoardingIndex: number;
  setOnBoardingIndex: (onBoardingIndex: number) => void;
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  onBoardingActive: ONBOARDING_STATE_DEFAULT,
  setOnBoardingActive: (onBoardingActive: boolean) => set({ onBoardingActive }),

  onBoardingIndex: ONBOARDING_INDEX_DEFAULT,
  setOnBoardingIndex: (onBoardingIndex: number) => set({ onBoardingIndex }),
}));
