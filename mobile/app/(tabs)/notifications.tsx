import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useNotifications } from '@/hooks/useNotification';
import { Feather } from '@expo/vector-icons';
import NoNotificationsFound from '@/components/NoNotificationsFound';
import { Notification } from '@/type';
import NotificationCard from '@/components/NotificationCard';

const NotificationScreen = () => {
  const {
    notifications,
    isLoading,
    refetch,
    error,
    isRefetching,
    deleteNotification,
    isDeletingNotification,
  } = useNotifications();
  const insets = useSafeAreaInsets();

  if (error) {
    return (
      <View className="flex-1 items-center justify-center p-8">
        <Text className="text-gray-500 mb-4">
          Failed to load notificationss
        </Text>
        <TouchableOpacity
          className="bg-blue-500 px-4 py-2 rounded-lg"
          onPress={() => refetch()}
        >
          <Text className="text-white font-semibold">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <View className="flex-row text-center justify-between px-4 py-3 border-b border-gray-100">
        <Text className="font-bold text-xl text-gray-900">Notifications</Text>
        <TouchableOpacity>
          <Feather name="settings" size={24} color="#657786" />
        </TouchableOpacity>
      </View>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 + insets.bottom }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor={'#1DA1F2'}
            colors={['#1DA1F2']}
          />
        }
      >
        {isLoading ? (
          <View className="flex-1 items-center justify-center p-8">
            <ActivityIndicator size="large" color="#1DA1F2" />
            <Text className="text-gray-500 mt-4">Loading notifications...</Text>
          </View>
        ) : notifications.length === 0 ? (
          <NoNotificationsFound />
        ) : (
          notifications.map((notification: Notification) => (
            <NotificationCard
              key={notification._id}
              notification={notification}
              onDelete={deleteNotification}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationScreen;
