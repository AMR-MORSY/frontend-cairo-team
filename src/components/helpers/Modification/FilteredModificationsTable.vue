<template>
  <div class="w-screen-2xl px-10 py-20">
    <Card class="max-w-screen-xl px-5 mx-auto">
      <template #content>
        <template v-if="thereIsMod">
          <DataTable
            :value="modifications"
            scrollable
            :paginator="true"
            :rows="5"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 15]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
            class="text-sm"
            tableStyle="min-width: 50rem"
            @row-select="onRowSelect"
            v-model:selection="selectedModification"
            :rowClass="rowClass"
          >
            <Column selectionMode="single"></Column>
            <Column field="site.site_code" header="Code"></Column>
            <Column field="site.site_name" header="Name"></Column>
            <Column field="subcontractor.name" header="Subcontractor"></Column>
            <Column field="requester.name" header="Requester"></Column>
            <Column field="actions" header="Action"></Column>
            <Column field="status.name" header="Status"></Column>
            <Column field="project.name" header="Project"></Column>
            <Column
              field="request_date"
              sortable
              header="Request Date"
            ></Column>
            <Column field="description" sortable header="Description"></Column>
            <Column field="cw_date" sortable header="C.W Date"></Column>
            <Column field="d6_date" sortable header="D6 Date"></Column>
            <Column field="est_cost" sortable header="Estimated Cost"></Column>
            <Column field="final_cost" header="Final Cost" sortable></Column>
            <Column
              field="action_owner.name"
              header="Action Owner"
              sortable
            ></Column>
            <Column field="reported.name" sortable header="Reported"></Column>
            <Column
              field="reported_at"
              sortable
              header="Reporting Date"
            ></Column>

            <template #footer>
              <div class="d-flex justify-content-end align-items-center">
                Total Cost {{ totalCost }} LE.
              </div>
            </template>
            <template #paginatorstart>
              <Button
                type="button"
                icon="pi pi-refresh"
                class="p-button-text"
              />
            </template>
            <template #paginatorend>
              <Button type="button" icon="pi pi-cloud" class="p-button-text" />
            </template>
          </DataTable>
          <div class="buttons flex justify-evenly flex-wrap">
            <div class="my-3">
              <Button
                label="Download"
                raised
                :disabled="!thereIsMod"
                severity="info"
                @click="downloadModifications"
              >
                Download
              </Button>
            </div>
            <div class="my-3">
              <Button
                label="View"
                @click="goToViewModification"
                class="p-button-raised p-button-warning"
                :disabled="!isRowSelected"
              />
            </div>

            <div class="my-3">
              <Button
                label="Report Modifications"
                @click="reportModifications"
                class="p-button-raised p-button-danger"
                :disabled="!thereAreUnreportedModifications"
              />
            </div>
          </div>
        </template>

        <template v-if="noModifications">
          <div class="no-modification">
            <p>No Modifications Available</p>
          </div>
        </template>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import Modifications from "../../../apis/Modifications";
import { useConfirm } from "primevue/useconfirm";
import { useRouter } from "vue-router";

import { useToast } from "primevue/usetoast";
import * as XLSX from "xlsx";

const confirm = useConfirm();
const toast = useToast();
const router = useRouter();
const props = defineProps(["modificationsData"]);

const isRowSelected = ref(false);
const selectedModification = ref(null);

const prepareProject = (project) => {
  if (project != null) {
    return project.name;
  }
  return "";
};


const fillModificationsTable=()=>{
  var modifications= [];
  if (props.modificationsData.length > 0) {
    props.modificationsData.forEach((element) => {
      var action = [];
      element.actions.forEach((ele) => {
        action.push(ele.name);
      });
      element.actions = action.join(", ");
      modifications.push(element);
    });
  }

   return modifications;

}

const modifications = computed(()=>fillModificationsTable())
const thereIsMod = computed(() => modifications.value.length > 0);
const noModifications = computed(() => !thereIsMod.value);

// watch(()=>props.modificationsData,()=>fillModificationsTable());

