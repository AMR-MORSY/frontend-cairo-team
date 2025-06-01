<template>
  <div class="w-screen-2xl px-10 py-20">
    <Card class="max-w-screen-2xl mx-auto">
      <template #header>
        <div class="w-full flex justify-end pr-4 pt-4">
          <Select
            fluid
            class="w-28"
            :options="years_options"
            v-model="year"
            id="Projects"
          >
          </Select>
        </div>
      </template>
      <template #content>
        <div class="w-full flex justify-center my-2">
          <div class="flex flex-col gap-1">
            <Knob  v-model="totalRequests" :max="totalRequests+500"  />
            <p
              class="text-center font-extrabold text-lg text-font-main-color font-Signika"
            >
              Work orders
            </p>
          </div>
        </div>
         <MeterGroup :value="meter_value" labelPosition="end"> 
          <template #label="{ value }"> 
            <div class="flex flex-wrap gap-4">
              <template v-for="val of value" :key="val.label">
                <Card class="flex-1 border border-surface shadow-none">
                  <template #content>
                    <div class="flex justify-between gap-8">
                      <div class="flex flex-col gap-1">
                        <span
                          class="text-surface-500 dark:text-surface-400 text-sm"
                          >{{ val.label }}</span
                        > 
                        <span class="font-bold text-lg">{{ val.value }}</span> 
                      </div> 
                      <span
                        class="w-8 h-8 rounded-full inline-flex justify-center items-center text-center"
                        :style="{
                          backgroundColor: `${val.color1}`,
                          color: '#ffffff',
                        }"
                      >
                        <i :class="val.icon" />
                      </span> 
                    </div> 
                  </template>
                </Card>
              </template>
            </div>
          </template>
          <template #meter="slotProps">
            <span
              :class="slotProps.class"
              :style="{
                background: `linear-gradient(to right, ${slotProps.value.color1}, ${slotProps.value.color2})`,
                width: slotProps.size,
              }"
            />
          </template>
        </MeterGroup>
        <div class="w-full flex justify-evenly gap-1 flex-wrap">
          <div class="w-96 flex-shrink-0 justify-center items-center">
            <DoughnutChart
              :chartDataSets="statusChartData"
              chartTitle="Modification Cost"
              chartId="statusCost"
            />
          </div>
          <div class="w-full flex-shrink-0 justify-center items-center">
            <BarChart
              :chartDataSets="subcontractorChartData"
              chartTitle="Subcontractors"
              chartId="workOrders"
            />
            <BarChart
              :chartDataSets="ownersChartData"
              chartTitle="Action Owner"
              chartId="actionOwners"
            />
            <BarChart
              :chartDataSets="projectsChartData"
              chartTitle="Projects"
              chartId="projects"
            />
            <p class="text-center font-bold text-font-main-color text-xl py-9">
              Used Items
            </p>
            <DataTable
              :value="usedItems"
              responsiveLayout="scroll"
              scrollable
              :paginator="true"
              :rows="5"
              paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
              :rowsPerPageOptions="[5, 10, 15]"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
              class="text-sm"
              tableStyle="min-width: 50rem"
            >
              <Column field="item" header="#"></Column>
              <Column field="description" header="Description"></Column>
              <Column field="installation" header="Inst." sortable></Column>
              <Column field="supply" header="Sup." sortable></Column>
              <Column field="S&I" header="S&i"></Column>
              <Column field="Unit" header="Unit"></Column>
              <Column field="quantity" header="T.Q" sortable></Column>
              <Column field="cost" header="T.Cost" sortable></Column>
            </DataTable>
            <Button label="Download" severity="danger" raised class=" block my-4" @click="downloadUsedItems"/>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { computed, ref } from "vue";
import Modifications from "../../../apis/Modifications";
import DoughnutChart from "../../helpers/DoughnutChart.vue";
import BarChart from "../../helpers/BarChart.vue";
import * as XLSX from "xlsx";
const props = defineProps(["year"]);

const year = ref();

const years_options = ref([]);

const meter_value = ref([
  {
    label: "",
    color1: "#34d399",
    color2: "#fbbf24",
    value: "",
    icon: "pi pi-table",
  },
  {
    label: "",
    color1: "#fbbf24",
    color2: "#60a5fa",
    value: "",
    icon: "pi pi-inbox",
  },
  {
    label: "",
    color1: "#60a5fa",
    color2: "#c084fc",
    value: "",
    icon: "pi pi-image",
  },
  {
    label: "",
    color1: "#c084fc",
    color2: "#c084fc",
    value: "",
    icon: "pi pi-cog",
  },
]);

