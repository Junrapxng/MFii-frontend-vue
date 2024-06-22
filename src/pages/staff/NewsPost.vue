<template>
  <v-app>
    <v-main>
      <staff-layout>
        <v-container>
          <v-card>
            <v-card-title>สร้างโพสข่าวสาร</v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field label="หัวข้อ" v-model="news.title"></v-text-field>
                <v-textarea label="เนื้อหา" v-model="news.content"></v-textarea>
                <v-btn @click="submitNews">บันทึก</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-container>

        <v-container>
          <v-form @submit.prevent="uploadImage">
            <v-file-input v-model="newImage" label="Choose an image"></v-file-input>
            <v-btn type="submit" color="primary">Upload</v-btn>
          </v-form>
        </v-container>
        <v-container>
          <v-img v-for="img in imgs" :key="img.id" :src="img.url" alt="Image"></v-img>
          <v-btn @click="deleteImage(img.id)" color="error">Delete</v-btn>
        </v-container>




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
      newImage: null,
      news: {
        title: "",
        content: "",
      },
      imgs: []
    };
  },
  methods: {
    submitNews() {
      // logic to submit news
    },
    
    async uploadImage() {
      try {
        // Assume your API endpoint for uploading images
        const formData = new FormData();
        formData.append('image', this.newImage);

        // Make POST request to upload image
        const response = await fetch('http://localhost:7770/upload', {
          method: 'POST',
          body: formData
        });

        // Handle response as needed
        console.log('Image uploaded successfully');
        // Optionally, refresh images after successful upload
        this.loadImages(); // Assume this method loads images from API
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    },
    // Add more methods for API operations (delete, update)


    async fetchImg() {
      try {
        const res = await axios.get('http://localhost:7770/getsNews')
        this.imgs = res.data.result
        console.log(this.imgs);
      } catch (error) {
        console.log("Error" + error);
      }
    }
  },

  created() {
    this.fetchImg()
  }
};
</script>

<style scoped></style>
