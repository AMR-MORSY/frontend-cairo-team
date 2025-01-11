<template>
  <div class="w-screen-2xl px-5 py-20">
    <Card class="max-w-4xl mx-auto">
      <template #content>
        <Tabs value="0">
          <TabList>
            <Tab value="0"
              ><span
                class="text-font-main-color font-Signika font-extrabold uppercase"
                >{{ siteName }}</span
              >
            </Tab>
            <Tab value="1">
              <span
                class="text-font-main-color font-Signika font-extrabold uppercase"
                >Cascades</span
              >
              <Badge :value="countCascades" v-if="countCascades"></Badge>
            </Tab>
            <Tab value="2"
              ><span
                class="text-font-main-color font-Signika font-extrabold uppercase"
                >Indirect Cascades</span
              >
              <template v-if="countIndirectCascades">
                <Badge :value="countIndirectCascades"></Badge>
              </template>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel value="0">
              <div
                class="grid grid-cols-4 px-4 py-4 gap-4 rounded-md border border-spacing-2 border-font-main-color"
              >
                <div class="col-span-4 sm:col-span-1">
                  <div class="flex-auto">
                    <span
                      class="block font-Signika text-font-main-color"
                      id="siteCode"
                      >Site code</span
                    >
                    <InputText
                      type="text"
                      class="text-sm uppercase"
                      disabled
                      fluid
                      v-model="siteCode"
                      aria-describedby="siteCode"
                    />
                  </div>
                </div>
                <div class="col-span-4 sm:col-span-1">
                  <div class="flex-auto" id="siteCode">
                    <span
                      class="block font-Signika text-font-main-color"
                      id="siteName"
                      >Site Name</span
                    >
                    <InputText
                      type="text"
                      class="text-sm"
                      disabled
                      fluid
                      v-model="siteName"
                      aria-describedby="siteName"
                    />
                  </div>
                </div>
                <div class="col-span-4 sm:col-span-1">
                  <div class="flex-auto">
                    <span
                      class="block font-Signika text-font-main-color"
                      id="BSC"
                      >BSC</span
                    >
                    <InputText
                      type="text"
                      class="text-sm"
                      disabled
                      fluid
                      v-model="BSC"
                      aria-describedby="BSC"
                    />
                  </div>
                </div>
                <div class="col-span-4 sm:col-span-1">
                  <div class="flex-auto">
                    <span
                      class="block font-Signika text-font-main-color"
                      id="RNC"
                      >RNC</span
                    >
                    <InputText
                      type="text"
                      class="text-sm"
                      disabled
                      fluid
                      v-model="RNC"
                      aria-describedby="RNC"
                    />
                  </div>
                </div>

                <div class="col-span-4 sm:col-span-1">
                  <div class="flex-auto">
                    <span
                      class="block font-Signika text-font-main-color"
                      id="oz"
                      >OZ</span
                    >
                    <InputText
                      type="text"
                      class="text-sm"
                      disabled
                      fluid
                      v-model="operationZone"
                      aria-describedby="oz"
                    />
                  </div>
                </div>

                <div class="col-span-4 sm:col-span-1">
                  <div class="flex-auto">
                    <span
                      class="block font-Signika text-font-main-color"
                      id="severity"
                      >Severity</span
                    >
                    <InputText
                      type="text"
                      class="text-sm"
                      disabled
                      fluid
                      v-model="severity"
                      aria-describedby="severity"
                    />
                  </div>
                </div>
                <div class="col-span-4 sm:col-span-1">
                  <div class="flex-auto">
                    <span
                      class="block font-Signika text-font-main-color"
                      id="office"
                      >Office</span
                    >
                    <InputText
                      type="text"
                      class="text-sm"
                      disabled
                      fluid
                      v-model="office"
                      aria-describedby="office"
                    />
                  </div>
                </div>

                <div class="col-span-4 sm:col-span-1">
                  <div class="flex-auto">
                    <span
                      class="block font-Signika text-font-main-color"
                      id="nodalCode"
                      >Nodal Code</span
                    >
                    <InputText
                      type="text"
                      disabled
                      fluid
                      v-model="nodalCode"
                      aria-describedby="nodalCode"
                    />
                  </div>
                </div>
                <div class="col-span-4 sm:col-span-1">
                  <div class="flex-auto">
                    <span
                      class="block font-Signika text-font-main-color"
                      id="nodal"
                      >Nodal Name</span
                    >
                    <InputText
                      type="text"
                      class="text-sm"
                      disabled
                      fluid
                      v-model="nodalName"
                      aria-describedby="nodal"
                    />
                  </div>
                </div>

                <div class="col-span-4 sm:col-span-1">
                  <div class="flex-auto">
                    <span
                      class="block font-Signika text-font-main-color"
                      id="2g"
                      >2G</span
                    >
                    <InputText
                      type="text"
                      class="text-sm"
                      disabled
                      fluid
                      aria-describedby="2g"
                      v-model="cell2G"
                    />
                  </div>
                </div>
                <div class="col-span-4 sm:col-span-1">
                  <div class="flex-auto">
                    <span
                      class="block font-Signika text-font-main-color"
                      id="3g"
                      >3G</span
                    >
                    <InputText
                      type="text"
                      class="text-sm"
                      disabled
                      fluid
                      v-model="cell3G"
                      aria-describedby="3g"
                    />
                  </div>
                </div>
                <div class="col-span-4 sm:col-span-1">
                  <div class="flex-auto">
                    <span
                      class="block font-Signika text-font-main-color"
                      id="4g"
                      >4G</span
                    >
                    <InputText
                      type="text"
                      disabled
                      fluid
                      v-model="cell4G"
                      aria-describedby="4g"
                    />
                  </div>
                </div>
                <div class="col-span-4 sm:col-span-1">
                  <div class="flex-auto">
                    <span
                      class="block font-Signika text-font-main-color"
                      id="category"
                      >Category</span
                    >
                    <InputText
                      type="text"
                      class="text-sm"
                      disabled
                      fluid
                      v-model="category"
                      aria-describedby="category"
                    />
                  </div>
                </div>
                <div class="col-span-4 sm:col-span-1">
                  <div class="flex-auto">
                    <span
                      class="block font-Signika text-font-main-color"
                      id="sharing"
                      >Sharing</span
                    >
                    <InputText
                      type="text"
                      class="text-sm"
                      disabled
                      fluid
                      v-model="sharing"
                      aria-describedby="sharing"
                    />
                  </div>
                </div>
                <div class="col-span-4 sm:col-span-1">
                  <div class="flex-auto">
                    <span
                      class="block font-Signika text-font-main-color"
                      id="host"
                      >Host</span
                    >
                    <InputText
                      type="text"
                      class="text-sm"
                      disabled
                      fluid
                      v-model="host"
                      aria-describedby="host"
                    />
                  </div>
                </div>
                <div class="col-span-4 sm:col-span-1">
                  <div class="flex-auto">
                    <span
                      class="block font-Signika text-font-main-color"
                      id="guest"
                      >Gest</span
                    >
                    <InputText
                      type="text"
                      class="text-sm"
                      disabled
                      fluid
                      v-model="gest"
                      aria-describedby="guest"
                    />
                  </div>
                </div>
                <div class="col-span-4 sm:col-span-1">
                  <div class="flex-auto">
                    <span
                      class="block font-Signika text-font-main-color"
                      id="guest"
                      >VF Code</span
                    >
                    <InputText
                      type="text"
                      class="text-sm"
                      disabled
                      fluid
                      v-model="vf_code"
                      aria-describedby="vf_code"
                    />
                  </div>
                </div>
                <div class="col-span-4 sm:col-span-1">
                  <div class="flex-auto">
                    <span
                      class="block font-Signika text-font-main-color"
                      id="guest"
                      >ET Code</span
                    >
                    <InputText
                      type="text"
                      class="text-sm"
                      disabled
                      fluid
                      v-model="et_code"
                      aria-describedby="et_code"
                    />
                  </div>
                </div>
                <div class="col-span-4 sm:col-span-1">
                  <div class="flex-auto">
                    <span
                      class="block font-Signika text-font-main-color"
                      id="guest"
                      >WE Code</span
                    >
                    <InputText
                      type="text"
                      class="text-sm"
                      disabled
                      fluid
                      v-model="we_code"
                      aria-describedby="we_code"
                    />
                  </div>
                </div>
                <div class="col-span-4 sm:col-span-1">
                  <div class="flex-auto">
                    <span
                      class="block font-Signika text-font-main-color"
                      id="status"
                      >Status</span
                    >
                    <InputText
                      type="text"
                      class="text-sm"
                      disabled
                      fluid
                      v-model="status"
                      aria-describedby="status"
                    />
                  </div>
                </div>

                <div class="col-span-4 sm:col-span-1">
                  <div class="flex-auto">
                    <span
                      class="block font-Signika text-font-main-color"
                      id="type"
                      >Type</span
                    >
                    <InputText
                      type="text"
                      class="text-sm"
                      disabled
                      fluid
                      v-model="type"
                      aria-describedby="type"
                    />
                  </div>
                </div>
              </div>

              <div
                class="w-full border border-spacing-2 border-font-main-color my-5"
              ></div>

              <div
                class="grid grid-cols-6 gap-4 px-4 py-4 rounded-md border border-spacing-2 border-font-main-color"
              >
                <div class="col-span-6 md:col-span-1 my-3">
                  <Button
                    :disabled="!displayModifications"
                    label="Modifications"
                    @click="gotToSiteModifications"
                    severity="secondary"
                    raised
                    class="block w-full"
                  />
                </div>
                <div class="col-span-6 md:col-span-1 my-3">
                  <Button
                    label="NUR"
                    :disabled="!$can('read_NUR_data')"
                    @click="getSiteNUR"
                    severity="success"
                    raised
                    class="block w-full"
                  />
                </div>
                <div class="col-span-6 md:col-span-1 my-3">
                  <Button
                    label="Batteries Health"
                    @click="getSiteBatteriesHealth"
                    severity="info"
                    raised
                    class="text-xs block w-full"
                  />
                </div>
                <div class="col-span-6 md:col-span-1 my-3">
                  <Button
                    label="Update"
                    :disabled="!$can('update_Site_data')"
                    @click="goToSiteUpdate"
                    severity="warn"
                    raised
                    class="block w-full"
                  />
                </div>
                <div class="col-span-6 md:col-span-1 my-3">
                  <Button
                    :disabled="!$can('read_Instrument_data')"
                    label="Batteries Data"
                    @click="getBatteriesData"
                    severity="help"
                    raised
                    class="text-xs block w-full"
                  />
                </div>
                <div class="col-span-6 md:col-span-1 my-3">
                  <Button
                    :disabled="!$can('read_Instrument_data')"
                    label="Rectifier Data"
                    @click="getRectifierData"
                    severity="danger"
                    raised
                    class="text-xs block w-full"
                  />
                </div>
                <div class="col-span-6 md:col-span-1 my-3">
                  <Button
                    :disabled="!$can('read_Instrument_data')"
                    label="Site Data"
                    @click="getSiteData"
                    severity="contrast"
                    raised
                    class="block w-full"
                  />
                </div>
                <div class="col-span-6 md:col-span-1 my-3">
                  <Button
                    :disabled="!$can('read_Instrument_data')"
                    label="MW Data"
                    @click="getMWData"
                    severity="danger"
                    raised
                    class="block w-full"
                  />
                </div>
                <div class="col-span-6 md:col-span-1 my-3">
                  <Button
                    :disabled="!$can('read_Instrument_data')"
                    label="BTS Data"
                    @click="getBTSData"
                    severity="info"
                    raised
                    class="block w-full"
                  />
                </div>
                <div class="col-span-6 md:col-span-1 my-3">
                  <Button
                    :disabled="!$can('read_Instrument_data')"
                    label="Power Data"
                    @click="getPowerData"
                    severity="contrast"
                    raised
                    class="block w-full"
                  />
                </div>
                <div class="col-span-6 md:col-span-1 my-3">
                  <Button
                    label="Tx.issues"
                    :disabled="!$can('read_Instrument_data')"
                    @click="getSiteWANSData"
                    severity="warn"
                    raised
                    class="block w-full"
                  />
                </div>
                <div class="col-span-6 md:col-span-1 my-3">
                  <Button
                    icon="pi pi-search"
                    label="Tx issues"
                    severity="success"
                    class="block w-full text-xs"
                    raised
                    @click="SearchTxIssues()"
                    :disabled="!$can('read_TX_data')"
                  />
                </div>
              </div>

              <div class="my-10">
                <div class="relative">
                  <SpeedDial
                    :model="items"
                    direction="right"
                    style="position: absolute; top: calc(50% - 2rem); left: 0"
                    :transitionDelay="80"
                    showIcon="pi pi-bell"
                    hideIcon="pi pi-times"
                    buttonClass="p-button-outlined"
                  >
                  </SpeedDial>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="1">
              <template v-if="countCascades">
                <DataTable
                  :value="cascades"
                  scrollable
                  class="text-xs"
                  :paginator="true"
                  :rows="5"
                  stripedRows
                  v-model:selection="selectedSite"
                  selectionMode="single"
                  dataKey="cascade_code"
                  @row-select="onRowSelect"
                >
                  <Column selectionMode="single"></Column>
                  <Column
                    field="cascade_code"
                    header="Site Code"
                    class="uppercase"
                  ></Column>
                  <Column
                    field="cascade_name"
                    header="Site Name"
                    class="uppercase"
                  ></Column>
                  <Column field="category" header="Site Category"></Column>
                  <Column field="countCascades" header="Cascades"></Column>
                </DataTable>
              </template>
              <template v-else>
                <div>
                  <p>No Cascades</p>
                </div>
              </template>

              <Button
                label="Update"
                @click="goToUpdateCascadesPage"
                severity="success"
                raised
              />
            </TabPanel>
            <TabPanel value="2">
              <template v-if="countIndirectCascades">
                <DataTable
                  :value="indirectCascades"
                  scrollable
                  class="text-sm"
                  :paginator="true"
                  :rows="5"
                  stripedRows
                  v-model:selection="selectedSite"
                  selectionMode="single"
                  dataKey="cascade_code"
                  @row-select="onRowSelect"
                >
                  <Column selectionMode="single"></Column>
                  <Column
                    field="cascade_code"
                    header="Site Code"
                    class="uppercase"
                  ></Column>
                  <Column
                    field="cascade_name"
                    header="Site Name"
                    class="uppercase"
                  ></Column>
                  <Column field="category" header="Site Category"></Column>
                </DataTable>
              </template>
              <template v-else>
                <div>
                  <p>No Cascades</p>
                </div>
              </template>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </template>
    </Card>
  </div>
