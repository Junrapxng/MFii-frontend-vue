<template>
  <v-app>
    <v-main>
      <staff-layout>
        <v-container>
          <v-card class="rounded-xl pa-4">
            <v-card-title>สร้างโพสข่าวสาร</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="addNews">
                <v-text-field v-model="news.url" label="URL" clearable prepend-icon="mdi-web"
                  variant="solo-filled"></v-text-field>
                <v-file-input v-model="news.images" label="Upload Images" chips show-size
                  variant="solo-filled"></v-file-input>
                <v-btn type="submit" class="bg-slate-800 text-white">บันทึก</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-container>

        <v-container>
          <v-window v-model="currentSlide" show-arrows="hover">
            <v-window-item>
              <v-row>
                <v-col v-for="(img, index) in imgs" :key="index" cols="12" md="4">
                  <v-card class="hover:shadow-lg transition-shadow rounded-lg" style="max-width: 400px">
                    <v-img :src="`http://localhost:7770/${img.filePath}`" height="150px" />
                    <!-- Centered delete button -->
                    <v-container class="d-flex justify-center">
                      <v-btn @click="confirmDelete(img._id, index)" color="error" icon>
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-container>
                  </v-card>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-container>

        <!-- Confirmation dialog -->
        <v-dialog v-model="dialog" max-width="400">
          <v-card>
            <v-card-title class="headline">Confirm Delete</v-card-title>
            <v-card-text>
              Are you sure you want to delete this image?
            </v-card-text>
            <v-card-actions>
              <v-btn color="error" text @click="cancelDelete">Cancel</v-btn>
              <v-btn color="error" @click="deleteImage">Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </staff-layout>
    </v-main>

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

  </v-app>
</template>

<script>
import axios from "axios";
import StaffLayout from "@/layouts/staff.vue";

export default {
  name: "staff-newPost-page",
  components: {
    StaffLayout,
  },
  data() {
    return {
      snackbar: {
        show: false,
        message: "",
        color: "success", // Default color
      },
      news: {
        url: "",
        images: [],
      },
      imgs: [], // Array to hold the fetched images
      currentSlide: 0, // For v-window v-model
      dialog: false, // Controls the visibility of the confirmation dialog
      deleteIndex: -1, // Index of image to delete
      deleteImgId: '' // ID of image to delete
    };
  },
  methods: {
    async addNews() {
      try {
        const formData = new FormData();
        formData.append('url', this.news.url);

        // Append images only if they are not empty
        this.news.images.forEach((image, index) => {
          if (image.size > 0) { // Check if file is not empty
            formData.append(`images[${index}]`, image);
          }
        });

        // Check if formData has any files before making the request
        if (formData.has('images[0]')) {
          const response = await axios.post('http://localhost:7770/staff/addNews', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: localStorage.getItem("token"),
            }
          });
          console.log(response.data);
          this.fetchImg(); // Reload images after upload
          this.news.images = [];
          this.snackbar.message = "News and images uploaded successfully!";
          this.snackbar.color = "success";
          this.snackbar.show = true;
        } else {
          alert('No images selected or all selected images are empty.');
        }
      } catch (error) {
        console.error("Error adding News:", error);
        if (!error.response) {
        this.snackbar.message = "Error adding News: " + error;
      } else {
        this.snackbar.message = "Error adding News: " + error.response.data.description.description + " Code: " + error.response.status;
      }
      this.snackbar.color = "error"; // Set error color
      this.snackbar.show = true;

      }
    },
    async fetchImg() {
      console.log('fetchImg method called.');
      try {
        const res = await axios.get('http://localhost:7770/getsNews');
        this.imgs = res.data.result;
      } catch (error) {
        console.log('Error getting News: ' + error);
        if (!error.response) {
        this.snackbar.message = "Error getting News: " + error;
      } else {
        this.snackbar.message = "Error getting News: " + error.response.data.description.description + " Code: " + error.response.status;
      }
      this.snackbar.color = "error"; // Set error color
      this.snackbar.show = true;

      }
    },

    confirmDelete(imgId, index) {
      this.deleteIndex = index;
      this.deleteImgId = imgId;
      this.dialog = true; // Show confirmation dialog
    },
    cancelDelete() {
      this.dialog = false; // Hide confirmation dialog
    },
    async deleteImage() {
      try {
        const response = await axios.delete(`http://localhost:7770/staff/deleteNews/news/${this.deleteImgId}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          }
        });
        this.fetchImg();
        console.log(response.data);
        this.imgs[this.deleteIndex].filePath.splice(this.deleteIndex, 1);
        this.dialog = false; // Close dialog
        this.snackbar.message = "Delete successfully";
        this.snackbar.color = "success";
        this.snackbar.show = true;
      } catch (error) {
        console.error('Error deleting image:', error);
        if (!error.response) {
        this.snackbar.message = "Error deleting image: " + error;
      } else {
        this.snackbar.message = "Error deleting image: " + error.response.data.description.description + " Code: " + error.response.status;
      }
      this.snackbar.color = "error"; // Set error color
      this.snackbar.show = true;
      }
    },
  },
  mounted() {
    this.fetchImg(); // Call fetchImg when the component is mounted
  }
};
</script>

<style scoped>
/* Your scoped styles here */
</style>
