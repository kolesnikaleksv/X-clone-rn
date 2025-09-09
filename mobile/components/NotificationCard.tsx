import { View, Text, Alert, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { NotificationCardProps } from '@/type';
import { Feather } from '@expo/vector-icons';
import { formatDate } from '@/utils/formatters';

const NotificationCard = ({
  notification,
  onDelete,
}: NotificationCardProps) => {
  const getNotificationText = () => {
    const name = `${notification.from.firstName} ${notification.from.lastName}`;
    switch (notification.type) {
      case 'like':
        return `${name} like you post`;
      case 'comment':
        return `${name} comment on yor post`;
      case 'follow':
        return `${name} starting following you`;
      default:
        return '';
    }
  };

  const getNotificationIcon = () => {
    switch (notification.type) {
      case 'like':
        return <Feather name="heart" size={20} color="#E0245E" />;
      case 'comment':
        return <Feather name="message-circle" size={20} color="#1DA1F2" />;

      case 'follow':
        return <Feather name="user-plus" size={20} color="#17BF63" />;

      default:
        return <Feather name="bell" size={20} color="#657786" />;
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete notification',
      'Are you sure you want to delete this notification?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => notification?._id ?? onDelete(notification._id),
        },
      ]
    );
  };
  return (
    <View className="border-b border-gray-100 bg-white">
      <View className="flex-row p-4">
        <View className="relative mr-3 h-12">
          <Image
            source={{ uri: notification.from.profilePicture }}
            className="size-12 rounded-full"
          />
          <View className="absolute -bottom-1 -right-1 size-6 bg-white items-center justify-center">
            {getNotificationIcon()}
          </View>
        </View>
        <View className="flex-1">
          <View className="flex-row justify-between items-start mb-1">
            <View className="flex-1">
              <Text className="text-gray-900 text-base leading-5 mb-1">
                <Text className="font-semibold">
                  {notification.from.firstName} {notification.from.lastName}
                </Text>
                {'\n'}
                <Text className="text-gray-500">
                  @{notification.from.username}
                </Text>
              </Text>
              <Text className="text-gray-500 text-sm font-bold mb-2">
                {getNotificationText()}
              </Text>
            </View>
            <TouchableOpacity
              className="ml-2 p-1"
              onPress={() => handleDelete()}
            >
              <Feather name="trash" size={16} color="#E0245E" />
            </TouchableOpacity>
          </View>
          {notification.post && (
            <View className="bg-gray-50 rounded-lg p-3 mb-2">
              <Text className="text-gray-700 text-sm mb-1" numberOfLines={3}>
                {notification.post.content}
              </Text>
              {notification.post.image && (
                <Image
                  source={{ uri: notification.post.image }}
                  className="w-full h-32 rounded-lg mt-2"
                  resizeMode="cover"
                />
              )}
            </View>
          )}
          {notification.comment && (
            <View className="bg-blue-50 rounded-lg p-3 mb-2">
              <Text className="text-gray-600 text-xs mb-1">Comment:</Text>
              <Text className="text-gray-700 text-sm" numberOfLines={2}>
                &ldquo;{notification.comment.content}&ldquo;
              </Text>
            </View>
          )}
          <Text className="text-gray-400 text-xs">
            {formatDate(notification.createdAt)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default NotificationCard;