</template>

<script setup>
import Sites from "../../../apis/Sites";
import siteNURTable from "../NUR/siteNURTable.vue";
import NUR from "../../../apis/NUR";
import Energy from "../../../apis/Energy";
import SiteAlarmsTable from "../../helpers/Sites/SiteAlarmsTable.vue";
import siteBatteriesHealth from "../../helpers/Sites/siteBatteriesHealth.vue";
import SiteDownAlarmsGroupedByWeek from "../../helpers/Sites/SiteDownAlarmsGroupedByWeek.vue";
import EquipmentDetails from "../../helpers/Sites/EquipmentDetails.vue";
import TransmissionDetails from "../../helpers/Transmission/TransmissionDetails.vue";
import SearchTxIssuesForm from "../../helpers/Transmission/SearchTxIssuesForm.vue";
import SiteBatteriesTable from "../../helpers/Sites/SiteBatteriesTable.vue";
import BatteriesUpdate from "../../helpers/Sites/BatteriesUpdate.vue";
import { watch, ref } from "vue";
import { computed } from "vue";
import { onMounted } from "vue";
import { useToast } from "primevue/usetoast";
import { useDialog } from "primevue/usedialog";
import store from "../../../vuex/store";
import { useRouter } from "vue-router";
import { useConfirm } from "primevue/useconfirm";
import { useAbility } from "@casl/vue";
import { watchEffect } from "vue";
const { can } = useAbility();
const toast = useToast();
const dialog = useDialog();
const router = useRouter();
const confirm = useConfirm();

