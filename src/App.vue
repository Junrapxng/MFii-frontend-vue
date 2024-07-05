<template>
  <v-app>
    <v-main>
      <index />
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { useUserStore } from './stores/user';
const userStore = useUserStore();
userStore.fetchUser();

</script>

