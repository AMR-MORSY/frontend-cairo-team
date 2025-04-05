<template>
  <FilteredModificationsTable :modificationsData="modifications" />
</template>

<script setup>
import { onMounted, ref } from "vue";
import FilteredModificationsTable from "../../helpers/Modification/FilteredModificationsTable.vue";
import Modifications from "../../../apis/Modifications";

const props = defineProps(["dateType", "from_date", "to_date"]);

const modifications = ref([]);

onMounted(() => {
  getModificationsByDates();
});
const getModificationsByDates = () => {
  Modifications.getModificationsFilteredByDate(
    props.dateType,
    props.from_date,
    props.to_date
  ).then((response) => {
   console.log(response)
    modifications.value=response.data.modifications
    console.log(modifications.value)


  }).catch((error)=>{

  });
};
</script>
