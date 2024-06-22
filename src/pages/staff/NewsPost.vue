<template>
  <v-app>
    <v-main>
      <staff-layout>
        <v-container>
          <v-card class="rounded-xl pa-4">
            <v-card-title>สร้างโพสข่าวสาร</v-card-title>
            <v-card-text>
              <v-form>
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
                <v-btn @click="submitNews" class=" bg-slate-800 text-white">บันทึก</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-container>
      </staff-layout>
    </v-main>
  </v-app>
</template>

<script>
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
        images: "",
      },
    };
  },
  methods: {
    submitNews() {
      // logic to submit news
    },
  },
};
</script>

<style scoped></style>
