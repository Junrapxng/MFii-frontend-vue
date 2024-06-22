<!-- src/views/AdminPage.vue -->

<template>
  <admin-layout>
    <!-- Content for admin page goes here -->
    <v-container class="font-noto-sans-thai">
      <!-- <h1 class="text-5xl text-gray-600 font-weight-bold my-4">Dashboard</h1> -->
      <!-- Dashboard Cards -->
      <v-row>
        <v-col cols="12" md="4">
          <v-card class="mb-4">
            <v-card-title class="text-3xl">จำนวนผู้เยี่ยมชมวันนี้</v-card-title>
            <v-card-subtitle class="text-2xl text-red-950 font-bold">{{ visitorsToday }} คน</v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="mb-4">
            <v-card-title class="text-3xl">จำนวนผู้เยี่ยมชมเมื่อวาน</v-card-title>
            <v-card-subtitle class="text-2xl text-red-950 font-bold">{{ visitorsYesterday }} คน</v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="mb-4">
            <v-card-title class="text-3xl">จำนวนดาวน์โหลดทั้งหมด</v-card-title>
            <v-card-subtitle class="text-2xl text-red-950 font-bold">{{ totalDownloads }} คน</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>

      <!-- Research Access Table -->
      <v-card class="rounded-xl pa-4 mb-4">
        <v-card-title class="text-3xl">การเข้าถึงการวิจัย</v-card-title>
        <v-data-table :headers="headers" :items="research"  :items-per-page="-1" :fixed-header="true" height="400"></v-data-table>
      </v-card>

      <!-- Charts -->
      <v-row>
        <v-col cols="12">
          <v-card class="mb-4">
            <v-card-title>Visitors and Downloads</v-card-title>
            <v-card-text>
              <!-- <line-chart :chart-data="chartData"></line-chart> -->
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Add your admin panel components, tables, forms, etc. -->
    </v-container>
  </admin-layout>
</template>

<script>
import AdminLayout from "@/layouts/admin.vue";
import axios from "axios";
export default {
  name: "Index-Admin-Page",
  components: {
    AdminLayout,
  },
  data() {
    return {
      visitorsToday: 123,
      visitorsYesterday: 98,
      totalDownloads: 67,
      headers: [
      { title: "Name", align: "start", sortable: false, key: "nameOnMedia" },
      { title: "Access",align: "center", key: "" },
   
    ],
      research: [],

      chartData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Visitors',
            backgroundColor: '#f87979',
            data: [40, 39, 10, 40, 39, 80, 40]
          }
        ]
      }
    };
  },


  created(){
 this.fetchResearch()
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
};
</script>

<style scoped></style>