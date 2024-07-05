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
              <v-card-title>จำนวนผู้ใช้งานเดือนนี้</v-card-title>
              <v-card-text>{{ monthlyUsers }}</v-card-text>
            </v-card>
          </v-col>
          <v-col>
            <v-card>
              <v-card-title>จำนวนผู้ใช้งานปีนี้</v-card-title>
              <v-card-text>{{ yearlyUsers }}</v-card-text>
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
import { api } from '../axios';

export default {
  data() {
    return {
      totalUsers: 0,
      todayUsers: 0,
      monthlyUsers: 0,
      yearlyUsers: 0,
    };
  },
  created() {
    this.getViewerCount();
  },
  methods: {
    async getViewerCount() {
      try {
        const response = await api.get('/getStatAll');
        const viewerCounts = response.data.result;

        // Assuming viewerCounts is the object fetched from MongoDB
        this.totalUsers = viewerCounts.totalAccess;
        this.todayUsers = viewerCounts.dailyAccess
        this.monthlyUsers = viewerCounts.monthlyAccess
        this.yearlyUsers = viewerCounts.yearlyAccess

        console.log('Viewer counts:', viewerCounts);
      } catch (error) {
        console.error('Error fetching viewer counts:', error);
      }
    },
  },
};
</script>

<style scoped></style>