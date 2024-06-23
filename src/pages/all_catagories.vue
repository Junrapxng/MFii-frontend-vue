<template>
  <v-app>
    <NavBar></NavBar>
    <v-main class="bg-gray-100 font-noto-sans-thai">
      <v-container class="pt-4">
        <h1 class="pb-4" style="font-weight: 600; font-size: 35px">
          ผลงานพร้อมถ่ายทอด (จำนวน {{ info.length }} รายการ)
        </h1>
        <!-- Filters Section -->
        <!-- <v-row class="mb-4">
          <v-col>
            <v-card class="rounded-lg p-4">
              <v-btn
                v-for="filter in filters"
                :key="filter.text"
                class="m-2 rounded-s-xl rounded-e-md text-white justify-start items-center"
                outlined
                :color="filter.color"
                style="height: 45px; width: 220px"
              >
                <v-icon left class="px-4">{{ filter.icon }}</v-icon>
                {{ filter.text }}
              </v-btn>
            </v-card>
          </v-col>
        </v-row> -->

        <!-- Filters Section -->
        <v-container>
          <v-card class="rounded-lg p-4 pt-10">
            <v-row>
              <v-col cols="12" sm="6" md="4" lg="3">
                <v-combobox v-model="Industry_type" clearable @click:clear="clearSearch" chips variant="outlined"
                  label="ประเภทอุตสาหกรรม " :items="[
                    'ทั้งหมด',
                    'เครื่องสำอาง',
                    'การเกษตรและเทคโนโลยีชีวภาพ',
                    'การแปรรูปอาหาร',
                    'เชื้อเพลิงชีวภาพและเคมีชีวภาพ',
                    'การแพทย์ครบวงจร',
                    'สร้างสรรค์',
                    'อิเล็กทรอนิกส์อัจฉริยะ',
                    'หุ่นยนต์',
                    'ดิจิตอล',
                    'การท่องเที่ยวกลุ่มรายได้ดีและการท่องเที่ยวเชิงสุขภาพ',
                    'การบินและระบบขนส่ง',
                    'ยานยนต์สมัยใหม่',
                  ]"></v-combobox>
              </v-col>
              <v-col cols="12" sm="6" md="4" lg="3">
                <v-combobox v-model="Intellectual_property_type" clearable @click:clear="clearSearch" chips
                  variant="outlined" label="ทรัพย์สินทางปัญญา" :items="[
                    'ทั้งหมด',
                    'สิทธิบัตรการประดิษฐ์',
                    'อนุสิทธิบัตร',
                    'สิทธิบัตรออกแบบ',
                    'โปรแกรมคอมพิวเตอร์',
                    'ลิขสิทธิ์',
                    'ผลงานวิจัย',
                    'ต้นแบบ',
                    'อื่นๆ',
                  ]"></v-combobox>
              </v-col>
              <v-col cols="12" sm="6" md="4" lg="3">
                <v-combobox v-model="Technology_type" clearable @click:clear="clearSearch" chips variant="outlined"
                  label="ความพร้อมเทคโนโลยี" :items="[
                    'ทั้งหมด',
                    'ระดับการทดลอง',
                    'ระดับต้นแบบ',
                    'ระดับถ่ายทอด',
                  ]"></v-combobox>
              </v-col>
              <v-col cols="12" sm="6" md="4" lg="3">
                <!-- search -->
                <v-text-field v-model="search" density="comfortable" placeholder="Search"
                  prepend-inner-icon="mdi-magnify" style="max-width: 300px" variant="solo" clearable
                  @click:clear="clearSearch" hide-details rounded class="pb-6">
                </v-text-field>
              </v-col>
            </v-row>
          </v-card>
        </v-container>

        <!-- Cards Section -->
        <v-container>
        <div v-if="loading">Loading....</div>
          <v-row v-else>
            <v-col v-for="(item, index) in paginatedItems" :key="index" cols="12" sm="6" md="3">
              <router-link :to="{ name: 'Innovation', params: { id: item._id } }">
                <v-card class="hover:shadow-lg transition-shadow rounded-xl">
                  <v-img :src="`http://localhost:7770/${item.filePath[1]}`" cover height="200px">
                    <template v-slot:placeholder>
                      <div class="d-flex align-center justify-center fill-height">
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
                      ">
                      {{ item.techReadiness }}
                    </v-chip>
                  </v-card-actions>
                </v-card>
              </router-link>
            </v-col>
          </v-row>
        </v-container>

        <!-- Pagination -->
        <v-pagination v-model="currentPage" :length="totalPages" class="pt-6" @input="paginate"></v-pagination>
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
      search: "",
      Industry_type: 'ทั้งหมด',
      Intellectual_property_type: 'ทั้งหมด',
      Technology_type: 'ทั้งหมด',
      info: [],
      images: [],
      loading: true,
      error: null,
      filters: [
        { text: "ดูทั้งหมด", color: "primary", icon: "mdi-menu" },
        { text: "IOT", color: "blue", icon: "mdi-earth" },
        { text: "Rubber", color: "green", icon: "mdi-leaf" },
        { text: "Health", color: "red", icon: "mdi-hospital-box" },
        { text: "Food", color: "yellow", icon: "mdi-food" },
        { text: "Energy", color: "cyan", icon: "mdi-flash" },
        { text: "other", color: "purple", icon: "mdi-dots-horizontal" },
        { text: "Agri", color: "orange", icon: "mdi-sprout" },
      ],
      currentPage: 1,
      itemsPerPage: 8, // จำนวนรายการต่อหน้า
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
    // Filter items based on search query
    filteredItems() {
      return this.info.filter((item) => {
        // Check if item matches search query
        const matchesSearch = (
          item.nameOnMedia.toLowerCase().includes(this.search.toLowerCase()) ||
          item.industryType.toLowerCase().includes(this.search.toLowerCase()) ||
          item.techReadiness.toLowerCase().includes(this.search.toLowerCase())
        );

        // Check if item matches selected Industry_type
        const matchesIndustryType = (
          this.Industry_type === 'ทั้งหมด' || // Show all if 'ทั้งหมด' is selected
          item.industryType === this.Industry_type
        );

        // Check if item matches selected Intellectual_property_type
        const matchesIntellectualPropertyType = (
          this.Intellectual_property_type === 'ทั้งหมด' || // Show all if 'ทั้งหมด' is selected
          item.intelProp === this.Intellectual_property_type
        );

        // Check if item matches selected Technology_type
        const matchesTechnologyType = (
          this.Technology_type === 'ทั้งหมด' || // Show all if 'ทั้งหมด' is selected
          item.techReadiness === this.Technology_type
        );

        return matchesSearch && matchesIndustryType && matchesIntellectualPropertyType && matchesTechnologyType;
      });
    },
  },
  methods: {
    clearSearch() {
      this.search = '';
      this.currentPage = '1';
      this.Industry_type = 'ทั้งหมด';
      this.Intellectual_property_type = 'ทั้งหมด';
      this.Technology_type = 'ทั้งหมด';
    },
  },
  async mounted() {
    try {
      const [api1Response, api2Response] = await Promise.all([
        axios.get("http://localhost:7770/getsResearch/all/all/all"),
        axios.get("https://65fb5ab714650eb21009db19.mockapi.io/todos"),
      ]);

      if (api1Response.status == 200 && api2Response.status == 200) {
        // Filter out the data to get only those with status "active"
        const activeData = api1Response.data.result.filter(item => item.status === "active");
        if (activeData.length > 0) {
          this.info = activeData;
          this.images = api2Response.data;
        } else {
          console.log("No active data found");
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
      this.error = `'Error fetching data: ${error}'`;
      console.error("Error fetching data:", error);
      alert("Error fetching data:" + error)
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
