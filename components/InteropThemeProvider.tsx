/*
2025-04-21 11:19:23

Ref:
https://github.com/nativewind/nativewind/issues/682

Usage:
 <InteropThemeProvider
      background="tw-text-background"
      border="tw-text-border"
      card="tw-text-card"
      notification="tw-text-background"
      primary="tw-text-primary"
      text="tw-text-foreground"
    >
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
</InteropThemeProvider>

...

Seems like this one requires Tailwind CSS 4.0.
Try this with next project.

*/
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useColorScheme, cssInterop } from "nativewind";

import type { Theme } from "@react-navigation/native";

import type { ReactNode } from "react";
import "@/app/styles/global.css";

const InteropThemeProvider = cssInterop(
  ({
    children,
    ...colors
  }: Theme["colors"] & { readonly children: ReactNode }) => {
    const { colorScheme } = useColorScheme();
    console.log("colorScheme on InteropThemeProvider", colorScheme);
    return (
      <ThemeProvider
        value={{
          dark: colorScheme === "dark",
          colors,
          fonts: DefaultTheme.fonts,
        }}
      >
        {children}
      </ThemeProvider>
    );
  },
  Object.fromEntries(
    Object.keys(DefaultTheme.colors).map((name) => [
      name,
      {
        target: name,
        nativeStyleToProp: {
          color: name,
        },
      },
    ])
  ) as {
    [K in keyof Theme["colors"]]: {
      target: K;
      nativeStyleToProp: {
        color: K;
      };
    };
  }
);

export default InteropThemeProvider;
