<template>
  <div class="mb-10 mt-3">
    <div class="header flex-wrap">
      <!-- Logo, Title, and Buttons Section -->
      <v-row>
        <!-- Logo column -->
        <v-col cols="12" lg="9" md="9" sm="9">
          <v-container
            class="header-title flex justify-start items-center font-noto-sans-thai p-0"
          >
            <div class="head-logo mb-2 mb-md-0">
              <a
                href="/"
                title="มหาวิทยาลัยแม่ฟ้าหลวง Mae Fah Luang University"
              >
                <v-img
                  :width="120"
                  cover
                  src="../assets/mfu_logo.png"
                  alt="มหาวิทยาลัยแม่ฟ้าหลวง Mae Fah Luang University"
                ></v-img>
              </a>
            </div>
            <!-- Title and subtitle column -->
            <div class="title text-center text-md-left">
              <h1 class="text-2xl md:text-3xl">
                ฝ่ายจัดการทรัพย์สินทางปัญญา มหาวิทยาลัยแม่ฟ้าหลวง
              </h1>
              <h2 class="text-xl md:text-2xl">
                MFU Intellectual Property Management and Technology Transfer
              </h2>
            </div>
          </v-container>
        </v-col>

        <!-- Register and login buttons column -->
        <v-col
          cols="12"
          lg="3"
          md="3"
          sm="3"
          class="font-noto-sans-thai"
        >
          <v-container class="p-0 m-0">
            <search-component  class="btn-search"></search-component>
            <router-view></router-view>
            <!-- <v-text-field
                    v-model="search"
                    density="comfortable"
                    placeholder="Search"
                    prepend-inner-icon="mdi-magnify"
                    style="max-width: 270px"
                    variant="solo"
                    clearable
                    @click:clear="clearSearch"
                    hide-details
                    rounded 
                    class="py-3 btn-search"
                  ></v-text-field> -->
            <!-- if user not loggedin -->
            <v-container
              v-if="userStore.error || userStore.loading"
              class="p-0 m-0"
            >
              <v-btn
                class="mr-2  bg-black text-white rounded-xl border w-32 h-14 btn-nav"
                to="/register"
                >สมัครสมาชิก</v-btn
              >
              <v-btn
                class="ml-2 text-black rounded-xl border border-black w-32 h-14 btn-nav"
                to="/login"
                >เข้าสู่ระบบ</v-btn
              >
            </v-container>

            <!-- if user loggedin -->
            <v-container v-if="!userStore.loading && !userStore.error"
            class="flex align-center justify-center p-0">
                  <h1 class=" mx-4">
                    สวัสดี, คุณ {{ userStore.user.resutl.firstName }}
                    {{ userStore.user.resutl.lastName }}
                  </h1>

                  <v-menu transition="slide-x-transition">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        v-bind="props"
                        icon
                        size="48px"
                        class="hover:bg-gray-200"
                      >
                        <v-avatar size="48px">
                          <v-icon
                            v-if="!userStore.user.resutl.img"
                            icon="mdi-account-circle"
                            size="58px"
                          ></v-icon>
                          <v-img
                            v-else
                            alt="John"
                            src="https://cdn.vuetifyjs.com/images/john.jpg"
                            cover
                          ></v-img>
                        </v-avatar>
                      </v-btn>
                    </template>

                    <v-list>
                      <router-link
                        v-if="userStore.user.resutl.role === 'staff'"
                        to="/staff"
                      >
                        <v-list-item>
                          <v-list-item-title>Staff Page</v-list-item-title>
                        </v-list-item>
                      </router-link>
                      <router-link
                        v-if="userStore.user.resutl.role === 'admin'"
                        to="/admin"
                      >
                        <v-list-item>
                          <v-list-item-title>Admin Page</v-list-item-title>
                        </v-list-item>
                      </router-link>
                      <router-link
                        v-if="userStore.user.resutl.role === 'user'"
                        to="/profile"
                      >
                        <v-list-item>
                          <v-list-item-title>Edit Profile</v-list-item-title>
                        </v-list-item>
                      </router-link>
                      <v-list-item @click="logoutBtn">
                        <v-list-item-title>Logout</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
            </v-container>
          </v-container>
        </v-col>
      </v-row>
    </div>

    <!-- Header Menu Bar -->
    <v-app-bar
      :elevation="2"
      app
      color="#D02630"
      class="font-noto-sans-thai mt-36"
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
              :to="item.route"
              v-else
            >
              {{ item.title }}
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
import { useUserStore } from "@/store/user";
import SearchComponent from '../components/SearchComponent.vue';
export default {
  name: "NavBar",
  components: {
    SearchComponent
  },
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

    logoutBtn() {
      localStorage.removeItem("token");
      this.$router.push("/").then(() => {
        window.location.reload();
      });
    },
  },
  // fetch User prom state management
  setup() {
    const userStore = useUserStore();
    userStore.fetchUser();
    return { userStore };
  },
};
</script>

<style scoped>
.font-noto-sans-thai {
  font-family: "Noto Sans Thai", sans-serif;
}

@media (max-width: 1200px) {
  .text-3xl {
    font-size: 10px;
  }
  .text-2xl {
    font-size: 24px;
  }
  .text-xl {
    font-size: 16px;
  }
  .btn-nav {
    width: 95px; 
    height: 40px; 
    font-size: 12px;
  }
  .v-app-bar {
    margin-top: 15%;
  }
}

@media (max-width: 900px) {
  .text-3xl {
    font-size: 10px;
  }
  .text-2xl {
    font-size: 20px;
  }
  .text-xl {
    font-size: 14px;
  }
  .header {
    display: block;
  }
  .head-logo {
    justify-content: center;
    display: flex;
    margin-bottom: 10px;
  }
  /* .btn-top {
    display: block;
    justify-content: center; 
    align-items: center; 
  } */
  .btn-nav {
    width: 79px; 
    height: 40px; 
    font-size: 10px;
  }
  .v-app-bar {
    margin-top: 20%;
  }
}

@media (max-width: 600px) {
  .text-3xl {
    font-size: 20px;
    margin-bottom: 10px;
  }

  .text-2xl {
    font-size: 16px;
    margin-bottom: 4px;
  }

  .text-xl {
    font-size: 10px;
    margin-bottom: 3px;
  }

  .head-logo {
    justify-content: center;
    display: flex;
    margin-bottom: 5px;
  }

  .header-title {
    display: block;
  }

  .v-app-bar {
    margin-top: 75%;
  }
}

/* .v-app-bar {
    margin-top: 10%;
  } */
</style>
