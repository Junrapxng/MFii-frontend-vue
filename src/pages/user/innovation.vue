<template>
  <v-app>
    <NavBar></NavBar>
    <v-main>
      <v-container fluid v-if="research" class="font-noto-sans-thai">
        <v-row class="mx-5">
          <v-col cols="12" md="5" lg="5">
            <v-card class="rounded-xl max-h-fit bg-gray-100 pa-3 overflow-auto" height="500">

              <div class="contents">
                <ul class="py-3 font-bold text-xl">
                  ชื่อผลงาน {{ research.nameOnMedia }}
                </ul>
                <li>ผู้ประดิษฐ์</li>
                <li v-for="( inventor, index ) in research.inventor" :key="index" class="pl-10">{{ inventor }}</li>
                <li>สังกัด {{ research.major }}</li>
                <li>ทรัพย์สินทางปัญญา {{ research.intelProp }}</li>
                <li>ประเภทอุตสาหกรรม <span class="text-green-600">{{ research.industryType }}</span></li>
                <li>รายละเอียดผลงาน
                  <dd class="pl-10">
                    {{ research.descripton }}
                  </dd>
                </li>
                <li>จุดเด่น</li>
                <li class="pl-10">{{ research.hilight }}</li>
                <li>ความพร้อมของเทคโนโลยี <span class="text-pink-600">{{ research.techReadiness }}</span></li>
                <li>ความร่วมมือที่เสาะหา </li>
                <li class="pl-10">{{ research.coop }}</li>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" md="5" lg="5">
            <div class="d-flex justify-center items-center">
              <v-carousel show-arrows="hover" cycle hide-delimiter-background>
                <!-- If research.filePath has more than one item, display all items except the first one -->
                <template v-if="research.filePath.length > 1">
                  <v-carousel-item v-for="(pic, index) in research.filePath.slice(1)" :key="index"
                    :src="`http://localhost:7770/${pic}`" fit></v-carousel-item>
                </template>
                <!-- If research.filePath has one or no items, display only the first item -->
                <template v-else>
                  <v-carousel-item v-if="research.filePath.length > 0"
                    :src="`http://localhost:7770/${research.filePath[0]}`" fit></v-carousel-item>
                </template>
              </v-carousel>
            </div>
          </v-col>
          <v-col cols="12" md="2" lg="2">
            <v-container class="text-center">
              <!-- <div class="d-flex align-center justify-space-around py-3">
                <v-avatar color="grey" rounded="100" size="60">
                  <v-img :src="research.pfp" cover></v-img>
                </v-avatar>
              </div> -->
              <div>
                <v-btn variant="outlined" rounded="xl" size="small" block>
                  <v-icon>mdi mdi-download</v-icon> Download PDF
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

 async setup() {
   
  },

  methods: {
    async fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:7770/getResearch/" + this.id
        ); // Replace with your API endpoint
        this.research = response.data.result;
        console.log(this.research);
      } catch (error) {
        console.error("Error fetching data:", error);
        this.snackbar.message = "Error Fetching data : " + error.message;
        this.snackbar.color = "error"; // Set error color
        this.snackbar.show = true;
      } finally {
        this.isLoading = false;
      }
    },
    // counter visitor
    async counter(){
      try {
      await axios.get(
        "http://localhost:7770/product-visits/" + this.id
      );
    } catch (error) {
      console.error(error);
    }
    }
  },
  computed: {
    filteredFilePaths() {
      if (this.research.filePath.length > 1) {
        // Return all elements except the first one if there are more than one
        return this.research.filePath.slice(1);
      } else {
        // Return the first element if there is only one
        return this.research.filePath;
      }
    },
  },
  mounted() {
    console.log(this.id)
    console.log(typeof (this.id))
    this.fetchData();
    this.counter();
  },

}
</script>

<style scoped>
li {
  font-weight: 600;
  padding: 5px;
}
</style>