const props = defineProps(["site_code"]);
const siteName = ref(null);
const siteCode = ref(null);
const cell2G = ref(null);
const cell3G = ref(null);
const cell4G = ref(null);
const BSC = ref(null);
const RNC = ref(null);
const operationZone = ref(null);
const type = ref(null);
const category = ref(null);
const office = ref(null);
const sharing = ref(null);
const host = ref(null);
const severity = ref(null);
const status = ref(null);
const gest = ref(null);
const vf_code = ref(null);
const et_code = ref(null);
const we_code = ref(null);
const cascades = ref(null);
const indirectCascades = ref(null);
const selectedSite = ref(null);
const nodalCode = ref(null);
const nodalName = ref(null);
const data = ref(null);
const id = ref(null);
const NUR2G = ref([]);
const NUR3G = ref([]);
const NUR4G = ref([]);
const insertionDataField = ref("");
const items = [
  {
    label: "Power Alarms",
    icon: "pi pi-bolt",
    command: () => {
      getSitePowerAlarms();
    },
  },
  {
    label: "Gen Alarms",
    icon: "pi pi-exclamation-circle",
    command: () => {
      getSiteGenAlarms();
    },
  },
  {
    label: "HT Alarms",
    icon: "pi pi-power-off",
    command: () => {
      getSiteHTAlarms();
    },
  },
  {
    label: "Down Alarms",
    icon: "pi pi-power-off",
    command: () => {
      getSiteDownAlarmsGroupedByWeek();
    },
  },
];

// const site_code=computed(()=> props.site_code)



const countCascades = computed(() => {
  if (cascades.value == null || cascades.value.length == 0) {
    return null;
  } else {
    return cascades.value.length;
  }
});
const countIndirectCascades = computed(() => {
  if (indirectCascades.value == null || indirectCascades.value.length == 0) {
    return null;
  } else {
    return indirectCascades.value.length;
  }
});

const displayModifications = computed(() => {
  if (can("read_CS_modifications") && operationZone.value == "Cairo South") {
    return true;
  } else if (
    can("read_CN_modifications") &&
    operationZone.value == "Cairo North"
  ) {
    return true;
  } else if (
    can("read_CE_modifications") &&
    operationZone.value == "Cairo East"
  ) {
    return true;
  } else if (can("read_GZ_modifications") && operationZone.value == "Giza") {
    return true;
  } else {
    return false;
  }
});

onMounted(() => {
  getSiteDetails();
});

