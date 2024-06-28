<template>
  <v-app>
    <NavBar></NavBar>

    <v-main>
      <v-container>
        <v-row>
          <v-col col="7" md="7" lg="7" sm="12">
            <!-- <div id="c16127" class="frame frame-default frame-type-header frame-layout-0"> -->
            <header>
              <h2
                class="font-noto-sans-thai py-3"
                style="font-weight: 600; font-size: 35px"
              >
                ติดต่อเรา
              </h2>
            </header>

            <div
              id="c17556"
              class="frame frame-default frame-type-html frame-layout-0"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4109.340290300189!2d99.89215215071464!3d20.044947186473486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30d700048c69def1%3A0xa20592e502bc20c9!2sMae%20Fah%20Luang%20University!5e1!3m2!1sen!2sth!4v1573545998005!5m2!1sen!2sth"
                width="100%"
                height="450"
                frameborder="0"
                style="border: 0"
                allowfullscreen=""
              ></iframe>
            </div>

            <div
              id="c17557"
              class="frame frame-default frame-type-text frame-layout-0"
            >
              <p
                class="font-noto-sans-thai py-2"
                style="font-weight: 500; font-size: 18px"
              >
                <span
                  >ฝ่ายจัดการทรัพย์สินทางปัญญา มหาวิทยาลัยแม่ฟ้าหลวง<br />
                  333 ม.1 ต.ท่าสุด อ.เมือง จ.เชียงราย 57100<br />
                  โทรศัพท์ 0 5391 7014 หรือ 0 5391 7182<br />
                  อีเมล: mfii@mfu.ac.th</span
                >
              </p>
            </div>
          </v-col>
          <v-col col="5" md="5" lg="5" sm="12">
            <header>
              <h
                class="font-noto-sans-thai py-3 text-center justify-center d-flex"
                style="font-weight: 600; font-size: 28px"
              >
                ขอข้อมูลเพิ่มเติมเกี่ยวกับเทคโนโลยี
              </h>
            </header>
            <v-container
              class="font-noto-sans-thai rounded-xl flex justify-center items-center min-h-fit min-w-full bg-gray-100"
            >
              <v-card class="w-full max-w-full rounded-xl ">
                <v-card-text>
                  <v-form>
                    <v-row>
                      <v-col cols="12" lg="6" md="6" sm="12">
                        <div>
                          <v-text-field
                            v-model="form.firstName"
                            label="ชื่อ"
                            variant="outlined"
                            outlined
                            color="#BA984C"
                            :rules="[(v) => !!v || 'กรุณากรอก ชื่อ']"
                            required
                          ></v-text-field>
                        </div>
                        <div>
                          <v-text-field
                            v-model="form.lastName"
                            label="นามสกุล"
                            variant="outlined"
                            outlined
                            color="#BA984C"
                            :rules="[(v) => !!v || 'กรุณากรอก นามสกุล']"
                            required
                          ></v-text-field>
                        </div>
                      </v-col>
                      <v-col cols="12" lg="6" md="6" sm="12">
                        <div>
                          <v-text-field
                            v-model="form.phone"
                            label="เบอร์โทรศัพท์"
                            variant="outlined"
                            outlined
                            color="#BA984C"
                            :rules="[
                              (v) => !!v || 'กรุณากรอก เบอร์โทรศัพท์',
                              (v) =>
                                /^\d{10}$/.test(v) ||
                                'กรุณากรอกเบอร์โทรศัพท์ 10 หลัก',
                            ]"
                            required
                          ></v-text-field>
                        </div>
                        <div>
                          <v-text-field
                            v-model="form.email"
                            label="อีเมล"
                            variant="outlined"
                            outlined
                            color="#BA984C"
                            :rules="[
                              (v) => !!v || 'กรุณากรอก อีเมล',
                              (v) =>
                                /.+@.+\..+/.test(v) ||
                                'กรุณากรอกอีเมลให้ถูกต้อง',
                            ]"
                            required
                          ></v-text-field>
                        </div>
                      </v-col>

                      <v-col cols="12" md="12" lg="12">
                        <div>
                          <h1>ประเภทธุรกิจ</h1>
                          <v-radio-group
                            inline
                            :rules="[(v) => !!v || 'กรุณาเลือก ประเภทธุรกิจ']"
                            color="#BA984C"
                            required
                          >
                            <v-radio
                              label="บุคคลธรรมดา "
                              value="บุคคลธรรมดา "
                              v-model="form.businessType"
                            ></v-radio>
                            <v-radio
                              label=" นิติบุคคล"
                              value="นิติบุคคล"
                              v-model="form.businessType"
                            ></v-radio>
                          </v-radio-group>
                        </div>

                        <div>
                          <v-text-field
                            v-model="form.businessName"
                            label="ระบุ ชื่อกิจการ"
                            variant="outlined"
                            outlined
                            color="#BA984C"
                            :rules="[(v) => !!v || 'กรุณากรอก ชื่อกิจการ']"
                            required
                          ></v-text-field>
                        </div>
                        <div>
                          <v-text-field
                            v-model="form.interestTech"
                            label="เทคโนโลยีที่สนใจ "
                            variant="outlined"
                            outlined
                            color="#BA984C"
                            :rules="[(v) => !!v || 'กรุณากรอก เทคโนโลยีที่สนใจ']"
                            required
                          ></v-text-field>
                        </div>
                        <div>
                          <v-text-field
                            v-model="form.scope"
                            label="ขอบเขตการใช้ผลงาน"
                            variant="outlined"
                            outlined
                            color="#BA984C"
                            :rules="[(v) => !!v || 'กรุณากรอก ขอบเขตการใช้ผลงาน']"
                            required
                          ></v-text-field>
                        </div>
                        <div class="text-center">
                          <v-btn class="bg-red-600 text-white" type="submit" @click="sendRequest"
                            >ส่ง</v-btn
                          >
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
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import axios from 'axios';
export default {
  name: "contact-page",
  data() {
    return {
      form: {
        email: "",
        phone: "",
        firstName: "",
        lastName: "",
        businessType: "",
        businessName: "",
        interestTech: "",
        scope: "",
        messageReply: [ {
          
        "messages": "asdqweqweasdasdsad.",
        "date": "2024-06-27T14:30:00Z"
    },]
      },
    };
  },

methods: {
 async sendRequest(){
    try {
      const response = await axios.post('http://localhost:7770/user/mesRequest', this.form ,{
        headers: {
            Authorization: localStorage.getItem("token"),
          },
      })
      alert("Success");
      console.log(response);
    } catch (error) {
      alert(error)
    }
  }
},
};


</script>

<style scoped></style>
