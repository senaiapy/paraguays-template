/* eslint-disable unused-imports/no-unused-imports */
// Import  global CSS file
import '@/styles/global.css';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import {install} from 'react-native-quick-crypto';

import { APIProvider } from '@/api';
import { hydrateAuth, loadSelectedTheme } from '@/core';
import { useThemeConfig } from '@/core/use-theme-config';

install();

/*
import {
  Account,
  AccountCreated,
  AddNewCard,
  ChangeEmail,
  ChangePassword,
  ChangePersonalProfile,
  ConfirmPassword,
  CreatePassword,
  ForgotPassword,
  HelpCenter,
  History,
  Login,
  Notifications,
  Onboarding1,
  Onboarding2,
  Onboarding3,
  Pay,
  PhoneNumber,
  Profile,
  RequestMoney,
  ResetPassword,
  Send,
  SendMoneySuccess,
  Signup,
  Statistic,
  Topup,
  VerifyAccount,
  YourCard,
  YourSavings,
} from '@/screens/BANK'
*/
export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(app)',
};

hydrateAuth();
loadSelectedTheme();
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <Providers>
      <Stack>

        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen name="Onboarding1" options={{ headerShown: false }} /> 
        <Stack.Screen name="Onboarding2" options={{ headerShown: false }} />
        <Stack.Screen name="Onboarding3" options={{ headerShown: false }} />
        <Stack.Screen name="Account" options={{ headerShown: false }} />
        <Stack.Screen name="AccountCreated" options={{ headerShown: false }} />
        <Stack.Screen name="AddNewCard" options={{ headerShown: false }} />
        <Stack.Screen name="ChangeEmail" options={{ headerShown: false }} />
        <Stack.Screen name="ChangePassword" options={{ headerShown: false }} />
        <Stack.Screen name="ChangePersonalProfile" options={{ headerShown: false }} />
        <Stack.Screen name="ConfirmPassword" options={{ headerShown: false }} />
        <Stack.Screen name="CreatePassword" options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" options={{ headerShown: false }} />
        <Stack.Screen name="HelpCenter" options={{ headerShown: false }} />
        <Stack.Screen name="History" options={{ headerShown: false }} />
        <Stack.Screen name="Login" options={{ headerShown: false }} />
        <Stack.Screen name="Notifications" options={{ headerShown: false }} />
        <Stack.Screen name="Pay" options={{ headerShown: false }} />
        <Stack.Screen name="PhoneNumber" options={{ headerShown: false }} />
        <Stack.Screen name="Profile" options={{ headerShown: false }} />
        <Stack.Screen name="RequestMoney" options={{ headerShown: false }} />
        <Stack.Screen name="ResetPassword" options={{ headerShown: false }} />
        <Stack.Screen name="Send" options={{ headerShown: false }} />
        <Stack.Screen name="SendMoneySuccess" options={{ headerShown: false }} />
        <Stack.Screen name="Signup" options={{ headerShown: false }} />
        <Stack.Screen name="Statistic" options={{ headerShown: false }} />
        <Stack.Screen name="Topup" options={{ headerShown: false }} />
        <Stack.Screen name="VerifyAccount" options={{ headerShown: false }} />
        <Stack.Screen name="YourCard" options={{ headerShown: false }} />
        <Stack.Screen name="YourSavings" options={{ headerShown: false }} />
        <Stack.Screen name="Scanner" options={{ headerShown: false }} />

        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="LoginCore" options={{ headerShown: false }} />
      </Stack>
    </Providers>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  const theme = useThemeConfig();
  return (
    <GestureHandlerRootView
      style={styles.container}
      className={theme.dark ? `dark` : undefined}
    >
      <KeyboardProvider>
        <ThemeProvider value={theme}>
          <APIProvider>
            <BottomSheetModalProvider>
              {children}
              <FlashMessage position="top" />
            </BottomSheetModalProvider>
          </APIProvider>
        </ThemeProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
