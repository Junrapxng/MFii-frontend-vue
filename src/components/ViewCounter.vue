<template>
    <v-chip class="mx-2">
      {{ count[this.productId] || 0 }} views
    </v-chip>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "ViewCounter",
    props: {
      productId: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        count: '',
      };
    },
    async created() {
      // const productCounts = ref({})
      try {
        const response = await axios.get('http://localhost:7770/all-product-counts');
        const productCounts = response.data.productCounts;
        this.count = productCounts
      } catch (error) {
        console.error("Error fetching product count:", error);
      }
    },
  };
  </script>
  
  <style scoped>
  </style>
  