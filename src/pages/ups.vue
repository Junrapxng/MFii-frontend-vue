<template>
    <v-app>
      <NavBar></NavBar>
  
      <v-main>
        <v-container class="font-noto-sans-thai text-gray-600">
          <h1 class="font-weight-medium text-3xl pb-4">ยกระดับงานวิจัยและนวัตกรรม Upscaling Innovation</h1>

        <!-- Carousel Slide -->
          <v-carousel
            height="500"
            show-arrows="hover"
            cycle
            hide-delimiter-background
          >
            <v-carousel-item v-for="(slide, i) in images" :key="i">
              <v-img 
                class="carousel__item mx-auto" 
                max-height="500" 
                lazy-src="" 
                :src="slide.image" 
                cover
                @loadstart="loading[i] = true"
                @load="loading[i] = false"
                @error="loading[i] = false"
              >
                <template v-slot:placeholder>
                  <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular color="pink" indeterminate></v-progress-circular>
                  </div>
                </template>
              </v-img>
              <div v-if="loading[i]" class="d-flex align-center justify-center fill-height">
                <v-progress-circular color="pink" indeterminate></v-progress-circular>
              </div>
            </v-carousel-item>
          </v-carousel>

           <!-- Youtube video -->
        <div class="txt flex justify-center mt-5">
            <p class="text-2xl font-bold mb-3"> Success Case</p>
        </div>

        <div class="youtube d-flex justify-center overflow-auto" >
            <iframe class="videos mx-5" height="260" width="450" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title=" &amp; Pagination part 5/7" frameborder="0" allowFullScreen></iframe>
            <iframe class="videos mx-5" height="260" width="450" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title=" &amp; Pagination part 5/7" frameborder="0" allowFullScreen></iframe>
        </div>
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
  