const getSiteNUR = () => {
  let data = {
    site_code: props.site_code,
  };
  NUR.getSiteNUR(data)
    .then((response) => {
      console.log(response);

      NUR2G.value = response.data.NUR2G;
      NUR3G.value = response.data.NUR3G;
      NUR4G.value = response.data.NUR4G;

      if (
        NUR2G.value.length == 0 &&
        NUR3G.value.length == 0 &&
        NUR4G.value.length == 0
      ) {
        toast.add({
          severity: "success",
          summary: "Success Message",
          detail: "This site didn't make NUR",
          life: 3000,
        });
      } else {
        dialog.open(siteNURTable, {
          props: {
            header: this.siteName,
            style: {
              width: "75vw",
            },
            breakpoints: {
              "960px": "75vw",
              "640px": "90vw",
            },
            modal: true,
          },

          data: {
            NUR3G: NUR3G.value,
            NUR2G: NUR2G.value,
            NUR4G: NUR4G.value,
            site_code: siteCode.value,
            site_name: siteName.value,
          },
        });
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      store.dispatch("displaySpinnerPage", true);
    });
};

const getSiteDetails = () => {
  // store.dispatch("displaySpinnerPage", false);

  Sites.getSiteDetails(props.site_code).then((response) => {
    siteName.value = response.data.site.site_name;
    siteCode.value = response.data.site.site_code;
    type.value = response.data.site.type;
    severity.value = response.data.site.severity;
    sharing.value = response.data.site.sharing;
    status.value = response.data.site.status;
    host.value = response.data.site.host;
    gest.value = response.data.site.gest;
    vf_code.value = response.data.site.vf_code;
    et_code.value = response.data.site.et_code;
    we_code.value = response.data.site.we_code;
    cell2G.value = response.data.site["2G_cells"];
    cell3G.value = response.data.site["3G_cells"];
    cell4G.value = response.data.site["4G_cells"];
    BSC.value = response.data.site.BSC;
    RNC.value = response.data.site.RNC;
    office.value = response.data.site.office;
    operationZone.value = response.data.site.oz;
    category.value = response.data.site.category;
    cascades.value = response.data.cascades;
    indirectCascades.value = response.data.indirectCascades;
    nodalCode.value = response.data.site.nodal_code;
    nodalName.value = response.data.site.nodal_name;
    id.value = response.data.site.id;
    data.value = {
      site_code: siteCode.value,
    };
  });
};

watch(()=>props.site_code,()=> getSiteDetails());/////////////////////////the right way of writing watch

const openDialog = () => {
  dialog.open(SiteAlarmsTable, {
    props: {
      style: {
        width: "75vw",
      },
      breakpoints: {
        "960px": "75vw",
        "640px": "90vw",
      },
      modal: true,
    },

    onClose: (options) => {
      store.dispatch("siteAlarms", null);
    },
  });
};

const onRowSelect = () => {
  router.push(`/sites/details/${selectedSite.value.cascade_code}`);
};
const gotToSiteModifications = () => {
  router.push(
    `/modifications/sitemodifications/${siteCode.value}/${siteName.value}`
  );
};
const goToSiteUpdate = () => {
  router.push(`/sites/update/${siteCode.value}`);
};

const goToUpdateCascadesPage = () => {
  router.push(`/sites/cascades/update/${siteCode.value}`);
};
const getSitePowerAlarms = () => {
  // this.$store.dispatch("displaySpinnerPage", false);
  Energy.getSitePowerAlarms(this.data)
    .then((response) => {
      if (response.data.alarms.length > 0) {
        store.dispatch("siteAlarms", {
          alarmName: "power",
          alarmData: response.data.alarms,
        });
        this.openDialog();
      } else {
        toast.add({
          severity: "error",
          summary: "Opps.....",
          detail: `No Alarms`,
          life: 3000,
        });
      }

      console.log(response);
    })
    .catch((error) => {
      if (error.response.status == 422) {
        if (error.response.data.errors.site_code) {
          let site_codeErrors = error.response.data.errors.site_code;
          site_codeErrors.forEach((element) => {
            toast.add({
              severity: "error",
              summary: "Invalid Code",
              detail: `${element}`,
              life: 3000,
            });
          });
        }
      }
    })
    .finally(() => {
      store.dispatch("displaySpinnerPage", true);
    });
};
const getSiteHTAlarms = () => {
  Energy.getSiteHighTempAlarms(data.value)
    .then((response) => {
      if (response.data.alarms.length > 0) {
        store.dispatch("siteAlarms", {
          alarmName: "highTemp",
          alarmData: response.data.alarms,
        });
        this.openDialog();
      } else {
        toast.add({
          severity: "error",
          summary: "Opps.....",
          detail: `No Alarms`,
          life: 3000,
        });
      }
    })
    .catch((error) => {
      if (error.response.status == 422) {
        if (error.response.data.errors.site_code) {
          let site_codeErrors = error.response.data.errors.site_code;
          site_codeErrors.forEach((element) => {
            toast.add({
              severity: "error",
              summary: "Invalid Code",
              detail: `${element}`,
              life: 3000,
            });
          });
        }
      }
    })
    .finally(() => {
      store.dispatch("displaySpinnerPage", true);
    });
};
const getSiteGenAlarms = () => {
  Energy.getSiteGenAlarms(data.value)
    .then((response) => {
      if (response.data.alarms.length > 0) {
        store.dispatch("siteAlarms", {
          alarmName: "gen",
          alarmData: response.data.alarms,
        });
        openDialog();
      } else {
        toast.add({
          severity: "error",
          summary: "No Data Found",
          detail: `No Alarms`,
          life: 3000,
        });
      }
    })
    .catch((error) => {
      if (error.response.status == 422) {
        if (error.response.data.errors.site_code) {
          let site_codeErrors = error.response.data.errors.site_code;
          site_codeErrors.forEach((element) => {
            toast.add({
              severity: "error",
              summary: "Invalid Code",
              detail: `${element}`,
              life: 3000,
            });
          });
        }
      }
    });
};
const getSiteDownAlarmsGroupedByWeek = () => {
  // store.dispatch("displaySpinnerPage", false);
  Energy.getSiteDownAlarmsGroupedByWeek(this.data)
    .then((response) => {
      if (response.data.statestics.alarms == "exist") {
        dialog.open(SiteDownAlarmsGroupedByWeek, {
          props: {
            style: {
              width: "75vw",
            },
            breakpoints: {
              "960px": "75vw",
              "640px": "90vw",
            },
            modal: true,
          },
          data: {
            downAlarms: response.data.statestics,
            site_code: data.value.site_code,
          },
        });
      } else {
        toast.add({
          severity: "error",
          summary: "No Data Found",
          detail: `No Alarms`,
          life: 3000,
        });
      }
    })
    .catch((error) => {
      if (error.response.status == 422) {
        if (error.response.data.errors.site_code) {
          let site_codeErrors = error.response.data.errors.site_code;
          site_codeErrors.forEach((element) => {
            toast.add({
              severity: "error",
              summary: "Invalid Code",
              detail: `${element}`,
              life: 3000,
            });
          });
        }
      }
    })
    .finally(() => {
      store.dispatch("displaySpinnerPage", true);
    });
};
const getSiteBatteriesHealth = () => {
  Energy.getSiteBatteriesHealth(data.value)
    .then((response) => {
      if (response.data.statestics.powerAlarms == "exist") {
        dialog.open(siteBatteriesHealth, {
          props: {
            style: {
              width: "75vw",
            },
            breakpoints: {
              "960px": "75vw",
              "640px": "90vw",
            },
            modal: true,
          },
          data: {
            powerAlarms: response.data.statestics,
          },
        });
      } else {
        toast.add({
          severity: "error",
          summary: "Opps.....",
          detail: `No power Alarms recorded/Dead Batteries`,
          life: 3000,
        });
      }
    })
    .catch((error) => {});
};

const getBatteriesData = () => {
  Sites.getBatteriesDetails(id.value)
    .then((response) => {
      if (response.data.success == true) {
        dialog.open(SiteBatteriesTable, {
          props: {
            style: {
              width: "75vw",
            },
            breakpoints: {
              "960px": "75vw",
              "640px": "90vw",
            },
            modal: true,
          },
          data: {
            batteries: response.data.batteries,
            site_code: props.site_code,
          },
        });
      } else {
        confirm.require({
          group: "yesNo",
          message: "There is No Batteries data, insert new data?",
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

            insertNewBatteiesData();
          },
          reject: () => {
            confirm.close();
          },
        });
      }
    })
    .catch((error) => {});
};
const getSiteData = () => {
  let siteData = [];

  let site = {
    "On Air Date": null,
  };
  siteData.push(site);
  site = {
    Topology: null,
  };
  siteData.push(site);
  site = {
    Structure: null,
  };
  siteData.push(site);
  site = {
    "Equip-Room": null,
  };
  siteData.push(site);
  site = {
    "NTRA Cluster": null,
  };
  siteData.push(site);
  site = {
    CXO: null,
  };
  siteData.push(site);
  site = {
    Axis: null,
  };
  siteData.push(site);
  site = {
    "Serve Compound": null,
  };
  siteData.push(site);
  site = {
    Universities: null,
  };
  siteData.push(site);
  site = {
    "Hot Spot": null,
  };
  siteData.push(site);
  site = {
    "AC1 Type": null,
  };
  siteData.push(site);
  site = {
    "AC1 HP": null,
  };
  siteData.push(site);
  site = {
    "AC2 Type": null,
  };
  siteData.push(site);
  site = {
    "AC2 HP": null,
  };
  siteData.push(site);
  site = {
    "Network Type": null,
  };
  siteData.push(site);
  site = {
    "Last PM Date": null,
  };
  siteData.push(site);
  site = {
    "Access Permission": null,
  };
  siteData.push(site);
  site = {
    "Permission Type": null,
  };
  siteData.push(site);
  Sites.getSiteDeepDetails(data.value).then((response) => {
    console.log(response);

    if (response.data.data == "found data") {
      let siteData = [];
      let site = {
        "On Air Date": response.data.on_air_date,
      };
      siteData.push(site);
      site = {
        Topology: response.data.topology,
      };
      siteData.push(site);
      site = {
        Structure: response.data.structure,
      };
      siteData.push(site);
      site = {
        "Equip-Room": response.data.equip_room,
      };
      siteData.push(site);
      site = {
        "NTRA Cluster": response.data.ntra_cluster,
      };
      siteData.push(site);
      site = {
        CXO: response.data.care_ceo,
      };
      siteData.push(site);
      site = {
        Axis: response.data.axsees,
      };
      siteData.push(site);
      site = {
        "Serve Compound": response.data.serve_compound,
      };
      siteData.push(site);
      site = {
        Universities: response.data.universities,
      };
      siteData.push(site);
      site = {
        "Host Spot": response.data.hot_spot,
      };
      siteData.push(site);
      site = {
        "AC1 Type": response.data.ac1_type,
      };
      siteData.push(site);
      site = {
        "AC1 HP": response.data.ac1_hp,
      };
      siteData.push(site);
      site = {
        "AC2 Type": response.data.ac2_type,
      };
      siteData.push(site);
      site = {
        "AC2 HP": response.data.ac2_hp,
      };
      siteData.push(site);
      site = {
        "Network Type": response.data.network_type,
      };
      siteData.push(site);
      site = {
        "Last PM Date": response.data.last_pm_date,
      };
      siteData.push(site);
      site = {
        "Access Permission": response.data.need_access_permission,
      };
      siteData.push(site);
      site = {
        "Permission Type": response.data.permission_type,
      };
      siteData.push(site);

      dialog.open(EquipmentDetails, {
        props: {
          style: {
            width: "90vw",
          },

          modal: true,
        },

        data: {
          statestics: siteData,
          id: response.data.id,
          topic: "Site Data",
          rowData: response.data,
          action: "Update",
        },
      });
    } else {
      dialog.open(EquipmentDetails, {
        props: {
          style: {
            width: "50vw",
          },
          breakpoints: {
            "960px": "75vw",
            "640px": "90vw",
          },

          modal: true,
        },

        data: {
          statestics: siteData,
          id: null,
          topic: "Site Data",
          action: "Insert",
          site_code: siteCode.value,
          rowData: null,
        },
      });
    }
  });
};
const getRectifierData = () => {
  let rectifierData = []; ////////array of input field names
  let rectifier = {
    "Rectifier Brand": null,
  };
  rectifierData.push(rectifier);
  rectifier = {
    "Module Capacity": null,
  };
  rectifierData.push(rectifier);
  rectifier = {
    "No. Module": null,
  };
  rectifierData.push(rectifier);
  rectifier = {
    "PLVD Value": null,
  };
  rectifierData.push(rectifier);
  rectifier = {
    "Net ECO": null,
  };
  rectifierData.push(rectifier);
  rectifier = {
    "Net ECO Activation": null,
  };
  rectifierData.push(rectifier);
  Sites.getRectifierDetails(data.value)
    .then((response) => {
      if (response.data.data == "found data") {
        let rectifierData = [];
        let rectifier = {
          "Rectifier Brand": response.data.rec_brand,
        };
        rectifierData.push(rectifier);
        rectifier = {
          "Module Capacity": response.data.module_capacity,
        };
        rectifierData.push(rectifier);
        rectifier = {
          "No. Module": response.data.no_module,
        };
        rectifierData.push(rectifier);
        rectifier = {
          "PLVD Value": response.data.pld_value,
        };
        rectifierData.push(rectifier);
        rectifier = {
          "Net ECO": response.data.net_eco,
        };
        rectifierData.push(rectifier);
        rectifier = {
          "Net ECO Activation": response.data.net_eco_activation,
        };
        rectifierData.push(rectifier);
        dialog.open(EquipmentDetails, {
          props: {
            style: {
              width: "75vw",
            },
            breakpoints: {
              "960px": "75vw",
              "640px": "90vw",
            },

            modal: true,
          },

          data: {
            statestics: rectifierData,
            id: response.data.id,
            topic: "Rectifier Data",
            rowData: response.data,
            action: "Update",
            site_code: siteCode.value,
          },
        });
      } else {
        this.$confirm.require({
          group: "yesNo",
          header: "Confirmation",
          message: "There is no Rectifier data. Add new Data?",
          icon: "pi pi-exclamation-triangle",
          rejectProps: {
            label: "No",

            size: "small",
            severity: "danger",
          },
          acceptProps: {
            label: "Yes",
            icon: "pi pi-check",
            size: "small",
            severity: "success",
          },

          accept: () => {
            confirm.close();
            dialog.open(EquipmentDetails, {
              props: {
                style: {
                  width: "75vw",
                },

                modal: true,
              },

              data: {
                statestics: rectifierData,
                id: null,
                topic: "Rectifier Data",
                rowData: null,
                action: "Insert",
                site_code: siteCode.value,
              },
            });
          },
          reject: () => {
            confirm.close();

            toast.add({
              severity: "info",
              summary: "Confirmed",
              detail: "You have rejected",
              life: 3000,
            });
          },
        });
        // this.$dialog.open(EquipmentDetails, {
        //   props: {
        //     style: {
        //       width: "75vw",
        //     },

        //     modal: true,
        //   },

        //   data: {
        //     statestics: rectifierData,
        //     id: null,
        //     topic: "Rectifier Data",
        //     rowData: null,
        //     action: 'Insert',
        //     site_code: this.siteCode

        //   },
        // });
      }
    })
    .catch((error) => {});
};
const getMWData = () => {
  Sites.getSiteMWDetails(data.value)
    .then((response) => {
      let MWData = [];
      if (response.data.data == "found data") {
        let MW = {
          "No MW": response.data.no_mw,
        };
        MWData.push(MW);
        MW = {
          "MW Type": response.data.mw_type,
        };
        MWData.push(MW);
        MW = {
          Eband: response.data.eband,
        };

        MWData.push(MW);
        dialog.open(EquipmentDetails, {
          props: {
            style: {
              width: "50vw",
            },
            breakpoints: {
              "960px": "75vw",
              "640px": "90vw",
            },

            modal: true,
          },

          data: {
            statestics: MWData,
            id: response.data.id,
            topic: "MW Data",
            rowData: response.data,
            action: "Update",
          },
        });
      } else {
        confirm.require({
          group: "yesNo",
          header: "Confirmation",
          message: "There is no Microwave data. Add new Data?",
          icon: "pi pi-exclamation-triangle",
          rejectProps: {
            label: "No",

            size: "small",
            severity: "danger",
          },
          acceptProps: {
            label: "Yes",
            icon: "pi pi-check",
            size: "small",
            severity: "success",
          },

          accept: () => {
            confirm.close();
            dialog.open(EquipmentDetails, {
              props: {
                style: {
                  width: "75vw",
                },

                modal: true,
              },

              data: {
                statestics: MWData,
                id: null,
                topic: "MW Data",
                rowData: null,
                action: "Insert",
                site_code: siteCode.value,
              },
            });
          },
          reject: () => {
            confirm.close();

            toast.add({
              severity: "info",
              summary: "Confirmed",
              detail: "You have rejected",
              life: 3000,
            });
          },
        });
      }
    })
    .catch((error) => {});
};
const getBTSData = () => {
  Sites.getSiteBTSDetails(data.value)
    .then((response) => {
      let BTSData = [];
      if (response.data.data == "found data") {
        let BTS = {
          "No BTS": response.data.no_bts,
        };
        BTSData.push(BTS);
        BTS = {
          "MRFU 2G": response.data.mrfu_2G,
        };
        BTSData.push(BTS);
        BTS = {
          "MRFU 3G": response.data.mrfu_3G,
        };
        BTSData.push(BTS);
        BTS = {
          "MRFU 4G": response.data.mrfu_4G,
        };
        BTSData.push(BTS);
        BTS = {
          TDD: response.data.tdd,
        };

        BTSData.push(BTS);
        dialog.open(EquipmentDetails, {
          props: {
            style: {
              width: "50vw",
            },
            breakpoints: {
              "960px": "75vw",
              "640px": "90vw",
            },

            modal: true,
          },

          data: {
            statestics: BTSData,
            id: response.data.id,
            topic: "BTS Data",
            rowData: response.data,
            action: "Update",
          },
        });
      } else {
        confirm.require({
          group: "yesNo",
          header: "Confirmation",
          message: "There is no BTS data. Add new Data?",
          icon: "pi pi-exclamation-triangle",
          rejectProps: {
            label: "No",

            size: "small",
            severity: "danger",
          },
          acceptProps: {
            label: "Yes",
            icon: "pi pi-check",
            size: "small",
            severity: "success",
          },

          accept: () => {
            confirm.close();
            dialog.open(EquipmentDetails, {
              props: {
                style: {
                  width: "75vw",
                },

                modal: true,
              },

              data: {
                statestics: BTSData,
                id: null,
                topic: "BTS Data",
                rowData: null,
                action: "Insert",
                site_code: siteCode.value,
              },
            });
          },
          reject: () => {
            confirm.close();

            toast.add({
              severity: "info",
              summary: "Confirmed",
              detail: "You have rejected",
              life: 3000,
            });
          },
        });
      }
    })
    .catch((error) => {});
};
const getPowerData = () => {
  Sites.getSitePowerDetails(data.value)
    .then((response) => {
      let powerData = [];
      if (response.data.data == "found data") {
        let power = {
          "Power Source": response.data.power_source,
        };
        powerData.push(power);
        power = {
          "PM Type": response.data.power_meter_type,
        };
        powerData.push(power);
        power = {
          "Gen Config.": response.data.gen_config,
        };
        powerData.push(power);
        power = {
          "Gen Serial": response.data.gen_serial,
        };
        powerData.push(power);
        power = {
          "Gen Capacity": response.data.gen_capacity,
        };

        powerData.push(power);
        power = {
          "Overhaul Power Consump": response.data.overhaul_power_consumption,
        };

        powerData.push(power);
        dialog.open(EquipmentDetails, {
          props: {
            style: {
              width: "75vw",
            },
            breakpoints: {
              "960px": "75vw",
              "640px": "90vw",
            },

            modal: true,
          },

          data: {
            statestics: powerData,
            id: response.data.id,
            topic: "Power Data",
            rowData: response.data,
            action: "Update",
          },
        });
      } else {
        confirm.require({
          group: "yesNo",
          header: "Confirmation",
          message: "There is no BTS data. Add new Data?",
          icon: "pi pi-exclamation-triangle",
          rejectProps: {
            label: "No",

            size: "small",
            severity: "danger",
          },
          acceptProps: {
            label: "Yes",
            icon: "pi pi-check",
            size: "small",
            severity: "success",
          },

          accept: () => {
            confirm.close();
            dialog.open(EquipmentDetails, {
              props: {
                style: {
                  width: "75vw",
                },

                modal: true,
              },

              data: {
                statestics: powerData,
                id: null,
                topic: "Power Data",
                rowData: null,
                action: "Insert",
                site_code: siteCode.value,
              },
            });
          },
          reject: () => {
            confirm.close();

            toast.add({
              severity: "info",
              summary: "Confirmed",
              detail: "You have rejected",
              life: 3000,
            });
          },
        });
      }
    })
    .catch((error) => {});
};
const getSiteWANSData = () => {
  router.push({ path: `/siteTxIssues/${props.site_code}` });
};
const SearchTxIssues = () => {
  dialog.open(SearchTxIssuesForm, {
    props: {
      style: {
        width: "50vw",
      },
      breakpoints: {
        "960px": "75vw",
        "640px": "90vw",
      },

      modal: true,
    },
  });
};

