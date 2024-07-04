<template>
  <v-container>
    <v-card class="rounded-lg pa-4 mb-4 bg-gray-200">
      <v-card-title class="font-semibold"><v-icon>mdi mdi-text-box-search-outline</v-icon>
        ผลงานวิจัยที่ถูกเข้าถึงบ่อย</v-card-title>
      <v-card-text class="rounded-xl">
        <v-data-table :headers="headers" :items="researchWithCounts" :items-per-page="-1" :fixed-header="true"
          height="400" class="elevation-1">
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>

  <div class="text-center">
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" vertical>
      <div class="text-subtitle-1 pb-2"></div>
      <p>{{ snackbar.message }}</p>
      <template v-slot:actions>
        <v-btn color="white" variant="text" @click="snackbar.show = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>

</template>

<script>
import api from "../axios";
import { ref, computed } from "vue";

export default {
  data() {
    return {
      snackbar: {
        show: false,
        message: "",
        color: "success", // Default color
      },
    }
  },
  setup() {
    const productCounts = ref({});
    const research = ref([]);

    const headers = [
      { title: 'ชื่อผลงาน', align: "start", sortable: false, key: "nameOnMedia" },
      { title: 'จำนวนการเข้าชม', align: "center", key: "viewCount" }
    ];

    const researchWithCounts = computed(() => {
      return research.value.map(item => ({
        ...item,
        viewCount: productCounts.value[item._id] || 0
      }));
    });

    const fetchProductCounts = async () => {
      try {
        const response = await api.get('/all-product-counts');
        productCounts.value = response.data.productCounts;
      } catch (error) {
        this.snackbar.message = "Error: " + error;
        this.snackbar.color = "error"; // Set error color
        this.snackbar.show = true;
      }
    };

    const fetchResearch = async () => {
      try {
        const res = await api.get('/getsResearch/all/all/all/all');
        research.value = res.data.result;

      } catch (error) {
        console.error("Error fetching research:", error);
        if (!error.response) {
          this.snackbar.message = "Error : " + error;
        } else {
          this.snackbar.message = "Error : " + error.response.data.description.description + " Code: " + error.response.status;
        }
        this.snackbar.color = "error"; // Set error color
        this.snackbar.show = true;
      }
    };

    // Fetch both research and product counts when component is created
    fetchResearch();
    fetchProductCounts();

    return {
      headers,
      researchWithCounts
    };
  }
}
</script>

<style scoped></style>