<template>
    <v-container>
      <v-card>
        <v-card-title>สถิติผลงานวิจัยที่ถูกเข้าถึงบ่อย</v-card-title>
        <v-card-text>
          <v-data-table :headers="headers" :items="popularResearches" class="elevation-1">
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        headers: [
          { text: 'ชื่อผลงาน', value: 'title' },
          { text: 'จำนวนการเข้าชม', value: 'views' }
        ],
        popularResearches: []
      }
    },
    created() {
      this.fetchResearchStatistics();
    },
    methods: {
      fetchResearchStatistics() {
        // logic to fetch research statistics
      }
    }
  }
  </script>
  
  <style scoped>
  </style>
  