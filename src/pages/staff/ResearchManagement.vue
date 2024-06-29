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
          <v-dialog v-model="dialog" max-width="1050px">
            <v-card class="rounded-xl">
              <v-card-title>{{ isEdit ? 'แก้ไขผลงานวิจัย' : 'สร้างผลงานวิจัย' }}</v-card-title>
              <v-card-text>
                <v-form>
                  <v-text-field label="ชื่อผลงาน" variant="solo-filled"
                    v-model="currentResearch.nameOnMedia"></v-text-field>
                  <v-combobox v-model="currentResearch.inventor" label="ผู้คิดค้น" chips multiple></v-combobox>
                  <v-text-field label="สำนัก" variant="solo-filled" v-model="currentResearch.major"></v-text-field>

                  <v-autocomplete variant="solo-filled" flat label="หมวดหมู่" v-model="currentResearch.intelProp"
                    :items="[
                      'สิทธิบัตรการประดิษฐ์',
                      'อนุสิทธิบัตร',
                      'สิทธิบัตรออกแบบ',
                      'ลิขสิทธิ์',
                      'ลิขสิทธิ์-โปรแกรมคอมพิวเตอร์',
                      'ผลงานวิจัย',
                      'ต้นแบบ',
                      'อื่น ๆ',
                    ]"></v-autocomplete>
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
                  <v-autocomplete variant="solo-filled" flat label="ความพร้อมของเทคโนโลยี"
                    v-model="currentResearch.techReadiness" :items="[
                      'ระดับการทดลอง',
                      'ระดับต้นแบบ',
                      'ระดับถ่ายทอด',
                    ]"></v-autocomplete>

                  <v-textarea label="เนื้อหา" variant="solo-filled" v-model="currentResearch.description"></v-textarea>
                  <v-textarea label="จุดเด่น" variant="solo-filled" v-model="currentResearch.hilight"></v-textarea>
                  <v-combobox v-model="currentResearch.coop" label="ความร่วมมือที่เสาะหา" chips multiple></v-combobox>
                  <v-text-field label="IP" variant="solo-filled" v-model="currentResearch.ipType"></v-text-field>
                  <v-autocomplete variant="solo-filled" flat label="สถานะ" v-model="currentResearch.status" :items="[
                    'active',
                    'inactive',
                  ]"></v-autocomplete>

                  <v-file-input label="Upload Images" multiple @change="handleFileUpload" accept="image/*"
                    prepend-icon="mdi-camera"></v-file-input>


                  <v-file-input label="Upload PDF" @change="handlePdfUpload" accept="application/pdf"
                    prepend-icon="mdi-file-pdf-box"></v-file-input>

                  <v-container class="flex">
                    <v-card v-for="(img, index) in currentResearch.filePath" :key="index" class="mx-2"
                      style="position: relative;">
                      <template v-if="img.toLowerCase().endsWith('.pdf')">
                        <v-icon size="100" color="red">mdi-file-pdf-box</v-icon>
                        <v-card-text class="text-center">{{ img.split('/').pop() }}</v-card-text>
                      </template>
                      <v-img v-else :src="`http://localhost:7770/${img}`" v-model="currentResearch.filePath"
                        height="250px" width="300px" cover>
                      </v-img>
                      <v-btn v-if="isEdit" @click="markForDeletion(index)"
                        :class="{ 'marked-for-deletion': markedForDeletion.includes(index) }"
                        :icon="markedForDeletion.includes(index) ? 'mdi-check' : 'mdi-delete'"
                        style="position: absolute; top: 5px; right: 5px;">
                      </v-btn>
                    </v-card>
                  </v-container>
                  <!-- <input type="file" @change="handleFileUpload"> -->
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
      markedForDeletion: [],
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
        budgetYear: '2566',
        nameOnMedia: '',
        inventor: [],
        major: '',
        description: '',
        intelProp: '',
        industryType: '',
        filePath: null,
        hilight: '',
        techReadiness: '',
        coop: [],
        link: '',
        status: '',
        ipType: '',
      },
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
    toggleVisibility(item) {
      item.visible = !item.visible;
      // Logic to update visibility
    },
    resetCurrentResearch() {
      this.currentResearch = {
        budgetYear: '',
        nameOnMedia: '',
        inventor: [],
        major: '',
        description: '',
        intelProp: '',
        industryType: '',
        filePath: null,
        hilight: '',
        techReadiness: '',
        coop: [],
        link: '',
        status: '',
        ipType: '',
      };
      this.markedForDeletion = [];
    },
    handleFileUpload(event) {
      this.currentResearch.filePath = Array.from(event.target.files);
    },

    handlePdfUpload(event) {
      this.currentResearch.pdfPath = event.target.files[0];
    },

    //  Add and Edit Research ===============================================================================
    async saveResearch() {
      try {
        const formData = new FormData();
        formData.append('budgetYear', 2566);
        formData.append('nameOnMedia', this.currentResearch.nameOnMedia);
        formData.append('inventor', this.currentResearch.inventor);
        formData.append('major', this.currentResearch.major);
        formData.append('description', this.currentResearch.descripton);
        formData.append('intelProp', this.currentResearch.intelProp);
        formData.append('industryType', this.currentResearch.industryType);
        formData.append('hilight', this.currentResearch.hilight);
        formData.append('techReadiness', this.currentResearch.techReadiness);
        formData.append('coop', this.currentResearch.coop);
        formData.append('link', this.currentResearch.link);
        formData.append('status', this.currentResearch.status);
        formData.append('ipType', this.currentResearch.ipType);

        if (this.currentResearch.filePath.length) {
          this.currentResearch.filePath.forEach((file, index) => {
            formData.append(`file${index + 1}`, file);
          });
        }

        if (this.currentResearch.pdfPath) {
          formData.append('pdf', this.currentResearch.pdfPath);
        }

        // Edit
        if (this.isEdit) {
          try {
            await axios.patch(`http://localhost:7770/staff/updateResearchData/${this.currentResearch._id}`, {
              budgetYear: '2566',
              nameOnMedia: this.currentResearch.nameOnMedia,
              inventor: this.currentResearch.inventor,
              major: this.currentResearch.major,
              description: this.currentResearch.description,
              intelProp: this.currentResearch.intelProp,
              industryType: this.currentResearch.industryType,
              hilight: this.currentResearch.hilight,
              techReadiness: this.currentResearch.techReadiness,
              coop: this.currentResearch.coop,
              link: this.currentResearch.link,
              status: this.currentResearch.status,
              ipType: this.currentResearch.ipType,
            }, {
              headers: {
                Authorization: localStorage.getItem('token'),
              },
            });
            // selected Images delete
            if (this.markedForDeletion.length > 0) {
              const deleteRequests = this.markedForDeletion.map(index => {
                const img = this.currentResearch.filePath[index];
                return axios.patch(`http://localhost:7770/staff/deleteFileResearch/research/${this.currentResearch._id}`, {
                  filePath: img
                }, {
                  headers: {
                    Authorization: localStorage.getItem('token'),
                  },
                });
              });
              await Promise.all(deleteRequests);
            }
            // Add file edit
            await axios.patch(`http://localhost:7770/staff/addFileResearch/${this.currentResearch._id}`, formData, {
              headers: {
                Authorization: localStorage.getItem('token'),
                'Content-Type': 'multipart/form-data'
              },
            });
            this.snackbar.message = "Edit research successfully";
            this.snackbar.color = "success";
          } catch (error) {
            this.snackbar.message = "Error Editing Research : " + error.response.data.description.description + " Code: " + error.response.status;
            this.snackbar.color = "error"; // Set error color
            this.snackbar.show = true;
          }

        } else {
          await axios.post('http://localhost:7770/staff/addResearch', formData, {
            headers: {
              Authorization: localStorage.getItem('token'),
              'Content-Type': 'multipart/form-data'
            },
          });
          this.snackbar.message = "Added research successfully";
          this.snackbar.color = "success";
        }
        this.snackbar.show = true;
        this.fetchResearches();

      } catch (error) {
        console.error("Error adding research:", error);
        this.snackbar.message = "Error : " + error.response.data.description.description + " Code: " + error.response.status;
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
        this.snackbar.message = "Error deleting research: " + error.response.data.description.description + " Code: " + error.response.status;
        this.snackbar.color = "error"; // Set error color
        this.snackbar.show = true;
      }
    },
    markForDeletion(index) {
      if (!this.markedForDeletion.includes(index)) {
        this.markedForDeletion.push(index);
      } else {
        const deletionIndex = this.markedForDeletion.indexOf(index);
        this.markedForDeletion.splice(deletionIndex, 1);
      }
    },

    // =====================================================================================================
    // get research data funnctions
    async fetchResearches() {
      try {
        const response = await axios.get('http://localhost:7770/getsResearch/all/all/all');
        this.researches = response.data;

      } catch (error) {
        console.error("Error fetching research:", error);
        this.snackbar.message = "Error fetching : " + error.response.data.description.description + " Code: " + error.response.status;
        this.snackbar.color = "error"; // Set error color
        this.snackbar.show = true;
      }
    }

  },

  watch: {
    dialog(newValue) {
      if (!newValue) {
        this.markedForDeletion = [];
      }
    }
  },
  // get research data when loaded website
  async created() {
    this.fetchResearches();
  },


}

</script>

<style scoped>
.marked-for-deletion {
  border: 3px solid red;
}
</style>
