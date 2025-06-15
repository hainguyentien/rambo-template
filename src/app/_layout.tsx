import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { Suspense, useEffect } from 'react';
import 'react-native-reanimated';
import { QueryClientProvider } from '@tanstack/react-query';
import initI18n from '@/i18n/config';

import { lightTheme } from '@/theme';
import { ThemeProvider } from '@react-navigation/native';
import { queryClient } from '@/lib/react-query';
import { useColorScheme } from 'react-native';
import { AsyncFont } from '@/components/common/AsyncFont/AsyncFont';

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
  const colorScheme = useColorScheme();

  return (
    <Suspense fallback={<SplashFallback />}>
      {/* Load fonts in suspense */}
      <AsyncFont
        src={require('../assets/fonts/NunitoSans-Regular.ttf')}
        fontFamily="NunitoSans-Regular"
      />
      <AsyncFont
        src={require('../assets/fonts/NunitoSans-Bold.ttf')}
        fontFamily="NunitoSans-Bold"
      />
      <AsyncFont
        src={require('../assets/fonts/NunitoSans-SemiBold.ttf')}
        fontFamily="NunitoSans-SemiBold"
      />
      <AsyncFont
        src={require('../assets/fonts/NunitoSans-Italic.ttf')}
        fontFamily="NunitoSans-Italic"
      />
      <AsyncFont
        src={require('../assets/fonts/NunitoSans-BoldItalic.ttf')}
        fontFamily="NunitoSans-BoldItalic"
      />
      <AsyncFont
        src={require('../assets/fonts/NunitoSans-SemiBoldItalic.ttf')}
        fontFamily="NunitoSans-SemiBoldItalic"
      />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={lightTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </QueryClientProvider>
    </Suspense>
  );
}
