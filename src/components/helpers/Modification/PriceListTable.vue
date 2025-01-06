<template>
  <div class="w-screen-2xl px-10 py-20">
    <Card class="max-w-screen-xl px-5 mx-auto">
      <template #content>
        <DataTable
          :value="listItems"
          scrollable
          :paginator="true"
          :rows="5"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 15]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          class="text-sm"
          tableStyle="min-width: 50rem"
          @row-select="onRowSelect"
          v-model:selection="selectedItem"
        >
          <Column selectionMode="single"></Column>
          <Column field="item" header="#"></Column>
          <Column field="description" header="Description"></Column>
          <Column field="unit" header="Unit"></Column>
          <Column field="supply" header="Supply"></Column>
          <Column field="installation" header="Installation"></Column>
          <Column field="sup_inst" header="S&I"></Column>
          <Column field="type" header="Type"></Column>
          <!-- <Column field="request_date" sortable header="Request Date"></Column>
    <Column field="description" sortable header="Description"></Column>
    <Column field="cw_date" sortable header="C.W Date"></Column>
    <Column field="d6_date" sortable header="D6 Date"></Column>
    <Column field="final_cost" header="Final Cost" sortable></Column>
    <Column field="action_owner.name" header="Action Owner" sortable></Column>
    <Column field="reported" sortable header="Reported"></Column>
    <Column field="reported_at" sortable header="Reporting Date"></Column> -->
        </DataTable>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { computed, ref } from "vue";
import { inject } from "vue";

const dialogRef = inject('dialogRef');


const selectedItem = ref();
const listItems = ref();

onMounted(()=>{
    listItems.value=dialogRef.value.data.priceListItems;
})

const onRowSelect = () => {};
</script>
