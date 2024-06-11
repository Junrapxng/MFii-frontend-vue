<template>
  <v-app>
    <v-main>
      <staff-layout>
  <v-container class="font-noto-sans-thai">
    <v-card class="rounded-3xl">
      <v-card-title>จัดการผลงานวิจัย</v-card-title>
      <v-card-text>
        <v-data-table :headers="headers" :items="researches" class="elevation-1">
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editResearch(item)">mdi-pencil</v-icon>
            <v-icon small class="mr-2" @click="toggleVisibility(item)">{{ item.visible ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
            <v-icon small @click="deleteResearch(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
        <v-btn @click="createResearch" class="my-4 bg-slate-800 text-white">เพิ่มผลงานวิจัย</v-btn>
      </v-card-text>
    </v-card>
    <v-dialog v-model="dialog" max-width="600px">
      <v-card class="rounded-xl">
        <v-card-title>{{ isEdit ? 'แก้ไขผลงานวิจัย' : 'สร้างผลงานวิจัย' }}</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field label="ชื่อผลงาน" variant="solo-filled" v-model="currentResearch.title"></v-text-field>
            <v-autocomplete variant="solo-filled" flat label="หมวดหมู่" v-model="currentResearch.category" :items="['เกษตรกรรม/การแปรรูป', 'วัสดุ/บรรจุภัณฑ์', 'การท่องเที่ยว/การศึกษา', 'อาหาร/เครื่องดื่ม']"></v-autocomplete>
            <v-textarea label="เนื้อหา" variant="solo-filled" v-model="currentResearch.content"></v-textarea>
            <v-file-input label="อัปโหลดรูปภาพ" variant="solo-filled" v-model="currentResearch.image" @change="uploadImage"></v-file-input>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red darken-1" variant="tonal" class="" text @click="dialog = false">ยกเลิก</v-btn>
          <v-btn color="green darken-1" variant="tonal" text @click="saveResearch">{{ isEdit ? 'บันทึก' : 'สร้าง' }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</staff-layout>
</v-main>
</v-app>
</template>

<script>
  import axios from 'axios';
  import StaffLayout from "@/layouts/staff.vue";
export default {
  name: "staff-ResearchManagement-page",
    components: {
        StaffLayout,
      },
  data() {
    return {
      dialog: false,
      isEdit: false,
      headers: [
        { text: 'ชื่อผลงาน', value: 'title' },
        { text: 'ผู้จัดทำ', value: 'author' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      researches: [],
      currentResearch: {
        title: '',
        category: '',
        content: '',
        image: null,
        visible: true
      }
    }
  },
  methods: {
    createResearch() {
      this.resetCurrentResearch();
      this.isEdit = false;
      this.dialog = true;
    },
    editResearch(item) {
      this.currentResearch = { ...item };
      this.isEdit = true;
      this.dialog = true;
    },
    saveResearch() {
      if (this.isEdit) {
        // Logic to update research
      } else {
        // Logic to create new research
      }
      this.dialog = false;
      this.resetCurrentResearch();
    },
    deleteResearch(item) {
      // Logic to delete research
    },
    toggleVisibility(item) {
      item.visible = !item.visible;
      // Logic to update visibility
    },
    uploadImage(event) {
      const file = event.target.files[0];
      if (file) {
        // Logic to upload image
      }
    },
    resetCurrentResearch() {
      this.currentResearch = {
        title: '',
        content: '',
        image: null,
        visible: true
      };
    },

    // Fetch API ในการเชื่อมต่อกับ backend API เพื่อดึงข้อมูล
    // async fetchResearches() {
    //   try {
    //     const response = await axios.get('/api/researches');
    //     this.researches = response.data;
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
    // async saveResearch() {
    //   try {
    //     if (this.isEdit) {
    //       await axios.put(`/api/researches/${this.currentResearch.id}`, this.currentResearch);
    //     } else {
    //       await axios.post('/api/researches', this.currentResearch);
    //     }
    //     this.fetchResearches();
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
    // async deleteResearch(item) {
    //   try {
    //     await axios.delete(`/api/researches/${item.id}`);
    //     this.fetchResearches();
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
    // async uploadImage(event) {
    //   const file = event.target.files[0];
    //   if (file) {
    //     const formData = new FormData();
    //     formData.append('image', file);
    //     try {
    //       const response = await axios.post('/api/upload', formData, {
    //         headers: {
    //           'Content-Type': 'multipart/form-data'
    //         }
    //       });
    //       this.currentResearch.image = response.data.url;
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   }
    // }
  },
  // created() {
  //   this.fetchResearches();
  // }
}

</script>

<style scoped>
</style>
