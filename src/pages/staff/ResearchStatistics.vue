<template>
    <v-container>
      <v-card class="rounded-lg pa-4 mb-4 bg-gray-200">
        <v-card-title class="font-semibold"><v-icon>mdi mdi-text-box-search-outline</v-icon> ผลงานวิจัยที่ถูกเข้าถึงบ่อย</v-card-title>
        <v-card-text class="rounded-xl">
          <v-data-table :headers="headers" :items="research" :items-per-page="-1" :fixed-header="true" height="400" class="elevation-1">
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    data() {
      return {
        headers: [
          { title: 'ชื่อผลงาน', align: "start", sortable: false, key: "nameOnMedia"  },
          { title: 'จำนวนการเข้าชม', align: "center", key: "" }
        ],
        research: []
      }
    },
    created() {
      this.fetchResearch();
    },
    methods:{
    async  fetchResearch(){
      try {
        const res = await axios.get('http://localhost:7770/getsResearch/all/all/all')

        this.research = res.data.result
        console.log(this.research);
      } catch (error) {
        console.log("Error" + error);
      }
    }

  }
  }
  </script>
  
  <style scoped>
  </style>
  