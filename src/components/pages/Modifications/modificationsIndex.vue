<template>
  <div v-if="isThereModifications">
    <FilteredModificationsTable :modificationsData="modifications" />
  </div>
</template>

<script setup>
import Modifications from "../../../apis/Modifications";
import FilteredModificationsTable from "../../helpers/Modification/FilteredModificationsTable.vue";
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import { onMounted } from "vue";
import { computed } from "vue";
import { useConfirm } from "primevue/useconfirm";
import { useRouter } from "vue-router";

const modifications = ref([]);
const toast = useToast();
const props = defineProps(["columnName", "columnValue"]);
const router = useRouter();
const confirm = useConfirm();
const isThereModifications = computed(() => {
  if (modifications.value.length > 0) {
    return true;
  }
  return false;
});
onMounted(() => {
  getModificationsIndex();
});

const getModificationsIndex = () => {
  let data = {
    columnName: props.columnName,
    columnValue: props.columnValue,
  };

  // if (data.columnName == "reported") {
  //   if (data.columnValue == "Yes") {
  //     data.columnValue = 1;
  //   } else if ((data.columnValue = "No")) {
  //     data.columnValue=0;
  //   }
  // }

  Modifications.getModificationIndex(data)

    .then((response) => {
      console.log(response);

      modifications.value = response.data.modifications;
      if (modifications.value.length == 0) {
        confirm.require({
          group: "info",
          message: "There are no Modifications, go Back?",
          header: "Confirmation",
          icon: "pi pi-exclamation-triangle",
          position: "top",

          acceptProps: {
            label: "Ok",
            severity: "success",
          },
          accept: () => {
            router.go(-1);
            confirm.close();
          },
        });
      }
    })
    .catch((error) => {
      console.log(error);
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