const insertNewBatteiesData = () => {
  dialog.open(BatteriesUpdate, {
    props: {
      style: {
        width: "50vw",
      },
      breakpoints: {
        "960px": "75vw",
        "640px": "90vw",
      },
      modal: true,
    },
    data: {
      battery: null,
      action: "create",
      site_code: siteCode.value,
    },
  });
};

{
  /* export default {
  data() {
    return {
      siteName: null,
      siteCode: null,
      cell2G: null,
      cell3G: null,
      cell4G: null,
      BSC: null,
      RNC: null,
      operationZone: null,
      type: null,
      category: null,
      office: null,
      sharing: null,
      host: null,
      severity: null,
      status: null,
      gest: null,
      vf_code: null,
      et_code: null,
      we_code: null,
      cascades: null,
      indirectCascades: null,
      selectedSite: null,
      nodalCode: null,
      nodalName: null,
      data: null,
      id: null,
      NUR2G: [],
      NUR3G: [],
      NUR4G: [],
      items: [
        {
          label: "Power Alarms",
          icon: "pi pi-bolt",
          command: () => {
            this.getSitePowerAlarms();
          },
        },
        {
          label: "Gen Alarms",
          icon: "pi pi-exclamation-circle",
          command: () => {
            this.getSiteGenAlarms();
          },
        },
        {
          label: "HT Alarms",
          icon: "pi pi-power-off",
          command: () => {
            this.getSiteHTAlarms();
          },
        },
        {
          label: "Down Alarms",
          icon: "pi pi-power-off",
          command: () => {
            this.getSiteDownAlarmsGroupedByWeek();
          },
        },
      ],
      // dialogVisible: false,
      // dialogMessage: "",
      insertionDataField: "",
    };
  },
  props: ["site_code"],
  emits: ["displayNoneSpinner"],
  name: "Details",
  inject: {
    $ability: { from: ABILITY_TOKEN }
  },
  components: {
    siteNURTable,
    SiteAlarmsTable,
    siteBatteriesHealth,
    SiteDownAlarmsGroupedByWeek,
    EquipmentDetails,
    TransmissionDetails,
    SearchTxIssuesForm,
    SiteBatteriesTable,
  },
  watch: {
    site_code() {
      this.getSiteDetails();
    },
  },

  computed: {
    countCascades() {
      if (this.cascades == null || this.cascades.length == 0) {
        return null;
      } else {
        return this.cascades.length;
      }
    },
    countIndirectCascades() {
      if (this.indirectCascades == null || this.indirectCascades.length == 0) {
        return null;
      } else {
        return this.indirectCascades.length;
      }
    },

    displayModifications() {
     const {can} = new AbilityBuilder(Ability);
      if (can("read_CS_modifications") && this.operationZone == "Cairo South") {
        console.log(can)
        return true;
      }
      else if (can("read_CN_modifications") && this.operationZone == "Cairo North") {
        return true;
      }
      else if  (can("read_CE_modifications") && this.operationZone == "Cairo East") {
        return true;
      }
      else if (can("read_GZ_modifications") && this.operationZone == "Giza") {
        return true;
      }
      else{
        return false;
      }

    },
  },
  mounted() {
    this.getSiteDetails();
    console.log(this.displayModifications)
  },
  methods: {
    getSiteNUR() {
      let data = {
        site_code: this.site_code,
      };
      NUR.getSiteNUR(data)
        .then((response) => {
          console.log(response);

          this.NUR2G = response.data.NUR2G;
          this.NUR3G = response.data.NUR3G;
          this.NUR4G = response.data.NUR4G;

          if (
            this.NUR2G.length == 0 &&
            this.NUR3G.length == 0 &&
            this.NUR4G.length == 0
          ) {
            toast.add({
              severity: "success",
              summary: "Success Message",
              detail: "This site didn't make NUR",
              life: 3000,
            });
          } else {
            this.$dialog.open(siteNURTable, {
              props: {
                header: this.siteName,
                style: {
                  width: "75vw",
                },
                breakpoints: {
                  "960px": "75vw",
                  "640px": "90vw",
                },
                modal: true,
              },

              data: {
                NUR3G: this.NUR3G,
                NUR2G: this.NUR2G,
                NUR4G: this.NUR4G,
                site_code: siteCode.value,
                site_name: this.siteName,
              },
            });
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          store.dispatch("displaySpinnerPage", true);
        });
    },
    getSiteDetails() {
      this.$store.dispatch("displaySpinnerPage", false);

      Sites.getSiteDetails(this.site_code).then((response) => {
        this.siteName = response.data.site.site_name;
        siteCode.value = response.data.site.site_code;
        this.type = response.data.site.type;
        this.severity = response.data.site.severity;
        this.sharing = response.data.site.sharing;
        this.status = response.data.site.status;
        this.host = response.data.site.host;
        this.gest = response.data.site.gest;
        this.vf_code = response.data.site.vf_code;
        this.et_code = response.data.site.et_code;
        this.we_code = response.data.site.we_code;
        this.cell2G = response.data.site["2G_cells"];
        this.cell3G = response.data.site["3G_cells"];
        this.cell4G = response.data.site["4G_cells"];
        this.BSC = response.data.site.BSC;
        this.RNC = response.data.site.RNC;
        this.office = response.data.site.office;
        this.operationZone = response.data.site.oz;
        this.category = response.data.site.category;
        this.cascades = response.data.cascades;
        this.indirectCascades = response.data.indirectCascades;
        this.nodalCode = response.data.site.nodal_code;
        this.nodalName = response.data.site.nodal_name;
        this.id = response.data.site.id;
        data.value = {
          site_code: this.siteCode,
        };
      });
    },
    openDialog() {
      this.$dialog.open(SiteAlarmsTable, {
        props: {
          style: {
            width: "75vw",
          },
          breakpoints: {
            "960px": "75vw",
            "640px": "90vw",
          },
          modal: true,
        },

        onClose: (options) => {
          this.$store.dispatch("siteAlarms", null);
        },
      });
    },
    onRowSelect() {
      this.$router.push(`/sites/details/${this.selectedSite.cascade_code}`);
    },
    gotToSiteModifications() {
      this.$router.push(
        `/modifications/sitemodifications/${this.siteCode}/${this.siteName}`
      );
    },
    goToSiteUpdate() {
      this.$router.push(`/sites/update/${this.siteCode}`);
    },

    goToUpdateCascadesPage() {
      this.$router.push(`/sites/cascades/update/${this.siteCode}`);
    },
    getSitePowerAlarms() {
      this.$store.dispatch("displaySpinnerPage", false);
      Energy.getSitePowerAlarms(this.data)
        .then((response) => {
          if (response.data.alarms.length > 0) {
            this.$store.dispatch("siteAlarms", {
              alarmName: "power",
              alarmData: response.data.alarms,
            });
            this.openDialog();
          } else {
            this.$toast.add({
              severity: "error",
              summary: "Opps.....",
              detail: `No Alarms`,
              life: 3000,
            });
          }

          console.log(response);
        })
        .catch((error) => {
          if (error.response.status == 422) {
            if (error.response.data.errors.site_code) {
              let site_codeErrors = error.response.data.errors.site_code;
              site_codeErrors.forEach((element) => {
                this.$toast.add({
                  severity: "error",
                  summary: "Invalid Code",
                  detail: `${element}`,
                  life: 3000,
                });
              });
            }
          }
        })
        .finally(() => {
          this.$store.dispatch("displaySpinnerPage", true);
        });
    },
    getSiteHTAlarms() {
      this.$store.dispatch("displaySpinnerPage", false);
      Energy.getSiteHighTempAlarms(this.data)
        .then((response) => {
          if (response.data.alarms.length > 0) {
            this.$store.dispatch("siteAlarms", {
              alarmName: "highTemp",
              alarmData: response.data.alarms,
            });
            this.openDialog();
          } else {
            this.$toast.add({
              severity: "error",
              summary: "Opps.....",
              detail: `No Alarms`,
              life: 3000,
            });
          }
        })
        .catch((error) => {
          if (error.response.status == 422) {
            if (error.response.data.errors.site_code) {
              let site_codeErrors = error.response.data.errors.site_code;
              site_codeErrors.forEach((element) => {
                this.$toast.add({
                  severity: "error",
                  summary: "Invalid Code",
                  detail: `${element}`,
                  life: 3000,
                });
              });
            }
          }
        })
        .finally(() => {
          this.$store.dispatch("displaySpinnerPage", true);
        });
    },
    getSiteGenAlarms() {
      Energy.getSiteGenAlarms(this.data)
        .then((response) => {
          if (response.data.alarms.length > 0) {
            this.$store.dispatch("siteAlarms", {
              alarmName: "gen",
              alarmData: response.data.alarms,
            });
            this.openDialog();
          } else {
            this.$toast.add({
              severity: "error",
              summary: "No Data Found",
              detail: `No Alarms`,
              life: 3000,
            });
          }
        })
        .catch((error) => {
          if (error.response.status == 422) {
            if (error.response.data.errors.site_code) {
              let site_codeErrors = error.response.data.errors.site_code;
              site_codeErrors.forEach((element) => {
                this.$toast.add({
                  severity: "error",
                  summary: "Invalid Code",
                  detail: `${element}`,
                  life: 3000,
                });
              });
            }
          }
        });
    },
    getSiteDownAlarmsGroupedByWeek() {
      this.$store.dispatch("displaySpinnerPage", false);
      Energy.getSiteDownAlarmsGroupedByWeek(this.data)
        .then((response) => {
          if (response.data.statestics.alarms == "exist") {
            this.$dialog.open(SiteDownAlarmsGroupedByWeek, {
              props: {
                style: {
                  width: "75vw",
                },
                breakpoints: {
                  "960px": "75vw",
                  "640px": "90vw",
                },
                modal: true,
              },
              data: {
                downAlarms: response.data.statestics,
                site_code: this.data.site_code,
              },
            });
          } else {
            this.$toast.add({
              severity: "error",
              summary: "No Data Found",
              detail: `No Alarms`,
              life: 3000,
            });
          }
        })
        .catch((error) => {
          if (error.response.status == 422) {
            if (error.response.data.errors.site_code) {
              let site_codeErrors = error.response.data.errors.site_code;
              site_codeErrors.forEach((element) => {
                this.$toast.add({
                  severity: "error",
                  summary: "Invalid Code",
                  detail: `${element}`,
                  life: 3000,
                });
              });
            }
          }
        })
        .finally(() => {
          this.$store.dispatch("displaySpinnerPage", true);
        });
    },
    getSiteBatteriesHealth() {
      Energy.getSiteBatteriesHealth(this.data)
        .then((response) => {
          if (response.data.statestics.powerAlarms == "exist") {
            this.$dialog.open(siteBatteriesHealth, {
              props: {
                style: {
                  width: "75vw",
                },
                breakpoints: {
                  "960px": "75vw",
                  "640px": "90vw",
                },
                modal: true,
              },
              data: {
                powerAlarms: response.data.statestics,
              },
            });
          } else {
            this.$toast.add({
              severity: "error",
              summary: "Opps.....",
              detail: `No power Alarms recorded/Dead Batteries`,
              life: 3000,
            });
          }
        })
        .catch((error) => {});
    },

    getBatteriesData() {
      Sites.getBatteriesDetails(this.id)
        .then((response) => {
          if (response.data.success == true) {
            this.$dialog.open(SiteBatteriesTable, {
              props: {
                style: {
                  width: "75vw",
                },
                breakpoints: {
                  "960px": "75vw",
                  "640px": "90vw",
                },
                modal: true,
              },
              data: {
                batteries: response.data.batteries,
                site_code: this.site_code,
              },
            });
          } else {
            this.$confirm.require({
              group: "yesNo",
              message: "There is No Batteries data, insert new data?",
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
                this.$confirm.close();

                this.insertNewBatteiesData();
              },
              reject: () => {
                this.$confirm.close();
              },
            });
          }
        })
        .catch((error) => {});
    },
    getSiteData() {
      let siteData = [];

      let site = {
        "On Air Date": null,
      };
      siteData.push(site);
      site = {
        Topology: null,
      };
      siteData.push(site);
      site = {
        Structure: null,
      };
      siteData.push(site);
      site = {
        "Equip-Room": null,
      };
      siteData.push(site);
      site = {
        "NTRA Cluster": null,
      };
      siteData.push(site);
      site = {
        CXO: null,
      };
      siteData.push(site);
      site = {
        Axis: null,
      };
      siteData.push(site);
      site = {
        "Serve Compound": null,
      };
      siteData.push(site);
      site = {
        Universities: null,
      };
      siteData.push(site);
      site = {
        "Hot Spot": null,
      };
      siteData.push(site);
      site = {
        "AC1 Type": null,
      };
      siteData.push(site);
      site = {
        "AC1 HP": null,
      };
      siteData.push(site);
      site = {
        "AC2 Type": null,
      };
      siteData.push(site);
      site = {
        "AC2 HP": null,
      };
      siteData.push(site);
      site = {
        "Network Type": null,
      };
      siteData.push(site);
      site = {
        "Last PM Date": null,
      };
      siteData.push(site);
      site = {
        "Access Permission": null,
      };
      siteData.push(site);
      site = {
        "Permission Type": null,
      };
      siteData.push(site);
      Sites.getSiteDeepDetails(this.data).then((response) => {
        console.log(response);

        if (response.data.data == "found data") {
          let siteData = [];
          let site = {
            "On Air Date": response.data.on_air_date,
          };
          siteData.push(site);
          site = {
            Topology: response.data.topology,
          };
          siteData.push(site);
          site = {
            Structure: response.data.structure,
          };
          siteData.push(site);
          site = {
            "Equip-Room": response.data.equip_room,
          };
          siteData.push(site);
          site = {
            "NTRA Cluster": response.data.ntra_cluster,
          };
          siteData.push(site);
          site = {
            CXO: response.data.care_ceo,
          };
          siteData.push(site);
          site = {
            Axis: response.data.axsees,
          };
          siteData.push(site);
          site = {
            "Serve Compound": response.data.serve_compound,
          };
          siteData.push(site);
          site = {
            Universities: response.data.universities,
          };
          siteData.push(site);
          site = {
            "Host Spot": response.data.hot_spot,
          };
          siteData.push(site);
          site = {
            "AC1 Type": response.data.ac1_type,
          };
          siteData.push(site);
          site = {
            "AC1 HP": response.data.ac1_hp,
          };
          siteData.push(site);
          site = {
            "AC2 Type": response.data.ac2_type,
          };
          siteData.push(site);
          site = {
            "AC2 HP": response.data.ac2_hp,
          };
          siteData.push(site);
          site = {
            "Network Type": response.data.network_type,
          };
          siteData.push(site);
          site = {
            "Last PM Date": response.data.last_pm_date,
          };
          siteData.push(site);
          site = {
            "Access Permission": response.data.need_access_permission,
          };
          siteData.push(site);
          site = {
            "Permission Type": response.data.permission_type,
          };
          siteData.push(site);

          this.$dialog.open(EquipmentDetails, {
            props: {
              style: {
                width: "90vw",
              },

              modal: true,
            },

            data: {
              statestics: siteData,
              id: response.data.id,
              topic: "Site Data",
              rowData: response.data,
              action: "Update",
            },
          });
        } else {
          this.$dialog.open(EquipmentDetails, {
            props: {
              style: {
                width: "50vw",
              },
              breakpoints: {
                "960px": "75vw",
                "640px": "90vw",
              },

              modal: true,
            },

            data: {
              statestics: siteData,
              id: null,
              topic: "Site Data",
              action: "Insert",
              site_code: this.siteCode,
              rowData: null,
            },
          });
        }
      });
    },
    getRectifierData() {
      let rectifierData = []; ////////array of input field names
      let rectifier = {
        "Rectifier Brand": null,
      };
      rectifierData.push(rectifier);
      rectifier = {
        "Module Capacity": null,
      };
      rectifierData.push(rectifier);
      rectifier = {
        "No. Module": null,
      };
      rectifierData.push(rectifier);
      rectifier = {
        "PLVD Value": null,
      };
      rectifierData.push(rectifier);
      rectifier = {
        "Net ECO": null,
      };
      rectifierData.push(rectifier);
      rectifier = {
        "Net ECO Activation": null,
      };
      rectifierData.push(rectifier);
      Sites.getRectifierDetails(this.data)
        .then((response) => {
          if (response.data.data == "found data") {
            let rectifierData = [];
            let rectifier = {
              "Rectifier Brand": response.data.rec_brand,
            };
            rectifierData.push(rectifier);
            rectifier = {
              "Module Capacity": response.data.module_capacity,
            };
            rectifierData.push(rectifier);
            rectifier = {
              "No. Module": response.data.no_module,
            };
            rectifierData.push(rectifier);
            rectifier = {
              "PLVD Value": response.data.pld_value,
            };
            rectifierData.push(rectifier);
            rectifier = {
              "Net ECO": response.data.net_eco,
            };
            rectifierData.push(rectifier);
            rectifier = {
              "Net ECO Activation": response.data.net_eco_activation,
            };
            rectifierData.push(rectifier);
            this.$dialog.open(EquipmentDetails, {
              props: {
                style: {
                  width: "75vw",
                },
                breakpoints: {
                  "960px": "75vw",
                  "640px": "90vw",
                },

                modal: true,
              },

              data: {
                statestics: rectifierData,
                id: response.data.id,
                topic: "Rectifier Data",
                rowData: response.data,
                action: "Update",
                site_code: this.siteCode,
              },
            });
          } else {
            this.$confirm.require({
              group: "yesNo",
              header: "Confirmation",
              message: "There is no Rectifier data. Add new Data?",
              icon: "pi pi-exclamation-triangle",
              rejectProps: {
                label: "No",

                size: "small",
                severity: "danger",
              },
              acceptProps: {
                label: "Yes",
                icon: "pi pi-check",
                size: "small",
                severity: "success",
              },

              accept: () => {
                this.$confirm.close();
                this.$dialog.open(EquipmentDetails, {
                  props: {
                    style: {
                      width: "75vw",
                    },

                    modal: true,
                  },

                  data: {
                    statestics: rectifierData,
                    id: null,
                    topic: "Rectifier Data",
                    rowData: null,
                    action: "Insert",
                    site_code: this.siteCode,
                  },
                });
              },
              reject: () => {
                this.$confirm.close();

                this.$toast.add({
                  severity: "info",
                  summary: "Confirmed",
                  detail: "You have rejected",
                  life: 3000,
                });
              },
            });
            // this.$dialog.open(EquipmentDetails, {
            //   props: {
            //     style: {
            //       width: "75vw",
            //     },

            //     modal: true,
            //   },

            //   data: {
            //     statestics: rectifierData,
            //     id: null,
            //     topic: "Rectifier Data",
            //     rowData: null,
            //     action: 'Insert',
            //     site_code: this.siteCode

            //   },
            // });
          }
        })
        .catch((error) => {});
    },
    getMWData() {
      Sites.getSiteMWDetails(this.data)
        .then((response) => {
          let MWData = [];
          if (response.data.data == "found data") {
            let MW = {
              "No MW": response.data.no_mw,
            };
            MWData.push(MW);
            MW = {
              "MW Type": response.data.mw_type,
            };
            MWData.push(MW);
            MW = {
              Eband: response.data.eband,
            };

            MWData.push(MW);
            this.$dialog.open(EquipmentDetails, {
              props: {
                style: {
                  width: "50vw",
                },
                breakpoints: {
                  "960px": "75vw",
                  "640px": "90vw",
                },

                modal: true,
              },

              data: {
                statestics: MWData,
                id: response.data.id,
                topic: "MW Data",
                rowData: response.data,
                action: "Update",
              },
            });
          } else {
            this.$confirm.require({
              group: "yesNo",
              header: "Confirmation",
              message: "There is no Microwave data. Add new Data?",
              icon: "pi pi-exclamation-triangle",
              rejectProps: {
                label: "No",

                size: "small",
                severity: "danger",
              },
              acceptProps: {
                label: "Yes",
                icon: "pi pi-check",
                size: "small",
                severity: "success",
              },

              accept: () => {
                this.$confirm.close();
                this.$dialog.open(EquipmentDetails, {
                  props: {
                    style: {
                      width: "75vw",
                    },

                    modal: true,
                  },

                  data: {
                    statestics: MWData,
                    id: null,
                    topic: "MW Data",
                    rowData: null,
                    action: "Insert",
                    site_code: this.siteCode,
                  },
                });
              },
              reject: () => {
                this.$confirm.close();

                this.$toast.add({
                  severity: "info",
                  summary: "Confirmed",
                  detail: "You have rejected",
                  life: 3000,
                });
              },
            });
          }
        })
        .catch((error) => {});
    },
    getBTSData() {
      Sites.getSiteBTSDetails(this.data)
        .then((response) => {
          let BTSData = [];
          if (response.data.data == "found data") {
            let BTS = {
              "No BTS": response.data.no_bts,
            };
            BTSData.push(BTS);
            BTS = {
              "MRFU 2G": response.data.mrfu_2G,
            };
            BTSData.push(BTS);
            BTS = {
              "MRFU 3G": response.data.mrfu_3G,
            };
            BTSData.push(BTS);
            BTS = {
              "MRFU 4G": response.data.mrfu_4G,
            };
            BTSData.push(BTS);
            BTS = {
              TDD: response.data.tdd,
            };

            BTSData.push(BTS);
            this.$dialog.open(EquipmentDetails, {
              props: {
                style: {
                  width: "50vw",
                },
                breakpoints: {
                  "960px": "75vw",
                  "640px": "90vw",
                },

                modal: true,
              },

              data: {
                statestics: BTSData,
                id: response.data.id,
                topic: "BTS Data",
                rowData: response.data,
                action: "Update",
              },
            });
          } else {
            this.$confirm.require({
              group: "yesNo",
              header: "Confirmation",
              message: "There is no BTS data. Add new Data?",
              icon: "pi pi-exclamation-triangle",
              rejectProps: {
                label: "No",

                size: "small",
                severity: "danger",
              },
              acceptProps: {
                label: "Yes",
                icon: "pi pi-check",
                size: "small",
                severity: "success",
              },

              accept: () => {
                this.$confirm.close();
                this.$dialog.open(EquipmentDetails, {
                  props: {
                    style: {
                      width: "75vw",
                    },

                    modal: true,
                  },

                  data: {
                    statestics: BTSData,
                    id: null,
                    topic: "BTS Data",
                    rowData: null,
                    action: "Insert",
                    site_code: this.siteCode,
                  },
                });
              },
              reject: () => {
                this.$confirm.close();

                this.$toast.add({
                  severity: "info",
                  summary: "Confirmed",
                  detail: "You have rejected",
                  life: 3000,
                });
              },
            });
          }
        })
        .catch((error) => {});
    },
    getPowerData() {
      Sites.getSitePowerDetails(this.data)
        .then((response) => {
          let powerData = [];
          if (response.data.data == "found data") {
            let power = {
              "Power Source": response.data.power_source,
            };
            powerData.push(power);
            power = {
              "PM Type": response.data.power_meter_type,
            };
            powerData.push(power);
            power = {
              "Gen Config.": response.data.gen_config,
            };
            powerData.push(power);
            power = {
              "Gen Serial": response.data.gen_serial,
            };
            powerData.push(power);
            power = {
              "Gen Capacity": response.data.gen_capacity,
            };

            powerData.push(power);
            power = {
              "Overhaul Power Consump":
                response.data.overhaul_power_consumption,
            };

            powerData.push(power);
            this.$dialog.open(EquipmentDetails, {
              props: {
                style: {
                  width: "75vw",
                },
                breakpoints: {
                  "960px": "75vw",
                  "640px": "90vw",
                },

                modal: true,
              },

              data: {
                statestics: powerData,
                id: response.data.id,
                topic: "Power Data",
                rowData: response.data,
                action: "Update",
              },
            });
          } else {
            this.$confirm.require({
              group: "yesNo",
              header: "Confirmation",
              message: "There is no BTS data. Add new Data?",
              icon: "pi pi-exclamation-triangle",
              rejectProps: {
                label: "No",

                size: "small",
                severity: "danger",
              },
              acceptProps: {
                label: "Yes",
                icon: "pi pi-check",
                size: "small",
                severity: "success",
              },

              accept: () => {
                this.$confirm.close();
                this.$dialog.open(EquipmentDetails, {
                  props: {
                    style: {
                      width: "75vw",
                    },

                    modal: true,
                  },

                  data: {
                    statestics: powerData,
                    id: null,
                    topic: "Power Data",
                    rowData: null,
                    action: "Insert",
                    site_code: this.siteCode,
                  },
                });
              },
              reject: () => {
                this.$confirm.close();

                this.$toast.add({
                  severity: "info",
                  summary: "Confirmed",
                  detail: "You have rejected",
                  life: 3000,
                });
              },
            });
          }
        })
        .catch((error) => {});
    },
    getSiteWANSData() {
      this.$router.push({ path: `/siteTxIssues/${this.site_code}` });
    },
    SearchTxIssues() {
      this.$dialog.open(SearchTxIssuesForm, {
        props: {
          style: {
            width: "50vw",
          },
          breakpoints: {
            "960px": "75vw",
            "640px": "90vw",
          },

          modal: true,
        },
      });
    },

    insertNewBatteiesData() {
      this.$dialog.open(BatteriesUpdate, {
        props: {
          style: {
            width: "50vw",
          },
          breakpoints: {
            "960px": "75vw",
            "640px": "90vw",
          },
          modal: true,
        },
        data: {
          battery: null,
          action: "create",
          site_code: this.siteCode,
        },
      });
    },
  },
}; */
}
</script>

<style lang="scss">
.display-none {
  display: none;
}

.p-tabs {
  padding-left: 20px;
  padding-right: 20px;

  .p-tablist-content {
    background-color: aquamarine;
  }
}
</style>
