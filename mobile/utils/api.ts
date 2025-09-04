import axios, { AxiosInstance } from 'axios';
import { useAuth } from '@clerk/clerk-expo';
import { ProfileData } from '@/type';

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  'https://x-clone-rn-one-delta.vercel.app/api';

export const createApiClient = (
  getToken: () => Promise<string | null>
): AxiosInstance => {
  const api = axios.create({ baseURL: API_BASE_URL });

  api.interceptors.request.use(async (config) => {
    const token = await getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return api;
};

export const useApiClient = (): AxiosInstance => {
  const { getToken } = useAuth();

  return createApiClient(getToken);
};

export const userApi = {
  syncUser: (api: AxiosInstance) => api.post('/users/sync'),
  getCurrentUser: (api: AxiosInstance) => api.get('/users/me'),
  updateProfile: (api: AxiosInstance, data: ProfileData) =>
    api.put('/users/profile', data),
};
