import { Text } from 'react-native';
import SignOutButton from '../../components/SignOutButton';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserSync } from '@/hooks/useUserSync';

const HomeScreen = () => {
  useUserSync();
  return (
    <SafeAreaView className="flex-1">
      <Text>HomeScreen</Text>
      <SignOutButton />
    </SafeAreaView>
  );
};

export default HomeScreen;