const status = ref([]);
const totalRequests = ref(0);
const statusChartData = ref();
const subcontractorChartData = ref();
const ownersChartData = ref();
const projectsChartData = ref();
const usedItems = ref([]);

const downloadUsedItems=()=>{
   const usedItemsSheet = XLSX.utils.json_to_sheet(usedItems.value);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, usedItemsSheet, "Used Items");

  XLSX.writeFile(workbook, "UsedItems.xlsx", { compression: true });
}
const fillMeterGroup = () => {
  if (status.value.length > 0) {
    for (var i = 0; i < meter_value.value.length; i++) {
      meter_value.value[i].label = status.value[i].name;
      meter_value.value[i].value = status.value[i].count;
      totalRequests.value = totalRequests.value + meter_value.value[i].value;
    }
  }
};

const mountStatusChartData = (statusArray) => {
  const documentStyle = getComputedStyle(document.body);

  let labelArray = [];
  let datasetsArray = [];
  statusArray.forEach((element) => {
    labelArray.push(element.name);

    datasetsArray.push(element.cost);
  });

  return {
    labels: labelArray,
    datasets: [
      {
        data: datasetsArray,
        backgroundColor: [
          documentStyle.getPropertyValue("--p-green-500"),
          documentStyle.getPropertyValue("--p-rose-500"),
          documentStyle.getPropertyValue("--p-orange-500"),
          documentStyle.getPropertyValue("--p-gray-500"),
          documentStyle.getPropertyValue("--p-purple-500"),
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue("--p-green-400"),
          documentStyle.getPropertyValue("--p-rose-400"),
          documentStyle.getPropertyValue("--p-orange-400"),
          documentStyle.getPropertyValue("--p-gray-400"),
          documentStyle.getPropertyValue("--p-purple-500"),
        ],
      },
    ],
  };
};

const mountSubcontractorChartData = (subcontractorArray) => {
  const documentStyle = getComputedStyle(document.body);

  let subContractorNamesArray = [];
  let count_in_progress_Data_set = [];
  let count_Done_Data_set = [];
  let count_Waiting_D6_Data_set = [];
  let count_cancelled_Data_set = [];
  subcontractorArray.forEach((element) => {
    if (element.owner) {
      subContractorNamesArray.push(element.owner);
    }
    if (element.subcontractor) {
      subContractorNamesArray.push(element.subcontractor);
    }
    if (element.project) {
      subContractorNamesArray.push(element.project);
    }

    count_Done_Data_set.push(element.Done);
    count_Waiting_D6_Data_set.push(element.waiting_D6);
    count_cancelled_Data_set.push(element.cancelled);
    count_in_progress_Data_set.push(element.in_progress);
  });

  return {
    labels: subContractorNamesArray,
    datasets: [
      {
        label: "Done",

        data: count_Done_Data_set,
        backgroundColor: documentStyle.getPropertyValue("--p-cyan-500"),
        borderColor: documentStyle.getPropertyValue("--p-cyan-500"),
      },
      {
        label: "In Progress",

        data: count_in_progress_Data_set,
        backgroundColor: documentStyle.getPropertyValue("--p-gray-500"),
        borderColor: documentStyle.getPropertyValue("--p-gray-500"),
      },
      {
        label: "waiting D6",

        data: count_Waiting_D6_Data_set,
        backgroundColor: documentStyle.getPropertyValue("--p-orange-500"),
        borderColor: documentStyle.getPropertyValue("--p-orange-400"),
      },
      {
        label: "Cancelled",

        data: count_cancelled_Data_set,
        backgroundColor: documentStyle.getPropertyValue("--p-purple-500"),
        borderColor: documentStyle.getPropertyValue("--p-purple-400"),
      },
    ],
  };
};
const modificationsDashboard = () => {
  Modifications.modificationDashboard(props.year).then((response) => {
    console.log(response);
    years_options.value = response.data.dashboard.years;
    year.value = years_options.value[0];
    status.value = response.data.dashboard.status;
    usedItems.value = response.data.dashboard.items;
    subcontractorChartData.value = mountSubcontractorChartData(
      response.data.dashboard.subcontractor
    );
    ownersChartData.value = mountSubcontractorChartData(
      response.data.dashboard.owners
    );
    projectsChartData.value = mountSubcontractorChartData(
      response.data.dashboard.projects
    );
    statusChartData.value = mountStatusChartData(status.value);
    fillMeterGroup();
  });
};
onMounted(() => {
  modificationsDashboard();
});
</script>
