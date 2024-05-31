<template>
  <v-row>
    <v-col cols="3" class="d-none d-lg-block head-left">
      <v-container
        style="
          height: 200px;
          display: flex;
          justify-content: center;
          align-items: center;
        "
      >
        <div class="head-logo">
          <a
            href="https://mfu.ac.th"
            title="มหาวิทยาลัยแม่ฟ้าหลวง Mae Fah Luang University"
          >
            <v-img
              :width="300"
              cover
              src="https://www.mfu.ac.th/fileadmin/MFUTemplateStandard/Assets/images/logo/thai-mfu_logo.png"
              alt="มหาวิทยาลัยแม่ฟ้าหลวง Mae Fah Luang University"
            ></v-img>
          </a>
        </div>
      </v-container>
    </v-col>

    <v-col
      cols="6"
      class="font-noto-sans-thai head-right"
      style="display: flex; justify-content: center; align-items: center"
    >
      <v-container>
        <h1 class="text-3xl">ผลงานทรัพย์สินทางปัญญา มหาวิทยาลัยแม่ฟ้าหลวง</h1>
        <h2 class="text-2xl">
          MFU IP PORTFOLIO /MFU Licensing | technology transfers
        </h2>
      </v-container>
    </v-col>

    <v-col
      cols="3"
      class="font-noto-sans-thai head-right"
      style="display: flex; justify-content: center; align-items:center"
    >
      <v-container>
          <v-btn class="mr-4 bg-black text-white py-2 px-4 rounded-xl border w-32 h-14" to="/register" >สมัครสมาชิก</v-btn>
          <v-btn class="py-2 px-4 text-black rounded-xl border border-black w-32 h-14" to="/login">เข้าสู่ระบบ</v-btn>
      </v-container>
    </v-col>
  </v-row>

  <v-app>
    <div class="header-menu-bar">
      <v-app-bar
        :elevation="2"
        app
        color="#D02630"
        style="
          height: 80px;
          display: flex;
          justify-content: center;
          align-items: center;
        "
        class="font-noto-sans-thai"
      >
        <v-spacer></v-spacer>
        <v-btn to="/">หน้าหลัก</v-btn>
        <v-btn id="menu-activator-services">
          บริการของเรา
          <v-icon>mdi-menu-down</v-icon>
        </v-btn>
        <v-menu activator="#menu-activator-services" open-on-hover rail>
          <v-list>
            <v-list-item
              v-for="(item, index) in Services"
              :key="index"
              :value="index"
              @click="navigateTo(item.link)"
            >
              <v-list-item-title class="font-noto-sans-thai">{{
                item.title
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn id="menu-activator-achievements">
          ผลงานทรัพย์สินทางปัญญา
          <v-icon>mdi-menu-down</v-icon>
        </v-btn>
        <v-menu activator="#menu-activator-achievements" open-on-hover rail>
          <v-list>
            <v-list-item
              v-for="(item, index) in Achievements"
              :key="index"
              :value="index"
              @click="navigateTo(item.link)"
            >
              <v-list-item-title class="font-noto-sans-thai">{{
                item.title
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn to="/contact">ติดต่อเรา</v-btn>
        <v-spacer></v-spacer>
      </v-app-bar>
    </div>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      Services: [
        { title: "ขั้นตอนการขออนุญาติใช้สิทธิ", link: "/permission-process" },
        {
          title: "ขอข้อมูลเพิ่มเติมเพื่อขออนุญาติใช้สิทธิ",
          link: "/permission-info",
        },
      ],
      Achievements: [
        { title: "IP Portfolio", link: "/ip-portfolio" },
        { title: "IP Prototype", link: "/ip-prototype" },
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
</style>
