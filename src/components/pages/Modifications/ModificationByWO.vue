<template>
    <FilteredModificationsTable :modificationsData="modifications" />
  </template>
  
  <script setup>
  import { onMounted, ref } from "vue";
  import FilteredModificationsTable from "../../helpers/Modification/FilteredModificationsTable.vue";
  import Modifications from "../../../apis/Modifications";
  
  const props = defineProps(["wo"]);
  
  const modifications = ref([]);
  
  onMounted(() => {
    getModificationsByWO();
  });
  const getModificationsByWO = () => {
    Modifications.getModificationsFilteredByWO(
      props.wo
     
    ).then((response) => {
      console.log(modifications.value)
     
      modifications.value.push(response.data.modification)
  
    }).catch((error)=>{
  
    });
  };
  </script>
  