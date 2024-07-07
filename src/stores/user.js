import { defineStore } from 'pinia';
import {api} from '@/axios';
export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    loading: false,
    error: null,
  }),
  getters: {
    isAdmin: (state) => state.user?.resutl.role === 'admin',
    isUser: (state) => state.user?.resutl.role === 'user',

  },
  actions: {
    async fetchUser() {
      this.loading = true;
      this.error = null;
      if(localStorage.getItem('token')){
        try {
          const response = await api.get('/getUser', {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          });
          this.user = response.data;
        } catch (error) {
          this.error = error;
        } finally {
          this.loading = false;
        }
      }
    },
    logout() {
      this.user = null;
      localStorage.removeItem('token');
      window.location.reload();
    },
  },
});