<template>
    <v-combobox
      v-model="searchQuery"
      label="ค้นหา"
      :items="filteredPages.map(page => page.name)"
      item-text="name"
      item-value="path"
      density="comfortable"
      prepend-inner-icon="mdi-magnify"
      style="max-width: 270px"
      variant="solo"
      clearable
      hide-details
      rounded
      class="py-3"
      no-data-text="ไม่พบผลลัพธ์"
      @input="updateSearchQuery"
      @keydown.enter="navigateToFirstResult"
    ></v-combobox>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  import { usePageStore } from "@/store/search";
  import { useRouter } from "vue-router";
  
  const pageStore = usePageStore();
  const router = useRouter();
  const searchQuery = ref(pageStore.searchQuery);
  
  const updateSearchQuery = (event) => {
    pageStore.setSearchQuery(event.target.value);
  };
  
  const filteredPages = computed(() => pageStore.filteredPages);
  
  const navigateToFirstResult = () => {
    if (filteredPages.value.length > 0) {
      router.push(filteredPages.value[0].path);
    }
  };
  </script>
  