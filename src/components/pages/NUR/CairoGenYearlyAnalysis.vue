<template>
  <div>
    <LineChart chartTitle="Generator NUR_C" chartId="generatorNUR_C" :chartDataSets="chartData" />
  </div>
</template>

<script setup>
import LineChart from '../../helpers/LineChart.vue';
import { onMounted, inject, ref } from 'vue';

const chartData = ref();


const dialogRef = inject('dialogRef');

onMounted(() => {


  mountChartData();
})

const mountChartData = () => {
  
  const documentStyle = getComputedStyle(document.documentElement);
  chartData.value = {
    labels: dialogRef.value.data.labels,
    datasets: [
      {
        data: dialogRef.value.data.NUR_combined,
        label: "Total NUR",
        fill: false,
        borderColor: documentStyle.getPropertyValue('--p-zinc-600'),
        tension: 0.4
      },
      {
        data: dialogRef.value.data.NUR_Rented,
        label: "Rented",
        fill: false,
        borderColor: documentStyle.getPropertyValue('--p-yellow-800'),
        tension: 0.4
      },
      {
        data: dialogRef.value.data.NUR_VF,
        label: "VF",
        fill: false,
        borderColor: documentStyle.getPropertyValue('--p-red-600'),
        tension: 0.4
      },
      {
        data: dialogRef.value.data.NUR_OEG,
        label: "OEG",
        fill: false,
        borderColor: documentStyle.getPropertyValue('--p-orange-600'),
        tension: 0.4
      },
      {
        data: dialogRef.value.data.NUR_ET,
        label: "ET",
        fill: false,
        borderColor: documentStyle.getPropertyValue('--p-green-600'),
        tension: 0.4
      },
      {
        data: dialogRef.value.data.NUR_WE,
        label: "WE",
        fill: false,
        borderColor: documentStyle.getPropertyValue('--p-purple-600'),
        tension: 0.4
      },
    ],

  }

}
// export default {
//   data() {
//     return {
//       yearlyData: null,
//       lightOptions: {
//         plugins: {
//           title: {
//             display: true,
//             text: "Generator"
//           },
//           legend: {
//             labels: {
//               color: "red",
//             },
//           },
//           datalabels: {
//             anchor: "top",

//             labels: {
//               value: {
//                 color: "black",
//               },
//             },
//           },
//         },

//         scales: {
//           y: {
//             suggestedMin: 0,
//           },
//         },
//       },
//       plugins: [ChartDataLabels],
//     };
//   },
//   name: "CairoGenYearlyAnalysis",
//   inject: ["dialogRef"],
//   mounted() {
//     this.mountChartData();
//   },
//   methods: {
//     mountChartData() {
//       this.yearlyData = {
//         labels: this.dialogRef.data.labels,
//          datasets: [
//           {
//             data: this.dialogRef.data.NUR_combined,
//             label: "Total NUR",
//             borderColor: "black",
//           },
//           {
//             data: this.dialogRef.data.NUR_Rented,
//             label: "Rented",
//             borderColor: "blue",
//           },
//           {
//             data: this.dialogRef.data.NUR_VF,
//             label: "VF",
//             borderColor: "red",
//           },
//           {
//             data: this.dialogRef.data.NUR_OEG,
//             label: "OEG",
//             borderColor: "orange",
//           },
//           {
//             data: this.dialogRef.data.NUR_ET,
//             label: "ET",
//             borderColor: "green",
//           },
//           {
//             data: this.dialogRef.data.NUR_WE,
//             label: "WE",
//             borderColor: "purple",
//           },
//         ],
//       };
//     },
//   },
// };
</script>

<style lang="scss" scoped></style>