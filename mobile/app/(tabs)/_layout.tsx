import React from 'react';
import { Redirect, Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@clerk/clerk-expo';

const TabsLayout = () => {
  const insets = useSafeAreaInsets();
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return null; // or a loading spinner

  if (!isSignedIn) return <Redirect href={'/sign-in'} />;
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1DA1F2',
        tabBarInactiveTintColor: '#657786',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#E1E8ED',
          height: 50 + insets.bottom,
          paddingTop: 8,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => (
            <Feather size={size} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => (
            <Feather size={size} name="search" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => (
            <Feather size={size} name="bell" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => (
            <Feather size={size} name="mail" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => (
            <Feather size={size} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
