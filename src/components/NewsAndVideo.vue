<template>
    <!-- News -->
    <v-container fluid class="flex" style="width: 90%">
      <v-carousel v-if="filteredImages.length" :key="carouselKey" class="Carousel" cycle show-arrows="hover"
        hide-delimiter-background height="370" :value="0">
        <v-carousel-item v-for="(path, index) in filteredImages" :key="index">
          <template v-if="path.linkImage && path.linkImage.length">
            <v-img v-for="(link, linkIndex) in path.linkImage" :key="`link-${linkIndex}`"
              class="carousel__item mx-auto" height="370" lazy-src="" :src="link" contain>
              <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular color="pink" indeterminate></v-progress-circular>
                </div>
              </template>
            </v-img>
          </template>
          <template v-else-if="path.filePath && path.filePath.length">
            <v-img v-for="(file, fileIndex) in path.filePath" :key="`file-${fileIndex}`"
              class="carousel__item mx-auto" height="370" lazy-src="" :src="`${baseUrl}/${file}`" contain>
              <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular color="pink" indeterminate></v-progress-circular>
                </div>
              </template>
            </v-img>
          </template>
        </v-carousel-item>
      </v-carousel>
    </v-container>

    <!-- Video YouTube -->
    <div class="txt flex justify-center">
      <h1 class="text-2xl font-bold mb-3">Success Case</h1>
    </div>
    <v-container fluid class="youtubeContainer">
      <v-carousel v-if="filteredVideos.length > 0" :key="carouselKey" class="myCarousel" hide-delimiter-background
        height="400" :value="0">
        <v-carousel-item v-for="(item, index) in filteredVideos" :key="index">
          <v-sheet class="d-flex align-center justify-center" height="100%" elevation="10">
            <iframe class="video-iframe" :src="item.linkVideo" :title="item.title || `Video ${index + 1}`"
              frameborder="0" allowfullscreen></iframe>
          </v-sheet>
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
  