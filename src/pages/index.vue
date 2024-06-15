<template>
    <v-app>
        <NavBar />
        <v-main class="bg-gray-100 font-noto-sans-thai">
            <!-- Carousel Slide -->
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




            <!-- Youtube video -->
            <div class="txt flex justify-center">
                <h1 v-if="userinfo">Hello, {{ userinfo.data.resutl.email }}</h1>
                <h1 v-if="!userinfo">You are not logged in</h1>
            </div>
            <div class="txt flex justify-center">
                <h1 class="text-2xl font-bold mb-3"> Success Case
                </h1>
            </div>

            <v-container>
                <v-carousel class="myCarousel" cycle hide-delimiters height="400">
                    <v-carousel-item v-for="(video, index) in videos" :key="index" >
                        <v-sheet class="d-flex align-center justify-center bg-gray-100" height="100%" elevation="10">
                            <iframe class="video-iframe" :src="video.src" :title="video.title" frameborder="0"
                                allowfullscreen></iframe>
                        </v-sheet>
                    </v-carousel-item>
                </v-carousel>
            </v-container>




            <!-- Content -->

            <v-container class="pt-4">
                <h1 class="pb-4" style="font-weight: 600; font-size: 35px">ผลงานทั้งหมด</h1>
                <!-- Filters Section -->
                <v-row class="mb-4">
                    <v-col>
                        <v-card class="rounded-lg p-4">
                            <v-btn v-for="filter in filters" :key="filter.text"
                                class="m-2 rounded-s-xl rounded-e-md text-white justify-start items-center" outlined
                                :color="filter.color" style="height: 45px; width: 220px;">
                                <v-icon left class="px-4 ">{{ filter.icon }}</v-icon>
                                {{ filter.text }}
                            </v-btn>
                        </v-card>
                    </v-col>
                </v-row>
                <v-text-field v-model="search" density="comfortable" placeholder="Search"
                    prepend-inner-icon="mdi-magnify" style="max-width: 300px;" variant="solo" clearable
                    @click:clear="clearSearch" hide-details class="pb-6"></v-text-field>

                <!-- Cards Section -->
                <v-row>
                    <v-col v-for="(item, index) in paginatedItems" :key="index" cols="12" sm="6" md="3">
                      
                        <router-link :to="{ name: 'Innovation', params: { id: item.id } }">
                            <v-card class="hover:shadow-lg transition-shadow rounded-xl">
                                <v-img :src="item.img" cover height="200px"><template v-slot:placeholder>
                                        <div class="d-flex align-center justify-center fill-height">
                                            <v-progress-circular color="grey" indeterminate></v-progress-circular>
                                        </div>
                                    </template></v-img>
                                <v-card-title class="text-lg">{{ item.plant_name }}</v-card-title>
                                <v-card-subtitle class="text-sm">{{ item.avatar }}</v-card-subtitle>
                                <v-card-actions>
                                    <v-chip class="ml-4" outlined>{{ item.scale }}</v-chip>
                                </v-card-actions>
                            </v-card>
                        </router-link>
                    </v-col>
                </v-row>

                <!-- Pagination -->
                <v-pagination v-model="currentPage" :length="totalPages" class="pt-6" @input="paginate"></v-pagination>

            </v-container>
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
            info: [],
            images: [],
            loading: true,
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
            filters: [
                { text: 'ดูทั้งหมด', color: 'primary', icon: 'mdi-menu' },
                { text: 'IOT', color: 'blue', icon: 'mdi-earth' },
                { text: 'Rubber', color: 'green', icon: 'mdi-leaf' },
                { text: 'Health', color: 'red', icon: 'mdi-hospital-box' },
                { text: 'Food', color: 'yellow', icon: 'mdi-food' },
                { text: 'Energy', color: 'cyan', icon: 'mdi-flash' },
                { text: 'other', color: 'purple', icon: 'mdi-dots-horizontal' },
                { text: 'Agri', color: 'orange', icon: 'mdi-sprout' }
            ],
            currentPage: 1,
            itemsPerPage: 8
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
    // setup() {
    //     const info = ref(null);
    //     const images = ref(null);
    //     const error = ref(null);
    //     const loading = ref(true);

    //     onMounted(async () => {
    //         const result = await fetchProducts();
    //         info.value = result.info || [];
    //         images.value = result.images || [];
    //         error.value = result.error;
    //         loading.value = false;
    //     });
    //     return {
    //         info,
    //         images,
    //         error,
    //         loading,
    //     };
    // },
    // ====================================================================================
    async mounted() {
        try {
            const [api1Response, api2Response] = await Promise.all([
                axios.get("https://65fb5ab714650eb21009db19.mockapi.io/plant"),
                axios.get("https://65fb5ab714650eb21009db19.mockapi.io/todos"),
            ]);

            if (api1Response.status === 200 && api2Response.status === 200) {
                this.info = api1Response.data;
                this.images = api2Response.data;
            } else {
                this.error = new Error("One or both API responses are not OK");
                console.error("API responses:", api1Response.status, api2Response.status);
            }
        } catch (error) {
            this.error = error;
            console.error("Error fetching data:", error);
        } finally {
            this.loading = false;
        }
    },
    computed: {
        // คำนวณจำนวนหน้าทั้งหมด
        totalPages() {
            return Math.ceil(this.filteredItems.length / this.itemsPerPage);
        },
        // กรองรายการโดยใช้การค้นหาและหน้าที่กำหนด
        paginatedItems() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.filteredItems.slice(startIndex, endIndex);
        },
        // กรองรายการโดยใช้การค้นหา
        filteredItems() {
            return this.info.filter(item => {
                return item.plant_name.toLowerCase().includes(this.search.toLowerCase());
            });
        }
    },
    methods: {
        paginate(page) {
            this.currentPage = page;
        },
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
