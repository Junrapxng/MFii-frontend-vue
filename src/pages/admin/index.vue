<!-- src/views/AdminPage.vue -->

<template>
  <admin-layout>
    <!-- Content for admin page goes here -->
    <v-container class="font-noto-sans-thai">
      
      <UserStatistics />
      <ResearchStatistics />

    </v-container>
  </admin-layout>
</template>

<script>
import AdminLayout from "@/layouts/admin.vue";
import UserStatistics from '@/pages/UserStatistics.vue'
import ResearchStatistics from '@/pages/ResearchStatistics.vue' 

export default {
  name: "Index-Admin-Page",
  components: {
    AdminLayout,
    UserStatistics,
    ResearchStatistics,
  },
};
</script>

<style scoped></style>