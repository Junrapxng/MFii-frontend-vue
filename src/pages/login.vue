<template>
  <v-app>
    <NavBar></NavBar>

    <v-main>
      <v-alert v-if="responseMessage" type="error" icon="mdi-alert-circle-outline">{{
        responseMessage
        }}</v-alert>
      <v-container class="font-noto-sans-thai rounded-xl flex justify-center items-center bg-gray-100 mb-6">
        <v-card class="w-full max-w-lg rounded-xl p-8">
          <v-card-title>
            <h2 class="text-2xl font-semibold mb-2">
              <v-icon class="align-baseline" style="font-size: 28px">mdi-account</v-icon>
              เข้าสู่ระบบ
            </h2>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login" ref="form">
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="form.email" label="อีเมล" prepend-inner-icon="mdi-email-outline"
                    variant="outlined" outlined color="#BA984C" :rules="[
                      (v) => !!v || 'กรุณากรอก อีเมล',
                      (v) => /.+@.+\..+/.test(v) || 'กรุณากรอกอีเมลให้ถูกต้อง',
                    ]" required></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field v-model="form.password" label="รหัสผ่าน" :type="showPassword ? 'text' : 'password'"
                    variant="outlined" outlined color="#BA984C" prepend-inner-icon="mdi-lock-outline"
                    :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append-inner="showPassword = !showPassword" :rules="[
                      (v) => !!v || 'กรุณากรอก รหัสผ่าน',
                      (v) =>
                        v.length >= 6 || 'กรุณากรอก รหัสผ่าน 6 ตัวอักษรขึ้นไป',
                    ]" required class="mb-4"></v-text-field>
                </v-col>
              </v-row>
              <v-btn class="rounded-xl" type="submit" color="#BA984C" s block>เข้าสู่ระบบ</v-btn>
              <!-- <div class="text-center justify-space-between pt-5 flex text-base">
                <v-checkbox v-model="checkbox" label="Remember Me" class="text-gray-500"></v-checkbox>
                <p class="mt-3">
                  <a class="hover:underline" style="color: #ba984c" href="/register">Forgot Password?</a>
                </p>
              </div> -->
              <div class="text-center justify-center pt-5 flex text-base">
                <p>
                  <a class="px-2 hover:underline" style="color: #ba984c" href="/register">สมัครสมาชิก</a>
                </p>
                <p class="text-gray-500">ท่านยังไม่สมัครสมาชิก</p>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>

    <Footer></Footer>
  </v-app>
</template>

<script>
import { api } from "../axios";
import { useUserStore } from "@/stores/user";
export default {
  name: "login-page",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      checkbox: false,
      showPassword: false, // เพิ่มตรงนี้
      responseMessage: "",
    };
  },
  methods: {


    async login() {
      const { valid } = await this.$refs.form.validate();
      const userStore = useUserStore();
      if (valid) {
        try {
          const response = await api.post("/login", {
            email: this.form.email.trim().toLowerCase(),
            password: this.form.password.trim(),
          });
          localStorage.setItem("token", response.data.result.token);
          if (!userStore.user) {
            await userStore.fetchUser();
          }
          if (userStore.user) {
            if (userStore.user.resutl.role === "admin") {
              this.$router.push("/admin");
            } else if (userStore.user.resutl.role === "staff") {
              this.$router.push("/staff");
            } else {
              this.$router.push("/");
            }
          }
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
          this.responseMessage = `Error: ${errorMessage}${errorCode !== "Unknown" ? ` (Code: ${errorCode})` : ''}`;
        }
      } else {
        console.log("Form is not valid");
        this.responseMessage =
          "แบบฟอร์มไม่ถูกต้อง กรุณากรอกข้อมูลในช่องที่ต้องกรอกทั้งหมด"; // Set form validation message
      }
      this.showPassword = false;
    },
  },
};
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
