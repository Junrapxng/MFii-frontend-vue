<template>
    <v-container>
      <v-card class="rounded-lg bg-gray-200">
        <v-card-title class="font-semibold"><v-icon>mdi mdi-web</v-icon> จำนวนผู้ใช้งานเว็บไซต์</v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <v-card>
                <v-card-title>จำนวนผู้ใช้งานวันนี้</v-card-title>
                <v-card-text>{{ todayUsers }}</v-card-text>
              </v-card>
            </v-col>
            <v-col>
              <v-card>
                <v-card-title>จำนวนผู้ใช้งานสัปดาห์นี้</v-card-title>
                <v-card-text>{{ weeklyUsers }}</v-card-text>
              </v-card>
            </v-col>
            <v-col>
              <v-card>
                <v-card-title>จำนวนผู้ใช้งานเดือนนี้</v-card-title>
                <v-card-text>{{ monthlyUsers }}</v-card-text>
              </v-card>
            </v-col>
            <v-col>
              <v-card>
                <v-card-title>จำนวนผู้ใช้งานทั้งหมด</v-card-title>
                <v-card-text>{{ totalUsers }}</v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        totalUsers: 0,
        todayUsers: 0,
        weeklyUsers: 0,
        monthlyUsers: 0,
        
      }
    },
    created() {
      this.fetchUserStatistics();
    },
    methods: {
      fetchUserStatistics() {
        // logic to fetch user statistics
      }
    }
  }
  </script>
  
  <style scoped>
  </style>
  