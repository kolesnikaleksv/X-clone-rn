import { View, Text, Button } from 'react-native';
import React from 'react';
import { useClerk, useAuth } from '@clerk/clerk-expo';
import { Redirect } from 'expo-router';

const HomeScreen = () => {
  const { signOut } = useClerk();
  const { isSignedIn } = useAuth();
  if (!isSignedIn) {
    return <Redirect href={'/(auth)/sign-in'} />;
  }

  return (
    <View>
      <Text>HomeScreen</Text>
      <Button onPress={() => signOut()} title="Logout"></Button>
    </View>
  );
};

export default HomeScreen;
