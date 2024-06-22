<template>
  <v-app>
    <v-main>
      <staff-layout>
        <v-container class="font-noto-sans-thai">
          <v-card class="rounded-3xl">
            <v-card-title>จัดการผลงานวิจัย</v-card-title>
            <v-card-text>
              <v-data-table :headers="headers" :items="researches.result" class="elevation-1">
                <template v-slot:[`item.actions`]="{ item }">
                  <v-container class="flex justify-center align-center">
                    <v-icon small class="mr-2" @click="editResearch(item)">mdi-pencil</v-icon>
                    <v-icon small class="mr-2" @click="toggleVisibility(item)">{{ item.visible ? 'mdi-eye' :
                      'mdi-eye-off' }}</v-icon>
                    <v-icon small @click="deleteResearch(item)">mdi-delete</v-icon>
                  </v-container>
                </template>
              </v-data-table>
              <v-btn @click="createResearch" class="my-4 bg-slate-800 text-white">เพิ่มผลงานวิจัย</v-btn>
            </v-card-text>
          </v-card>
          <v-dialog v-model="dialog" max-width="800px">
            <v-card class="rounded-xl">
              <v-card-title>{{ isEdit ? 'แก้ไขผลงานวิจัย' : 'สร้างผลงานวิจัย' }}</v-card-title>
              <v-card-text>
                <v-form>
                  <v-text-field label="ชื่อผลงาน" variant="solo-filled"
                    v-model="currentResearch.nameOnMedia"></v-text-field>
                  <v-autocomplete variant="solo-filled" flat label="หมวดหมู่" v-model="currentResearch.industryType"
                    :items="[
                      'เครื่องสำอาง',
                      'การเกษตรและเทคโนโลยีชีวภาพ',
                      'การแปรรูปอาหาร',
                      'เชื้อเพลิงชีวภาพและเคมีชีวภาพ',
                      'การแพทย์ครบวงจร',
                      'สร้างสรรค์',
                      'อิเล็กทรอนิกส์อัจฉริยะ',
                      'หุ่นยนต์',
                      'ดิจิตอล',
                      'การท่องเที่ยวกลุ่มรายได้ดีและการท่องเที่ยวเชิงสุขภาพ',
                      'การบินและระบบขนส่ง',
                      'ยานยนต์สมัยใหม่',
                    ]"></v-autocomplete>
                  <v-textarea label="เนื้อหา" variant="solo-filled" v-model="currentResearch.descripton"></v-textarea>
                  <v-textarea label="จุดเด่น" variant="solo-filled" v-model="currentResearch.hilight"></v-textarea>
                  <v-combobox v-model="currentResearch.inventor" label="ผู้คิดค้น" chips multiple></v-combobox>
                  <v-file-input label="อัปโหลดรูปภาพ" variant="solo-filled" @change="uploadImage"
                    alt="IMG"></v-file-input>

                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="red darken-1" variant="tonal" class="" text @click="dialog = false">ยกเลิก</v-btn>
                <v-btn color="green darken-1" variant="tonal" text @click="saveResearch">{{ isEdit ? 'บันทึก' : 'สร้าง'
                  }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-container>
      </staff-layout>
      <div class="text-center">
        <v-snackbar v-model="snackbar.show" :color="snackbar.color">
          <p>{{ snackbar.message }}</p>

          <template v-slot:actions>
            <v-btn color="white" variant="text" @click="snackbar.show = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </div>
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
      snackbar: {
        show: false,
        message: "",
        color: "success", // Default color
      },
      headers: [
        { title: 'ชื่อผลงาน', value: 'nameOnMedia' },
        { title: 'หมวดหมู่', value: 'industryType' },
        { title: 'ผู้จัดทำ', value: 'inventor' },
        { title: 'Actions', align: 'center', value: 'actions', sortable: false }
      ],
      researches: [],
      currentResearch: {
        nameOnMedia: '',
        inventor: [],
        major: '',
        descripton: '',
        intelProp: '',
        industryType: '',
        filePath: [],
        hilight: '',
        techReadiness: '',
        coop: '',
        link: '',
        status: '',
        ipType: '',
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
        nameOnMedia: '',
        inventor: [],
        major: '',
        descripton: '',
        intelProp: '',
        industryType: '',
        filePath: [],
        hilight: '',
        techReadiness: '',
        coop: '',
        link: '',
        status: '',
        ipType: '',
        visible: true
      };
    },

//  Add and Edit Research ===============================================================================
    async saveResearch() {
      try {
        if (this.isEdit) {
          await axios.patch(`http://localhost:7770/staff/updateResearchData/${this.currentResearch._id}`,
            this.currentResearch
            , {
              headers: {
                Authorization: localStorage.getItem('token'),
              },
            });
          this.snackbar.message = "Edit research successfully";
          this.snackbar.color = "success"; // Set success color
          this.snackbar.show = true;
        } else {
          await axios.post('/api/researches', this.currentResearch);
        }
        this.fetchResearches();
      } catch (error) {

        console.error(error);
        this.snackbar.message =
          "Error Edit research user(ข้อมูลยังไม่แก้ไข โปรดลองอีกครั้ง): " +
          error.message;
        this.snackbar.color = "error"; // Set error color
        this.snackbar.show = true;
      }
      this.dialog = false;
      this.resetCurrentResearch();
    },
// =====================================================================================================

// Delete Research =====================================================================================================
    async deleteResearch(item) {
      try {
        await axios.delete(`http://localhost:7770/staff/deleteResearch/research/${item._id}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        this.fetchResearches();
      } catch (error) {
        console.error(error);
      }
    },
// =====================================================================================================
   
async uploadImage(event) {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        try {
          const response = await axios.post('/api/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          this.currentResearch.image = response.data.url;
        } catch (error) {
          console.error(error);
        }
      }
    },



      // get research data funnctions
    async fetchResearches() {
      try {
        const response = await axios.get('http://localhost:7770/getsResearch/all/all/all');
        this.researches = response.data;
        console.log(this.researches)
      } catch (error) {
        console.error(error);
        alert(error)
      };
    }

  },


  // get research data when loaded website
  async created() {
    this.fetchResearches();
  }
}

</script>

<style scoped></style>
