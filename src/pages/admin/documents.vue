<template>
  <admin-layout>
    <v-container class="py-4">
      <v-card class="pa-4">
        <v-card-title class="text-h5">Download Database</v-card-title>
        <v-card-text>
          <v-select v-model="selectedOption" :items="options" label="Select Data Type"></v-select>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="downloadCSV" :disabled="!selectedOption" class="bg-red-700 text-slate-50">Download CSV</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </admin-layout>
</template>

<script>
import AdminLayout from "@/layouts/admin.vue";
import { ref } from 'vue';

export default {
  name: 'document-page',
  components: {
    AdminLayout,
  },
  setup() {
    const selectedOption = ref(null);
    const options = [
      'Daily Users',
      'Weekly Users',
      'Monthly Users',
      'Yearly Users',
      'Research Downloads'
    ];

    const downloadCSV = () => {
      // สมมติว่าข้อมูลนี้มาจาก API หรือฐานข้อมูล
      let data = [];
      switch (selectedOption.value) {
        case 'Daily Users':
          data = [
            { date: '2024-06-01', users: 100 },
            { date: '2024-06-02', users: 150 },
            // เพิ่มข้อมูลเพิ่มเติมที่นี่
          ];
          break;
        case 'Weekly Users':
          data = [
            { week: '2024-W23', users: 700 },
            { week: '2024-W24', users: 800 },
            // เพิ่มข้อมูลเพิ่มเติมที่นี่
          ];
          break;
        case 'Monthly Users':
          data = [
            { month: '2024-01', users: 3000 },
            { month: '2024-02', users: 3200 },
            // เพิ่มข้อมูลเพิ่มเติมที่นี่
          ];
          break;
        case 'Yearly Users':
          data = [
            { year: '2023', users: 36000 },
            { year: '2024', users: 40000 },
            // เพิ่มข้อมูลเพิ่มเติมที่นี่
          ];
          break;
        case 'Research Downloads':
          data = [
            { research: 'Paper 1', downloads: 150 },
            { research: 'Paper 2', downloads: 200 },
            // เพิ่มข้อมูลเพิ่มเติมที่นี่
          ];
          break;
      }
      // Convert JSON to CSV
      const csv = jsonToCSV(data);
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('href', url);
      a.setAttribute('download', `${selectedOption.value}.csv`);
      a.click();
      window.URL.revokeObjectURL(url);
    };

    const jsonToCSV = (json) => {
      const fields = Object.keys(json[0]);
      const csvRows = json.map(row =>
        fields.map(field => JSON.stringify(row[field], (key, value) => value ?? '')).join(',')
      );
      return [fields.join(','), ...csvRows].join('\n');
    };

    return { selectedOption, options, downloadCSV };
  },
};
</script>

<style scoped></style>