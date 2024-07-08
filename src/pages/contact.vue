<template>
  <v-app>
    <NavBar></NavBar>

    <v-main>
      <v-container>
        <v-row>
          <v-col class="custom-col" col="7" lg="7" md="12" sm="12" xs="12">
            <header>
              <h1 class="font-noto-sans-thai py-3 lg:text-2xl sm:text-xl" style="font-weight: 600; font-size: 35px">
                ติดต่อเรา
              </h1>
            </header>

            <div class="frame frame-default frame-type-html frame-layout-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4109.340290300189!2d99.89215215071464!3d20.044947186473486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30d700048c69def1%3A0xa20592e502bc20c9!2sMae%20Fah%20Luang%20University!5e1!3m2!1sen!2sth!4v1573545998005!5m2!1sen!2sth"
                width="100%" height="450" frameborder="0" style="border: 0" allowfullscreen=""></iframe>
            </div>

            <div class="frame frame-default frame-type-text frame-layout-0">
              <p class="font-noto-sans-thai py-2 lg:text-2xl sm:text-xl" style="font-weight: 500; font-size: 18px">
                <span>ฝ่ายจัดการทรัพย์สินทางปัญญา มหาวิทยาลัยแม่ฟ้าหลวง<br />
                  333 ม.1 ต.ท่าสุด อ.เมือง จ.เชียงราย 57100<br />
                  โทรศัพท์ 0 5391 7014 หรือ 0 5391 7182<br />
                  อีเมล: mfii@mfu.ac.th</span>
              </p>
            </div>
          </v-col>
          <v-col class="custom-col" col="5" lg="5" md="12" sm="12" xs="12">
            <header>
              <h1 class="font-noto-sans-thai py-3 text-center justify-center d-flex"
                style="font-weight: 600; font-size: 28px">
                ขอข้อมูลเพิ่มเติมเกี่ยวกับเทคโนโลยี
              </h1>
            </header>
            <v-container
              class="font-noto-sans-thai rounded-xl flex justify-center items-center min-h-fit min-w-full bg-gray-100">
              <v-card class="w-full max-w-full rounded-xl ">
                <v-card-text>
                  <v-form ref="form" @submit.prevent="sendRequest"  >
                    <v-row>
                      <v-col cols="12" md="12" lg="12">
                        <div>
                          <v-text-field v-model="form.interestTech" label="เทคโนโลยีที่สนใจ " variant="outlined"
                            outlined color="#BA984C" :rules="[v => !!v || 'กรุณากรอก เทคโนโลยีที่สนใจ']"
                            required></v-text-field>
                        </div>
                        <div>
                          <v-text-field v-model="form.usesScope" label="ขอบเขตการใช้ผลงาน" variant="outlined" outlined
                            color="#BA984C" :rules="[v => !!v || 'กรุณากรอก ขอบเขตการใช้ผลงาน']"
                            required></v-text-field>

                          <v-textarea v-model="form.messageReply.messages" label="ข้อความ" variant="outlined" outlined
                            color="#BA984C" :rules="[v => !!v || 'กรุณากรอก ข้อความ']" required></v-textarea>
                        </div>
                        <div class="text-center">
                          <v-btn type="submit" class="bg-red-600 text-white">ส่ง</v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-container>
          </v-col>
        </v-row>
      </v-container>

      <v-snackbar v-model="snackbar.show" :color="snackbar.color" vertical>
        <div class="text-subtitle-1 pb-2" if="code === 410">โปรด <a style="text-decoration: underline;" href="/register">สมัครสมาชิก</a> หรือ <a style="text-decoration: underline;" href="/login"> เข้าสู่ระบบ </a></div>
        <p > </p>  
        <p>{{ snackbar.message }}</p>
        <template v-slot:actions>
          <v-btn color="white" variant="text" @click="snackbar.show = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>

    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import { useUserStore } from '@/stores/user';
import { api } from "../axios";
export default {
  name: "contact-page",
  data() {
    return {
      formValid: false,
      snackbar: {
        show: false,
        message: "",
        Errcode: "",
        color: "success", // Default color
      },
      user: [],
      form: {
        interestTech: "",
        usesScope: "",
        messageReply: {
          "user": "",
          "messages": "",
        },
      },
    };
  },


  methods: {
    async validateForm() {
    const { valid } = await this.$refs.form.validate()
    return valid
  },

    async sendRequest() {
      if (await this.validateForm()) {
          this.form.messageReply.user = this.user._id;
          try {
            const response = await api.post('/user/mesRequest', this.form, {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            });
            this.snackbar.message = "Requested Success!";
            this.snackbar.color = "success";
            this.snackbar.show = true;
            setTimeout(() => {
              window.location.reload();
            }, 1000); // Reloads the page after 2 seconds
          } catch (error) {
            if (!error.response) {
              this.snackbar.message = "Error Sending request: " + error;
            }
            if (error.response.status == 500) {
              this.snackbar.message = "Error Sending request: " + error;
            }
            else {
              this.snackbar.message = "Error Sending request: " + error.response.data.description.description + " Code: " + error.response.status;
              if(error.response.status == 401){
                 this.snackbar.code = "401"
              }
            }
            this.snackbar.color = "error";
            this.snackbar.show = true;
        }
      } else {
        this.snackbar.message = "กรุณากรอกข้อมูลให้ครบถ้วน";
          this.snackbar.color = "error";
          this.snackbar.show = true;
          return;
      }

    },

    //get user
    async getUser() {
      const userStore = useUserStore();
      try {
        if (!userStore.user) {
          await userStore.fetchUser();
        }
        if (userStore.user) {
          this.user = userStore.user.resutl;
        }
      } catch (error) {
        if (!error.response) {
          this.snackbar.message = "Error getting user : " + error;
        } else {
          this.snackbar.message = "Error : " + error.response.data.description.description + " Code: " + error.response.status;

        }
        this.snackbar.color = "error"; // Set error color
        this.snackbar.show = true;
      }
    }
  },

  created() {
    this.getUser()
  },
};


</script>

<style scoped>
@media (max-width: 600px) {
  .custom-col {
    flex: 0 0 100%;
    max-width: 100%;
  }

  span {
    font-size: 14px;
  }
}
</style>
