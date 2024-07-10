<template>
  <!-- <v-container fluid class="mb-10 my-0 "> -->
  <v-container fluid class="header flex-wrap m-0">
    <!-- Logo, Title, and Buttons Section -->
    <v-row>
      <!-- Logo column -->
      <v-col cols="12" lg="9" md="9" sm="9">
        <v-container class="header-title flex justify-start items-center font-noto-sans-thai p-0">
          <div class="head-logo mb-2 mb-md-0">
            <a href="/" title="มหาวิทยาลัยแม่ฟ้าหลวง Mae Fah Luang University">
              <v-img :width="120" cover src="../assets/mfu_logo.png"
                alt="มหาวิทยาลัยแม่ฟ้าหลวง Mae Fah Luang University"></v-img>
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
      <v-col cols="12" lg="3" md="3" sm="3" class="font-noto-sans-thai p-0">
        <v-container class="searchandAuth">

          <div>
            <!-- Search Navbar -->
            <search-component class="btn-search"></search-component>
            <router-view></router-view>

            <!-- if user not loggedin -->
            <v-container v-if="userStore.error || userStore.loading" class="regandlog">
              <v-btn class="reg  bg-black text-white rounded-xl border w-32 h-14 btn-nav mr-1"
                to="/register">สมัครสมาชิก</v-btn>
              <v-btn class="log text-black rounded-xl border border-black w-32 h-14 btn-nav ml-1"
                to="/login">เข้าสู่ระบบ</v-btn>
            </v-container>
          </div>

          <!-- if user loggedin -->
          <v-container v-if="!userStore.loading && !userStore.error"
            class="profileIcon flex align-center justify-center">
            <h1 class="name">
              คุณ {{ userStore.user.resutl.firstName }} {{ userStore.user.resutl.lastName }}
            </h1>
            <v-menu transition="slide-x-transition">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" icon size="48px" class="hover:bg-gray-200">
                  <v-avatar size="48px">
                    <v-icon v-if="!userStore.user.resutl.img" icon="mdi-account-circle" size="58px"></v-icon>
                    <v-img v-else alt="John" src="https://cdn.vuetifyjs.com/images/john.jpg" cover></v-img>
                  </v-avatar>
                </v-btn>
              </template>

              <v-list>
                <router-link v-if="userStore.user.resutl.role === 'staff'" to="/staff">
                  <v-list-item>
                    <v-list-item-title>Staff Page</v-list-item-title>
                  </v-list-item>
                </router-link>
                <router-link v-if="userStore.user.resutl.role === 'admin'" to="/admin">
                  <v-list-item>
                    <v-list-item-title>Admin Page</v-list-item-title>
                  </v-list-item>
                </router-link>
                <router-link v-if="userStore.user.resutl.role === 'user'" to="/profile">
                  <v-list-item>
                    <v-list-item-title>Edit Profile</v-list-item-title>
                  </v-list-item>
                </router-link>

                <router-link v-if="userStore.user.resutl.role === 'user'" to="/message">
                  <v-list-item>
                    <v-list-item-title>Message</v-list-item-title>
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
  </v-container>

  <v-container class="navcontainer">
    <!-- Header Menu Bar -->
    <v-app-bar :elevation="2" app color="#D02630" class="font-noto-sans-thai mt-20">
      <v-app-bar-nav-icon @click="drawer = !drawer" class="navbar d-flex d-md-none"></v-app-bar-nav-icon>

      <v-spacer></v-spacer>

      <div class="text-center d-none d-md-flex">
        <v-menu v-for="item in menuItems" :key="item.title" :location="bottom" :to="item.route">
          <template v-slot:activator="{ props }">
            <v-btn dark v-bind="props" class="mx-2 rounded-lg hover:bg-white hover:text-red-500" v-if="
              item.title !== 'หน้าหลัก' && item.title !== 'ผลงานพร้อมถ่ายทอด'
            ">
              <router-link :to="item.route">
                {{ item.title }}
                <v-icon>mdi-menu-down</v-icon>
              </router-link>
            </v-btn>
            <v-btn dark v-bind="props" class="mx-2 rounded-lg hover:bg-white hover:text-red-500" :to="item.route"
              v-else>
              {{ item.title }}
            </v-btn>
          </template>

          <v-list v-if="
            item.title !== 'หน้าหลัก' && item.title !== 'ผลงานพร้อมถ่ายทอด'
          ">
            <template v-for="subItem in item.subItems">
              <v-menu v-if="subItem.subItems && subItem.subItems.length" :key="subItem.title" :location="bottom">
                <template v-slot:activator="{ props }">
                  <v-list-item v-bind="props">
                    <v-list-item-title :style="{ fontFamily: 'Noto Sans Thai, sans-serif' }">
                      {{ subItem.title }} <v-icon>mdi-chevron-right</v-icon>
                    </v-list-item-title>
                  </v-list-item>
                </template>

                <v-list>
                  <template v-for="nestedItem in subItem.subItems">
                    <v-menu v-if="nestedItem.subItems && nestedItem.subItems.length" :key="nestedItem.title"
                      :location="bottom">
                      <template v-slot:activator="{ props }">
                        <v-list-item v-bind="props">
                          <v-list-item-title :style="{
                            fontFamily: 'Noto Sans Thai, sans-serif',
                          }">
                            {{ nestedItem.title }}
                            <v-icon>mdi-chevron-right</v-icon>
                          </v-list-item-title>
                        </v-list-item>
                      </template>
                      <v-list>
                        <template v-for="subNestedItem in nestedItem.subItems">
                          <v-menu v-if="
                            subNestedItem.subItems &&
                            subNestedItem.subItems.length
                          " :key="subNestedItem.title" :location="bottom">
                            <template v-slot:activator="{ props }">
                              <v-list-item v-bind="props">
                                <v-list-item-title :style="{
                                  fontFamily: 'Noto Sans Thai, sans-serif',
                                }">
                                  {{ subNestedItem.title }}
                                  <v-icon>mdi-chevron-right</v-icon>
                                </v-list-item-title>
                              </v-list-item>
                            </template>
                          </v-menu>
                          <router-link v-else :key="subNestedItem" :to="subNestedItem.route">
                            <v-list-item>
                              <v-list-item-title :style="{
                                fontFamily: 'Noto Sans Thai, sans-serif',
                              }">
                                {{ subNestedItem.title }}
                              </v-list-item-title>
                            </v-list-item>
                          </router-link>
                        </template>
                      </v-list>
                    </v-menu>
                    <router-link v-else :key="nestedItem" :to="nestedItem.route">
                      <v-list-item>
                        <v-list-item-title :style="{ fontFamily: 'Noto Sans Thai, sans-serif' }">
                          {{ nestedItem.title }}
                        </v-list-item-title>
                      </v-list-item>
                    </router-link>
                  </template>
                </v-list>
              </v-menu>
              <div v-else :key="subItem" :to="subItem.route">
                <router-link v-if="!subItem.external" :to="subItem.route">
                  <v-list-item>
                    <v-list-item-title :style="{ fontFamily: 'Noto Sans Thai, sans-serif' }">
                      {{ subItem.title }}
                    </v-list-item-title>
                  </v-list-item>
                </router-link>
                <a v-else :href="subItem.route" target="_blank" rel="noopener noreferrer">
                  <v-list-item>
                    <v-list-item-title :style="{ fontFamily: 'Noto Sans Thai, sans-serif' }">
                      {{ subItem.title }}
                    </v-list-item-title>
                  </v-list-item>
                </a>
              </div>
            </template>
          </v-list>
        </v-menu>
      </div>
      <!-- if user loggedin -->
      <v-container v-if="!userStore.loading && !userStore.error" class="profileMenu flex align-center justify-end">
        <h1 class="nameMenu mr-5">
          คุณ {{ userStore.user.resutl.firstName }} {{ userStore.user.resutl.lastName }}
        </h1>
        <v-menu transition="slide-x-transition">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" icon size="48px" class="hover:bg-gray-200">
              <v-avatar size="48px">
                <v-icon v-if="!userStore.user.resutl.img" icon="mdi-account-circle" size="58px"></v-icon>
                <v-img v-else alt="John" src="https://cdn.vuetifyjs.com/images/john.jpg" cover></v-img>
              </v-avatar>
            </v-btn>
          </template>

          <v-list>
            <router-link v-if="userStore.user.resutl.role === 'staff'" to="/staff">
              <v-list-item>
                <v-list-item-title>Staff Page</v-list-item-title>
              </v-list-item>
            </router-link>
            <router-link v-if="userStore.user.resutl.role === 'admin'" to="/admin">
              <v-list-item>
                <v-list-item-title>Admin Page</v-list-item-title>
              </v-list-item>
            </router-link>
            <router-link v-if="userStore.user.resutl.role === 'user'" to="/profile">
              <v-list-item>
                <v-list-item-title>Edit Profile</v-list-item-title>
              </v-list-item>
            </router-link>

            <router-link v-if="userStore.user.resutl.role === 'user'" to="/message">
              <v-list-item>
                <v-list-item-title>Message</v-list-item-title>
              </v-list-item>
            </router-link>
            <v-list-item @click="logoutBtn">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-container>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary class="d-md-none font-noto-sans-thai">
      <v-list>
        <template v-for="item in menuItems" :key="item.title">
          <v-list-group v-if="item.subItems && item.subItems.length" :value="item.title">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" :title="item.title"></v-list-item>
            </template>

            <template v-for="subItem in item.subItems" :key="subItem.title">
              <v-list-group v-if="subItem.subItems && subItem.subItems.length" :value="subItem.title">
                <template v-slot:activator="{ props }">
                  <v-list-item v-bind="props" :title="subItem.title"></v-list-item>
                </template>

                <v-list-item v-for="nestedItem in subItem.subItems" :key="nestedItem.title" :title="nestedItem.title"
                  :to="nestedItem.route" link></v-list-item>
              </v-list-group>
              <v-list-item v-else :title="subItem.title" :to="subItem.route" link></v-list-item>
            </template>
          </v-list-group>
          <v-list-item v-else :title="item.title" :to="item.route" link></v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
  </v-container>
  <!-- </v-container> -->
</template>
<script>
import { useUserStore } from "@/stores/user";
import SearchComponent from '../components/SearchComponent.vue';
import { ref } from 'vue';
import { useDisplay } from 'vuetify'
export default {
  name: "NavBar",
  components: {
    SearchComponent
  },
  data() {
    return {
      drawer: ref(false),
      mdAndUp: useDisplay(),
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
            { title: "โครงสร้างองค์กร", route: "https://mfii.mfu.ac.th/mfii-about/mfii-structure.html", external: true },
            { title: "บุคลากร", route: "https://mfii.mfu.ac.th/mfii-ip-staff.html", external: true },
            { title: "ติดต่อเรา", route: "/about-us/contact", external: false },
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
@import "../styles/navbar.css";

.name {
  margin-right: 1rem;
}

/* .v-app-bar {
    margin-top: 10%;
  } */
</style>
