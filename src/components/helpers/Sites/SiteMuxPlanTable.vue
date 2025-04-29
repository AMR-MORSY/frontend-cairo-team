<template>
  <DataTable
    :value="muxPlans"
    responsiveLayout="scroll"
    class="p-datatable-sm"
    stripedRows
  >
    <Column field="ne" header="NE"></Column>
    <Column field="ne_code" header="NE Code"></Column>
    <Column field="ne_slot" header="NE Slot" sortable></Column>
    <Column field="ne_ip" header="IP" sortable></Column>
    <Column field="fe" header="FE"></Column>
    <Column field="fe_slot" header="FE Slot"></Column>
   
  </DataTable>
</template>

<script setup>
import { inject, onMounted, ref } from "vue";
const dialogRef = inject("dialogRef");

const muxPlans = ref();

onMounted(() => {
  muxPlans.value = dialogRef.value.data.muxPlans;
});
</script>
