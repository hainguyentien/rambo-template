import '@/theme/unistyles';

import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { Suspense, useEffect } from 'react';
import 'react-native-reanimated';
import { QueryClientProvider } from '@tanstack/react-query';
import initI18n, { i18n } from '@/i18n/config';

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { queryClient } from '@/lib/react-query';
import { AsyncFont } from '@/components/common/AsyncFont/AsyncFont';
import { useUnistyles } from 'react-native-unistyles';
import { useColorScheme } from 'react-native';
import { I18nProvider } from '@lingui/react';
import {
  Outfit_300Light,
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_600SemiBold,
  Outfit_700Bold,
} from '@expo-google-fonts/outfit';

initI18n();
SplashScreen.preventAutoHideAsync();

function SplashFallback() {
  useEffect(
    () => () => {
      SplashScreen.hideAsync();
    },
    []
  );
  return null;
}
export default function RootLayout() {
  const { theme } = useUnistyles();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const navTheme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme : DefaultTheme).colors,
      primary: theme.colors.primary,
      background: theme.colors.background,
      text: theme.colors.onBackground,
      card: theme.colors.background,
    },
  };

  return (
    <Suspense fallback={<SplashFallback />}>
      {/* Load fonts in suspense */}
      <AsyncFont src={Outfit_300Light} fontFamily="Outfit-Light" />
      <AsyncFont src={Outfit_400Regular} fontFamily={'Outfit-Regular'} />
      <AsyncFont src={Outfit_500Medium} fontFamily={'Outfit-Medium'} />
      <AsyncFont src={Outfit_600SemiBold} fontFamily={'Outfit-SemiBold'} />
      <AsyncFont src={Outfit_700Bold} fontFamily={'Outfit-Bold'} />
      <I18nProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider value={navTheme}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </QueryClientProvider>
      </I18nProvider>
    </Suspense>
  );
}
