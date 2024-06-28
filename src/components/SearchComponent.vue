<!-- src/views/SearchPage.vue -->
<template>
    <v-text-field
      v-model="searchQuery"
      label="ค้นหา"
      density="comfortable"
      prepend-inner-icon="mdi-magnify"
      style="max-width: 270px"
      variant="solo"
      clearable
      hide-details
      rounded
      class="py-3"
      @input="updateSearchQuery"
    ></v-text-field>
    <v-card v-show="searchQuery" style="max-width: 250px">
      <v-list>
        <template v-if="filteredPages.length">
          <v-list-item
            v-for="page in filteredPages"
            :key="page.path"
            @click="navigateToPage(page.path)"
          >
            <v-list-item-title>{{ page.name }}</v-list-item-title>
          </v-list-item>
        </template>
        <template v-else>
          <v-list-item>
            <v-list-item-title>ไม่พบผลลัพธ์</v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </v-card>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  import { usePageStore } from "@/store/search";
  import { useRouter } from "vue-router";
  
  const pageStore = usePageStore();
  const router = useRouter();
  const searchQuery = ref(pageStore.searchQuery);
  
  const updateSearchQuery = () => {
    pageStore.setSearchQuery(searchQuery.value);
  };
  
  const filteredPages = computed(() => pageStore.filteredPages);
  
  const navigateToPage = (path) => {
    router.push(path);
  };
  </script>
  
  <style scoped>
  /* เพิ่มสไตล์ตามต้องการ */
  </style>