## 2025-03-17 06:14:12
## Init Project
npx create-expo-app@latest . --template default

## Tailwind CSS & Reanimated
## Mind the newest versions command string in officials at:
## https://www.nativewind.dev/getting-started/installation
npx expo install nativewind tailwindcss@^3.4.17 react-native-reanimated@3.16.2 react-native-safe-area-context

## config Tailwind
npx tailwindcss init
## Wait for user input
echo "Edit Tailwind config files as instructed and press Enter to continue..."
read
## Edit config files as below
## https://until.blog/@ganymedian/-1--react-native-%EC%A4%80%EB%B9%84%EC%9E%91%EC%97%85#79caf909-a753-432a-9116-26a716041601

## Tailwind-Merge & clsx & Class Varience Authority 
npx expo install tailwindcss clsx 
npx expo install tailwind-merge
## 2025-03-17 07:49:57
## cva install occurs an error with npx
npm install class-varience-authority 

## Reanimated
## Installed with Nativewind already. In case not, install with below command.
## npx expo install react-native-reanimated react-native-safe-area-context

## Edit config files as below
## https://www.notion.so/gunymedian/5-Reanimated-Native-APIs-140fc37aff268019960ff5c4b5b3ca4d?pvs=97#1b3fc37aff2680e8b550dbcb3a6576e3

## Wait for user input
echo "Edit Reanimated config files as instructed and press Enter to continue..."
read

## Gesture Handler
npx expo install react-native-gesture-handler

## Gorhom Bottom Sheet
npx expo install @gorhom/bottom-sheet@^5

## Zustand
npx expo install zustand

## Zod
npx expo install zod

## Tanstack Query
npx expo install @tanstack/react-query

## MMKV
npx expo install react-native-mmkv

## RNR Primitives
npx expo install @rn-primitives/slot
npx expo install @rn-primitives/types
npx expo install @rn-primitives/utils
npx expo install @rn-primitives/portal
npx expo install @rn-primitives/hooks

## 2025-03-21 11:12:52
npx expo install react-native-svg

## 2025-03-21 16:52:48
npx expo install react-native-redash

## 2025-04-04 19:57:15
npx expo install expo-font

## 2025-04-06 17:33:55
npx expo install expo-status-bar

## 2025-04-14 22:34:10
npx expo install @clerk/clerk-expo

## 2025-04-14 22:39:52
npx expo install expo-secure-store

## 2025-04-16 00:46:47
npx expo install @react-navigation/drawer

## 2025-04-16 08:25:43
npx expo install expo-image

## 2025-04-16 15:23:00
npx expo install @faker-js/faker

## 2025-04-22 05:25:51
npx expo install @shopify/react-native-skia

## 2025-04-22 05:27:00
npx expo install @shopify/restyle

## 2025-04-28 10:17:40
npx expo install expo-zustand-persist

## 2025-04-28 10:19:39
npx expo install @react-native-async-storage/async-storage


## Wait for user input
echo "Press Enter if you are ready to start ..."
read

## clear the cache
npx expo start -c

## prebuild 
npx expo prebuild

## build
# npx expo run:android
# npx expo run:ios




