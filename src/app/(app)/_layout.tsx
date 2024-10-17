/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable max-lines-per-function */
/* eslint-disable react/no-unstable-nested-components */
import { Link, Redirect, SplashScreen, Tabs } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';

import { useAuth, useIsFirstTime } from '@/core';
import { Pressable, Text } from '@/ui';
import {
  Feed as FeedIcon,
  Home as HomeIcon,
  Rate as RateIcon,
  Settings as SettingsIcon,
  Style as StyleIcon,
} from '@/ui/icons';

let onlyOne = false;
export default function TabLayout() {
  const status = useAuth.use.status();
  const [isFirstTime] = useIsFirstTime();
  const [isLogin, setIsLogin] = useState(false);

  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);
  useEffect(() => {
    if (status !== 'idle') {
      setTimeout(() => {
        hideSplash();
      }, 1000);
    }
  }, [hideSplash, status]);

  if (isFirstTime) {
    return <Redirect href="/Onboarding1" />;
  } 

  if (status === 'signOut' || !onlyOne) {
    if (!onlyOne) {
      onlyOne = true;
     // return <Redirect href="/Login" />;
    }
  }
  
  return (
    <Tabs>
      {/* 
      <Tabs.Screen
        name="index"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color }) => <FeedIcon color={color} />,
          headerRight: () => <CreateNewPostLink />,
          tabBarTestID: 'feed-tab',
        }}
      />
      <Tabs.Screen
        name="style"
        options={{
          title: 'Style',
          headerShown: false,
          tabBarIcon: ({ color }) => <StyleIcon color={color} />,
          tabBarTestID: 'style-tab',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerShown: false,
          tabBarIcon: ({ color }) => <SettingsIcon color={color} />,
          tabBarTestID: 'settings-tab',
        }}
      />
      */}

      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          headerShown: false,
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
          headerRight: () => <CreateNewPostLink />,
          tabBarTestID: 'feed-tab',
        }}
      />
      <Tabs.Screen
        name="History"
        options={{
          title: 'Historial',
          headerShown: false,
          tabBarIcon: ({ color }) => <FeedIcon color={color} />,
          tabBarTestID: 'style-tab',
        }}
      />
      <Tabs.Screen
        name="Statistic"
        options={{
          title: 'Statistica',
          headerShown: false,
          tabBarIcon: ({ color }) => <RateIcon color={color} />,
          tabBarTestID: 'style-tab',
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Perfil',
          headerShown: false,
          tabBarIcon: ({ color }) => <StyleIcon color={color} />,
          tabBarTestID: 'style-tab',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Adjustes',
          headerShown: false,
          tabBarIcon: ({ color }) => <SettingsIcon color={color} />,
          tabBarTestID: 'settings-tab',
        }}
      />
      
    </Tabs>
  );
}

const CreateNewPostLink = () => {
  return (
    <Link href="/feed/add-post" asChild>
      <Pressable>
        <Text className="text-primary-300 px-3">Create</Text>
      </Pressable>
    </Link>
  );
};
