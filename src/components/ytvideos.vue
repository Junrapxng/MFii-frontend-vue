<template>
     <!-- Video YouTube -->
     <div class="txt flex justify-center m-10">
      <h1 class="text-4xl font-bold">Success Case</h1>
    </div>
    <v-container fluid class="youtubeContainer">
      <v-carousel v-if="filteredVideos.length > 0" :key="carouselKey" class="myCarousel"
        height="500" :value="0">
        <v-carousel-item v-for="(item, index) in filteredVideos" :key="index">
          <v-sheet class="d-flex align-center justify-center" height="90%">
            <iframe class="video-iframe" :src="item.linkVideo" :title="item.title || `Video ${index + 1}`"
              frameborder="0" allowfullscreen></iframe>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </v-container>
</template>

<script>
import { api , url} from "../axios";
export default {
  name: 'ytVideos',
  data() {
      return {
        images: [],
        baseUrl: url,
        carouselKey: 0,
      };
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
    created(){
  this.Getnews();
    },

    computed: {
    filteredVideos() {
      return this.images.filter(
        (item) => item.linkVideo && item.linkVideo.length > 0
      );
    },
  }
  }


</script>

<style  scoped>
  @import "../styles/index.css";
</style>