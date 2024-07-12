<template>
  <!-- News -->
  <v-container fluid class="flex" style="width: 90%">
    <v-carousel v-if="filteredImages.length" :key="carouselKey" class="Carousel" cycle show-arrows="hover"
      hide-delimiter-background height="370" :value="0">
      <v-carousel-item v-for="(path, index) in filteredImages" :key="index">
        <template v-if="path.linkImage && path.linkImage.length">
          <a v-for="(link, linkIndex) in path.linkImage" :key="`link-${linkIndex}`" :href="path.linkPage"
            target="_blank">
            <v-img class="carousel__item mx-auto" height="370" lazy-src="" :src="link" contain>
              <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular color="pink" indeterminate></v-progress-circular>
                </div>
              </template>
            </v-img>
          </a>
        </template>
        <template v-else-if="path.filePath && path.filePath.length">
          <a v-for="(file, fileIndex) in path.filePath" :key="`file-${fileIndex}`" :href="path.linkPage"
            target="_blank">
            <v-img class="carousel__item mx-auto" height="370" lazy-src="" :src="`${baseUrl}/${file}`" contain>
              <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular color="pink" indeterminate></v-progress-circular>
                </div>
              </template>
            </v-img>
          </a>
        </template>
      </v-carousel-item>

    </v-carousel>
  </v-container>


</template>

<script>
import { defineComponent } from "vue";
import { api, url } from "../axios";

export default defineComponent({
  name: "ImageCarousel",
  data() {
    return {
      images: [],
      baseUrl: url,
      carouselKey: 0,
    };
  },
  computed: {
    filteredImages() {
      return this.images.filter(
        (path) =>
          (path.linkImage && path.linkImage.length) ||
          (path.filePath && path.filePath.length)
      );
    },

    filteredVideos() {
      return this.images.filter(
        (item) => item.linkVideo && item.linkVideo.length > 0
      );
    },
  },
  async created() {
    this.Getnews();
  },
  methods: {
    async Getnews() {
      try {
        const response = await api.get("/getsNews");
        this.images = response.data.result;
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    },
  },
});
</script>

<style scoped>
@import "../styles/index.css";
</style>