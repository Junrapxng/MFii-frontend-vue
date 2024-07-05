<template>
  <v-app>
    <NavBar />
    <v-main>
      <!-- Carousel Slide -->
      <!-- display only images -->
      <v-container class="flex">
        <v-container fluid style="width: 90%">
          <Carousel v-if="filteredImages.length" class="carousel" :autoplay="4000" :wrap-around="true">
            <Slide v-for="(path, index) in filteredImages" :key="index">
              <template v-if="path.linkImage && path.linkImage.length">
                <v-img v-for="(link, linkIndex) in path.linkImage" :key="`link-${linkIndex}`"
                  class="carousel__item mx-auto" max-height="500" lazy-src="" :src="link" cover>
                  <template v-slot:placeholder>
                    <div class="d-flex align-center justify-center fill-height">
                      <v-progress-circular color="pink" indeterminate></v-progress-circular>
                    </div>
                  </template>
                </v-img>
              </template>
              <template v-else-if="path.filePath && path.filePath.length">
                <v-img v-for="(file, fileIndex) in path.filePath" :key="`file-${fileIndex}`"
                  class="carousel__item mx-auto" max-height="500" lazy-src="" :src="`${baseUrl}/${file}`"
                  cover>
                  <template v-slot:placeholder>
                    <div class="d-flex align-center justify-center fill-height">
                      <v-progress-circular color="pink" indeterminate></v-progress-circular>
                    </div>
                  </template>
                </v-img>
              </template>
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

      <!-- Newer research research ใหม่-->

      <v-container>
        <p class="text-3xl font-semibold mb-3">เพิ่มล่าสุด</p>
        <v-container class="flex justify-center items-center bg-gray-100 rounded">
          <v-row v-if="newinfo" class="flex flex-wrap justify-center">
            <v-col v-for="(item, index) in newinfo.slice(0, 4)" :key="index" cols="12" sm="6" md="6" lg="3" class="p-2">
              <router-link :to="{ name: 'Innovation', params: { id: item._id } }">
                <v-card class="hover:shadow-lg transition-shadow rounded-xl" style="max-width: 400px">
                  <v-img :src="`${baseUrl}/${item.filePath}`" cover height="200px">
                    <template v-slot:placeholder>
                      <div class="flex items-center justify-center h-full">
                        Loading...
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
                    <v-chip class="mx-2">
                      {{ count[item._id] || 0 }} views
                    </v-chip>
                   
                  </v-card-actions>
                </v-card>
              </router-link>
            </v-col>
            <!-- <h1 v-if="loading">Loading...</h1> -->
            <div v-if="!loading">
              <h1 v-if="newinfo.length <= 0">No data available</h1>
            </div>
          </v-row>
        </v-container>
      </v-container>

      <!-- Content -->
      <v-container class="inputSearch">
        <p class="text-3xl font-semibold mb-3">ผลงานพร้อมถ่ายทอด</p>
        <v-text-field v-model="search" density="comfortable" placeholder="Search" prepend-inner-icon="mdi-magnify"
          style="max-width: 300px" variant="solo" clearable @click:clear="clearSearch" @input="fetchResearchData" 
          hide-details rounded class="pb-6"></v-text-field>

        <!-- Cards Section -->
        <v-container class="flex justify-center items-center bg-gray-100 rounded">
          <div v-if="loading" class="justify-center">Loading....</div>
          <v-row v-else>
            <template v-if="paginatedItems.length > 0">
              <v-col v-for="(item, index) in paginatedItems" :key="index"  cols="12" sm="6" md="6" lg="3">
                <router-link :to="{ name: 'Innovation', params: { id: item._id } }">
                  <v-card class="hover:shadow-lg transition-shadow rounded-xl" style="max-width: 400px">
                    <v-img :src="`http://localhost:7770/${item.filePath[1]}`" cover height="200px">
                      <template v-slot:placeholder>
                        <div class="d-flex align-center justify-center fill-height">
                          <img :src="`http://localhost:7770/${item.filePath[0]}`" alt="" />
                        </div>
                      </template>
                    </v-img>
                    <v-card-title class="text-lg">{{ item.nameOnMedia }}</v-card-title>
                    <v-card-subtitle class="text-sm">{{ item.industryType }}</v-card-subtitle>
                    <v-card-actions>
                      <v-chip outlined
                        :color="item.techReadiness === 'ระดับการทดลอง' ? 'purple' : item.techReadiness === 'ระดับต้นแบบ' ? 'blue' : item.techReadiness === 'ระดับถ่ายทอด' ? 'orange' : 'default'">
                        {{ item.techReadiness }}
                      </v-chip>
                      <ViewCounter :productId="item._id" />
                    </v-card-actions>
                  </v-card>
                </router-link>
              </v-col>
            </template>
            <template v-else>
              <v-row>
                <v-col cols="12">
                  <div class="text-center">ไม่พบข้อมูล</div>
                </v-col>
              </v-row>
            </template>
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
import { defineComponent, ref } from "vue";
import { Carousel, Navigation, Slide, Pagination } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import {api, url} from '../axios'
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
      newinfo: [],
      images: [],
      loading: true,
      currentPage: 1,
      itemsPerPage: 4,
      carouselKey: 0,
      sessionId: null,
      count: {},
      baseUrl: '',

    };
  },

  async created() {
    // Fetch api research and News(Banner) =======================================================================================
    try {
      const [api1Response, api2Response] = await Promise.all([
        api.get("/getsResearch/all/all/all/all"),
        api.get("/getsNews"),
      ]);

      if (api1Response.status == 200 && api2Response.status == 200) {
        // Filter out the data to get only those with status "active"
        console.log("test " + api1Response.data)
        this.sessionId = api1Response.data.sessionId;
        const activeData = api1Response.data.result.filter(
          (item) => item.status === "active"
        );
        if (activeData.length > 0) {
          this.info = activeData;
          this.newinfo = [...activeData].reverse(); // Reverse only newinfo
          this.images = api2Response.data.result;
          console.log("images is " + this.images);
        } else {
          console.log("No active data found");
          this.snackbar.message = "No active data found.";
          this.snackbar.color = "error"; // Set error color
          this.snackbar.show = true;
        }
      } else {
        const errorMessage = `API responses not OK: Research API status: ${api1Response.status}, News API status: ${api2Response.status}`;
        this.error = new Error(errorMessage);
        console.error(errorMessage);
      }
    } catch (error) {
      this.error = error;
      console.error("Error fetching data:", error);
      if (!error.response) {
        this.snackbar.message = "Error fetching data: " + error;
      } else {
        this.snackbar.message =
          "Error fetching data: " +
          error.response.data.description.description +
          " Code: " +
          error.response.status;
      }
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
      return Math.ceil(this.info.length / this.itemsPerPage);
    },
    // กรองรายการโดยใช้การค้นหาและหน้าที่กำหนด
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.info.slice(startIndex, endIndex);
    },
  
    filteredVideos() {
      return this.images.filter(item => item.linkVideo && item.linkVideo.length > 0);
    },

    filteredImages() {
      return this.images.filter(path =>
        (path.linkImage && path.linkImage.length) ||
        (path.filePath && path.filePath.length)
      );
    }
  },
  methods: {
    paginate(page) {
      this.currentPage = page;
    },
    clearSearch() {
      this.search = "";
      this.fetchResearchData()
      this.currentPage = "1";
    },
     // Search ResearchData
     fetchResearchData() {
      const indust = "all";
      const prop = "all";
      const tech = "all";
      const descript = this.search.trim() || "all";
      this.loading = true;
      api
        .get(
          `http://localhost:7770/getsResearch/${indust}/${prop}/${tech}/${descript}`,{
            withCredentials: true,
            credentials: 'include'
          }
        )
        .then((response) => {
          if (response.status == 200) {
            // Filter out the data to get only those with status "active"
            const activeData = response.data.result.filter(
              (item) => item.status === "active"
            );
            if (activeData.length > 0) {
              this.info = activeData;
            } else {
              this.info = [];
              console.log("No active data found");
            }
          } else {
            this.error = new Error("One or both API responses are not OK");
          }
          this.loading = false;
        })
        .catch((error) => {
          console.error(
            "There was an error fetching the research data:",
            error
          );
          this.loading = false;
        });
    },


// Get view count ===========================================================================
    async getviewCount() {
      try {
        // Make a single API call to fetch all product counts
        const response = await api.get('/getStatProduct');
        const productCounts = response.data.result;

        // Store product counts in the component's data
        this.count = productCounts;

        console.log('Product counts:', this.count);
      } catch (error) {
        console.error('Error fetching product counts:', error);
      }
    },
    // ============================================================================================
  },
  components: {
    Pagination,
    Carousel,
    Slide,
    Navigation,
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
</style>
