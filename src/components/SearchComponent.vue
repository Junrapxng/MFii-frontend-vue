<template>
    <v-autocomplete
      v-model="search"
      :items="pages"
      label="ค้นหา"
      item-value="path"
      item-title="name"
      density="comfortable"
      prepend-inner-icon="mdi-magnify"
      style="max-width: 270px"
      variant="solo"
      clearable
      hide-details
      rounded
      class="py-3"
      no-data-text="ไม่พบผลลัพธ์"
      @change="navigateToPage"
      @keydown.enter="navigateToPage"
      @update:modelValue="navigateToPage"
    ></v-autocomplete>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      pages: [
        { name: "หน้าหลัก", path: "/" },
        { name: "ยกระดับงานวิจัยและนวัตกรรม", path: "/services/ups" },
        { name: "ขั้นตอนการขออนุญาติใช้สิทธิ", path: "/services/lap" },
        { name: "อบรมและให้คำปรึกษา", path: "/services/ipa" },
        { name: "ยื่นขอรับความคุ้มครอง", path: "/services/ipp" },
        { name: "ผลงานพร้อมถ่ายทอด", path: "/tt/all-categories" },
        { name: "ระเบียบข้อบังคับ มฟล.", path: "/recmn/mfii/rule" },
        { name: "จัดสรรผลประโยชน์", path: "/recmn/mfii/benefits" },
        { name: "Q&A", path: "/recmn/mfii/q&a" },
        { name: "แบบฟอร์มขอยื่นจด", path: "/recmn/downloads/request_form" },
        { name: "เอกสารการอบรม", path: "/recmn/downloads/training" },
        { name: "MRii", path: "/recmn/about/inside/MRii" },
        { name: "MFii", path: "/recmn/about/inside/MFii" },
        { name: "Research", path: "/recmn/about/inside/research" },
        { name: "DIP", path: "/recmn/about/outside/DIP" },
        { name: "WIPO", path: "/recmn/about/outside/WIPO" },
        { name: "อวท.", path: "/recmn/about/outside/อวท" },
        { name: "โครงสร้างองค์กร", path: "https://mfii.mfu.ac.th/mfii-about/mfii-structure.html", external: true },
        { name: "บุคลากร", path: "https://mfii.mfu.ac.th/mfii-ip-staff.html", external: true },
        { name: "ติดต่อเรา", path: "/about-us/contact" },
      ],
    };
  },
  methods: {
    navigateToPage() {
      const selectedPage = this.pages.find(page => page.path === this.search);
      if (selectedPage) {
        if (selectedPage.external) {
          window.open(selectedPage.path, '_blank');
        } else {
          this.$router.push(selectedPage.path);
        }
        this.search = "";
      }
    },
  },
};
</script>

<style>

</style>