// const modifications = computed(() => {
//   var modification = [];
//   if (props.modificationsData.length > 0) {
//     props.modificationsData.forEach((element) => {
//       var action = [];
//       element.actions.forEach((ele) => {
//         action.push(ele.name);
//       });
//       element.actions = action.join(", ");
//       modification.push(element);
//     });
//   }

//   return modification;
// });

const unReportedModifications = computed(() => {
  if (props.modificationsData.length > 0) {
    let modif = props.modificationsData.filter((element) => {
      return element.reported.id == 2;
    });
    return modif;
  }
  return [];
});

const thereAreUnreportedModifications = computed(
  () => unReportedModifications.value.length > 0
);

const zeroEstCost = () => {
  let thereAreModificationsWithoutEstCost = false;
  unReportedModifications.value.forEach((element) => {
    if (element.est_cost == 0) {
      thereAreModificationsWithoutEstCost = true;
    }
  });
  return thereAreModificationsWithoutEstCost;
};

const prepareUnreportedArray = () => {
  var modifications = [];

  unReportedModifications.value.forEach((element) => {
    modifications.push({ id: element.id, est_cost: element.est_cost });
  });
  return modifications;
};

const reportModifications = () => {
  if (!zeroEstCost()) {
    confirm.require({
      group: "yesNo",
      message:
        "This will add 'today's date' to all unreported modifications, Are you sure you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectProps: {
        label: "No",
        severity: "danger",
      },
      acceptProps: {
        label: "Yes",
        severity: "success",
      },
      accept: () => {
        confirm.close();

        var data = {
          modifications: prepareUnreportedArray(),
        };

        Modifications.reportModifications(data).then((response) => {
          console.log(response);
          if (response.data.message == "reported Successfully") {
            toast.add({
              severity: "success",
              summary: "Success Message",
              detail: "Reported Successfully",
              life: 3000,
            });
            window.location.reload();
          }
        });
      },
      reject: () => {
        confirm.close();
      },
    });
  } else {
    confirm.require({
      group: "info",
      message: "One or more modifications has no estimated cost",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      position: "top",
      acceptProps: {
        label: "OK",
        severity: "danger",
      },
      accept: () => {
        confirm.close();
      },
    });
  }
};

const totalCost = computed(() => {
  if (!modifications.value) {
    return 0;
  } else {
    return modifications.value.reduce(function (sum, current) {
      return sum + Number(current.final_cost);
    }, 0);
  }
});

////////////////////////////////////////give the table row a conditional style///////////////////////////////////////
const rowClass = (data) => {
  return [{ "!bg-slate-100": data.reported === "No" }];
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const downloadModifications = () => {
  console.log(modifications.value);
  modifications.value = modifications.value.forEach((element) => {
    element.action_owner = element.action_owner.name;
    element.site = element.site.site_name;
    element.subcontractor = element.subcontractor.name;
    element.requester = element.requester.name;
    element.reported = element.reported.name;
    element.project = prepareProject(element.project);
    element.status = element.status.name;

    if (element.cw_date == null) {
      element.cw_date = "";
    }
    if (element.d6_date == null) {
      element.d6_date = "";
    }
    if (element.final_cost == null) {
      element.final_cost = "";
    }
    if (element.est_cost == null) {
      element.est_cost = "";
    }
    if (element.reported_at == null) {
      element.reported_at = "";
    }
  });
  const modificationsSheet = XLSX.utils.json_to_sheet(modifications.value);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, modificationsSheet, "modifications");

  XLSX.writeFile(workbook, "Modifications.xlsx", { compression: true });
};
const onRowSelect = () => {
  isRowSelected.value = true;
};
// const gotToUpdateModification = () => {
//   router.push(
//     `/modifications/update/${selectedModification.value.id}/${selectedModification.value.site_code}/${selectedModification.value.site.site_name}`
//   );
// };

const goToViewModification = () => {
  router.push(`/modification/view/${selectedModification.value.id}`);
};
</script>
