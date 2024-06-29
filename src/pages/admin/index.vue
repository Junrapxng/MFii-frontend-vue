<!-- src/views/AdminPage.vue -->

<template>
  <admin-layout>
    <!-- Content for admin page goes here -->
    <v-container class="font-noto-sans-thai">
      
      <UserStatistics />
      <ResearchStatistics />


    </v-container>

    <div class="text-center">
        <v-snackbar v-model="snackbar.show" :color="snackbar.color" vertical>
          <div class="text-subtitle-1 pb-2"></div>
          <p>{{ snackbar.message }}</p>
          <template v-slot:actions>
            <v-btn color="white" variant="text" @click="snackbar.show = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </div>

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