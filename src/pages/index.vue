<template>
<v-app>
    <NavBar />
    <v-main>
    <main>
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
        <div class="inputSearch">
            <input type="text" placeholder="Search something...">
            <button class="button" type="submit">Search</button>
        </div>
        <div class="wrap">
            <div class="grid-container">
            <div class="item" v-for="data in info">
                <img :src="`${data.img}`" alt="Cannot load Image">
                <h4>{{ data.plant_name }}</h4>
                <p>{{ data.avatar }}</p>
            </div>
        </div>
        </div>
    </main>
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
    // Fetch data from API =================================================================
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            // Fetch data from both APIs
            const api1Promise = axios.get('https://65fb5ab714650eb21009db19.mockapi.io/plant'); // data
            const api2Promise = axios.get('https://65fb5ab714650eb21009db19.mockapi.io/todos'); // image banner

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
// ======================================================================================
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
.wrap{
    display: flex;
    justify-content: center;
}
.grid-container{
    display: flex;
  flex-direction: row;
  max-width: 90%; /* Set your desired maximum width */
  overflow: auto;
  max-height: 100%;
}
img{
    min-width: 15rem;
}
.item{
    margin: 10px
}
.item:hover{
    cursor: pointer;
    background-color: gainsboro;
}
input[type=text] {
  border: none;
  border-bottom: 2px solid red;
  margin-left: 2%
 
}
input:focus{
    outline: none;
}
.button {
    margin-left: 2%;
  background-color: white;
  color: black;
  border: 2px solid #3c8af1; /* Green */
  transition-duration: 0.4s;
  padding: 6px;
  border-radius: 20%;
}
.button:hover {
  background-color: #3c8af1; /* Green */
  color: white;
}
</style>
