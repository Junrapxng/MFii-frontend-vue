<template>
  <v-app>
    <NavBar></NavBar>

    <v-main>
      <v-alert v-if="responseMessage" type="error" icon="mdi-alert-circle-outline">{{
        responseMessage
      }}</v-alert>
      <v-container class="font-noto-sans-thai rounded-xl flex justify-center items-center bg-gray-100 mb-5">
        <v-card class="w-full max-w-2xl rounded-xl p-8">
          <v-card-title>
            <h2 class="text-2xl font-semibold mb-2">
              <v-icon class="align-baseline" style="font-size: 28px">mdi-account-plus</v-icon>
              สมัครสมาชิก
            </h2>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="register" ref="form">
              <div>
                <h1>ประเภทธุรกิจ</h1>
                <v-radio-group :rules="[(v) => !!v || 'กรุณาเลือก ประเภทธุรกิจ']" color="#BA984C"
                  v-model="form.businessType" required>
                  <v-radio label="บุคคลธรรมดา" value="บุคคลธรรมดา"></v-radio>
                  <v-radio label="นิติบุคคล" value="นิติบุคคล"></v-radio>
                </v-radio-group>
              </div>

              <div>
               <div>
                <p class="mb-2 text-warning"> <v-icon color="warning">mdi-alert-circle-outline</v-icon> ถ้าไม่มีให้ใส่เครื่องหมาย - </p>
               </div>
                <v-text-field v-model="form.businessName" label="ระบุ ชื่อกิจการ" variant="outlined" outlined
                  color="#BA984C" :rules="[(v) => !!v || 'กรุณากรอก ชื่อกิจการ']" required></v-text-field>
              </div>
              <v-row>

                <v-col cols="12" md="6">
                  <v-text-field v-model="form.firstName" label="ชื่อ" variant="outlined" outlined color="#BA984C"
                    :rules="[(v) => !!v || 'กรุณากรอก ชื่อ']" required></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field v-model="form.lastName" label="นามสกุล" variant="outlined" outlined color="#BA984C"
                    :rules="[(v) => !!v || 'กรุณากรอก นามสกุล']" required></v-text-field>
                </v-col>

                <div>
                  <p class="text-warning">
                    <v-icon color="warning">mdi-alert-circle-outline</v-icon>
                    ใช้ได้แค่ gmail, hotmail, mfu.ac.th, lamduan.mfu.ac.th
                  </p>
                </div>
                <v-col cols="12" md="6">

                  <v-text-field v-model="form.email" label="อีเมล" prepend-inner-icon="mdi-email-outline"
                    variant="outlined" outlined color="#BA984C" :rules="[rules.required, rules.email]"></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field v-model="form.phone" label="เบอร์โทรศัพท์" prepend-inner-icon="mdi-phone-outline"
                    variant="outlined" outlined color="#BA984C" :rules="[
                      (v) => !!v || 'กรุณากรอก เบอร์โทรศัพท์',
                      (v) =>
                        /^\d{10}$/.test(v) || 'กรุณากรอกเบอร์โทรศัพท์ 10 หลัก',
                    ]" required></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field v-model="form.password" label="รหัสผ่าน"
                    :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'" prepend-inner-icon="mdi-lock-outline" variant="outlined"
                    color="#BA984C" @click:append-inner="showPassword = !showPassword" :rules="[
                      (v) => !!v || 'กรุณากรอก รหัสผ่าน',
                      (v) =>
                        v.length >= 6 || 'กรุณากรอก รหัสผ่าน 6 ตัวอักษรขึ้นไป',
                    ]" required class="mb-4"></v-text-field>
                </v-col>
              </v-row>
              <v-btn class="rounded-xl" type="submit" color="#BA984C" s block>สมัครสมาชิก</v-btn>
              <div class="text-center justify-center pt-5 flex text-base">
                <p>
                  <a class="px-2 hover:underline" style="color: #ba984c" href="/login">เข้าสู่ระบบ</a>
                </p>
                <p class="text-gray-500">หากท่านสมัครสมาชิกไว้แล้ว</p>
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
export default {
  name: "register-page",
  data() {
    return {
      form: {
        email: "",
        phone: "",
        firstName: "",
        lastName: "",
        password: "",
        businessType: "",
        businessName: "",
      },
      showPassword: false, // เพิ่มตรงนี้
      responseMessage: "",
      rules: {
        required: value => !!value || 'กรุณากรอกอีเมล',
        email: value => {
          const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(gmail\.com|hotmail\.com|outlook\.com|lamduan\.mfu\.ac\.th|mfu\.ac\.th)$/i;

          if (!emailPattern.test(value)) {
            return 'โปรดกรอกอีเมลให้ถูกต้อง';
          }

          // Return true or undefined if the email is valid
          return true;
        }

      }
    };
  },
  methods: {
    async register() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        try {
          const response = await api.post("/register", {
            email: this.form.email.trim().toLowerCase(),
            password: this.form.password.trim(),
            firstName: this.form.firstName.trim(),
            lastName: this.form.lastName.trim(),
            phoneNumber: this.form.phone.trim(),
            businessType: this.form.businessType,
            businessName: this.form.businessName.trim(),
            // createDate: createDate, // Set create date
          });
          localStorage.setItem("token", response.data.result.token);
          this.$router.push("/");
        } catch (error) {
          console.error("Error registering:", error);
          this.responseMessage = error;
          if (!error.response) {
            this.responseMessage = "Error registering: " + error;
          } else {
            this.responseMessage = "Error registering: " + error.response.data.description.description + " Code: " + error.response.status;
          }
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
