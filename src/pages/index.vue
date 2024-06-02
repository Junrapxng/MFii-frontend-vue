<template>
<v-app>
    <NavBar />
    <v-main>
        <!-- Carousel Slide -->
        <Carousel :autoplay="4000" :wrap-around="true">
            <Slide v-for="img in images" :key="img.id">
                <div class="carousel__item">
                  <img :src="`${img.image}`" alt="test">
                </div>
            </Slide>
            <template #addons>
                <Pagination />
                <Navigation />
            </template>
        </Carousel>
        <!-- Carousel Slide -->

        <!-- Content -->
        <div v-for="data in info">
            {{ data.plant_name }}
        </div>

    </v-main>
    <Footer></Footer>
    <router-view></router-view>
</v-app>
</template>

<script>
import {
    defineComponent
} from 'vue'
import {
    Carousel,
    Navigation,
    Slide,
    Pagination
} from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import axios from 'axios';

export default defineComponent({
    name: 'index-page',
    data() {
        return {
            info: [],
            images: [],
             // Define info property here
        }
    },
    mounted() {
      this.fetchData();
    },
    methods:{
      fetchData() {
      // Fetch data from both APIs
      const api1Promise = axios.get('https://65fb5ab714650eb21009db19.mockapi.io/plant');
      const api2Promise = axios.get('https://65fb5ab714650eb21009db19.mockapi.io/todos');

      // Handle both responses simultaneously using Promise.all
      Promise.all([api1Promise, api2Promise])
        .then(([api1Response, api2Response]) => {
          this.info = api1Response.data;
          this.images = api2Response.data;
        })
        .catch(error => {
          this.error = error; // Handle errors
        });
    },
  },






  
    components: {
        Pagination,
        Carousel,
        Slide,
        Navigation,
    },
    // Remove the duplicate data declaration here
    // settings and breakpoints can go outside of data
    // settings: {
    //     itemsToShow: 1,
    //     snapAlign: 'center',
    // },
    breakpoints: {
        // 700px and up
        700: {
            itemsToShow: 3.5,
            snapAlign: 'center',
        },
        // 1024 and up
        1024: {
            itemsToShow: 5,
            snapAlign: 'start',
        },

    },
})
</script>

<style>

</style>
