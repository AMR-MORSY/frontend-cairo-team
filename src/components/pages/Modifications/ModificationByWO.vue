<template>
  <div v-if="isThereModifications">
    <FilteredModificationsTable :modificationsData="modification" />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import FilteredModificationsTable from "../../helpers/Modification/FilteredModificationsTable.vue";
import Modifications from "../../../apis/Modifications";
import { useConfirm } from "primevue/useconfirm";
import { useRouter } from "vue-router";

const props = defineProps(["wo"]);
const confirm = useConfirm();
const modification = ref([]);
const router=useRouter();

const isThereModifications = ref(false);

onMounted(() => {
  getModificationsByWO();
});
const getModificationsByWO = () => {
  Modifications.getModificationsFilteredByWO(props.wo)
    .then((response) => {
      console.log(response);

      if (response.data.message == "success") {
        modification.value = response.data.modification;
        isThereModifications.value = true;
      } else {
        isThereModifications.value=false
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
    .catch((error) => {});
};
</script>
