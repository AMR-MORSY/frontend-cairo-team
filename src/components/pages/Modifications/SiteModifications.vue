<template>
  <div
    id="site-modification"
    class="w-screen-2xl px-10 py-20"
    v-if="isModificationsFound"
  >
    <div class="max-w-7xl mx-auto">
      <Fieldset>
        <template #legend>
          <p
            class="bg-slate-500 text-white font-Signika rounded font-semibold py-1 px-3"
          >
            {{ site_code }}-{{ site_name }}
          </p>
        </template>

        <div class="card">
          <DataTable
            :value="modifications"
            tableStyle="min-width: 50rem"
            stripedRows
            selectionMode="single"
            v-model:selection="selectedModification"
            scrollable
            @row-select="onRowSelect"
            class="max-w-5xl mx-auto text-xs"
          >
            <Column selectionMode="single"></Column>

            <Column
              v-for="col in columns"
              :field="col.field"
              :header="col.header"
              :key="col.field"
            ></Column>
          </DataTable>

          <div class="mt-5 flex justify-center md:justify-evenly items-center">
            <Button
              label="View"
              @click="gotToModificationView"
              severity="warning"
              raised
              class="block"
              :disabled="!isRowSelected"
            />
            <Button
              label="New Modification"
              @click="insertNewModification"
              severity="secondary"
              raised
              class="block mx-4"
            />
            <!-- <Button
              label="Delete"
              @click="deleteModification"
              severity="danger"
              raised
              class="block"
              :disabled="!isRowSelected"
            /> -->
          </div>
        </div>
      </Fieldset>
    </div>
  </div>
</template>

<script setup>
import Modifications from "../../../apis/Modifications";
import { ref, watch } from "vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useConfirm } from "primevue/useconfirm";
import { useAbility } from "@casl/vue";
import store from "../../../vuex/store";
import { computed } from "vue";
import { useToast } from "primevue/usetoast";
const { can } = useAbility();
const router = useRouter();
const props = defineProps(["site_code", "site_name"]);
const modifications = ref(null);
const selectedModification = ref(null);
const isRowSelected = ref(false);
const isModificationsFound = ref(false);
const columns = ref();
const confirm = useConfirm();
const toast = useToast();



onMounted(() => {
  columns.value = [
    { field: "subcontractor", header: "Subcontractor" },
    { field: "actions", header: "Action" },
    { field: "requester", header: "Requester" },
    { field: "request_date", header: "Request Date" },
    { field: "project", header: "Project" },
    { field: "cw_date", header: "C.W Date" },
    { field: "d6_date", header: "D6 Date" },
    { field: "status", header: "Status" },
    { field: "final_cost", header: "Final Cost" },
    { field: "est_cost", header: "Estimated Cost" },
    { field: "wo_code", header: "W.O Code" },
    { field: "description", header: "Description" },
    { field: "action_owner.name", header: "Action Owner" },
    { field: "oz", header: "Operation Zone" },
    { field: "reported", header: "Reported" },
  ];
  getSiteModifications();
});

const goBack = () => {
  router.go(-1);
};

const getSiteModifications = () => {
  isModificationsFound.value = false;

  Modifications.getSiteModifications(props.site_code)
    .then((response) => {
      modifications.value = response.data.modifications;
      if (modifications.value.length > 0) {
        isModificationsFound.value = true;
      } else {
        // isModificationsFound = false;
        // isModificationNotFound = false;

        confirm.require({
          group: "yesNo",
          message: "There is No modifications, insert new modification?",
          header: "Confirmation",
          icon: "pi pi-exclamation-triangle",
          rejectProps: {
            icon: "pi pi-times",
            label: "No",
            size: "small",
            severity: "danger",
          },
          acceptProps: {
            severity: "success",
            icon: "pi pi-check",
            size: "small",
            label: "Yes",
          },
          accept: () => {
            confirm.close();

            insertNewModification();
          },
          reject: () => {
            confirm.close();
            router.push(`/sites/details/${props.site_code}`);
            //callback to execute when user rejects the action
          },
        });
      }
    })
    .catch((error) => {})
    .finally(() => {});
};

const insertNewModification = () => {
  router.push(`/modifications/new/${props.site_code}/${props.site_name}`);
};

// const deleteModification = () => {
//   confirm.require({
//     group: "yesNo",
//     message: "Are you sure you want to proceed?",
//     header: "Confirmation",
//     icon: "pi pi-exclamation-triangle",
//     position: "center",
//     rejectProps: {
//       label: "No",
//       severity: "danger",
//     },
//     acceptProps: {
//       label: "Yes",
//       severity: "success",
//     },
//     accept: () => {
//       confirm.close();

//       let data = {
//         id: selectedModification.value.id,
//       };

     

//       Modifications.deleteModification(data)
//         .then((response) => {
//           if (response.data.message == "Deleted Successfully") {
//             toast.add({
//               severity: "success",
//               summary: "Success Message",
//               detail: "Deleted Successfully",
//               life: 3000,
//             });
//             getSiteModifications();
//           }
        
//         })
//         .catch((error) => {});
//     },
//     reject: () => {
//       confirm.close();
//     },
//   });
// };

const gotToModificationView = () => {
  router.push(
    `/modification/view/${selectedModification.value.id}`
  );
};

const onRowSelect = () => {
  if (selectedModification.value.action_owner.id == store.getters.userId) {
    isRowSelected.value = true;
  } else if (
    (selectedModification.value.oz == "Cairo South" &&
      can("update_CS_modifications")) ||
    (selectedModification.value.oz == "Cairo South" &&
      can("delete_CS_modifications"))
  ) {
    isRowSelected.value = true;
  } else if (
    (selectedModification.value.oz == "Cairo East" &&
      can("update_CE_modifications")) ||
    (selectedModification.value.oz == "Cairo East" &&
      can("delete_CE_modifications"))
  ) {
    isRowSelected.value = true;
  } else if (
    (selectedModification.value.oz == "Cairo North" &&
      can("update_CN_modifications")) ||
    (selectedModification.value.oz == "Cairo North" &&
      can("delete_CN_modifications"))
  ) {
    isRowSelected.value = true;
  } else if (
    (selectedModification.value.oz == "Giza" &&
      can("update_GZ_modifications")) ||
    (selectedModification.value.oz == "Giza" && can("delete_GZ_modifications"))
  ) {
    isRowSelected.value = true;
  } else {
    isRowSelected.value = false;
  }
};

</script>

<style lang="scss" scoped>


</style>
