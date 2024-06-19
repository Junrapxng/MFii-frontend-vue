import { defineStore } from 'pinia';
import axios from 'axios';

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
      try {
        const response = await axios.get('http://localhost:7770/getUser', {
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
    },
    logout() {
      this.user = null;
      localStorage.removeItem('token');
    },
  },
});