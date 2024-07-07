<template>
  <v-app>
    <NavBar></NavBar>
    <v-main class="bg-gray-100 font-noto-sans-thai">
      <v-container class="pt-4">
        <h1 class="pb-4" style="font-weight: 600; font-size: 35px">
          ผลงานพร้อมถ่ายทอด (จำนวน {{ info.length }} รายการ)
        </h1>

        <!-- Filters Section -->
        <v-container>
          <v-card class="rounded-lg p-4 pt-10">
            <v-row>
              <v-col cols="12" sm="6" md="4" lg="3">
                <v-combobox v-model="Industry_type" :items="indust" item-value="value" item-title="text" clearable
                  @click:clear="clearIndustryType" @update:modelValue="fetchResearchData" chips variant="outlined"
                  label="ประเภทอุตสาหกรรม"></v-combobox>
              </v-col>
              <v-col cols="12" sm="6" md="4" lg="3">
                <v-combobox v-model="Intellectual_property_type" :items="prop" item-value="value" item-title="text"
                  clearable @click:clear="clearIntellectualType" @update:modelValue="fetchResearchData" chips
                  variant="outlined" label="ประเภทอุตสาหกรรม"></v-combobox>
              </v-col>
              <v-col cols="12" sm="6" md="4" lg="3">
                <v-combobox v-model="Technology_type" :items="tech" item-value="value" item-title="text" clearable
                  @click:clear="clearTechnologyType" @update:modelValue="fetchResearchData" chips variant="outlined"
                  label="ประเภทอุตสาหกรรม"></v-combobox>
              </v-col>
              <v-col cols="12" sm="6" md="4" lg="3">
                <!-- search -->
                <v-text-field v-model="search" density="comfortable" placeholder="Search"
                  prepend-inner-icon="mdi-magnify" style="max-width: 300px" variant="solo" clearable
                  @click:clear="clearSearch" @input="fetchResearchData" hide-details rounded class="pb-6">
                </v-text-field>
              </v-col>
            </v-row>
          </v-card>
        </v-container>

        <!-- Cards Section -->
        <v-container>
          <div v-if="loading" class="justify-center">Loading....</div>
          <v-row v-else>
            <template v-if="paginatedItems.length > 0">
              <v-col v-for="(item, index) in paginatedItems" :key="index" cols="12" sm="6" md="3">
                <router-link :to="{ name: 'Innovation', params: { id: item._id } }">
                  <v-card class="hover:shadow-lg transition-shadow rounded-xl">
                    <v-img :src="`${baseUrl}/${item.filePath[0]}`" cover height="200px">
                      <template v-slot:placeholder>
                        <div class="d-flex align-center justify-center fill-height">
                          Loading...
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
                      <v-chip class="mx-2">
                        {{ count[item._id] || 0 }} views
                      </v-chip>
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
  </v-app>
</template>

<script>
import { api, url } from "../axios";
export default {
  name: "all-categories-page",
  data() {
    return {
      snackbar: {
        show: false,
        message: "",
        color: "success", // Default color
      },
      search: "",
      Industry_type: "ทั้งหมด",
      Intellectual_property_type: "ทั้งหมด",
      Technology_type: "ทั้งหมด",
      info: [],
      images: [],
      loading: true,
      error: null,
      currentPage: 1,
      itemsPerPage: 8, // จำนวนรายการต่อหน้า
      baseUrl: '',
      count: {},
      indust: [
        { value: "cosme", text: "เครื่องสำอาง" },
        { value: "agtech", text: "การเกษตรและเทคโนโลยีชีวภาพ" },
        { value: "f4f", text: "การแปรรูปอาหาร" },
        { value: "biofc", text: "เชื้อเพลิงชีวภาพและเคมีชีวภาพ" },
        { value: "medhub", text: "การแพทย์ครบวงจร" },
        { value: "arts", text: "สร้างสรรค์" },
        { value: "smeln", text: "อิเล็กทรอนิกส์อัจฉริยะ" },
        { value: "robot", text: "หุ่นยนต์" },
        { value: "digit", text: "ดิจิทัล" },
        {
          value: "amwt",
          text: "การท่องเที่ยวกลุ่มรายได้ดีและการท่องเที่ยวเชิงสุขภาพ",
        },
        { value: "alois", text: "การบินและโลจิสติกส์" },
        { value: "nxato", text: "ยานยนต์สมัยใหม่" },
      ],
      prop: [
        { value: "ptn", text: "สิทธิบัตรการประดิษฐ์" },
        { value: "ppt", text: "อนุสิทธิบัตร" },
        { value: "dsp", text: "สิทธิบัตรออกแบบ" },
        { value: "cpr", text: "ลิขสิทธิ์" },
        { value: "cpp", text: "ลิขสิทธิ์-โปรแกรมคอมพิวเตอร์" },
        { value: "khw", text: "ผลงานวิจัย" },
        { value: "pte", text: "ต้นแบบ" },
        { value: "oth", text: "อื่น ๆ" },
      ],
      tech: [
        { value: "lab", text: "ระดับการทดลอง" },
        { value: "pty", text: "ระดับต้นแบบ" },
        { value: "ids", text: "ระดับถ่ายทอด" },
      ],
    };
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
  },
  methods: {
    clearSearch() {
      this.search = "";
      this.fetchResearchData();
      this.currentPage = "1";
    },
    clearIndustryType() {
      this.Industry_type = "ทั้งหมด";
      this.fetchResearchData();
    },
    clearIntellectualType() {
      this.Intellectual_property_type = "ทั้งหมด";
      this.fetchResearchData();
    },
    clearTechnologyType() {
      this.Technology_type = "ทั้งหมด";
      this.fetchResearchData();
    },
    // Search ResearchData
    fetchResearchData() {
      const indust = this.Industry_type?.value || "all";
      const prop = this.Intellectual_property_type?.value || "all";
      const tech = this.Technology_type?.value || "all";
      const descript = this.search.trim() || "all";
      this.loading = true;
      api
        .get(
          `/getsResearch/${indust}/${prop}/${tech}/${descript}`
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
        const response = await api.get("/getStatProduct");
        const productCounts = response.data.result;

        // Store product counts in the component's data
        this.count = productCounts;
      } catch (error) {
        console.error("Error fetching product counts:", error);
      }
    },
    // ============================================================================================
  },

  async mounted() {
    this.baseUrl = url
    this.fetchResearchData();
    this.getviewCount();
    try {
      const api1Response = await Promise.all([
        api.get("/getsResearch/all/all/all/all"),
      ]);

      if (api1Response.status == 200) {
        // Filter out the data to get only those with status "active"
        const activeData = api1Response.data.result.filter(
          (item) => item.status === "active"
        );
        if (activeData.length > 0) {
          this.info = activeData;
        } else {
          console.log("No active data found");
        }
      } else {
        this.error = new Error("One or both API responses are not OK");
      }
    } catch (error) {
      this.error = `'Error fetching data: ${error}'`;
      console.error("Error fetching data:", error);
      if (error.response) {
        this.snackbar.message  = "Error Logging in: " + error.response.data.description.description + " Code: " + error.response.status;
      } else {
        this.snackbar.message  = "Error  Logging in: " + error;
      }
      this.snackbar.color = "error"; // Set error color
      this.snackbar.show = true;
    } finally {
      this.loading = false;
    }
  }
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
