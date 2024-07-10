<template>
  <v-app>
    <NavBar />
    <v-main>
      <!-- News And Video YouTube -->
      <News/>

      <!-- Newer research research ใหม่-->
      <v-container>
        <p class="text-3xl font-semibold mb-3">ผลงานแนะนำ</p>
        <v-container class="flex justify-center items-center bg-gray-100 rounded">
          <v-row v-if="newinfo" class="flex flex-wrap justify-center">
            <v-col v-for="(item, index) in newinfo.slice(0, 4)" :key="index" cols="12" sm="6" md="6" lg="3" class="p-2">
              <router-link :to="{ name: 'Innovation', params: { id: item._id } }">
                <v-card class="newResearchCard hover:shadow-lg transition-shadow rounded-xl">
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
          <v-row v-if="paginatedItems" class="flex flex-wrap justify-center">
            <v-col v-for="(item, index) in paginatedItems" :key="index" cols="12" sm="6" md="6" lg="3" class="p-2">
              <router-link  :to="{ name: 'Innovation', params: { id: item._id } }">
                <v-card class="researchCard hover:shadow-lg transition-shadow rounded-xl">
                  <v-img :src="`${baseUrl}/${item.filePath[0]}`" cover height="200px">
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
                    <v-chip class="mx-2">
                      {{ count[item._id] || 0 }} views
                    </v-chip>
                  </v-card-actions>
                </v-card>
              </router-link>
            </v-col>
            <h1 v-if="loading">Loading...</h1>
            <div v-if="!loading">
              <h1 v-if="paginatedItems.length <= 0">ไม่พบข้อมูล</h1>
            </div>
          </v-row>
        </v-container>
        <!-- Pagination -->
        <v-pagination v-model="currentPage" :length="totalPages" class="pt-6" @input="paginate"></v-pagination>
      </v-container>
            <ytVideos/>
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
import News from "@/components/News.vue";
import ytVideos from "@/components/ytvideos.vue";
import { defineComponent, ref } from "vue";
import { api, url } from "../axios";
export default defineComponent({
  name: "index-page",
  components: {
    News,
    ytVideos
  },
  data() {
    return {
      snackbar: {
        show: false,
        message: "",
        color: "success",
      },
      search: "",
      userId: ref(null),
      userinfo: ref(null),
      info: [],
      newinfo: [],
      loading: true,
      currentPage: 1,
      itemsPerPage: 8,
      sessionId: null,
      count: {},
      baseUrl: url,
    };
  },

  async created() {
    try {
      const api1Response = await api.get("/getsResearch/all/all/all/all");

      if (api1Response.status == 200) {
        // Filter out the data to get only those with status "active"
        this.sessionId = api1Response.data.sessionId;
        const activeData = api1Response.data.result.filter(
          (item) => item.status === "active"
        );
        if (activeData.length > 0) {
          this.info = activeData;
          this.newinfo = [...activeData].reverse();
        } else {
          this.snackbar.message = "No active data found.";
          this.snackbar.color = "error";
          this.snackbar.show = true;
        }
      } else {
        const errorMessage = `API responses not OK: Research API status: ${api1Response.status}`;
        this.error = new Error(errorMessage);
        this.snackbar.message = "ERROR: " + errorMessage;
        this.snackbar.color = "error";
        this.snackbar.show = true;
        console.error(errorMessage);
      }
    } catch (error) {
      let errorMessage = "An unexpected error occurred";
      let errorCode = "Unknown";
      let errorDetails = "";
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const errorDesc = error.response.data.description;
        if (errorDesc && (errorDesc.code === 40107 || errorDesc.code === 40102)) {
          // Handle specific error codes
          errorMessage = errorDesc.code === 40107 ? errorDesc.description : errorDesc.description;
          errorCode = errorDesc.code;
        } else {
          errorMessage = errorDesc?.description || error.response.data.message || "Server error";
          errorCode = error.response.status;
        }
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = "ไม่มีการตอบกลับจากเซิฟเวอร์ หรือ เซิฟเวอร์ผิดผลาด";
      } else if (error.code === 'ERR_NETWORK') {
        // Network error
        errorMessage = "Network Error";
        errorCode = error.code;
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = error.message;
      }
      // Add more detailed error information
      errorDetails = `${error.name}: ${error.message}`;
      // Log the error
      console.error(`Error fetching product counts: ${errorDetails}`, error);

      this.snackbar = {
        message: `Error: ${errorMessage}${errorCode !== "Unknown" ? ` (Code: ${errorCode})` : ''}`,
        color: "error",
        Errcode: errorCode,
        show: true
      };
    } finally {
      this.loading = false;
    }
    this.getviewCount();
  },

  computed: {
    totalPages() {
      return Math.ceil(this.info.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.info.slice(startIndex, endIndex);
    },
  },
  methods: {
    paginate(page) {
      this.currentPage = page;
    },
    clearSearch() {
      this.search = "";
      this.fetchResearchData();
      this.currentPage = 1;
    },
    fetchResearchData() {
      const indust = "all";
      const prop = "all";
      const tech = "all";
      const descript = this.search.trim() || "all";
      this.loading = true;
      api
        .get(`/getsResearch/${indust}/${prop}/${tech}/${descript}`, {
          withCredentials: true,
          credentials: "include",
        })
        .then((response) => {
          if (response.status == 200) {
            const activeData = response.data.result.filter(
              (item) => item.status === "active"
            );
            if (activeData.length > 0) {
              this.info = activeData;
            } else {
              this.info = [];
              this.snackbar.message = "No active data found";
              this.snackbar.color = "error";
              this.snackbar.show = true;
            }
          } else {
            this.error = new Error("API responses is not OK");
          }
          this.loading = false;
        })
        .catch((error) => {
          let errorMessage = "An unexpected error occurred";
          let errorCode = "Unknown";
          let errorDetails = "";
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            const errorDesc = error.response.data.description;
            if (errorDesc && (errorDesc.code === 40107 || errorDesc.code === 40102)) {
              // Handle specific error codes
              errorMessage = errorDesc.code === 40107 ? errorDesc.description : errorDesc.description;
              errorCode = errorDesc.code;
            } else {
              errorMessage = errorDesc?.description || error.response.data.message || "Server error";
              errorCode = error.response.status;
            }
          } else if (error.request) {
            // The request was made but no response was received
            errorMessage = "ไม่มีการตอบกลับจากเซิฟเวอร์ หรือ เซิฟเวอร์ผิดผลาด";
          } else if (error.code === 'ERR_NETWORK') {
            // Network error
            errorMessage = "Network Error";
            errorCode = error.code;
          } else {
            // Something happened in setting up the request that triggered an Error
            errorMessage = error.message;
          }
          // Add more detailed error information
          errorDetails = `${error.name}: ${error.message}`;
          // Log the error
          console.error(`Error : ${errorDetails}`, error);

          this.snackbar = {
            message: `Error: ${errorMessage}${errorCode !== "Unknown" ? ` (Code: ${errorCode})` : ''}`,
            color: "error",
            Errcode: errorCode,
            show: true
          };
        });
    },

    async getviewCount() {
      try {
        const response = await api.get("/getStatProduct");
        const productCounts = response.data.result;
        this.count = productCounts;
      } catch (error) {
        console.error("Error fetching product counts:", error);
      }
    },
  },
});
</script>

<style scoped>
@import "../styles/index.css";
</style>