<template>
    <div class="grid grid-cols-3 gap-4">
        <div class="col-span-3 lg:col-span-1 mt-2">
            <Card>
                <template #title>
                    <p style="font-size: 16px; padding: 0; text-align: center">
                        Subsystem
                    </p>
                </template>
                <template #content>
                    <DataTable :value="subsystem" responsiveLayout="scroll" class="p-datatable-sm" stripedRows
                        :paginator="true" :rows="5">
                        <Column selectionMode="single"></Column>
                        <Column field="subsystem" header="Subsystem"></Column>
                        <Column field="NUR" header="NUR_C" sortable></Column>
                        <Column field="count" header="Count" sortable></Column>
                    </DataTable>

                </template>
            </Card>
        </div>
        <div class="col-span-3 lg:col-span-1 mt-2">
            <Card>
                <template #title>
                    <p style="font-size: 16px; padding: 0; text-align: center">
                        Generator Statestics
                    </p>

                </template>
                <template #content>
                    <div class="grid grid-cols-7 gap-2">
                        <div class="col-span-1">
                            <img src="../../logos/Orange_logo.svg" class="w-75" alt="" v-tooltip.right="'Get Tickets'"
                                style="cursor: pointer" @click="getORGGenTickets" />
                        </div>
                        <div class="col-span-2">
                            <img src="../../logos/Etisalat_eand_Logo_AR.svg" class="w-100" alt=""
                                v-tooltip.right="'Get Tickets'" style="cursor: pointer" @click="getETGenTickets" />
                        </div>
                        <div class="col-span-2">
                            <img src="../../logos/Vodafone_2017_logo.svg" class="w-100" alt=""
                                v-tooltip.right="'Get Tickets'" style="cursor: pointer" @click="getVFGenTickets" />
                        </div>
                        <div class="col-span-1">
                            <img src="../../logos/rent-sign-svgrepo-com.svg" class="w-75" alt=""
                                v-tooltip.right="'Get Tickets'" style="cursor: pointer" @click="getRentedGenTickets" />
                        </div>
                        <div class="col-span-1">
                            <img src="../../logos/We_logo.svg" class="w-75" alt="" v-tooltip.right="'Get Tickets'"
                                style="cursor: pointer" @click="getWEGenTickets" />
                        </div>
                    </div>
                    <Chart type="bar" :data="generatorStatestics" :plugins="plugins" :options="lightOptions" />
                </template>
            </Card>
        </div>
        <div class="col-span-3 lg:col-span-1 mt-2">
            <Card>
                <template #title>
                    <p style="font-size: 16px; padding: 0; text-align: center">
                        Nodals & VIP
                    </p>
                </template>
                <template #content>
                    <div class="grid grid-cols-2">
                        <div class="col-span-1">
                            <div class="w-full">
                                <img src="../../logos/kisspng-radio-vip-fm-romania-service-sales-vip-fm-98-spons-超市vip-5af1f24b2cd0c2.8140047415258056431836.png"
                                    @click="getVipSitesNUR" class=" block w-1/2 mx-auto" style="cursor: pointer"
                                    alt="" />
                            </div>
                        </div>

                        <div class="col-span-1">
                            <div class=" block w-1/2 mx-auto" @click="getNodalSitesNUR">
                                <img src="../../logos/c67d66dd354d921a8c6652ebaf82d8bc.svg" class="w-75" alt="" />
                            </div>
                        </div>
                    </div>
                </template>
            </Card>
        </div>
    </div>
    <div class="grid grid-cols-2 gap-4">
        <div class="col-span-2 md:col-span-1 mt-2">
          <TopSites :zoneNUR="zoneTopNUR" @siteNUR="getSiteNUR">
            <template #header> Top Sites NUR </template>
            <template #columns>
              <Column field="siteName" header="Name"></Column>
              <Column field="NUR" header="NUR" sortable></Column>
            </template>
          </TopSites>
        </div>
        <div class="col-span-2 md:col-span-1 mt-2">
          <TopSites :zoneNUR="zoneRepeatedSites" @siteNUR="getSiteNUR">
            <template #header> Repeated Sites </template>
            <template #columns>
              <Column field="siteName" header="Name"></Column>
              <Column field="count" header="Count" sortable></Column>
            </template>
          </TopSites>
        </div>
      </div>
</template>

