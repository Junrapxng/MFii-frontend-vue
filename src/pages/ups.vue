<template>
  <v-app>
    <NavBar></NavBar>
    <main>
      <v-container class="font-noto-sans-thai text-gray-600 mt-10">
          <h1 class="font-weight-medium text-3xl pb-4">ยกระดับงานวิจัยและนวัตกรรม Upscaling Innovation</h1>
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