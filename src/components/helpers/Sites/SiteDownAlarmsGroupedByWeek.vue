<template>
    <Card v-if="charts">
        <template #title>
            <div class="d-flex justify-content-center align-items-center">
                <p style="text-align: center">Down Alarms</p>
            </div>
        </template>
        <template #content>
            <div v-for="char in charts" :key="char.year">
                <p>{{ char.year }}</p>
                <Chart type="bar" :data="char.graph" :options="lightOptions" :plugins="plugins" />
            </div>


        </template>
    </Card>
    <Card v-if="yearsWeeks" class="mt-3">
        <template #title>
            <div class="d-flex justify-content-center align-items-center">
                <p style="text-align: center">Down Alarms Weeks</p>
            </div>
        </template>
        <template #content>
            <div v-for="year in yearsWeeks" :key="year">
                <p>Year {{ year.year }}</p>
                <a href="" @click.prevent="getWeeklyAlarms(year.year,week)" v-for="week in year.week" style="display: block;">week {{ week }}</a>

            </div>



        </template>


    </Card>
</template>

<script>
import ChartDataLabels from "chartjs-plugin-datalabels";
export default {
    data() {
        return {
            lightOptions: {


                plugins: {
                    legend: {
                        labels: {
                            color: "#495057",
                        },
                    },
                    datalabels: {
                        anchor: "end",
                    },
                },
            },
            plugins: [ChartDataLabels],

            charts: null,
            yearsWeeks: null,
            site_code:null,

        };
    },
    name: "SiteDownAlarmsGroupedByWeek",
    inject: ["dialogRef"],
    watch:{
        $route(to,from)
        {
            if(to.path=="/user/login")
            {
                this.dialogRef.close();
            }

        }

    },
    mounted() {
        this.mountChartData();
        this.mountTable();

    },
    methods: {
        mountTable() {
            let downAlarmsCount = this.dialogRef.data.downAlarms.alarmsCount;
            this.site_code=this.dialogRef.data.site_code;
            let years = Object.keys(downAlarmsCount);
            let valuesDownAlarmsCount = Object.values(downAlarmsCount);
            for (var i = 0; i < valuesDownAlarmsCount.length; i++) {

                let weeks = Object.keys(valuesDownAlarmsCount[i]);
                let newWeeks = weeks.map(extractWeek);
                function extractWeek(element) {
                    return Number(element.slice(4))
                }
                this.yearsWeeks = [];

                let yearWeek = {
                    "year": Number(years[i]),
                    "week": newWeeks
                };
                this.yearsWeeks.push(yearWeek)




            }

        },
        mountChartData() {
            let downAlarmsCount = this.dialogRef.data.downAlarms.alarmsCount;
            let avgDownTime = this.dialogRef.data.downAlarms.avgDownTime;
            let valuesDownAlarmsCount = Object.values(downAlarmsCount);
            let valuesavgDownTime = Object.values(avgDownTime);
            let years = Object.keys(downAlarmsCount);
            this.charts = [];

            for (var i = 0; i < valuesDownAlarmsCount.length; i++) {


                let data = {
                    graph: {
                        labels: Object.keys(valuesDownAlarmsCount[i]),

                        datasets: [
                            {
                                label: "Count down Alarms",
                                backgroundColor: "#C3B1E1",
                                data: Object.values(valuesDownAlarmsCount[i]),
                                borderWidth: 1,
                            },
                            {
                                label: "Average down time",
                                backgroundColor: "var(--purple-500)",
                                data: Object.values(valuesavgDownTime[i]),
                                borderWidth: 1,
                            },
                        ],

                    },
                    year: years[i]
                };
                this.charts.push(data);

            }


        },
        getWeeklyAlarms(year,week)
        {
            let data={
                year:year,
                week:week,
                site_code:this.site_code
            };
          
        }

    },

}
</script>

<style lang="scss" scoped></style>