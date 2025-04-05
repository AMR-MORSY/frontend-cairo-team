<template>
  <div v-if="modification.length > 0">
    <p class="text-lg text-font-main-color font-Signika font-semibold py-5">
      {{ modification[0].site.site_code }}-{{ modification[0].site.site_name }}
    </p>
  </div>

  <DataTable
    :value="modification"
    responsiveLayout="scroll"
    class="p-datatable-sm"
    showGridlines
  >
    <Column field="wo_code">
      <template #header>
        <span class="font-bold"> Work order </span>
      </template>
    </Column>
    <Column field="action_owner.name">
      <template #header>
        <span class="font-bold"> Action Owner </span>
      </template></Column
    >
    <Column field="subcontractor.name">
      <template #header>
        <span class="font-bold"> Subcontractor </span>
      </template></Column
    >
    <Column field="project.name">
      <template #header>
        <span class="font-bold"> Project </span>
      </template></Column
    >
  </DataTable>

  <DataTable
    :value="modification"
    responsiveLayout="scroll"
    class="p-datatable-sm"
    showGridlines
  >
    <Column field="actions">
      <template #header>
        <span class="font-bold"> Action </span>
      </template>
    </Column>
    <Column field="request_date">
      <template #header>
        <span class="font-bold"> Request Date </span>
      </template></Column
    >
    <Column field="cw_date">
      <template #header>
        <span class="font-bold"> CW date </span>
      </template></Column
    >
    <Column field="d6_date">
      <template #header>
        <span class="font-bold"> D6 date </span>
      </template></Column
    >
  </DataTable>
  <DataTable
    :value="modification"
    responsiveLayout="scroll"
    class="p-datatable-sm"
    showGridlines
  >
    <Column field="description">
      <template #header>
        <span class="font-bold"> Description </span>
      </template>
    </Column>
    <Column field="final_cost">
      <template #header>
        <span class="font-bold"> Final Cost</span>
      </template></Column
    >
    
  </DataTable>

  <div class=" w-full flex justify-center">
    <Button label="InsertWO" type="button" severity="danger" class=" block" @click.prevent="closeDialog"/>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { inject } from "vue";

const dialogRef = inject("dialogRef");

const modification = ref([]);

onMounted(() => {
  modification.value = dialogRef.value.data.modification;

  if (modification.value.length > 0) {
    modification.value.forEach((element) => {
      var action = [];
      element.actions.forEach((ele) => {
        action.push(ele.name);
      });
      element.actions = action.join(", ");
    });
  }

  console.log(modification.value[0]);
});


const closeDialog = () => {
    dialogRef.value.close({
        selected: true
    });
}
</script>
