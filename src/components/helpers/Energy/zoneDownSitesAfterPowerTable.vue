<template>
    <DataTable :value="sites" responsiveLayout="scroll" class="p-datatable-sm" stripedRows>
        <template #header>
            <p class="table-header" style="text-align: center; font-size: large; font-weight: 600;">Sites</p>
        </template>
        <Column field="site_code" header="Site Code"></Column>
        <Column field="site_name" header="site Name"></Column>
        <Column field="avgBackuptime" header="Average Backuptime" sortable></Column>
        <!-- <Column field="downAlarmDuration" header="down Alarm Duration" sortable></Column>
        
        <Column field="downAlarm_start_date" header="downAlarm start date" ></Column>
        <Column field="downAlarm_start_time" header="downAlarm start time"  ></Column>
        <Column field="downAlarm_end_date" header="downAlarm end date"></Column>
        <Column field="downAlarm_end_time" header="downAlarm end time"></Column>

        <Column field="powerAlarm_start_date" header="powerAlarm start date" ></Column>
        <Column field="powerAlarm_start_time" header="powerAlarm start time"  ></Column>
        <Column field="powerAlarm_end_date" header="powerAlarm end date"></Column>
        <Column field="powerAlarm_end_time" header="powerAlarm end time"></Column> -->

     
    </DataTable>
   
</template>

<script>
export default {
    data() {
        return {
            sites:null

        };
    },
    name: "zoneDownSitesAfterPowerTable",
    inject: ["dialogRef"],
    mounted() {
        this.mountTables();

    },
  
    methods: {
        mountTables() {
            this.sites = this.dialogRef.data.sites;
           
        }

    },
}
</script>