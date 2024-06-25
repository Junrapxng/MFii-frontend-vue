<template>
  <v-app>
    <v-main>
      <staff-layout>
        <v-container>
          <v-card class="rounded-xl pa-4">
            <v-card-title>สร้างโพสข่าวสาร</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="uploadNews">
                <v-text-field
                  v-model="news.url"
                  label="URL"
                  clearable
                  prepend-icon="mdi-web"
                  variant="solo-filled"
                ></v-text-field>
                <v-file-input
                  v-model="news.images"
                  label="Upload Images"
                  chips
                  multiple
                  show-size
                  variant="solo-filled"
                ></v-file-input>
                <v-btn type="submit" class="bg-slate-800 text-white">บันทึก</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-container>

        <v-container>
          <v-window v-model="currentSlide" show-arrows="hover">
            <v-window-item v-for="(img, i) in imgs" :key="i">
              <v-row>
                <v-col v-for="(path, index) in img.filePath" :key="index" cols="12" md="4">
                  <v-card class="hover:shadow-lg transition-shadow rounded-lg" style="max-width: 400px">
                    <v-img :src="`http://localhost:7770/${path}`" height="150px" />
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
    async uploadNews() {
      console.log('uploadNews method called.');
      try {
        const formData = new FormData();
        formData.append('url', this.news.url);
        this.news.images.forEach((image, index) => {
          formData.append(`images[${index}]`, image);
        });

        const response = await axios.post('http://localhost:7770/addNews/uploads/image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        console.log(response.data);
        alert('News and images uploaded successfully!');
        this.fetchImg(); // Reload images after upload
      } catch (error) {
        console.error(error);
        alert('Failed to upload news and images.');
      }
    },
    async fetchImg() {
      console.log('fetchImg method called.');
      try {
        const res = await axios.get('http://localhost:7770/getsNews');
        this.imgs = res.data.result;
        console.log(this.imgs);
      } catch (error) {
        console.log('Error: ' + error);
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
        const response = await axios.delete(`http://localhost:7770/deleteNews/${this.deleteImgId}`);
        console.log(response.data);
        // Remove the deleted image from imgs array to update UI
        this.imgs[this.deleteIndex].filePath.splice(this.deleteIndex, 1);
        this.dialog = false; // Close dialog
        alert('Image deleted successfully!');
      } catch (error) {
        console.error('Error deleting image:', error);
        alert('Failed to delete image.');
      }
    },
  },
  mounted() {
    console.log('Component mounted.');
    this.fetchImg(); // Call fetchImg when the component is mounted
  }
};
</script>

<style scoped>
/* Your scoped styles here */
</style>
