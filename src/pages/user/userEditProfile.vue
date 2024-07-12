<!-- src/components/Profile.vue -->
<template>
  <v-app>
    <NavBar></NavBar>
    <main>
      <v-container class="font-noto-sans-thai pa-4 my-15">
        <v-row justify="center">
          <v-col cols="12" md="8" lg="6">
            <v-card class="rounded-xl bg-gray-300 px-2 py-2">
              <v-card-title class="headline primary white--text">
                แก้ไขข้อมูลส่วนตัว
              </v-card-title>
              <v-card-text>
                <v-form @submit.prevent="saveProfile" ref="form">
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field variant="solo-filled" v-model="user.firstName" label="ชื่อ"
                        prepend-inner-icon="mdi-account" :rules="[rules.required, rules.notEmpty]"
                        required></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6">
                      <v-text-field variant="solo-filled" v-model="user.lastName" label="นามสกุล"
                        prepend-inner-icon="mdi-account" :rules="[rules.required, rules.notEmpty]"
                        required></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6">
                      <v-text-field variant="solo-filled" v-model="user.email" label="อีเมล"
                        prepend-inner-icon="mdi-email" :rules="[rules.required, rules.email, rules.notEmpty]"
                        required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field variant="solo-filled" v-model="user.phoneNumber" label="เบอร์โทรศัพท์"
                        prepend-inner-icon="mdi-phone"
                        :rules="[rules.required, rules.phone, rules.notEmpty]"></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-autocomplete variant="solo-filled" label="ประเภทธุรกิจ" v-model="user.businessType"
                        :items="['บุคคลธรรมดา', 'นิติบุคคล']" :rules="[rules.required]" required></v-autocomplete>

                      <v-text-field variant="solo-filled" v-model="user.businessName" label="ชื่อกิจการ"
                         :rules="[rules.required, rules.notEmpty]"
                        required></v-text-field>
                    </v-col>
                    
                    <v-col cols="12" class="text-center">
                      <v-btn type="submit" color="success rounded-xl w-full" class="mr-2">บันทึก</v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

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

    </main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import { useUserStore } from '@/stores/user';
import { api } from "../../axios";
export default {
  name: 'user-profile-page',
  data() {
    return {
      snackbar: {
        show: false,
        message: "",
        color: "success", // Default color
      },
      user: [],
      profile: {
        name: '',
        email: '',
        phone: '',
        picture: ''
      },
      rules: {
        required: value => !!value || 'กรุณากรอกข้อมูล',
        email: value => {
          const emailPattern = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+(com|co\.th|ac\.th|net|in\.th|mfu\.ac\.th|org|edu|gov|co\.[a-zA-Z]{2}|uk|de|fr|jp|cn|us|au|info|biz|io|me|tv|ca|nl|it|br|ru|es)$/;



          if (!emailPattern.test(value)) {
            return 'โปรดกรอกอีเมลให้ถูกต้อง';
          }

          // Return true or undefined if the email is valid
          return true;
        },

        phone: value => /^\d{9,10}$/.test(value) || 'หมายเลขโทรศัพท์ต้องเป็นตัวเลข 9 หรือ 10 หลัก',
        notEmpty: value => (value && value.trim().length > 0) || 'ช่องนี้ไม่สามารถเว้นว่างได้'
      }
    }
  },
  methods: {

    async validateForm() {
      const { valid } = await this.$refs.form.validate()
      return valid
    },


    async saveProfile() {
      if (await this.validateForm()) {
        try {
          await api.patch('/user/updatePatch', this.user, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          this.snackbar.message = "User Edited successfully";
          this.snackbar.color = "success"; // Set success color
          this.snackbar.show = true;
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        } catch (error) {
          let errorMessage = "An unexpected error occurred";
          let errorCode = "Unknown";
          let errorDetails = "";
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            const errorDesc = error.response.data.description;
            if (errorDesc && (errorDesc.code === 40107 || errorDesc.code === 40102)) {
              // Handle specific error codes
              errorMessage = errorDesc.code === 40107 ? errorDesc.description : errorDesc.description;
              errorCode = errorDesc.code;
              setTimeout(function () {
                window.location.reload();
              }, 1000);
            } else {
              errorMessage = errorDesc?.description || error.response.data.message || "Server error";
              errorCode = error.response.status;
            }
          } else if (error.request) {
            // The request was made but no response was received
            errorMessage = "ไม่มีการตอบกลับจากเซิฟเวอร์ หรือ เซิฟเวอร์ผิดผลาด";
          } else if (error.code === 'ERR_NETWORK') {
            // Network error
            errorMessage = "Network Error";
            errorCode = error.code;
          } else {
            // Something happened in setting up the request that triggered an Error
            errorMessage = error.message;
          }
          // Add more detailed error information
          errorDetails = `${error.name}: ${error.message}`;
          // Log the error
          console.error(`Error : ${errorDetails}`, error);

          this.snackbar = {
            message: `Error: ${errorMessage}${errorCode !== "Unknown" ? ` (Code: ${errorCode})` : ''}`,
            color: "error",
            Errcode: errorCode,
            show: true
          };
        }
      } else {
        this.snackbar.message = "กรุณากรอกข้อมูลให้ครบถ้วน";
        this.snackbar.color = "error"; // Set error color
        this.snackbar.show = true;
      }
    },


    async getUser() {
      const userStore = useUserStore();
      try {
        this.user = userStore.user.resutl
      } catch (error) {
        if (!error.response) {
          this.snackbar.message = "Error getting user: " + error;
        } else {
          this.snackbar.message = "Error getting user: " + error.response.data.description.description + " Code: " + error.response.status;
        }
        this.snackbar.color = "error"; // Set error color
        this.snackbar.show = true;
      }

    },
  },
  created() {
    this.getUser();
  }

}
</script>

<style scoped>
.v-avatar {
  margin-bottom: 20px;
  cursor: pointer;
  border: 2px solid #ddd;
  transition: border-color 0.3s ease;
}

.profile-avatar:hover {
  border-color: #aaa;
}

.v-card-title {
  display: flex;
  justify-content: center;
  align-items: center;

}
</style>
