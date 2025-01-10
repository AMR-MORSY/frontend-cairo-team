

<template>
  <FilteredModificationsTable :modificationsData="modifications" />>
</template>

<script setup>
import Modifications from "../../../apis/Modifications";
import FilteredModificationsTable from "../../helpers/Modification/FilteredModificationsTable.vue";
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import { onMounted } from "vue";

const modifications = ref([]);
const toast=useToast();
const props = defineProps(["columnName", "columnValue"]);

onMounted(()=>{
  getModificationsIndex();
})

const getModificationsIndex = () => {
  let data = {
    columnName: props.columnName,
    columnValue: props.columnValue,
  };

  Modifications.getModificationIndex(data)

    .then((response) => {
      console.log(response)
    
      modifications.value = response.data.modifications;
      
    })
    .catch((error) => {
      if (error.response.status == 422) {
        let errors = error.response.data.errors;
        if (errors.columnName) {
          errors.columnName.forEach((element) => {
            toast.add({
              severity: "error",
              summary: "Error Message",
              detail: element,
              life: 3000,
            });
          });
        } else if (errors.columnValue) {
          errors.columnValue.forEach((element) => {
            toast.add({
              severity: "error",
              summary: "Error Message",
              detail: element,
              life: 3000,
            });
          });
        }
      }
    })
    .finally(() => {});
};


</script>

<style lang="scss" scoped>
.no-modification {
  padding: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.no-modification p {
  color: red;
}

.buttons {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
