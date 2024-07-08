<template>
  <v-app>
    <NavBar></NavBar>
    <main>
      <v-container class="kuy">
        <v-empty-state headline="Not available yet" title="MFii Phase 2"
          text="The page you were looking for does not exist"
          image="https://ip-mfii.mfu.ac.th/src/assets/mfii_logo_avatar.jpg"></v-empty-state>
      </v-container>
    </main>
    <Footer></Footer>
  </v-app>

</template>

<script>
export default {

}
</script>

<style scoped>
.kuy {
  margin-top: 10%;
  margin-bottom: 5%;
}
</style>