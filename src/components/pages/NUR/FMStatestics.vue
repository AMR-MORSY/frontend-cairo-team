<template>
    <div class=" w-screen-2xl px-10 py-20" v-if="isNURAvailable">


        <Card class=" max-w-screen-xl mx-auto">
            <template #title>


                <p class=" w-full text-center font-Signika text-font-main-color text-bold text-lg">Week:{{ week }}</p>

            </template>
            <template #content>



                <div class="grid grid-cols-4 gap-4">
                    <div class="col-span-4 lg:col-span-1 mt-5">
                        <Card>

                            <template #content>

                                <BarChart :chartDataSets="zones2GNUR" chartTitle="Zone 2G FM" chartId="cairo2GFM" />
                            </template>
                            <template #footer>
                                <p class=" text-font-main-color font-Signika font-semibold">Cairo 2G FM={{ cairo2GNUR }}
                                </p>
                            </template>
                        </Card>
                    </div>
                    <div class="col-span-4 lg:col-span-1 mt-5">
                        <Card>

                            <template #content>
                                <BarChart :chartDataSets="zones3GNUR" chartTitle="Zone 3G FM" chartId="cairo3GFM" />

                            </template>
                            <template #footer>
                                <p class=" text-font-main-color font-Signika font-semibold">Cairo 3G FM={{ cairo3GNUR }}
                                </p>
                            </template>
                        </Card>
                    </div>
                    <div class="col-span-4 lg:col-span-1 mt-5">
                        <Card>

                            <template #content>
                                <BarChart :chartDataSets="zones4GNUR" chartTitle="Zone 4G FM" chartId="cairo4GFM" />
                            </template>
                            <template #footer>
                                <p class=" text-font-main-color font-Signika font-semibold">Cairo 4G NUR={{ cairo4GNUR
                                    }}</p>
                            </template>
                        </Card>
                    </div>
                    <div class="col-span-4  lg:col-span-1 mt-5">
                        <Card>

                            <template #content>
                                <BarChart :chartDataSets="zonesCombinedNUR" chartTitle="Cairo Combined FM"
                                    chartId="cairoCombinedFM" />

                            </template>
                            <template #footer>
                                <p class=" text-font-main-color font-Signika font-semibold">Cairo Combined NUR={{
                                    cairoCombinedNUR }}</p>

                            </template>
                        </Card>
                    </div>

                </div>

            </template>


        </Card>
        <Card class=" max-w-screen-xl mx-auto mt-5">
            <template #content>



                <div class="grid grid-cols-4 gap-4">
                    <div class="col-span-4 lg:col-span-1 mt-5">
                        <Card>

                            <template #content>
                                <BarChart :chartDataSets="workGroupCompare" chartTitle="FM Area"
                                    chartId="workGroup" />

                            </template>

                        </Card>
                    </div>
                </div>
            </template>
        </Card>


    </div>

</template>

<script setup>
import { onMounted, ref } from 'vue';
import NUR from "../../../apis/NUR";
import BarChart from '../../helpers/BarChart.vue';
import { useConfirm } from "primevue/useconfirm";
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

const confirm = useConfirm();
const router = useRouter();
const toast = useToast();

const props = defineProps([
    "week", "year"
])

const notFoundErrors = ref();
const isNURAvailable = ref(false);
const zones2GNUR = ref();
const cairo2GNUR = ref();
const zones3GNUR = ref();
const cairo3GNUR = ref();
const zones4GNUR = ref();
const cairo4GNUR = ref()
const zonesCombinedNUR = ref();
const cairoCombinedNUR = ref();
const workGroupCompare = ref();


onMounted(() => {
    getWeekFM()
})

