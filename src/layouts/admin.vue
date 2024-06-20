<template>
  <v-app>
    <!-- sidebar -->
    <v-navigation-drawer app class="bg-stone-200">
      <div class="d-flex justify-center mt-4 mb-4">
        <a href="/admin">
          <v-img src="../assets/mfu_logo.png" width="240px"></v-img>
        </a>
      </div>
      <v-list dense>
        <v-list-item link to="/admin">
          <v-list-item-icon>
            <v-icon class="mr-2">mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="inline">Dashboard</v-list-item-title>
        </v-list-item>

        <v-list-item link to="/admin/userManage">
          <v-list-item-icon>
            <v-icon class="mr-2">mdi-account-group</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="inline">User Management</v-list-item-title>
        </v-list-item>

        <v-list-item link to="/admin/documents">
          <v-list-item-icon>
            <v-icon class="mr-2">mdi-file-document-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="inline">Documents</v-list-item-title>
        </v-list-item>
      </v-list>

      <!-- logout -->
      <template #append>
        <div class="pa-4 d-flex justify-center">
       
            <v-btn class="primary--text" @click="logout()" rounded>
              <v-icon class="primary--text mr-2">mdi-logout</v-icon>Logout
            </v-btn>
  
        </div>
      </template>
    </v-navigation-drawer>

    <!-- navbar -->
    <v-app-bar app>
      <v-toolbar-title>MFii Admin Panel</v-toolbar-title>
      <v-divider class="border-opacity-100 mx-3 my-2" vertical></v-divider>

      <!-- <v-row align="center" class="pa-0 ma-0"> -->
      <v-col cols="auto">

        <v-avatar size="36px">
          <v-img alt="Avatar" src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"></v-img>
        </v-avatar>

      </v-col>

      <v-col class="hidden-xs-only" cols="auto">
        <div class="d-flex flex-column  mr-2">
          <span class="title">{{ user.email }}</span>
          <span class="subtitle text-xs">{{ user.role }}</span>
        </div>

      </v-col>
      <!-- </v-row> -->

    </v-app-bar>

    <v-main>
      <!-- Main content goes here -->
      <!-- This is where your admin page content will be displayed -->
      <slot></slot>
    </v-main>
  </v-app>
</template>

<script>

import axios from 'axios';

export default {
  name: "AdminLayout",
  data: () => ({
    messages: [
      {
        avatar: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
        name: "John Leider",
      },
    ],

    user: [],

  }),

  async created() {
    try {
      const response = await axios.get('http://localhost:7770/getUser', {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      this.user = response.data.resutl;
      console.log(response.data.resutl)
    } catch (error) {
      console.log(error)
    }
  },
  methods:{
    logout() {
      this.user = null;
      localStorage.removeItem('token');
      window.location.reload();
    },
  }
};


</script>

<style scoped>
/* Add custom styles for your layout */
</style>
