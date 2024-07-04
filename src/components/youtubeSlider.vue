<template>
    <div class="txt flex justify-center">
        <h1 class="text-2xl font-bold mb-3">Success Case</h1>
    </div>
    <v-container fluid style="width: 70%">
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
export default {
    name: 'Youtube-slider',
    data() {
        return {

            news: []
        }
    },
    created: {
       async getNews() {
          try {
            const response =  await api.get("/getsNews")
            this.news = response.data.result;
          } catch (error) {
            console.log(error);
          }
        }
    },

    computed: {
        filteredVideos() {
            return this.news.filter(item => item.linkVideo && item.linkVideo.length > 0);
        },

    },
}
</script>

<style lang="scss" scoped></style>