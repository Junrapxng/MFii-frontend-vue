<template>
    <div>
      <line-chart :chart-data="chartData"></line-chart>
    </div>
  </template>
  
  <script>
  import { Line } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
  
  ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);
  
  export default {
    name: 'LineChart',
    extends: Line,
    props: {
      chartData: {
        type: Object,
        required: true
      }
    },
    mounted() {
      this.renderChart(this.chartData, {
        responsive: true,
        maintainAspectRatio: false
      });
    }
  };
  </script>
  