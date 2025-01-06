<template>
   
    <DataTable :value="sites" responsiveLayout="scroll" class="p-datatable-sm" stripedRows>
        <template #header>
            <p class="table-header" style="text-align: center; font-size: large; font-weight: 600;">Sites</p>
        </template>
        <Column field="site_code" header="Site Code"></Column>
        <Column field="site_name" header="site_name"></Column>
        <Column field="repeatation" header="Repeatation" sortable></Column>
        <Column field="avg_duration" header="Avg.Durations" sortable ></Column>
    </DataTable>
</template>

<script>
export default {
    data() {
        return {
           sites:null,

        };
    },
    name: "zoneDownSitesWithoutPowerTable",
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