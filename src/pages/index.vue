<template>
  <v-app>
    <NavBar />
    <v-main>
      <!-- Carousel Slide -->
      <v-container class="flex">
        <v-container luid style="width: 90%">
          <Carousel class="carousel" :autoplay="4000" :wrap-around="true">
            <Slide v-for="(path, index) in images" :key="index">
              <v-img class="carousel__item mx-auto" max-height="500" lazy-src=""
                :src="`http://localhost:7770/${path.filePath}`" cover>
                <template v-slot:placeholder>
                  <div v-if="images" class="d-flex align-center justify-center fill-height">
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
        </v-container>
      </v-container>

      <!-- Youtube video -->
      <div class="txt flex justify-center">
        <h1 class="text-2xl font-bold mb-3">Success Case</h1>
      </div>


      <v-container fluid style="width: 70%">
        <v-carousel class="myCarousel" hide-delimiter-background height="400">
          <v-carousel-item v-for="(video, index) in videos" :key="index">
            <v-sheet class="d-flex align-center justify-center" height="100%" elevation="10">
              <iframe class="video-iframe" :src="video.src" :title="video.title" frameborder="0"
                allowfullscreen></iframe>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-container>
      <!-- Content -->
      <v-container class="inputSearch">
        <p class="text-3xl font-semibold mb-3">ผลงานพร้อมถ่ายทอด</p>
        <v-text-field v-model="search" density="comfortable" placeholder="Search" prepend-inner-icon="mdi-magnify"
          style="max-width: 300px" variant="solo" clearable @click:clear="clearSearch" hide-details rounded
          class="pb-6"></v-text-field>

        <!-- Cards Section -->
        <v-container class="flex justify-center items-center bg-gray-100 rounded">
          <v-row v-if="paginatedItems" class="flex flex-wrap justify-center">
            <v-col v-for="(item, index) in paginatedItems" :key="index" cols="12" sm="6" md="6" lg="3" class="p-2">
              <router-link :to="{ name: 'Innovation', params: { id: item._id } }">
                <v-card class="hover:shadow-lg transition-shadow rounded-xl" style="max-width: 400px">
                  <v-img :src="`http://localhost:7770/${item.filePath[1]}`" cover height="200px">
                    <template v-slot:placeholder>
                      <div class="flex items-center justify-center h-full">
                        <img :src="`http://localhost:7770/${item.filePath[0]}`" alt="" />
                      </div>
                    </template>
                  </v-img>
                  <v-card-title class="text-lg">{{
                    item.nameOnMedia
                  }}</v-card-title>
                  <v-card-subtitle class="text-sm">{{
                    item.industryType
                  }}</v-card-subtitle>
                  <v-card-actions>
                    <v-chip outlined :color="item.techReadiness === 'ระดับการทดลอง'
                      ? 'purple'
                      : item.techReadiness === 'ระดับต้นแบบ'
                        ? 'blue'
                        : item.techReadiness === 'ระดับถ่ายทอด'
                          ? 'orange'
                          : 'default'
                      " class="text-xs">
                      {{ item.techReadiness }}
                    </v-chip>
                    <!-- Views Counter -->
                    <ViewCounter :productId="item._id" />
                  </v-card-actions>
                </v-card>
              </router-link>
            </v-col>
            <h1 v-if="loading">Loading...</h1>
            <div v-if="!loading">
              <h1 v-if="paginatedItems.length <= 0">No data available</h1>
            </div>
          </v-row>
        </v-container>
        <!-- Pagination -->
        <v-pagination v-model="currentPage" :length="totalPages" class="pt-6" @input="paginate"></v-pagination>
      </v-container>


      <v-snackbar v-model="snackbar.show" :color="snackbar.color" vertical>
        <div class="text-subtitle-1 pb-2"></div>
        <p>{{ snackbar.message }}</p>
        <template v-slot:actions>
          <v-btn color="white" variant="text" @click="snackbar.show = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>


    </v-main>
    <Footer></Footer>
    <router-view></router-view>
  </v-app>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { Carousel, Navigation, Slide, Pagination } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import ViewCounter from '@/components/ViewCounter.vue'
