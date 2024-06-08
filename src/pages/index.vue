<template>
  <v-app>
    <NavBar />
    <v-main>
        <!-- Carousel Slide -->
        <v-carousel show-arrows="hover" cycle>
          <v-carousel-item
            v-for="img in images"
            :src="img.image"
            cover
          ></v-carousel-item>
        </v-carousel>
        <!-- Carousel Slide -->

        <!-- Youtube video -->
        <div class="youtube">
          <iframe
            class="videos"
            height="260"
            width="450"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title=" &amp; Pagination part 5/7"
            frameborder="0"
            allow="autoplay"
            allowFullScreen
          ></iframe>
          <iframe
            class="videos"
            height="260"
            width="450"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title=" &amp; Pagination part 5/7"
            frameborder="0"
            allow="autoplay"
            allowFullScreen
          ></iframe>
          <iframe
            class="videos"
            height="260"
            width="450"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title=" &amp; Pagination part 5/7"
            frameborder="0"
            allow="autoplay"
            allowFullScreen
          ></iframe>
        </div>

        <!-- Content -->
        <div class="inputSearch ml-10">
          <v-text-field
            v-model="search"
            density="comfortable"
            placeholder="Search"
            prepend-inner-icon="mdi-magnify"
            style="max-width: 300px"
            variant="solo"
            clearable
            @click:clear="clearSearch"
            hide-details
            class="pb-6"
          ></v-text-field>
        </div>
        <div class="wrap">
          <div class="card-container">
            <v-skeleton-loader
              v-if="loading"
              v-for="i in 10"
              class="item mx-1 border"
              min-width="344"
              type="image, article"
            ></v-skeleton-loader>
            <router-link
              v-else
              v-for="data in filteredItems"
              :key="data.id || data.plant_name"
              :to="{ name: 'Innovation', params: { id: data.id } }"
              class="item mx-1"
            >
              <v-card class="card" min-width="344">
                <v-img height="200px" :src="data.img" cover />
                <v-card-title>
                  {{ data.plant_name }}
                </v-card-title>
                <v-card-subtitle>
                  {{ data.avatar }}
                </v-card-subtitle>

                <v-card-actions>
                  <v-btn color="orange lighten-2" text>Explore</v-btn>
                </v-card-actions>
              </v-card>
            </router-link>
          </div>
        </div>
    </v-main>
    <Footer></Footer>
    <router-view></router-view>
  </v-app>
</template>

<script>
import { defineComponent } from "vue";
import { Carousel, Navigation, Slide, Pagination } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import axios from "axios";
import { ref } from "vue";
const page = ref(1);

export default defineComponent({
  name: "index-page",
  data() {
    return {
      search: '',
      info: [],
      images: [],
      loading: true,
      // Define info property here
    };
  },
  computed: {
      // กรองรายการโดยใช้การค้นหา
      filteredItems() {
        return this.info.filter(item => {
          return item.plant_name.toLowerCase().includes(this.search.toLowerCase());
        });
      }
    },
    methods: {
      clearSearch() {
        this.search = '';
      },
    },
  // Fetch data from API =================================================================
  async mounted() {
    try {
      const [api1Response, api2Response] = await Promise.all([
        axios.get("https://65fb5ab714650eb21009db19.mockapi.io/plant"),
        axios.get("https://65fb5ab714650eb21009db19.mockapi.io/todos"),
      ]);

      if (api1Response.status === 200 && api2Response.status === 200) {
        this.info = api1Response.data;
        this.images = api2Response.data;
        // Assuming images are also part of the info data, otherwise handle separately
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
    } finally {
      this.loading = false; // Set loading to false after data fetching is done
    }
  },
  // ======================================================================================
  components: {
    Pagination,
    Carousel,
    Slide,
    Navigation,
  },
  // Remove the duplicate data declaration here
  // settings and breakpoints can go outside of data
  // settings: {
  //     itemsToShow: 1,
  //     snapAlign: 'center',
  // },
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
.wrap {
  display: flex;
  justify-content: center;
}

.youtube {
  display: flex;
  justify-content: center;
  margin: 5%;
  overflow: auto;
}

.videos {
  margin: 10px;
}

.card-container {
  display: flex;
  flex-direction: row;
  max-width: 95%;
  /* Set your desired maximum width */
  overflow: auto;
  min-height: 100%;
}

img {
  min-width: 15rem;
}

.item {
  margin: 0.5rem;
}

.card:hover {
  cursor: pointer;
  background-color: gainsboro;
}

input[type="text"] {
  border: none;
  border-bottom: 2px solid red;
  margin-left: 2%;
}

input:focus {
  outline: none;
}

.button {
  margin-left: 2%;
  background-color: white;
  color: black;
  border: 2px solid #3c8af1;
  /* Green */
  transition-duration: 0.4s;
  padding: 6px;
  border-radius: 20%;
}

.button:hover {
  background-color: #3c8af1;
  /* Green */
  color: white;
}
</style>
