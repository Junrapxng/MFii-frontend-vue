<template>
  <v-app>
    <NavBar></NavBar>

    <v-main>
      <v-alert v-if="responseMessage" type="error">{{
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
              <v-row>
              
                <v-col cols="12" md="6">
                  <v-text-field v-model="form.firstName" label="ชื่อ" variant="outlined" outlined color="#BA984C"
                    :rules="[(v) => !!v || 'กรุณากรอก ชื่อ']" required></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field v-model="form.lastName" label="นามสกุล" variant="outlined" outlined color="#BA984C"
                    :rules="[(v) => !!v || 'กรุณากรอก นามสกุล']" required></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field v-model="form.email" label="อีเมล" prepend-inner-icon="mdi-email-outline"
                    variant="outlined" outlined color="#BA984C" :rules="[
                      (v) => !!v || 'กรุณากรอก อีเมล',
                      (v) => /.+@.+\..+/.test(v) || 'กรุณากรอกอีเมลให้ถูกต้อง',
                    ]" required></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field v-model="form.phone" label="เบอร์โทรศัพท์" prepend-inner-icon="mdi-phone-outline"
                    variant="outlined" outlined color="#BA984C" :rules="[
                      (v) => !!v || 'กรุณากรอก เบอร์โทรศัพท์',
                      (v) =>
                        /^\d{10}$/.test(v) || 'กรุณากรอกเบอร์โทรศัพท์ 10 หลัก',
                    ]" required></v-text-field>
                </v-col>

                <!-- <v-col cols="6">
                  <h1>เพศ</h1>
                  <v-radio-group inline :rules="[(v) => !!v || 'กรุณาเลือก เพศ']" color="#BA984C" required>
                    <v-radio label="ชาย" value="man" v-model="form.gender"></v-radio>
                    <v-radio label="หญิง" value="women" v-model="form.gender"></v-radio>
                  </v-radio-group>
                </v-col> -->

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
import api from "../axios";
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
      },
      showPassword: false, // เพิ่มตรงนี้
      responseMessage: "",
    };
  },
  methods: {
    async register() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        const options = {
          timeZone: 'Asia/Bangkok',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        };
        const formatter = new Intl.DateTimeFormat('en-GB', options);
        const parts = formatter.formatToParts(new Date());
        const createDate = `${parts.find(p => p.type === 'year').value}-${parts.find(p => p.type === 'month').value}-${parts.find(p => p.type === 'day').value}T${parts.find(p => p.type === 'hour').value}:${parts.find(p => p.type === 'minute').value}:${parts.find(p => p.type === 'second').value}.000Z`;
        try {
          const response = await api.post("/register", {
            email: this.form.email.trim(),
            password: this.form.password.trim(),
            firstName: this.form.firstName.trim(),
            lastName: this.form.lastName.trim(),
            phoneNumber: this.form.phone.trim(),
            businessType: this.form.businessType,
            createDate: createDate, // Set create date
          });
          localStorage.setItem("token", response.data.result.token);
          this.$router.push("/");
        } catch (error) {
          console.error("Error registering:", error);
          this.responseMessage = error;
          if (!error.response) {
            this.snackbar.message = "Error registering: " + error;
          } else {
            this.snackbar.message = "Error registering: " + error.response.data.description.description + " Code: " + error.response.status;
          }
          this.snackbar.color = "error"; // Set error color
          this.snackbar.show = true;
        }
      } else {
        console.log("Form is not valid");
        this.responseMessage =
          "Form is not valid. Please fill out all required fields."; // Set form validation message
      }
      this.showPassword = false;
    },
  },
};
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
