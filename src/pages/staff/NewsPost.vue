<template>
  <v-app>
    <v-main>
      <staff-layout>
        <v-container>
          <v-card>
            <v-card-title>สร้างโพสข่าวสาร</v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="หัวข้อ"
                  v-model="news.title"
                ></v-text-field>
                <v-textarea label="เนื้อหา" v-model="news.content"></v-textarea>
                <v-btn @click="submitNews">บันทึก</v-btn>
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
        title: "",
        content: "",
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
