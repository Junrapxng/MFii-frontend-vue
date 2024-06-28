// src/stores/pageStore.js
import { defineStore } from 'pinia';

export const usePageStore = defineStore('pageStore', {
  state: () => ({
    pages: [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
      { name: 'Contact', path: '/contact' },
      // เพิ่มรายการหน้าที่คุณต้องการ
    ],
    searchQuery: '',
  }),
  getters: {
    filteredPages: (state) => {
      if (state.searchQuery) {
        return state.pages.filter(page =>
          page.name.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
      }
      return state.pages;
    },
  },
  actions: {
    setSearchQuery(query) {
      this.searchQuery = query;
    },
  },
});
