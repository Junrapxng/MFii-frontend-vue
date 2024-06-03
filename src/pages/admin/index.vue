<!-- src/views/AdminPage.vue -->

<template>
    <admin-layout>
      <!-- Content for admin page goes here -->
      <v-container>
        <h1>Dashboard</h1>
           <!-- Dashboard Cards -->
           <v-row>
          <v-col cols="12" md="4">
            <v-card class="mb-4">
              <v-card-title>Today's Visitors</v-card-title>
              <v-card-subtitle>{{ visitorsToday }}</v-card-subtitle>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card class="mb-4">
              <v-card-title>Yesterday's Visitors</v-card-title>
              <v-card-subtitle>{{ visitorsYesterday }}</v-card-subtitle>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card class="mb-4">
              <v-card-title>Total Downloads</v-card-title>
              <v-card-subtitle>{{ totalDownloads }}</v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>

        <!-- Research Access Table -->
        <v-card class="mb-4">
          <v-card-title>Research Access</v-card-title>
          <v-data-table :headers="headers" :items="researchAccess"></v-data-table>
        </v-card>

        <!-- Charts -->
        <v-row>
          <v-col cols="12">
            <v-card class="mb-4">
              <v-card-title>Visitors and Downloads</v-card-title>
              <v-card-text>
                <line-chart :chart-data="chartData"></line-chart>
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
  import LineChart from '@/components/LineChart.vue';
  
  export default {
    name: "Dashboard-Admin",
    components: {
    AdminLayout,
    LineChart,
  },
  data() {
    return {
      todayVisitors: 123,
      yesterdayVisitors: 98,
      researchAccess: [
        { title: 'Research Paper 1', accesses: 45 },
        { title: 'Research Paper 2', accesses: 30 },
        { title: 'Research Paper 3', accesses: 75 },
      ],
      downloads: 67,
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
  };
  </script>
  
  <style scoped>
  </style>
  