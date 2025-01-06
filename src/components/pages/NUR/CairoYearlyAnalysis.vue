<template>
   <LineChart chartTitle="Cairo NUR_C" chartId="cairoNUR_c"  :chartDataSets="chartData"/>
</template>

<script setup>



import { ref, onMounted, inject } from "vue";
import LineChart from "../../helpers/LineChart.vue";

const dialogRef = inject('dialogRef');
const chartData=ref();

onMounted(() => {
  setChartData();
 
});







const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  if (dialogRef.value.data.cairo && dialogRef.value.data.zones) {
    chartData.value= {

      labels: Object.keys(dialogRef.value.data.cairo),
      datasets: [
        {
          data: Object.values(dialogRef.value.data.cairo),
          label: "Cairo",
          fill: false,
          borderColor: documentStyle.getPropertyValue('--p-orange-600'),
          tension: 0.4

        },
        {
          data: Object.values(dialogRef.value.data.zones["CAIRO EAST"]),
          label: "Cairo East",
          fill: false,
          borderColor: documentStyle.getPropertyValue('--p-gray-500'),
          tension: 0.4

        },
        {
          data: Object.values(dialogRef.value.data.zones["GIZA"]),
          label: "Giza",
          fill: false,
          borderColor: documentStyle.getPropertyValue('--p-teal-600'),
          tension: 0.4
        },
        {
          data: Object.values(dialogRef.value.data.zones["CAIRO SOUTH"]),
          label: "Cairo South",
          fill: false,
          borderColor: documentStyle.getPropertyValue('--p-sky-600'),
          tension: 0.4
        },
        {
          data: Object.values(dialogRef.value.data.zones["CAIRO NORTH"]),
          label: "Cairo North",
          fill: false,
          borderColor: documentStyle.getPropertyValue('--p-blue-700'),
          tension: 0.4
        },
      ],


      
    };

  }



};



</script>

<style scoped></style>