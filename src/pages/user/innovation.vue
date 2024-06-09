<template>
  <v-app>
    <NavBar></NavBar>

    <v-main>
      <v-container v-if="research" class="font-noto-sans-thai text-gray-600">
        <v-row>
          <div>
            <header>
              <h2
                class="font-noto-sans-thai py-3"
                style="font-weight: 500; font-size: 26px"
              >
               ========== สวัสดีน้าบอุนเทอโผมชื่อ : {{ research.plant_name }} นะจ๊ะ
              </h2>
            </header>
          </div>
          <v-col col="9" md="9" lg="9">
            <v-container
              class="font-noto-sans-thai rounded-xl min-h-screen bg-gray-100"
            >
              <div class="d-flex justify-center items-center">
                <v-carousel
                  show-arrows="hover"
                  cycle
                  hide-delimiter-background
                  class="rounded-xl"
                >
                  <v-carousel-item
                    :src="research.img"
                  ></v-carousel-item>

                
                </v-carousel>
              </div>

              <div class="contents">
                <p class="mt-10">
                  {{ research.Details }}
                </p>

                
              </div>
            </v-container>
          </v-col>

          <v-col col="3" md="3" lg="3">
            <h1 style="font-weight: 400; font-size: 20px">ติดต่อสอบถาม</h1>
            <div class="d-flex align-center justify-space-around py-3">
              <v-avatar color="grey" rounded="100" size="120">
                <v-img
                  :src="research.pfp"
                  cover
                ></v-img>
              </v-avatar>
            </div>
            <div>
              <p>
                คุณ {{ research.plant_name }} <br />
                โทร 0xxx-xx-xxxx หรือ 0xx-xxx-xxxx <br />
                E-mail: xxxxxx@mfu.ac.th <br />
              </p>
            </div>

            <div class="py-4">
              <v-btn variant="outlined" rounded="xl" size="x-large" block>
                <v-icon> mdi mdi-download </v-icon> Download
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  name: "innovation-page",
  props: ['id'],
  data(){
    return{
      research: null,
      isLoading: true,
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('https://65fb5ab714650eb21009db19.mockapi.io/plant/' + this.id); // Replace with your API endpoint
        this.research = response.data;
        console.log(this.research)
      } catch (error) {
        console.error('Error fetching data:', error);
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

<style scoped></style>
