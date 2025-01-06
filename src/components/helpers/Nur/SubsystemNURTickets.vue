<template>
    <div>

        <DataTable :value="sites" responsiveLayout="scroll" class="p-datatable-sm" stripedRows :rows="5"
            :paginator="true" v-model:selection="selectedSite" selectionMode="single" dataKey="site_code"
            @row-select="onRowSelect">
            <Column selectionMode="single"></Column>
            <Column field="site_name" header="Name"></Column>
            <Column field="site_code" header="Code"></Column>
            <Column field="NUR_2G_sum" header="NUR-2G" sortable></Column>
            <Column field="NUR_3G_sum" header="NUR-3G" sortable></Column>
            <Column field="NUR_4G_sum" header="NUR-4G" sortable></Column>
            <Column field="NUR_C" header="NUR-C" sortable></Column>
            <Column field="oz" header="oz" sortable></Column>
        </DataTable>

        <Button class="block" label="Download" severity="success" @click="downloadGenTickets" raised />

    </div>
</template>

<script setup>
import { useDialog } from "primevue/usedialog";
import NURTickets from "../../pages/NUR/NURTickets.vue";
import exportFromJSON from "export-from-json";
import { ref } from "vue";
const dialog=useDialog();

const props = defineProps([
    "sites", "tickets","title"
])
const selectedSite=ref();

const downloadGenTickets = () => {
    const data = props.tickets;
    const fileName = `${props.title}`;
    const exportType = exportFromJSON.types.xls;

    if (data) exportFromJSON({ data, fileName, exportType });
}


const onRowSelect = () => {
    let siteCode = selectedSite.value.site_code;

    let tickets_2G = props.tickets.filter((ticket) => {
        return (
            ticket.problem_site_code == siteCode && ticket.technology == "2G"
        );
    });
    let tickets_3G = props.tickets.filter((ticket) => {
        return (
            ticket.problem_site_code == siteCode && ticket.technology == "3G"
        );
    });
    let tickets_4G = props.tickets.filter((ticket) => {
        return (
            ticket.problem_site_code == siteCode && ticket.technology == "4G"
        );
    });

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
            NUR_2G_tickets: tickets_2G,
            NUR_3G_tickets: tickets_3G,
            NUR_4G_tickets: tickets_4G,
        },
    });
}


</script>

<style lang="scss" scoped></style>