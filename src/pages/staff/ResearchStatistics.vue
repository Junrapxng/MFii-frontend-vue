<template>
  <v-container>
    <v-card class="rounded-lg pa-4 mb-4 bg-gray-200">
      <v-card-title class="font-semibold"><v-icon>mdi mdi-text-box-search-outline</v-icon>
        ผลงานวิจัยที่ถูกเข้าถึงบ่อย</v-card-title>
      <v-card-text class="rounded-xl">
        <v-data-table :headers="headers" :items="researchWithCounts" :items-per-page="-1" :fixed-header="true" height="400"
          class="elevation-1">
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import { ref, computed } from "vue";

export default {
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
        const response = await axios.get('http://localhost:7770/all-product-counts');
        productCounts.value = response.data.productCounts;
      } catch (error) {
        console.error("Error fetching product counts:", error);
      }
    };

    const fetchResearch = async () => {
      try {
        const res = await axios.get('http://localhost:7770/getsResearch/all/all/all');
        research.value = res.data.result;
      } catch (error) {
        console.error("Error fetching research:", error);
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