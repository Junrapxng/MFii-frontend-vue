<template>
  <div>
    <div class="header">
      <!-- Logo, Title, and Buttons Section -->
      <v-row>
        <!-- Logo column -->
        <v-col cols="9">
          <v-container class="d-flex justify-start align-center font-noto-sans-thai">
            <div class="head-logo">
              <a
                href="https://mfu.ac.th"
                title="มหาวิทยาลัยแม่ฟ้าหลวง Mae Fah Luang University"
              >
                <v-img
                  :width="130"
                  cover
                  src="../assets/mfu_logo.png"
                  alt="มหาวิทยาลัยแม่ฟ้าหลวง Mae Fah Luang University"
                ></v-img>
              </a>
            </div>
            <v-divider :thickness="10" vertical color="#ff0000" class="border-opacity-100 mx-4 my-2"></v-divider>
            <!-- Title and subtitle column -->
            <div>
              
              <h1 class="text-3xl">
                ฝ่ายจัดการทรัพย์สินทางปัญญา มหาวิทยาลัยแม่ฟ้าหลวง
              </h1>
              <h2 class="text-2xl">
                MFU Intellectual Property Management and Technology Transfer
              </h2>
            </div>
          </v-container>
        </v-col>

        <!-- Register and login buttons column -->
        <v-col
          cols="3"
          class="font-noto-sans-thai head-right"
          style="display: flex; justify-content: center; align-items: center"
        >
          <v-container v-if="!isLoggedIn">
            <v-btn
              class="mr-4 bg-black text-white py-2 px-4 rounded-xl border w-32 h-14"
              to="/register"
              >สมัครสมาชิก</v-btn
            >
            <v-btn
              class="py-2 px-4 text-black rounded-xl border border-black w-32 h-14"
              to="/login"
              >เข้าสู่ระบบ</v-btn
            >
          </v-container>
        </v-col>
      </v-row>
    </div>

    <!-- Header Menu Bar -->
    <v-app-bar
      :elevation="2"
      app
      color="#D02630"
      style="
        background-color: #d02630;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
      "
      class="font-noto-sans-thai mt-40 h-fit w-fit"
    >
      <v-spacer></v-spacer>

      <div class="text-center">
        <v-menu
          v-for="item in menuItems"
          :key="item.title"
          :location="bottom"
          :to="item.route"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              dark
              v-bind="props"
              class="mx-2 rounded-lg hover:bg-white hover:text-red-500"
              v-if="
                item.title !== 'หน้าหลัก' && item.title !== 'ผลงานพร้อมถ่ายทอด'
              "
            >
              <router-link :to="item.route">
                {{ item.title }}
                <v-icon>mdi-menu-down</v-icon>
              </router-link>
            </v-btn>
            <v-btn
              dark
              v-bind="props"
              class="mx-2 rounded-lg hover:bg-white hover:text-red-500"
              v-else
            >
              <router-link :to="item.route">
                {{ item.title }}
              </router-link>
            </v-btn>
          </template>

          <v-list
            v-if="
              item.title !== 'หน้าหลัก' && item.title !== 'ผลงานพร้อมถ่ายทอด'
            "
          >
            <template v-for="subItem in item.subItems">
              <v-menu
                v-if="subItem.subItems && subItem.subItems.length"
                :key="subItem.title"
                :location="bottom"
              >
                <template v-slot:activator="{ props }">
                  <v-list-item v-bind="props">
                    <v-list-item-title
                      :style="{ fontFamily: 'Noto Sans Thai, sans-serif' }"
                    >
                      {{ subItem.title }} <v-icon>mdi-chevron-right</v-icon>
                    </v-list-item-title>
                  </v-list-item>
                </template>

                <v-list>
                  <template v-for="nestedItem in subItem.subItems">
                    <v-menu
                      v-if="nestedItem.subItems && nestedItem.subItems.length"
                      :key="nestedItem.title"
                      :location="bottom"
                    >
                      <template v-slot:activator="{ props }">
                        <v-list-item v-bind="props">
                          <v-list-item-title
                            :style="{
                              fontFamily: 'Noto Sans Thai, sans-serif',
                            }"
                          >
                            {{ nestedItem.title }}
                            <v-icon>mdi-chevron-right</v-icon>
                          </v-list-item-title>
                        </v-list-item>
                      </template>
                      <!-- เพิ่มโค้ดสำหรับ nestedItem ที่อยู่ใน nestedItem ที่นี่ -->
                      <v-list>
                        <template v-for="subNestedItem in nestedItem.subItems">
                          <v-menu
                            v-if="
                              subNestedItem.subItems &&
                              subNestedItem.subItems.length
                            "
                            :key="subNestedItem.title"
                            :location="bottom"
                          >
                            <template v-slot:activator="{ props }">
                              <v-list-item v-bind="props">
                                <v-list-item-title
                                  :style="{
                                    fontFamily: 'Noto Sans Thai, sans-serif',
                                  }"
                                >
                                  {{ subNestedItem.title }}
                                  <v-icon>mdi-chevron-right</v-icon>
                                </v-list-item-title>
                              </v-list-item>
                            </template>
                            <!-- เพิ่มโค้ดสำหรับ subNestedItem ที่อยู่ใน subNestedItem ที่นี่ -->
                          </v-menu>
                          <router-link
                            v-else
                            :key="subNestedItem"
                            :to="subNestedItem.route"
                          >
                            <v-list-item>
                              <v-list-item-title
                                :style="{
                                  fontFamily: 'Noto Sans Thai, sans-serif',
                                }"
                              >
                                {{ subNestedItem.title }}
                              </v-list-item-title>
                            </v-list-item>
                          </router-link>
                        </template>
                      </v-list>
                    </v-menu>
                    <router-link
                      v-else
                      :key="nestedItem"
                      :to="nestedItem.route"
                    >
                      <v-list-item>
                        <v-list-item-title
                          :style="{ fontFamily: 'Noto Sans Thai, sans-serif' }"
                        >
                          {{ nestedItem.title }}
                        </v-list-item-title>
                      </v-list-item>
                    </router-link>
                  </template>
                </v-list>
              </v-menu>
              <router-link v-else :key="subItem" :to="subItem.route">
                <v-list-item>
                  <v-list-item-title
                    :style="{ fontFamily: 'Noto Sans Thai, sans-serif' }"
                  >
                    {{ subItem.title }}
                  </v-list-item-title>
                </v-list-item>
              </router-link>
            </template>
          </v-list>
        </v-menu>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      loggedIn: false,
      menuItems: [
        {
          title: "หน้าหลัก",
          route: "/",
        },
        {
          title: "บริการของเรา",
          subItems: [
            { title: "ยกระดับงานวิจัยและนวัตกรรม ", route: "/services/ups" },
            { title: "ขั้นตอนการขออนุญาติใช้สิทธิ", route: "/services/lap" },
            { title: "อบรมและให้คำปรึกษา ", route: "/services/ipa" },
            { title: "ยื่นขอรับความคุ้มครอง  ", route: "/services/ipp" },
          ],
        },
        {
          title: "ผลงานพร้อมถ่ายทอด",
          route: "/tt/all-categories",
        },
        {
          title: "ข้อมูลแนะนำ",
          subItems: [
            {
              title: "ข้อมูลทรัพย์สินทางปัญญา มฟล.",
              subItems: [
                {
                  title: "ระเบียบข้อบังคับ มฟล.",
                  route: "/recmn/mfii/rule",
                },
                { title: "จัดสรรผลประโยชน์", route: "/recmn/mfii/benefits" },
                { title: "Q&A ", route: "/recmn/mfii/q&a" },
              ],
            },
            {
              title: "ดาวน์โหลดเอกสาร",
              subItems: [
                {
                  title: "แบบฟอร์มขอยื่นจด",
                  route: "/recmn/downloads/request_form",
                },
                { title: "เอกสารการอบรม", route: "/recmn/downloads/training" },
              ],
            },
            {
              title: "ลิ้งค์หน่วยงานที่เกี่ยวข้อง",
              subItems: [
                {
                  title: "ภายใน ",
                  subItems: [
                    { title: "MRii", route: "/recmn/about/inside/MRii" },
                    { title: "MFii", route: "/recmn/about/inside/MFii" },
                    {
                      title: "Research",
                      route: "/recmn/about/inside/research",
                    },
                  ],
                },
                {
                  title: "ภายนอก ",
                  subItems: [
                    { title: "DIP", route: "/recmn/about/outside/DIP" },
                    { title: "WIPO", route: "/recmn/about/outside/WIPO" },
                    { title: "อวท.", route: "/recmn/about/outside/อวท" },
                  ],
                },
              ],
            },
          ],
        },
        {
          title: "เกี่ยวกับเรา",
          subItems: [
            { title: "โครงสร้างองค์กร", route: "/about-us/ip-structure" },
            { title: "บุคลากร", route: "/about-us/ip-staffs" },
            { title: "ติดต่อเรา", route: "/about-us/contact" },
          ],
        },
      ],
    };
  },
  methods: {
    navigateTo(link) {
      this.$router.push(link);
    },
  },
};
</script>

<style scoped>
.font-noto-sans-thai {
  font-family: "Noto Sans Thai", sans-serif;
}

@media (max-width: 768px) {
  .head-logo {
    width: 100%;
    text-align: center;
  }
  .text-3xl {
    font-size: 1.5rem;
  }
  .text-2xl {
    font-size: 1.25rem;
  }
  .head-left,
  .head-right {
    text-align: center;
  }
}
</style>
