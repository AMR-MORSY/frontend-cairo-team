<template>
   
    <Card v-if="chartsBefore">
        <template #title>
            <div class="d-flex justify-content-center align-items-center">
                <p style="text-align: center">Backup time before down</p>
            </div>
        </template>
        <template #content>
            <div v-for="char in chartsBefore" :key="char.year">
                <p>{{ char.year }}</p>
                <Chart type="bar" :data="char.graph" :options="lightOptions" :plugins="plugins" />
            </div>


        </template>
    </Card>
    <Card v-if="chartsWithout">
        <template #title>
            <div class="d-flex justify-content-center align-items-center">
                <p style="text-align: center">Backup time without down</p>
            </div>
        </template>
        <template #content>
            <div v-for="char in chartsWithout" :key="char.year">
                <p>{{ char.year }}</p>
                <Chart type="bar" :data="char.graph" :options="lightOptions" :plugins="plugins" />
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

            chartsBefore: null,
            chartsWithout: null,

        };

    },
    inject: ["dialogRef"],
    name: "siteBatteriesHealth",
    mounted() {
        this.mountChartData();

    },
    watch:{
        $route(to,from)
        {
            if(to.path=="/user/login")
            {
                this.dialogRef.close();
            }

        }

    },

    methods: {
        mountChartsBefore() {
            let powerAlarmsCountBeforeDown = this.dialogRef.data.powerAlarms.powerAlarmsCountBeforeDown;
            let maxBackuptime = this.dialogRef.data.powerAlarms.maxBackuptime;
            let valuespowerAlarmsCountBeforeDown = Object.values(powerAlarmsCountBeforeDown);
            let valuesmaxBackuptime = Object.values(maxBackuptime);
            let yearsBefore = Object.keys(powerAlarmsCountBeforeDown);
            this.chartsBefore = [];

            for (var i = 0; i < valuespowerAlarmsCountBeforeDown.length; i++) {
                let data = {
                    graph: {
                        labels: Object.keys(valuespowerAlarmsCountBeforeDown[i]),

                        datasets: [
                            {
                                label: "Count power Alarms",
                                backgroundColor: "#C3B1E1",
                                data: Object.values(valuespowerAlarmsCountBeforeDown[i]),
                                borderWidth: 1,
                            },
                            {
                                label: "Max Backuptime",
                                backgroundColor: "var(--purple-500)",
                                data: Object.values(valuesmaxBackuptime[i]),
                                borderWidth: 1,
                            },
                        ],

                    },
                    year: yearsBefore[i]
                };
                this.chartsBefore.push(data);

            }




        },
        mountChartsWithout() {
            let powerAlarmsWithoutDown = this.dialogRef.data.powerAlarms.powerAlarmsWithoutDown;
            let maxAlarmsDurationWithoutDown = this.dialogRef.data.powerAlarms.maxAlarmsDurationWithoutDown;
            let valuespowerAlarmsWithoutDown = Object.values(powerAlarmsWithoutDown);
            let valuesmaxAlarmsDurationWithoutDown = Object.values(maxAlarmsDurationWithoutDown);
            let yearsWithout = Object.keys(powerAlarmsWithoutDown);
            this.chartsWithout = [];

            for (var i = 0; i < valuespowerAlarmsWithoutDown.length; i++) {
                let data = {
                    graph: {
                        labels: Object.keys(valuespowerAlarmsWithoutDown[i]),

                        datasets: [
                            {
                                label: "Count power Alarms",
                                backgroundColor: "#C3B1E1",
                                data: Object.values(valuespowerAlarmsWithoutDown[i]),
                                borderWidth: 1,
                            },
                            {
                                label: "Max Backuptime",
                                backgroundColor: "var(--purple-500)",
                                data: Object.values(valuesmaxAlarmsDurationWithoutDown[i]),
                                borderWidth: 1,
                            },
                        ],

                    },
                    year: yearsWithout[i]
                };
                this.chartsWithout.push(data);

            }

        },

        mountChartData() {
            this.mountChartsBefore();
            this.mountChartsWithout()





        }

    },


}
</script>

<style lang="scss" scoped></style>