import { useApiClient, userApi } from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useCurrentUser } from './useCurrentUser';
import { Alert } from 'react-native';
import { TProfileFormData } from '@/type';

export const useProfile = () => {
  const api = useApiClient();
  const queryClient = useQueryClient();
  const { currentUser } = useCurrentUser();

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [formData, setFormData] = useState<TProfileFormData>({
    firstName: '',
    lastName: '',
    bio: '',
    location: '',
  });

  const updateProfileMutation = useMutation({
    mutationFn: (profileData: TProfileFormData) =>
      userApi.updateProfile(api, profileData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
      setIsEditModalVisible(false);
      Alert.alert('Success', 'Profile updated successfully');
    },
    onError: (error: any) => {
      Alert.alert(
        'Error',
        error.respocse?.data?.error || 'Failed to update profile'
      );
    },
  });

  const openEditModal = () => {
    if (currentUser) {
      setFormData({
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        bio: currentUser.bio || '',
        location: currentUser.location || '',
      });
    }
    setIsEditModalVisible(true);
  };

  const updateFormField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return {
    isEditModalVisible,
    formData,
    openEditModal,
    closeEditModal: () => setIsEditModalVisible(false),
    saveProfile: () => updateProfileMutation.mutate(formData),
    updateFormField,
    isUpdating: updateProfileMutation.isPending,
    refetch: () => queryClient.invalidateQueries({ queryKey: ['authUser'] }),
  };
};
