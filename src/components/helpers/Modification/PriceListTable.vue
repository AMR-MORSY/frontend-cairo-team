<template>
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
    v-model:selection="selectedItems"
  >
    <Column selectionMode="multiple"></Column>
    <Column field="item" header="#"></Column>
    <Column field="description" header="Description"></Column>
    <Column field="unit" header="Unit"></Column>
    <Column field="supply" header="Supply"></Column>
    <Column field="installation" header="Installation"></Column>
    <Column field="sup_inst" header="S&I"></Column>
    <Column field="type" header="Type"></Column>
  </DataTable>
  <div class="flex justify-center items-center">
    <Button
      label="Add"
      :raised="true"
      class="block"
      severity="danger"
      @click="addItem"
      :disabled="!isItemsSelected"
    />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { computed, ref } from "vue";
import { inject } from "vue";

const dialogRef = inject("dialogRef");

const selectedItems = ref([]);
const listItems = ref();

const isItemsSelected=computed(()=>{
  if(selectedItems.value.length>0)
{
  return true
}
return false;
})
onMounted(() => {
  listItems.value = dialogRef.value.data.priceListItems;
});

const addItem=()=>{
  dialogRef.value.close(selectedItems.value)

}

const onRowSelect = () => {};
</script>