<script setup>
import { useDialog } from 'primevue/usedialog';
import NUR from "../../../apis/NUR";
import VipsOrNodals from "../../pages/NUR/VipsOrNodals.vue";
import NURTickets from "../../pages/NUR/NURTickets.vue";
import { ref } from 'vue';
import { computed } from 'vue';
import ChartDataLabels from "chartjs-plugin-datalabels";
import siteNURTable from '../../pages/NUR/siteNURTable.vue';
import TopSites from '../../pages/NUR/TopSites.vue';
import { useToast } from 'primevue/usetoast';

const toast=useToast();



const props = defineProps([
    "zoneWeek", "zoneYear", "zone", 'zoneGen', 'zoneSub','zoneGenStatestics',"zoneRepeatedSites","zoneTopNUR"
])


const subsystem = computed(() => props.zoneSub);
const generatorStatestics = computed(() => props.zoneGenStatestics);
const dialog = useDialog();
const lightOptions = {
    plugins: {
        legend: {
            labels: {
                color: "red",
            },
        },
        datalabels: {
            anchor: "end",
            color: "red",
        },
    },
}
const plugins = [ChartDataLabels]

const getSiteNUR=(event)=>{
     
     dialog.open(siteNURTable, {
       props: {
         header: event.NUR3G[0].problem_site_name,
         style: {
           width: "75vw",
         },
         breakpoints: {
           "960px": "75vw",
           "640px": "90vw",
         },
       },

       data: {
         NUR3G: event.NUR3G,
         NUR2G: event.NUR2G,
         NUR4G: event.NUR4G,
       },
     });
   }

const getORGGenTickets = () => {

    
    if (props.zoneGen["ORG"].tickets.length > 0) {
        
        dialog.open(NURTickets, {
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
                allTickets: props.zoneGen["ORG"].tickets,
            },
        });
    }
}
const getWEGenTickets = () => {
    if (props.zoneGen["WE"].tickets.length > 0) {
        dialog.open(NURTickets, {
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
                allTickets: props.zoneGen["WE"].tickets,
            },
        });
    }
}

const getETGenTickets = () => {
    if (props.zoneGen["ET"].tickets.length > 0) {
        dialog.open(NURTickets, {
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
                allTickets: props.zoneGen["ET"].tickets,
            },
        });
    }
}
const getVFGenTickets = () => {
    if (props.zoneGen["VF"].tickets.length > 0) {
        dialog.open(NURTickets, {
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
                allTickets: props.zoneGen["VF"].tickets,
            },
        });
    }
}
const getRentedGenTickets = () => {
    if (props.zoneGen["Rented"].tickets.length > 0) {
        dialog.open(NURTickets, {
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
                allTickets: props.zoneGen["Rented"].tickets,
            },
        });
    }
}

const getVipSitesNUR = () => {

    let sites = [];


    NUR.getVipSitesWeeklyNUR(props.zone, props.zoneWeek, props.zoneYear)
    
        .then((response) => {
            console.log(response.data)
            if (response.data.sites.length > 0) {
                sites = response.data.sites;
                dialog.open(VipsOrNodals, {
                    props: {
                        style: {
                            width: "50vw",
                        },
                        breakpoints: {
                            "960px": "50vw",
                            "640px": "90vw",
                        },
                        modal: true,
                    },

                    data: {
                        sites: sites,
                    },
                });
            } else {
                toast.add({
                    "severity":"success",
                    "summary":"Great !!! VIP sites did not make NUR this Week",
                    "life":3000

                })
               

            }
        })

}
const getNodalSitesNUR = () => {

    let sites = [];

    NUR.getNodalSitesWeeklyNUR(props.zone, props.zoneWeek, props.zoneYear)
        .then((response) => {
            if (response.data.sites.length > 0) {
                sites = response.data.sites;
                dialog.open(VipsOrNodals, {
                    props: {
                        style: {
                            width: "50vw",
                        },
                        breakpoints: {
                            "960px": "50vw",
                            "640px": "90vw",
                        },
                        modal: true,
                    },

                    data: {
                        sites: sites,
                    },
                });
            } else {
                toast.add({
                    "severity":"success",
                    "summary": "Great !!! Nodal sites did not make NUR this Week",
                    "life":3000

                })
               
             

            }
        })
 
}

</script>

<style lang="scss" scoped></style>