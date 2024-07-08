<template>
  <admin-layout>
    <v-container class="py-4">
      <v-card class="pa-4">
        <v-card-title class="text-h5">Download Database</v-card-title>
        <v-card-text>
          <v-select v-model="selectedOption" :items="options" item-title="name" item-value="value"
            label="Select Data Type"></v-select>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="downloadCSVs()" :disabled="!selectedOption" class="bg-red-700 text-slate-50">Download
            CSV</v-btn>
        </v-card-actions>
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
  </admin-layout>
</template>

<script>
import { api } from "@/axios";
import AdminLayout from "@/layouts/admin.vue";
import { ref } from 'vue';

export default {
  name: 'document-page',
  components: {
    AdminLayout,
  },
  data() {
    return {
      snackbar: {
      show: false,
      message: "",
      color: "success", // Default color
    },
      selectedOption: ref(null),
      options: [
        { name: 'รายงาน การเข้าถึงผลงาน/วิจัย', value: 'productAccess' },
        { name: 'รายงาน การเข้าถึงเว็บไซต์รายวัน', value: 'dailyAccess' },
        { name: 'รายงาน การเข้าถึงเว็บไซต์รายเดือน', value: 'monthlyAccess' },
        { name: 'รายงาน การเข้าถึงเว็บไซต์รายปี', value: 'yearlyAccess' },
      ]
    };
  },


  methods: {
    async downloadCSVs() {
      try {
        const response = await api.get('/download?fields=' + this.selectedOption, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          responseType: 'blob' // Important: responseType set to 'blob' for file download
        });
        // Create a Blob object from the response
        const blob = new Blob([response.data], { type: 'text/csv' });
        // Create a URL for the blob
        const url = window.URL.createObjectURL(blob);
        // Create a temporary <a> element to trigger the download
        const link = document.createElement('a');
        link.href = url;
        document.body.appendChild(link);
        // Trigger the download
        link.click();
        // Clean up: remove the temporary link and revoke the URL object
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

      } catch (error) {
        // Handle any errors from the API call
        console.log('Error downloading CSV:', error);
        if (error.response.data.description.code == 40107 || error.response.data.description.code == 40102) {
            this.snackbar.message = "Error " + error;
            this.snackbar.color = "error"; // Set error color
            this.snackbar.show = true;
            setTimeout(function () {
            window.location.reload()
          }, 1000);
          }
        if (!error.response) {
            this.snackbar.message = "Error:  " + error;
          } else {
            this.snackbar.message = "Error:  " + error.response.data.description.description + " Code: " + error.response.status;
          }
          this.snackbar.color = "error"; // Set error color
          this.snackbar.show = true;
      }
    }

  }

};
</script>

<style scoped></style>