import { useApiClient } from '@/utils/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useNotifications = () => {
  const api = useApiClient();
  const queryClient = useQueryClient();

  const {
    data: notificationsData,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => api.get('/notifications'),
    select: (res) => res.data.notifications,
  });

  const deleteNotificationsMutation = useMutation({
    mutationFn: (notificationId: string) =>
      api.delete(`/notifications/${notificationId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
    onError: (error) => {
      console.error('Deleting notification failed', error);
    },
  });

  const deleteNotification = (notificationId: string) => {
    deleteNotificationsMutation.mutate(notificationId);
  };

  return {
    notifications: notificationsData || [],
    isLoading,
    refetch,
    error,
    isRefetching,
    deleteNotification,
    isDeletingNotification: deleteNotificationsMutation.isPending,
  };
};
