<template>
  <v-app>
    <NavBar></NavBar>
    <v-main>
      <v-container fluid v-if="research" class="font-noto-sans-thai">
        <v-row class="mx-5">
          <v-col cols="12" md="7" lg="7">
            <v-card class="rounded-xl max-h-fit bg-gray-100 pa-3 overflow-auto" height="500">

              <div class="contents">
                <ul class="py-3 font-bold text-xl">
                  ชื่อผลงาน {{ research.nameOnMedia }}
                </ul>
                <ul>ผู้ประดิษฐ์</ul>
                <li v-for="( inventor, index ) in research.inventor" :key="index" class="pl-10">{{ inventor }}</li>
                <ul>สังกัด: <span  class="text-gray-700">{{ research.major }}</span></ul>
                <ul>ทรัพย์สินทางปัญญา: <span class="text-red-600">{{ research.intelProp }}</span></ul>
                <ul>ประเภทอุตสาหกรรม: <span class="text-green-600">{{ research.industryType }}</span></ul>
                <ul>รายละเอียดผลงาน</ul>
                  <p class="pl-10">
                    {{ research.description }}
                  </p>
                <ul>จุดเด่น</ul>
                <li v-for="( highlight, index ) in research.highlight" :key="index" class="pl-10">{{ highlight }}</li>
                <ul>ความพร้อมของเทคโนโลยี: <span class="text-pink-600">{{ research.techReadiness }}</span></ul>
                <ul>ความร่วมมือที่เสาะหา </ul>
                <li v-for="( coop, index ) in research.coop" :key="index" class="pl-10">{{ coop }}</li>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" md="5" lg="5">
            <div class="d-flex justify-center items-center">
              <v-carousel show-arrows="hover" cycle hide-delimiter-background>
                <v-carousel-item v-for="(pic, index) in filteredImages" :key="index"
                  :src="`http://192.168.10.184:7770/${pic}`" fit></v-carousel-item>
              </v-carousel>
            </div>
          </v-col>
          <v-col cols="12" md="2" lg="2">
            <v-container class="text-center">
              <div>
                <v-btn class="responsive-btn" variant="outlined" rounded="xl" size="small" block style="display: flex; align-items: center; justify-content: center;" @click="downloadPdf()">
                  <v-icon left class="mr-1">mdi-download</v-icon>  
                  <span>Download PDF</span>
                </v-btn>
              </div>
            </v-container>
          </v-col>
        </v-row>
        <v-container fluid class="text-white mt-5" style="background-color: #D02630;">
          <p>
            สนใจเทคโนโลยี โปรดติดต่อ <br />
            ฝ่ายจัดการทรัพย์สินทางปัญญา มหาวิทยาลัยแม่ฟ้าหลวง <br />
            โทรศัพท์ 0 5391 7182 หรือ 0 5391 7014 <br />
            อีเมล ip.mfii@mfu.ac.th
          </p>
        </v-container>
      </v-container>

      <div class="text-center">
        <v-snackbar v-model="snackbar.show" :color="snackbar.color">
          <p>{{ snackbar.message }}</p>

          <template v-slot:actions>
            <v-btn color="white" variant="text" @click="snackbar.show = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </div>

    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  name: "innovation-page",
  props: ["id"],
  data() {
    return {
      snackbar: {
        show: false,
        message: "",
        color: "success", // Default color
      },
      research: null,
      isLoading: true,
    };
  },

  methods: {
    async fetchData() {
      try {
        const response = await axios.get(
          "http://192.168.10.184:7770/getResearch?researchId=" + this.id
        ); // Replace with your API endpoint
        this.research = response.data.result;
        console.log(this.research);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (!error.response) {
          this.snackbar.message = "Error : " + error;
        } else {
          this.snackbar.message = "Error : " + error.response.data.description.description + " Code: " + error.response.status;
        }
        this.snackbar.color = "error"; // Set error color
        this.snackbar.show = true;
      } finally {
        this.isLoading = false;
      }
    },
    
    downloadPdf() {
      if (this.research.filePath && this.research.filePath.length > 0) {
        const pdfPath = this.research.filePath.find(path => path.toLowerCase().endsWith('.pdf'));
        if (pdfPath) {
          window.open(`http://192.168.10.184:7770/${pdfPath}`, '_blank');
        } else {
          // Handle case where no PDF file is found
          this.snackbar.message = 'No PDF file';
          this.snackbar.color = 'default';
          this.snackbar.show = true;
        }
      } else {
        // Handle case where research data or file paths are not loaded
        this.snackbar.message = 'No research data loaded.';
        this.snackbar.color = 'error';
        this.snackbar.show = true;
      }
    },
  },
  computed: {
    filteredImages() {
      if (this.research) {
        return this.research.filePath.filter(pic => !pic.toLowerCase().endsWith('.pdf'));
      }
      return [];
    },
  },
  mounted() {
    this.fetchData();
  },

}
</script>

<style scoped>
ul {
  font-weight: 600;
  padding: 5px;
}
span{
  font-weight: 400;
}
/* Smaller text for iPad screen sizes */
@media (max-width: 1024px) {
  .responsive-btn span, v-icon {
    font-size: 8px;
  }
}
</style>
