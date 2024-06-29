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
    ></v-autocomplete>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      pages: [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
      ],
    };
  },
  methods: {
    navigateToPage() {
      if (this.search) {
        this.$router.push(this.search);
      }
    },
  },
};
</script>
