<template>
  <v-app>
    <NavBar></NavBar>

    <v-main>
      <v-container
        class="font-noto-sans-thai rounded-xl flex justify-center items-center min-h-screen bg-gray-100"
      >
        <v-card class="w-full max-w-lg rounded-xl p-8">
          <v-card-title>
            <h2 class="text-2xl font-semibold mb-2">
              <v-icon class="align-baseline" style="font-size: 28px"
                >mdi-account</v-icon
              >
              เข้าสู่ระบบ
            </h2>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="register" ref="form">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="form.email"
                    label="อีเมล"
                    variant="outlined"
                    outlined
                    color="#BA984C"
                    :rules="[
                      (v) => !!v || 'กรุณากรอก อีเมล',
                      (v) => /.+@.+\..+/.test(v) || 'กรุณากรอกอีเมลให้ถูกต้อง',
                    ]"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="form.password"
                    label="รหัสผ่าน"
                    :type="showPassword ? 'text' : 'password'"
                    variant="outlined"
                    outlined
                    color="#BA984C"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                    :rules="[
                      (v) => !!v || 'กรุณากรอก รหัสผ่าน',
                      (v) =>
                        v.length >= 6 || 'กรุณากรอก รหัสผ่าน 6 ตัวอักษรขึ้นไป',
                    ]"
                    required
                    class="mb-4"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-btn class="rounded-xl" type="submit" color="#BA984C" s block
                >เข้าสู่ระบบ</v-btn
              >
              <div
                class="text-center justify-space-between pt-5 flex text-base"
              >
                <v-checkbox
                  v-model="checkbox"
                  label="Remember Me"
                  class="text-gray-500"
                ></v-checkbox>
                <p class="mt-3">
                  <a
                    class="hover:underline"
                    style="color: #ba984c"
                    href="/register"
                    >Forgot Password?</a
                  >
                </p>
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
    };
  },
  methods: {
    register() {
      const form = this.$refs.form;
      if (form.validate()) {
        // Handle the registration logic
        console.log(this.form);
      } else {
        console.log("Form is not valid");
      }

      this.showPassword = false;
    },
  },
};
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
