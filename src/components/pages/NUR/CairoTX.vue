<template>

  <p class="w-full text-center font-Signika text-font-main-color text-lg">NUR:{{ NuR }} </p>
  <div class="grid grid-cols-3 gap-4 mt-5 ">
    <div class=" col-span-3 lg:col-span-1">
      <!-- <Chart type="doughnut" :data="ticketsType" :options="lightOptions" :plugins="plugins" /> -->
      <DoughnutChart :chartDataSets="ticketsType" chartId="txTicketsType" :chartTitle="title" />
    </div>
    <div class=" col-span-3 lg:col-span-1">
      <!-- <Chart type="doughnut" :data="accessStatus" :options="lightOptions" :plugins="plugins" /> -->
      <DoughnutChart :chartDataSets="accessStatus" chartId="txAccessStatus" :chartTitle="title" />
    </div>
    <div class=" col-span-3 lg:col-span-1">
      <div class=" w-full">
        <DoughnutChart :chartDataSets="TxType" chartId="txType" :chartTitle="title" />
      </div>
      <!-- <Chart type="doughnut" :data="TxType" :options="lightOptions" :plugins="plugins" /> -->
    
    </div>
  </div>


  <div>
    <div style="display: flex; align-items: center; justify-content: space-between">
      <h3>Sites</h3>
      <div style=" display: flex; align-items: center; justify-content: flex-end">
        <img src="../../logos/week-icon.aba4072e.svg" @click="getCairoMWYearlyNUR"
          style="cursor: pointer;width: 15%; margin-bottom: 20px;" v-tooltip.right="'Weekly Analysis'" />

      </div>

    </div>
    <SubsystemNURTickets :tickets="tickets" :sites="sites" :title="title" />
   
  </div>
</template>

<script setup>

import NUR from "../../../apis/NUR";


import CairoTxYearlyAnalysis from "./CairoTxYearlyAnalysis.vue";
import DoughnutChart from "../../helpers/DoughnutChart.vue";

import SubsystemNURTickets from "../../helpers/Nur/SubsystemNURTickets.vue";



import { inject } from "vue";
import { useDialog } from "primevue/usedialog";

const dialogRef = inject('dialogRef');
const dialog = useDialog();

import { ref, onMounted } from "vue";




const title = ref(dialogRef.value.data.title)


const NuR = ref();
const sites = ref();
const tickets = ref();
const ticketsType = ref();
const accessStatus = ref()
const TxType = ref()

onMounted(() => {
  mountTicketsTypeChartData();
  mountAccessStatusChartData();
  mountTxTypeChartData();

  mountTableData();
});


const mountTableData = () => {
  sites.value = dialogRef.value.data.sites;
  tickets.value = dialogRef.value.data.tickets;
  NuR.value = dialogRef.value.data.statestics.NUR_combined;
}

const mountTicketsTypeChartData = () => {
  const documentStyle = getComputedStyle(document.body);
  let ticketstype = {
    voluntary: dialogRef.value.data.statestics.NUR_voluntary_c,
    involantary: dialogRef.value.data.statestics.NUR_involuntary_c,
  };
  ticketsType.value = {
    labels: Object.keys(ticketstype),
    datasets: [
      {
        data: Object.values(ticketstype),
        backgroundColor: [documentStyle.getPropertyValue('--p-green-500'), documentStyle.getPropertyValue('--p-rose-500')],
        hoverBackgroundColor: [documentStyle.getPropertyValue('--p-green-400'), documentStyle.getPropertyValue('--p-rose-400')]
      }
    ]

  }

}

const mountAccessStatusChartData = () => {
  const documentStyle = getComputedStyle(document.body);
  let accessstatus = {
    Access: dialogRef.value.data.statestics.NUR_access_c,
    "Without Access": dialogRef.value.data.statestics.NUR_without_access_c,
  };
  accessStatus.value = {
    labels: Object.keys(accessstatus),
    datasets: [
      {
        data: Object.values(accessstatus),
        backgroundColor: [documentStyle.getPropertyValue('--p-yellow-500'), documentStyle.getPropertyValue('--p-lime-500')],
        hoverBackgroundColor: [documentStyle.getPropertyValue('--p-yellow-400'), documentStyle.getPropertyValue('--p-lime-400')]
      }
    ]


  }

}
const mountTxTypeChartData = () => {
  const documentStyle = getComputedStyle(document.body);
  let Txtype = {
    HDSL: dialogRef.value.data.statestics.NUR_HDSL_c,
    MW:
      dialogRef.value.data.statestics.NUR_combined -
      dialogRef.value.data.statestics.NUR_HDSL_c,
  };

  TxType.value = {
    labels: Object.keys(Txtype),
    datasets: [
      {
        data: Object.values(Txtype),
        backgroundColor: [documentStyle.getPropertyValue('--p-amber-500'), documentStyle.getPropertyValue('--p-emerald-500')],
        hoverBackgroundColor: [documentStyle.getPropertyValue('--p-amber-400'), documentStyle.getPropertyValue('--p-emerald-400')]
      }
    ]

  }

}

const getCairoMWYearlyNUR = () => {

  NUR.cairoTXYearlyAnalysis(tickets.value[0].year)


    .then((response) => {
      console.log(response);
      let labels = Object.keys(response.data.NUR_C_yearly.cairo);
      let cairo = response.data.NUR_C_yearly.cairo;
      let zones = response.data.NUR_C_yearly.zones;
      dialog.open(CairoTxYearlyAnalysis, {
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
          labels: labels,
          cairo: cairo,
          zones: zones,
          title: "Transmission"
        },
      });
    })
    .catch((error) => {
      console.log(error);
    });
}


