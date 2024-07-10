<template>
  <v-app>
    <NavBar></NavBar>
    <main>
      <v-container class="font-noto-sans-thai text-gray-600 mt-10">
          <h1 class="font-weight-medium text-3xl pb-4">ยกระดับงานวิจัยและนวัตกรรม Upscaling Innovation</h1>
        <News/>        
        <Ytvideos/>        
      </v-container>
    </main>
    <FooTer></FooTer>
  </v-app>

</template>

<script>
 import FooTer from '@/components/Footer.vue';
 import NavBar from '@/components/NavBar.vue';
import News from '@/components/News.vue';
import Ytvideos from '@/components/ytvideos.vue';
export default {
  name: "Upscaling-Innovation-page",
  components: {
    FooTer,
    NavBar,
    News,
    Ytvideos
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped></style>