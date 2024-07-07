<template>
  <v-app>
    <NavBar></NavBar>
    <main>
      <v-container fluid class="mt-10">
        <NewsAndVideo></NewsAndVideo>
      </v-container>
    </main>
    <FooTer></FooTer>
  </v-app>

</template>

<script>
import FooTer from '@/components/Footer.vue';
import NavBar from '@/components/NavBar.vue';
import NewsAndVideo from '@/components/NewsAndVideo.vue';

export default {
  name: "Upscaling-Innovation-page",
  components: {
    FooTer,
    NavBar,
    NewsAndVideo
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped></style>