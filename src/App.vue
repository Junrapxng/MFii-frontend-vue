<template>
  <v-app>
    <v-main>
      <index />
      <router-view />
      <cookie-consent />
    </v-main>
  </v-app>
</template>

<script setup>
import { useUserStore } from './stores/user';
import CookieConsent from './components/CookieConsent.vue';
const userStore = useUserStore();
userStore.fetchUser();



</script>

