<template>
    <div>

        <Chart type="bar" :id="chartId" :data="yearlyData" :plugins='plugins' :options="chartOptions" class="h-[30rem]" />
        <Button label="Download Image" class=" block" raised severity="success" @click="downloadImage()" />
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

import ChartDataLabels from "chartjs-plugin-datalabels";
import { computed } from 'vue';


const plugins = [ChartDataLabels]

const props = defineProps([
    "chartDataSets", "chartTitle","chartId"
])


const yearlyData = computed(() => props.chartDataSets)


const chartOptions = ref();

onMounted(() => {

    chartOptions.value = setChartOptions();

})

const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            },
            datalabels: {
                anchor: "end",
                color: "red",
            },
            title: {
                display: true,
                text: `${props.chartTitle}`
            },
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
}


const downloadImage = () => {
    const imageLinlk = document.createElement('a');
    var chart = document.getElementById(`${props.chartId}`).children[0];
    imageLinlk.href = chart.toDataURL('image/png', 1);
    imageLinlk.download = `${props.chartTitle}.png`
    imageLinlk.click()

}


</script>

<style lang="scss" scoped></style>