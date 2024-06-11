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
                  ชื่อผลงาน  {{ research.plant_name }}
                </ul>
                <li>ผู้ประดิษฐ์ {{ research.avatar }}</li>
                <li>สังกัด {{ research.City }}</li>
                <li>ทรัพย์สินทางปัญญา  {{ research.plant_name }}</li>
                <li>ประเภทอุตสาหกรรม   <span class="text-green-600">{{ research.plant_name }}</span></li>
                <li>รายละเอียดผลงาน (ประมาณ 200 คำ) 
                  <dd class="pl-10">
                    {{ research.img }}
                  </dd>
                </li>
                <li>จุดเด่น</li>
                <li v-for="(name, index) in research" :key="index" class="pl-10">{{ research.avatar }}</li>
                <li>ความพร้อมของเทคโนโลยี  <span class="text-pink-600">{{ research.avatar }}</span></li>
                <li>ความร่วมมือที่เสาะหา </li>
                <li v-for="(name, index) in research" :key="index" class="pl-10">{{ research.avatar }}</li>
                <li class="pl-10">{{ research.avatar }}</li>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" md="5" lg="5">
            <div class="d-flex justify-center items-center">
              <v-carousel
                show-arrows="hover"
                cycle
                hide-delimiter-background
              >
                <v-carousel-item :src="research.img" cover></v-carousel-item>
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
      research: null,
      isLoading: true,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get(
          "https://65fb5ab714650eb21009db19.mockapi.io/plant/" + this.id
        ); // Replace with your API endpoint
        this.research = response.data;
        console.log(this.research);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },

  setup() {
    return {};
  },
};
</script>

<style scoped>
li{
  font-weight: 600;
  padding: 5px;
}
</style>