// export default {
//   data() {
//     return {
//       sites: [],
//       tickets: [],
//       ticketsType: null,
//       accessStatus: null,
//       TxType: null,
//       selectedSite: null,
//       lightOptions: {
//         plugins: {
//           legend: {
//             labels: {
//               color: "red",
//             },
//           },
//           datalabels: {
//             anchor: "center",
//             color: "red",
//           },
//         },
//       },
//       plugins: [ChartDataLabels],
//     };
//   },
//   name: "CairoTx",
//   components: {
//     NURTickets,
//     CairoTxYearlyAnalysis,

//   },
//   computed: {

//     isLogin() {
//       return this.$store.getters.isLogin;
//     },
//   },

//   inject: ["dialogRef"],
//   mounted() {
//     this.mountData();
//   },
//   methods: {
//     mountData() {
//       this.sites = this.dialogRef.data.sites;
//       this.tickets = this.dialogRef.data.tickets;
//       this.mountTicketsTypeChartData();
//       this.mountAccessStatusChartData();
//       this.mountTxTypeChartData();
//     },
//     mountTicketsTypeChartData() {
//       let ticketsType = {
//         voluntary: this.dialogRef.data.statestics.NUR_voluntary_c,
//         involantary: this.dialogRef.data.statestics.NUR_involuntary_c,
//       };
//       this.ticketsType = {
//         labels: Object.keys(ticketsType),
//         datasets: [
//           {
//             data: Object.values(ticketsType),

//             backgroundColor: [
//               "#7F00FF",
//               "#C3B1E1",
//               "#E0B0FF",
//               "#5D3FD3",
//               "#CF9FFF",
//               "#BF40BF",
//               "#CCCCFF",
//               "#BDB5D5",
//               "#E6E6FA",
//               "#AA98A9",
//               "#953553",
//               "#800080",
//             ],
//           },
//         ],
//       };
//     },
//     mountAccessStatusChartData() {
//       let accessStatus = {
//         Access: this.dialogRef.data.statestics.NUR_access_c,
//         "Without Access": this.dialogRef.data.statestics.NUR_without_access_c,
//       };
//       this.accessStatus = {
//         labels: Object.keys(accessStatus),
//         datasets: [
//           {
//             data: Object.values(accessStatus),

//             backgroundColor: [
//               "#7F00FF",
//               "#C3B1E1",
//               "#E0B0FF",
//               "#5D3FD3",
//               "#CF9FFF",
//               "#BF40BF",
//               "#CCCCFF",
//               "#BDB5D5",
//               "#E6E6FA",
//               "#AA98A9",
//               "#953553",
//               "#800080",
//             ],
//           },
//         ],
//       };
//     },
//     mountTxTypeChartData() {
//       let TxType = {
//         HDSL: this.dialogRef.data.statestics.NUR_HDSL_c,
//         MW:
//           this.dialogRef.data.statestics.NUR_combined -
//           this.dialogRef.data.statestics.NUR_HDSL_c,
//       };
//       this.TxType = {
//         labels: Object.keys(TxType),
//         datasets: [
//           {
//             data: Object.values(TxType),

//             backgroundColor: [
//               "#7F00FF",
//               "#C3B1E1",
//               "#E0B0FF",
//               "#5D3FD3",
//               "#CF9FFF",
//               "#BF40BF",
//               "#CCCCFF",
//               "#BDB5D5",
//               "#E6E6FA",
//               "#AA98A9",
//               "#953553",
//               "#800080",
//             ],
//           },
//         ],
//       };
//     },
//     onRowSelect() {
//       let siteCode = this.selectedSite.site_code;
//       console.log(this.selectedSite.site_code);
//       let tickets_2G = this.tickets.filter((ticket) => {
//         return (
//           ticket.problem_site_code == siteCode && ticket.technology == "2G"
//         );
//       });
//       let tickets_3G = this.tickets.filter((ticket) => {
//         return (
//           ticket.problem_site_code == siteCode && ticket.technology == "3G"
//         );
//       });
//       let tickets_4G = this.tickets.filter((ticket) => {
//         return (
//           ticket.problem_site_code == siteCode && ticket.technology == "4G"
//         );
//       });

//       this.$dialog.open(NURTickets, {
//         props: {
//           style: {
//             width: "75vw",
//           },
//           breakpoints: {
//             "960px": "75vw",
//             "640px": "90vw",
//           },
//           modal: true,
//         },

//         data: {
//           NUR_2G_tickets: tickets_2G,
//           NUR_3G_tickets: tickets_3G,
//           NUR_4G_tickets: tickets_4G,
//         },
//       });
//     },
//     downloadTXTickets() {
//       const data = this.tickets;
//       const fileName = "TxTickets";
//       const exportType = exportFromJSON.types.xls;

//       if (data) exportFromJSON({ data, fileName, exportType });
//     },
//     getCairoMWYearlyNUR() {

//       NUR.cairoTXYearlyAnalysis(this.tickets[0].year)


//         .then((response) => {
//           console.log(response);
//           let labels = Object.keys(response.data.NUR_C_yearly.cairo);
//           let cairo = response.data.NUR_C_yearly.cairo;
//           let zones = response.data.NUR_C_yearly.zones;
//           this.$dialog.open(CairoTxYearlyAnalysis, {
//             props: {
//               style: {
//                 width: "75vw",
//               },
//               breakpoints: {
//                 "960px": "75vw",
//                 "640px": "90vw",
//               },
//               modal: true,
//             },

//             data: {
//               labels: labels,
//               cairo: cairo,
//               zones: zones,
//               title: "Transmission"
//             },
//           });
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     },
//   },
// };
</script>

<style lang="scss" scoped></style>