const ZoneNURChart = (zoneNUR, zoneTickets, label) => {
    const documentStyle = getComputedStyle(document.documentElement);
    return {
        labels: Object.keys(zoneNUR),

        datasets: [
            {
                label: label,

                data: Object.values(zoneNUR),
                backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
                borderColor: documentStyle.getPropertyValue('--p-cyan-500'),

            },
            {
                label: "No.tickets",

                data: Object.values(zoneTickets),
                backgroundColor: documentStyle.getPropertyValue('--p-gray-500'),
                borderColor: documentStyle.getPropertyValue('--p-gray-500'),

            },
        ],
    }

}
const workGroupCompareChart = (workGroup) => {
    const documentStyle = getComputedStyle(document.documentElement);
    let keys = Object.keys(workGroup);
    let values = Object.values(workGroup)
    let count = [];
    let NUR = [];
    values.forEach((element) => {
        count.push(element.ticktes_count);
        NUR.push(element.NUR);
    })

  

    return {
        labels: keys,

        datasets: [
            {
                label: "No. tickets",

                data: count,
                backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
                borderColor: documentStyle.getPropertyValue('--p-cyan-500'),

            },
            {
                label: "NUR",

                data: NUR,
                backgroundColor: documentStyle.getPropertyValue('--p-gray-500'),
                borderColor: documentStyle.getPropertyValue('--p-gray-500'),

            },
        ],

    }


}
const getWeekFM = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    let data = {
        week: props.week,
        year: props.year,
        NUR_Type: "FM"
    }

    NUR.getNur(data).then((response) => {
        console.log(response)
        if (response.data.errors) {
            notFoundErrors.value = response.data.errors;
            confirm.require({

                group: 'info',
                message: notFoundErrors.value.toString(),
                header: "Confirmation",
                icon: "pi pi-exclamation-triangle",

                acceptProps: {
                    severity: 'danger',
                    icon: 'pi pi-check',
                    size: 'small',
                    label: "OK"
                },
                accept: () => {
                    router.go(-1);


                },


            })
        }
        else {
            let NUR = response.data.NUR;
            isNURAvailable.value = true;
            zones2GNUR.value = ZoneNURChart(NUR.NUR2G.zonesNUR2G, NUR.NUR2G.zonesTotalNumTickets, "2G NUR");
            cairo2GNUR.value = NUR.NUR2G.cairoNUR2G;

            zones3GNUR.value = ZoneNURChart(NUR.NUR3G.zonesNUR3G, NUR.NUR3G.zonesTotalNumTickets, "3G NUR");
            cairo3GNUR.value = NUR.NUR3G.cairoNUR3G;

            zones4GNUR.value = ZoneNURChart(NUR.NUR4G.zonesNUR4G, NUR.NUR4G.zonesTotalNumTickets, "4G NUR");
            cairo4GNUR.value = NUR.NUR4G.cairoNUR4G;

            zonesCombinedNUR.value = {
                labels: Object.keys(NUR.combined),

                datasets: [
                    {
                        label: "Combined NUR",
                        backgroundColor: documentStyle.getPropertyValue('--p-gray-500'),
                        borderColor: documentStyle.getPropertyValue('--p-gray-500'),
                        data: Object.values(NUR.combined),

                    },
                ],
            };
            cairoCombinedNUR.value = NUR.combined.cairo;
    
            workGroupCompare.value = workGroupCompareChart(NUR.workGroupCompar)


        }

    }).catch((error) => {
        isNURAvailable.value = false;
        if (error.response.status == 422) {
            let errors = error.response.data.errors;
            if (errors.week) {

                errors.week.forEach((element) => {
                    toast.add({
                        severity: "error",
                        summary: "Error",
                        detail: element,
                        life: 3000
                    })
                });
            }
            if (errors.month) {

                errors.month.forEach((element) => {
                    toast.add({
                        severity: "error",
                        summary: "Error",
                        detail: element,
                        life: 3000
                    })
                });
            }
            if (errors.year) {

                errors.year.forEach((element) => {
                    toast.add({
                        severity: "error",
                        summary: "Error",
                        detail: element,
                        life: 3000
                    })
                });
            }
        }

    })
}

</script>

<style lang="scss" scoped></style>