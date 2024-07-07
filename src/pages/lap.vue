<template>
  <v-app>
    <NavBar></NavBar>

    <v-main>
      <v-container class="font-noto-sans-thai text-gray-600">
        <h1 class="font-weight-medium text-3xl pb-4">ขั้นตอนการขออนุญาตใช้สิทธิ IP Licensing Process</h1>

        <v-img :aspect-ratio="1" class="bg-white" src="../assets/lap_info.png" max-height="700" contain></v-img>

      </v-container>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import { ref, onMounted } from "vue";
import { fetchProducts } from "@/components/scripts/fetchAllProducts";

export default {
  name: "Upscaling-Innovation-page",
  setup() {
    const images = ref([]);
    const loading = ref([]);
    const error = ref(null);

    onMounted(async () => {
      try {
        const result = await fetchProducts();
        images.value = result.images || [];
        loading.value = new Array(images.value.length).fill(true);
      } catch (err) {
        error.value = err;
      }
    });

    return {
      images,
      loading,
      error,
    };
  },
};
</script>

<style scoped></style>