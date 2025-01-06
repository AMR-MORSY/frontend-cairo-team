<template>
    <DataTable :value="down2G" responsiveLayout="scroll" class="p-datatable-sm" stripedRows>
        <template #header>
            <p class="table-header" style="text-align: center; font-size: large; font-weight: 600;">2G</p>
        </template>
        <Column field="site_code" header="Site Code"></Column>
        <Column field="site_name" header="site_name"></Column>
        <Column field="repeatation" header="Repeatation" sortable></Column>
        <Column field="avg_duration" header="Avg.Durations" sortable ></Column>
    </DataTable>
    <DataTable :value="down3G" responsiveLayout="scroll" class="p-datatable-sm" stripedRows>
        <template #header>
            <p class="table-header" style="text-align: center; font-size: large; font-weight: 600;">3G</p>
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
            down2G: null,
            down3G: null

        };
    },
    name: "zoneDownSitesTable",
    inject: ["dialogRef"],
    mounted() {
        this.mountTables();

    },
  
    methods: {
        mountTables() {
            this.down2G = this.dialogRef.data.down2G;
            this.down3G = this.dialogRef.data.down3G;
        }

    },
}
</script>