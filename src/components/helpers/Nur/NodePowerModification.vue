<template>

    <p class="w-full text-center font-Signika text-font-main-color text-lg">NUR:{{ NuR }} </p>


    <div class=" w-full flex justify-center items-center">

        <DoughnutChart :chartDataSets="chartData" :chartTitle="title" :chartId="chrId" />


    </div>
    <div class="table-container">

        <div style="display: flex; align-items: center; justify-content: flex-end">

            <div style=" display: flex; align-items: center; justify-content: flex-end">
                <img src="../../logos/week-icon.aba4072e.svg" @click="getCairoYearlyNUR"
                    style="cursor: pointer;width: 15%; margin-bottom: 20px;" v-tooltip.right="'Weekly Analysis'" />

            </div>

        </div>

        <SubsystemNURTickets :tickets="tickets" :sites="sites" :title="title" />
    </div>

</template>

<script setup>

import SubsystemNURTickets from "./SubsystemNURTickets.vue";
import NUR from "../../../apis/NUR"
import CairoTxYearlyAnalysis from "../../pages/NUR/CairoTxYearlyAnalysis.vue";

import { inject } from "vue";
import { useDialog } from "primevue/usedialog";

const dialogRef = inject('dialogRef');
const dialog = useDialog();

import { ref, onMounted } from "vue";
import DoughnutChart from "../../helpers/DoughnutChart.vue";


const chartData = ref();
const title = ref(dialogRef.value.data.title)
const chrId=ref(dialogRef.value.data.chartID)

const NuR = ref();
const sites = ref();
const tickets = ref();

onMounted(() => {
    setChartData();

    mountTableData();
});


const setChartData = () => {
    const documentStyle = getComputedStyle(document.body);
    sites.value = dialogRef.value.data.sites;
    tickets.value = dialogRef.value.data.tickets;
    NuR.value = dialogRef.value.data.statestics.NUR_combined;
    let ticketsType = {
        Access: dialogRef.value.data.statestics.NUR_access_c,
        No_Access: dialogRef.value.data.statestics.NUR_without_access_c,
    };
    chartData.value = {
        labels: Object.keys(ticketsType),
        datasets: [
            {
                data: Object.values(ticketsType),
                backgroundColor: [documentStyle.getPropertyValue('--p-green-500'), documentStyle.getPropertyValue('--p-rose-500')],
                hoverBackgroundColor: [documentStyle.getPropertyValue('--p-green-400'), documentStyle.getPropertyValue('--p-rose-400')]
            },
        ],
    };
}

const mountTableData = () => {
    sites.value = dialogRef.value.data.sites;
    tickets.value = dialogRef.value.data.tickets;
    NuR.value = dialogRef.value.data.statestics.NUR_combined;
}


const getCairoYearlyNUR = () => {
    if (title.value == "Cairo Main Power") {

        NUR.cairoPowerYearlyAnalysis(tickets.value[0].year)
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
                        title: "Main Power"
                    },
                });
            })
            .catch((error) => {
                console.log(error);
            });

    }
    else if (title.value == "Cairo NodeB") {
        NUR.cairoNodeBYearlyAnalysis(tickets.value[0].year)
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
                        title: "NodeB"
                    },
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    else if (title.value=="Cairo Modifications")
    {
        NUR.cairoModificationYearlyAnalysis(tickets.value[0].year)
   
        .then((response) => {
          
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
              title:"Modification"
            },
          });
        })
        .catch((error) => {
          console.log(error);
        });

    }

}








</script>

<style lang="scss" scoped></style>