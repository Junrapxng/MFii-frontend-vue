<template>
    <v-app>
      <NavBar></NavBar>
      <v-main class="bg-gray-100 font-noto-sans-thai">
        <v-container class="pt-4">
  
          <h1 class="pb-4" style="font-weight: 600; font-size: 35px">ผลงานพร้อมถ่ายทอด (จำนวน ... รายการ)</h1>
          <!-- Filters Section -->
          <v-row class="mb-4">
            <v-col>
              <v-card class="rounded-lg p-4">
              <v-btn
                v-for="filter in filters"
                :key="filter.text"
                class="m-2 rounded-s-xl rounded-e-md text-white justify-start items-center"
                outlined
                :color="filter.color"
                style="height: 45px; width: 220px;"
              >
                <v-icon left class="px-4 ">{{ filter.icon }}</v-icon>
                {{ filter.text }}
              </v-btn>
            </v-card>
            </v-col>
          </v-row>
          <v-text-field
            v-model="search"
            density="comfortable"
            placeholder="Search"
            prepend-inner-icon="mdi-magnify"
            style="max-width: 300px;"
            variant="solo"
            clearable
            @click:clear="clearSearch"
            hide-details
            class="pb-6"
          ></v-text-field>
  
          <!-- Cards Section -->
          <v-row>
            <v-col
              v-for="(item, index) in paginatedItems"
              :key="index"
              cols="12"
              sm="6"
              md="3"
            >
              <router-link :to="{ name: 'Innovation', params: { id: item.id } }">
                <v-card class="hover:shadow-lg transition-shadow rounded-xl">
                  <v-img :src="item.img" cover height="200px">
                    <template v-slot:placeholder>
                      <div class="d-flex align-center justify-center fill-height">
                        <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                      </div>
                    </template>
                  </v-img>
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
          <v-pagination
            v-model="currentPage"
            :length="totalPages"
            class="pt-6"
            @input="paginate"
          ></v-pagination>
  
        </v-container>
      </v-main>
      <Footer></Footer>
    </v-app>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    name: "all-categories-page",
    data() {
      return {
        search: '',
        info: [],
        images: [],
        loading: true,
        error: null,
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
        itemsPerPage: 8 // จำนวนรายการต่อหน้า
      };
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
  };
  </script>
  
  <style scoped>
  /* Tailwind CSS classes can be used directly in the template */
  .hover\\:shadow-lg:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  
  .transition-shadow {
    transition: box-shadow 0.3s ease;
  }
  </style>
  