<template>
    <v-app>
        <NavBar />
        <v-main>

            <Carousel class="carousel" :autoplay="4000" :wrap-around="true">
                <Slide v-for="img in images" :key="img.id">
                    <v-img class="carousel__item mx-auto" max-height="500" lazy-src="" :src="`${img.image}`" cover>
                        <template v-slot:placeholder>
                            <div class="d-flex align-center justify-center fill-height">
                                <v-progress-circular color="pink" indeterminate></v-progress-circular>
                            </div>
                        </template>
                    </v-img>
                </Slide>
                <template #addons>
                    <Pagination />
                    <Navigation />
                </template>
            </Carousel>
            <!-- Carousel Slide -->

            <!-- Youtube video -->
            <div class="txt flex justify-center mt-5 ">
                <p class="text-2xl font-bold mb-3"> Success Case
                <h1 v-if="userinfo">Hello, {{ userinfo.data.resutl.email }}</h1>
                </p>
            </div>
            <v-container>
                <v-carousel cycle hide-delimiters height="400">
                    <v-carousel-item v-for="(video, index) in videos" :key="index">
                        <v-sheet class="d-flex align-center justify-center" height="100%" elevation="10">
                            <iframe class="video-iframe" :src="video.src" :title="video.title" frameborder="0"
                                allowfullscreen></iframe>
                        </v-sheet>
                    </v-carousel-item>
                </v-carousel>
            </v-container>
            <!-- Content -->

            <div class="inputSearch ml-10">
                <p class="text-2xl font-bold mb-3">นวัตกรรมทั้งหมด</p>
                <v-text-field v-model="search" density="comfortable" placeholder="Search"
                    prepend-inner-icon="mdi-magnify" style="max-width: 300px" variant="solo" clearable
                    @click:clear="clearSearch" hide-details class="pb-6"></v-text-field>
            </div>
            <div class="wrap">
                <div class="card-container">
                    <v-skeleton-loader v-if="loading" v-for="i in 10" class="item mx-1 border" min-width="344"
                        type="image, article"></v-skeleton-loader>
                    <router-link v-else v-for="data in filteredItems" :key="data.id || data.plant_name"
                        :to="{ name: 'Innovation', params: { id: data.id } }" class="item mx-1">
                        <v-card class="hover:shadow-lg transition-shadow rounded-xl">
                            <v-img :src="data.img" cover height="200px" width="400px">
                                <template v-slot:placeholder>
                                    <div class="d-flex align-center justify-center fill-height">
                                        <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                                    </div>
                                </template>
                            </v-img>
                            <v-card-title class="text-lg">{{ data.plant_name }}</v-card-title>
                            <v-card-subtitle class="text-sm">{{ data.avatar }}</v-card-subtitle>
                            <v-card-actions>
                                <v-chip class="ml-4" outlined>{{ data.scale }}</v-chip>
                            </v-card-actions>
                        </v-card>
                    </router-link>
                </div>
            </div>
        </v-main>
        <Footer></Footer>
        <router-view></router-view>
    </v-app>
</template>

<script>
import {
    defineComponent, ref,
    onMounted
} from "vue";
import {
    Carousel,
    Navigation,
    Slide,
    Pagination
} from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import {
    fetchProducts
} from "@/components/scripts/fetchAllProducts";
import axios from "axios";

export default defineComponent({
    name: "index-page",
    data() {
        return {
            search: '',
            userId: ref(null),
            userinfo: ref(null),
            videos: [
                {
                    src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                    title: '1',
                },
                {
                    src: 'https://www.youtube.com/embed/pz-BkqRVrQ8',
                    title: '2',
                },
            ],
            // Define info property here
        };
    },
    async created() {
        try {
            const response = await axios.get('http://localhost:7770/verify', {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            // console.log('Full response:', response);
            this.userId = response.data.result.userId,
                console.log(this.userId) // Log the full response to inspect it
            // Adjust the following line based on the actual structure of your response
            this.userinfo = await axios.get(`http://localhost:7770/getUser/${this.userId}`)
            console.log(this.userinfo)

            // await this.fetchAdditionalData();
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    },
    // fetch API ======================================================================
    setup() {
        const info = ref(null);
        const images = ref(null);
        const error = ref(null);
        const loading = ref(true);

        onMounted(async () => {
            const result = await fetchProducts();
            info.value = result.info || [];
            images.value = result.images || [];
            error.value = result.error;
            loading.value = false;
        });
        return {
            info,
            images,
            error,
            loading,
        };
    },
    // ====================================================================================

    computed: {
        // กรองรายการโดยใช้การค้นหา
        filteredItems() {
            return this.info.filter(item => {
                return item.plant_name.toLowerCase().includes(this.search.toLowerCase());
            });
        }
    },
    methods: {
        clearSearch() {
            this.search = '';
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
            snapAlign: "center",
        },
        // 1024 and up
        1024: {
            itemsToShow: 5,
            snapAlign: "start",
        },
    },

});
</script>

<style scoped>
@import '../styles/index.css';

</style>
