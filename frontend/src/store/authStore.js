import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { getApiBaseUrl } from '@/config/apiBase';

const API_URL = getApiBaseUrl();

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      profile: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Login
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${API_URL}/auth/login`, {
            email,
            password,
          });

          const { token, user } = response.data;

          // Set token in axios defaults
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          // Get user profile
          const profileResponse = await axios.get(`${API_URL}/auth/me`);
          
          set({
            user: profileResponse.data.data.user,
            profile: profileResponse.data.data.profile,
            token,
            isAuthenticated: true,
            isLoading: false,
          });

          return true;
        } catch (error) {
          let msg;
          if (!error.response) {
            msg =
              'Không kết nối được máy chủ API. Hãy chạy backend (port 5000) và thử lại; khi mở web bằng IP LAN không dùng localhost trong VITE_API_URL — để trống hoặc /api.';
          } else {
            const raw = error.response?.data?.error;
            msg = Array.isArray(raw) ? raw.join(', ') : raw || 'Đăng nhập thất bại';
          }
          set({
            error: msg,
            isLoading: false,
          });
          return false;
        }
      },

      // Register
      register: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${API_URL}/auth/register`, data);
          const { token, user } = response.data;

          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          // Get user profile
          const profileResponse = await axios.get(`${API_URL}/auth/me`);

          set({
            user: profileResponse.data.data.user,
            profile: profileResponse.data.data.profile,
            token,
            isAuthenticated: true,
            isLoading: false,
          });

          return true;
        } catch (error) {
          const raw = error.response?.data?.error;
          const msg = Array.isArray(raw) ? raw.join(', ') : raw || 'Registration failed';
          set({
            error: msg,
            isLoading: false,
          });
          return false;
        }
      },

      // Logout
      logout: () => {
        delete axios.defaults.headers.common['Authorization'];
        set({
          user: null,
          profile: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      // Update profile
      updateProfile: (profile) => {
        set({ profile });
      },

      // Initialize from stored token
      initialize: async () => {
        const { token } = get();
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          try {
            const response = await axios.get(`${API_URL}/auth/me`);
            set({
              user: response.data.data.user,
              profile: response.data.data.profile,
              isAuthenticated: true,
            });
          } catch (error) {
            // Token invalid, logout
            get().logout();
          }
        }
      },

      // Clear error
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        profile: state.profile,
      }),
    }
  )
);

export default useAuthStore;
