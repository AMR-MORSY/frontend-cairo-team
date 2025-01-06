<template>

 
  <LineChart :chartTitle="title"  :chartDataSets="chartData" chartId="cairoTxYearlyAnalysis"/>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { inject } from "vue";

import LineChart from '../../helpers/LineChart.vue';


const dialogRef = inject('dialogRef');


const chartData=ref();
const title=ref(dialogRef.value.data.title)





const getZoneNewValues = (zoneKeys, zoneValues, cairoKeys) => {
  let zoneNewValus = [];
  for (var i = 0; i < cairoKeys.length; i++) {

    let filtered = zoneKeys.filter(key => {
      return key == cairoKeys[i];

    });
    if (filtered.length != 0) {
      let index = zoneKeys.indexOf(filtered[0]);
      zoneNewValus[i] = zoneValues[index];

    }
    else {
      zoneNewValus[i] = 0
    }
  }
  return zoneNewValus;

}


onMounted(() => {
 
 
  mountChartData();
})
const mountChartData = () => {

  let cairoKeys = Object.keys(dialogRef.value.data.cairo);
  let cairoEastKeys = Object.keys(dialogRef.value.data.zones["CAIRO EAST"]);
  let cairoEastValues = Object.values(dialogRef.value.data.zones["CAIRO EAST"]);
  let cairoSouthKeys = Object.keys(dialogRef.value.data.zones["CAIRO SOUTH"]);
  let cairoSouthValues = Object.values(dialogRef.value.data.zones["CAIRO SOUTH"]);
  let cairoNorthKeys = Object.keys(dialogRef.value.data.zones["CAIRO NORTH"]);
  let cairoNorthValues = Object.values(dialogRef.value.data.zones["CAIRO NORTH"]);
  let gizaKeys = Object.keys(dialogRef.value.data.zones["GIZA"]);
  let gizaValues = Object.values(dialogRef.value.data.zones["GIZA"]);




  let cairoEastNewValues = getZoneNewValues(cairoEastKeys, cairoEastValues, cairoKeys)
  let cairoSouthNewValues = getZoneNewValues(cairoSouthKeys, cairoSouthValues, cairoKeys)
  let cairoNorthNewValues = getZoneNewValues(cairoNorthKeys, cairoNorthValues, cairoKeys)
  let gizaNewValues = getZoneNewValues(gizaKeys, gizaValues, cairoKeys)



  const documentStyle = getComputedStyle(document.documentElement);
 
  chartData.value={
  labels: dialogRef.value.data.labels,
    datasets: [
      {
        label: "Cairo",
        data: Object.values(dialogRef.value.data.cairo),
        fill: false,
        borderColor: documentStyle.getPropertyValue('--p-orange-600'),
        tension: 0.4
      },
      {
        data: cairoEastNewValues,
        label: "Cairo East",
        fill: false,
        borderColor: documentStyle.getPropertyValue('--p-red-500'),
        tension: 0.4
      },
      {
        data: cairoSouthNewValues,
        label: "Cairo South",

        fill: false,
        borderColor: documentStyle.getPropertyValue('--p-amber-400'),
        tension: 0.4
      },
      {
        data: cairoNorthNewValues,
        label: "Cairo North",
        fill: false,
        borderColor: documentStyle.getPropertyValue('--p-lime-500'),
        tension: 0.4
      },
      {
        data: gizaNewValues,
        label: "Giza",
        fill: false,
        borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
        tension: 0.4
      },
    ]
  }
 

}



</script>

<style scoped></style>