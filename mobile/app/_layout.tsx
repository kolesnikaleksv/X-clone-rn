import { Stack } from 'expo-router';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { ClerkProvider } from '@clerk/clerk-expo';

import '../global.css';

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
    </ClerkProvider>
  );
}
