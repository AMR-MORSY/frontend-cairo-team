<template>

  <p class="w-full text-center font-Signika text-font-main-color text-lg">NUR:{{ NuR }} </p>


  <div class=" w-full flex justify-center items-center">

    <DoughnutChart :chartDataSets="chartData" chartTitle="Cairo Generator" chartId="cairoGenerators" />


  </div>
  <div class="table-container">

    <div style="display: flex; align-items: center; justify-content: flex-end">

      <div style=" display: flex; align-items: center; justify-content: flex-end">
        <img src="../../logos/week-icon.aba4072e.svg" @click="getCairoGenYearlyNUR"
          style="cursor: pointer;width: 15%; margin-bottom: 20px;" v-tooltip.right="'Weekly Analysis'" />

      </div>

    </div>

    <SubsystemNURTickets :tickets="tickets" :sites="sites" title="Cairo Generators" />
  </div>
</template>

<script setup>

import SubsystemNURTickets from "../../helpers/Nur/SubsystemNURTickets.vue";
import NUR from "../../../apis/NUR";
import CairoGenYearlyAnalysis from "./CairoGenYearlyAnalysis.vue";

import { inject } from "vue";
import { useDialog } from "primevue/usedialog";

const dialogRef = inject('dialogRef');
const dialog = useDialog();

import { ref, onMounted } from "vue";
import DoughnutChart from "../../helpers/DoughnutChart.vue";



const chartData = ref();

const NuR = ref();
const sites = ref();
const tickets = ref();

onMounted(() => {
  setChartData();

  mountTableData();
});


const setChartData = () => {
  const documentStyle = getComputedStyle(document.body);


  let statestics = {
    ET: dialogRef.value.data.statestics.NUR_ET_combined,
    VF: dialogRef.value.data.statestics.NUR_VF_combined,
    OEG: dialogRef.value.data.statestics.NUR_Org_combined,
    Rented: dialogRef.value.data.statestics.NUR_Rented_combined,
    WE: dialogRef.value.data.statestics.NUR_WE_combined
  };

  chartData.value = {
    labels: Object.keys(statestics),
    datasets: [
      {
        data: Object.values(statestics),
        backgroundColor: [documentStyle.getPropertyValue('--p-green-500'), documentStyle.getPropertyValue('--p-rose-500'), documentStyle.getPropertyValue('--p-orange-500'), documentStyle.getPropertyValue('--p-gray-500'), documentStyle.getPropertyValue('--p-purple-500')],
        hoverBackgroundColor: [documentStyle.getPropertyValue('--p-green-400'), documentStyle.getPropertyValue('--p-rose-400'), documentStyle.getPropertyValue('--p-orange-400'), documentStyle.getPropertyValue('--p-gray-400'), documentStyle.getPropertyValue('--p-purple-500')]
      }
    ]
  };
};



const mountTableData = () => {
  sites.value = dialogRef.value.data.sites;
  tickets.value = dialogRef.value.data.tickets;
  NuR.value = dialogRef.value.data.statestics.NUR_combined;
}




const getCairoGenYearlyNUR = () => {

  NUR.cairoGenYearlyAnalysis(tickets.value[0].year)

    .then((response) => {
      console.log(response);

      let data = Object.values(response.data.NUR_C_yearly);
      let keys = Object.keys(response.data.NUR_C_yearly);
      let NUR_combined = [];
      let NUR_ET = [];
      let NUR_OEG = [];
      let NUR_VF = [];
      let NUR_Rented = [];
      let NUR_WE = [];
      for (var i = 0; i < keys.length; i++) {
        NUR_combined.push(data[i].NUR_combined);
        NUR_Rented.push(data[i].NUR_Rented_combined);
        NUR_VF.push(data[i].NUR_VF_combined);
        NUR_OEG.push(data[i].NUR_Org_combined);
        NUR_ET.push(data[i].NUR_ET_combined);
        NUR_WE.push(data[i].NUR_WE_combined)
      }

      dialog.open(CairoGenYearlyAnalysis, {
        props: {
          style: {
            width: "75vw",
          },
          breakpoints: {
            "960px": "75vw",
            "640px": "90vw",
          },
          modal: true,
        },

        data: {
          NUR_combined: NUR_combined,
          NUR_Rented: NUR_Rented,
          NUR_VF: NUR_VF,
          NUR_OEG: NUR_OEG,
          NUR_ET: NUR_ET,
          NUR_WE: NUR_WE,
          labels: keys
        },
      });


    }).catch((error) => {
      console.log(error);
    })

}


</script>

<style lang="scss" scoped></style>