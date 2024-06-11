<template>
  <v-app>
    <v-main>
      <staff-layout>
        <v-container>
          <v-card>
            <v-card-title>จัดการผลงานวิจัย</v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="researches"
                class="elevation-1"
              >
                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon small class="mr-2" @click="editResearch(item)"
                    >mdi-pencil</v-icon
                  >
                  <v-icon small @click="deleteResearch(item)"
                    >mdi-delete</v-icon
                  >
                </template>
              </v-data-table>
              <v-btn @click="createResearch">เพิ่มผลงานวิจัย</v-btn>
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
      headers: [
        { text: "ชื่อผลงาน", value: "title" },
        { text: "ผู้จัดทำ", value: "author" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      researches: [],
    };
  },
  methods: {
    createResearch() {
      // logic to create research
    },
    editResearch(item) {
      // logic to edit research
    },
    deleteResearch(item) {
      // logic to delete research
    },
  },
};
</script>

<style scoped></style>