import axios from "axios";
export default defineComponent({
  name: "index-page",
  data() {
    return { 
      snackbar: {
      show: false,
      message: "",
      color: "success", // Default color
    },
      search: "",
      userId: ref(null),
      userinfo: ref(null),
      info: [],
      images: [],
      loading: true,
      videos: [
        {
          src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          title: "1",
        },
        {
          src: "https://www.youtube.com/embed/8O1Vr3ro6mM",
          title: "2",
        },
        {
          src: "https://www.youtube.com/embed/Qe8WHg410t0",
          title: "2",
        },
      ],
      currentPage: 1,
      itemsPerPage: 4,
      // Define info property here
    };
  },

  // counter visitor ====================================================================
  async setup() {
    const globalVisitorCount = ref(0)
    const sessionId = ref(localStorage.getItem('sessionId') || '')

    const generateSessionId = () => {
      return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    const fetchGlobalCount = async () => {
      if (!sessionId.value) {
        sessionId.value = generateSessionId()
        localStorage.setItem('sessionId', sessionId.value)
      }
      try {
        await axios.get(`http://localhost:7770/visitor-count`, {
          params: { sessionId: sessionId.value }
        })
      } catch (error) {
        console.error('Error fetching global visitor count:', error)
        this.snackbar.message = "Error Fetching data : " + error.message;
        this.snackbar.color = "error"; // Set error color
        this.snackbar.show = true;
      }
    }
    onMounted(fetchGlobalCount)
    return {
      globalVisitorCount
    }
  },

  async created() {
    // Fetch api research and News(Banner) =======================================================================================
    try {
      const [api1Response, api2Response] = await Promise.all([
        axios.get("http://localhost:7770/getsResearch/all/all/all"),
        axios.get("http://localhost:7770/getsNews"),
      ]);

      if (api1Response.status == 200 && api2Response.status == 200) {
        // Filter out the data to get only those with status "active"
        const activeData = api1Response.data.result.filter(item => item.status === "active");
        if (activeData.length > 0) {
          this.info = activeData;
          this.images = api2Response.data.result;
          console.log("images is " + this.images.result)
        } else {
          console.log("No active data found");
          this.snackbar.message = "No active data found : " + error.message;
          this.snackbar.color = "error"; // Set error color
          this.snackbar.show = true;
        }
      } else {
        this.error = new Error("One or both API responses are not OK");
        console.error(
          "API responses:",
          api1Response.status,
          api2Response.status
        );

      }
    } catch (error) {
      this.error = error;
      console.error("Error fetching data:", error);
      this.snackbar.message = "Error Fetching data : " + error.message;
      this.snackbar.color = "error"; // Set error color
      this.snackbar.show = true;
    } finally {
      this.loading = false;
    }
    // ==============================================================================================================================
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
      return this.info.filter((item) => {
        return (
          item.nameOnMedia.toLowerCase().includes(this.search.toLowerCase()) ||
          item.industryType.toLowerCase().includes(this.search.toLowerCase()) ||
          item.techReadiness.toLowerCase().includes(this.search.toLowerCase())
        );
      });
    },
  },
  methods: {
    paginate(page) {
      this.currentPage = page;
    },
    clearSearch() {
      this.search = "";
    },
  },
  components: {
    Pagination,
    Carousel,
    Slide,
    Navigation,
    ViewCounter,
  },
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
@import "../styles/index.css";

main {
  font-family: "Noto Sans Thai", sans-serif;
}

@media (max-width: 640px) {
  .inputSearch p {
    font-size: 1.25rem;
    /* Change text size for mobile */
  }
}

/* Adjust card padding for smaller devices */
@media (max-width: 640px) {
  .v-card {
    padding: 1rem;
    /* Adjust padding for mobile */
  }
}
</style>
