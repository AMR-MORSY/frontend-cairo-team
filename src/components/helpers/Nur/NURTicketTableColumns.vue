<template>
    <div>
        <h3 class=" text-lg text-font-main-color font-Signika font-bold">{{ tableHeader }}</h3>
        <DataTable :value="tickets" responsiveLayout="scroll" class="p-datatable-sm" stripedRows :rows="5">
            <Column field="begin" header="begin"></Column>
            <Column field="end" header="End"></Column>
            <Column field="Dur_Hr" header="Dur_Hr"></Column>
            <Column field="cells" header="Cells"></Column>
            <Column field="impacted_sites" header="impacted Sites"></Column>
            <Column field="nur" header="NUR"></Column>
            <Column field="sub_system" header="Sub System"></Column>
            <Column field="solution" header="solution"></Column>
            <Column field="technology" header="Technology"></Column>
            <Column field="week" header="Week"></Column>
            <Column field="year" header="Year"></Column>
        </DataTable>
    </div>

</template>

<script setup>
import { computed } from 'vue';


const props=defineProps([
    "tableValue","tableHeader"
])
const tickets=computed(()=>
    props.tableValue
)

</script>

<style lang="scss" scoped></style>