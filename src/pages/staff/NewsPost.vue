<template>
  <v-app>
    <v-main>
      <staff-layout>
        <v-container>
          <v-card class="rounded-xl pa-4">
            <v-card-title>สร้างโพสข่าวสาร</v-card-title>
            <p class="ml-14 text-red-500">อัพโหลดรูปภาพขนาด 2048 X 799 </p>
            <v-card-text>
              <v-form @submit.prevent="addNews">
                <v-text-field v-model="news.linkVideo" label="URL video" clearable prepend-icon="mdi-youtube"
                  variant="solo-filled"></v-text-field>
                <v-text-field v-model="news.linkImage" label="URL Images" clearable prepend-icon="mdi-web"
                  variant="solo-filled"></v-text-field>
                <v-file-input v-model="news.images" label="Upload Images" chips show-size variant="solo-filled"
                  accept="image/*" :rules="[fileSizeRule]"></v-file-input>
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
                  <v-card class="hover:shadow-lg transition-shadow rounded-lg my-1 mx-1" style="max-width: 400px">
                    <v-img v-if="img.filePath.length > 0" :src="`${baseUrl}/${img.filePath[0]}`" height="150px" cover />
                    <v-img v-else-if="img.linkImage.length > 0" :src="`${img.linkImage}`" height="150px" cover />
                    <iframe v-else-if="img.linkVideo.length > 0" :src="`${img.linkVideo}`" height="150px"
                      class="w-full"></iframe>
                    <p v-else>No media available</p>
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

        <!-- <v-container fluid style="width: 70%">
          <v-carousel class="myCarousel" hide-delimiter-background height="400">
            <v-carousel-item v-for="(item, index) in imgs" :key="index">
              <v-sheet class="d-flex align-center justify-center" height="100%" elevation="10">
                <iframe v-if="item.linkVideo.length > 0" 
                        class="video-iframe w-full h-full" 
                        :src="`${item.linkVideo}`" 
                        :title="item.title" 
                        frameborder="0"
                        allowfullscreen
                        ></iframe>
                <v-img v-else-if="item.filePath.length > 0"
                      :src="`http://localhost:7770/${item.filePath}`"
                      :alt="item.title"></v-img>
                 <v-img v-else-if="item.linkImage.length > 0"
                      :src="`${item.linkImage}`"
                      :alt="item.title"></v-img>
                <p v-else>No media available</p>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </v-container> -->


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
import { api, url } from "../../axios";
import StaffLayout from "@/layouts/staff.vue";

export default {
  name: "staff-newPost-page",
  components: {
    StaffLayout,
  },
  data() {
    return {
      baseUrl: "",
      snackbar: {
        show: false,
        message: "",
        color: "success", // Default color
      },
      news: {
        linkVideo: [],
        linkImage: [],
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
    // Convert URL Video
    convertToEmbedUrl(url) {
      const videoId = url.split('v=')[1];
      const ampersandPosition = videoId.indexOf('&');
      if (ampersandPosition !== -1) {
        return `https://www.youtube.com/embed/${videoId.substring(0, ampersandPosition)}`;
      }
      return `https://www.youtube.com/embed/${videoId}`;
    },
    async addNews() {
      try {
        if (!this.checkFileSizes()) {
          return;
        }

        const formData = new FormData();

        // Append images if they are not empty
        this.news.images.forEach((image, index) => {
          if (image.size > 0) { // Check if file is not empty
            formData.append(`images[${index}]`, image);
          }
        });

        // Convert video and image links to embed format before appending
        if (this.news.linkVideo.length > 0) {
          formData.append('linkVideo', this.convertToEmbedUrl(this.news.linkVideo));
        }

        if (this.news.linkImage.length > 0) {
          formData.append('linkImage', this.news.linkImage);
        }

        // Check if formData has any files or links before making the request
        if (formData.has('images[0]') || formData.has('linkVideo') || formData.has('linkImage')) {
          const response = await api.post('/staff/addNews', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: localStorage.getItem("token"),
            }
          });

          console.log(response.data);
          this.fetchImg(); // Reload images after upload
          this.news.images = [];
          this.news.linkVideo = '';
          this.news.linkImage = '';
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
          this.snackbar.message = "Error adding News: " + error.response.data.description + " Code: " + error.response.status;
        }
        this.snackbar.color = "error"; // Set error color
        this.snackbar.show = true;
      }
    },

    async fetchImg() {
      console.log('fetchImg method called.');
      try {
        const res = await api.get('/getsNews');
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
        const response = await api.delete(`/staff/deleteNews/news/${this.deleteImgId}`, {
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

    // Check if all files are within the size limit
    checkFileSizes() {
      const maxSize = 2 * 1024 * 1024; // 2 MB
      for (const file of this.news.images) {
        if (file.size > maxSize) {
          this.snackbar.message = `File ${file.name} is too large. Max size is 2MB.`;
          this.snackbar.color = "error";
          this.snackbar.show = true;
          return false;
        }
      }
      return true;
    },

    //File size validation
    fileSizeRule(value) {
      if (value && value.length) {
        const maxSize = 2 * 1024 * 1024; // 2 MB
        for (const file of value) {
          if (file.size > maxSize) {
            return `File ${file.name} is too large. Max size is 2MB.`;
          }
        }
      }
      return true;
    },
  },
  mounted() {
    this.fetchImg(); // Call fetchImg when the component is mounted
    this.baseUrl = url;
  }
};
</script>

<style scoped>
/* Your scoped styles here */
</style>
