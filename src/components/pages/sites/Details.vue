<template>
  <div class="py-20 px-2">
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
              <OverlayBadge v-if="countCascades" :value="countCascades">
                <span
                  class="text-font-main-color font-Signika font-extrabold uppercase"
                  >Cascades</span
                >
              </OverlayBadge>
              <span
                class="text-font-main-color font-Signika font-extrabold uppercase"
                v-else
                >Cascades</span
              >
              <!-- <Badge :value="countCascades" v-if="countCascades"></Badge> -->
            </Tab>
            <Tab value="2">
              <OverlayBadge
                v-if="countIndirectCascades"
                :value="countIndirectCascades"
              >
                <span
                  class="text-font-main-color font-Signika font-extrabold uppercase"
                  >Indirect</span
                >
              </OverlayBadge>
              <span
                class="text-font-main-color font-Signika font-extrabold uppercase"
                v-else
                >Indirect</span
              >
              <!-- <Button type="button" label="Indirect Cascades"  :badge="countIndirectCascades" v-if="countIndirectCascades" badgeSeverity="contrast" outlined />
              <Button type="button" label="Indirect Cascades" icon="pi pi-inbox" v-else  outlined /> -->
              <!-- <span
                class="text-font-main-color font-Signika font-extrabold uppercase"
                >Indirect Cascades</span
              >
              <template v-if="countIndirectCascades">
                <Badge :value="countIndirectCascades"></Badge>
              </template> -->
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel value="0">
              <div
                class="flex justify-evenly py-2 flex-wrap gap-4 rounded-md border border-spacing-2 border-font-main-color"
              >
                <div class="shrink-0 w-40">
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
                <div class="shrink-0 w-40">
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
                <div class="shrink-0 w-40">
                  <span class="block font-Signika text-font-main-color"
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
                <div class="shrink-0 w-40">
                  <span class="block font-Signika text-font-main-color" id="RNC"
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
                <div class="shrink-0 w-40">
                  <span class="block font-Signika text-font-main-color" id="oz"
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
                <div class="shrink-0 w-40">
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
                <div class="shrink-0 w-40">
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

                <div class="shrink-0 w-40">
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

                <div class="shrink-0 w-40">
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

                <div class="shrink-0 w-40">
                  <span class="block font-Signika text-font-main-color" id="2g"
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

                <div class="shrink-0 w-40">
                  <span class="block font-Signika text-font-main-color" id="3g"
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

                <div class="shrink-0 w-40">
                  <span class="block font-Signika text-font-main-color" id="4g"
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

                <div class="shrink-0 w-40">
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

                <div class="shrink-0 w-40">
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

                <div class="shrink-0 w-40">
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

                <div class="shrink-0 w-40">
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

                <div class="shrink-0 w-40">
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

                <div class="shrink-0 w-40">
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

                <div class="shrink-0 w-40">
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

                <div class="shrink-0 w-40">
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

                <div class="shrink-0 w-40">
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
              <div
                class="w-full border border-spacing-2 border-font-main-color my-5"
              ></div>

              <div class="flex justify-evenly gap-1 flex-wrap">
                <div class="shrink-0 w-40 my-3">
                  <Button
                    :disabled="!displayModifications"
                    label="Modifications"
                    @click="gotToSiteModifications"
                    severity="secondary"
                    raised
                    class="block w-full"
                  />
                </div>
                <div class="shrink-0 w-40 my-3">
                  <Button
                    label="NUR"
                    :disabled="!$can('read_NUR_data')"
                    @click="getSiteNUR"
                    severity="success"
                    raised
                    class="block w-full"
                  />
                </div>
                <div class="shrink-0 w-40 my-3">
                  <Button
                    label="Batteries Health"
                    @click="getSiteBatteriesHealth"
                    severity="info"
                    raised
                    class="text-xs block w-full"
                  />
                </div>
                <div class="shrink-0 w-40 my-3">
                  <Button
                    label="Update"
                    :disabled="!$can('update_Site_data')"
                    @click="goToSiteUpdate"
                    severity="warn"
                    raised
                    class="block w-full"
                  />
                </div>
                <div class="shrink-0 w-40 my-3">
                  <Button
                    :disabled="!$can('read_Instrument_data')"
                    label="Batteries Data"
                    @click="getBatteriesData"
                    severity="help"
                    raised
                    class="text-xs block w-full"
                  />
                </div>
                <div class="shrink-0 w-40 my-3">
                  <Button
                    :disabled="!$can('read_Instrument_data')"
                    label="Rectifier Data"
                    @click="getRectifierData"
                    severity="danger"
                    raised
                    class="text-xs block w-full"
                  />
                </div>
                <div class="shrink-0 w-40 my-3">
                  <Button
                    :disabled="!$can('read_Instrument_data')"
                    label="Site Data"
                    @click="getSiteData"
                    severity="contrast"
                    raised
                    class="block w-full"
                  />
                </div>
                <div class="shrink-0 w-40 my-3">
                  <Button
                    :disabled="!$can('read_Instrument_data')"
                    label="MW Data"
                    @click="getMWData"
                    severity="danger"
                    raised
                    class="block w-full"
                  />
                </div>
                <div class="shrink-0 w-40 my-3">
                  <Button
                    :disabled="!$can('read_Instrument_data')"
                    label="BTS Data"
                    @click="getBTSData"
                    severity="info"
                    raised
                    class="block w-full"
                  />
                </div>
                <div class="shrink-0 w-40 my-3">
                  <Button
                    :disabled="!$can('read_Instrument_data')"
                    label="Power Data"
                    @click="getPowerData"
                    severity="contrast"
                    raised
                    class="block w-full"
                  />
                </div>
                <!-- <div class="shrink-0 w-40 my-3">
                  <Button
                    label="Tx.issues"
                    :disabled="!$can('read_Instrument_data')"
                    @click="getSiteWANSData"
                    severity="warn"
                    raised
                    class="block w-full"
                  />
                </div> -->
                <!-- <div class="shrink-0 w-40 my-3">
                  <Button
                    icon="pi pi-search"
                    label="Tx issues"
                    severity="success"
                    class="block w-full text-xs"
                    raised
                    @click="SearchTxIssues()"
                    :disabled="!$can('read_TX_data')"
                  />
                </div> -->
                <div class="shrink-0 w-40 my-3">
                  <Button
                    icon="pi pi-search"
                    label="Mux Plan"
                    severity="success"
                    class="block w-full text-xs"
                    raised
                    @click="viewMuxPlan"
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
                    :tooltipOptions="{ position: 'right' }"
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
import SiteMuxPlanTable from "../../helpers/Sites/SiteMuxPlanTable.vue";
import MWDataUpdate from "../../helpers/Sites/MWDataUpdate.vue";
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
import SiteDataUpdate from "../../helpers/Sites/SiteDataUpdate.vue";
import RectifierDataUpdate from "../../helpers/Sites/RectifierDataUpdate.vue";
import PowerDataUpdate from "../../helpers/Sites/PowerDataUpdate.vue";
import BTSDataUpdate from "../../helpers/Sites/BTSDataUpdate.vue";

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
const FM2G = ref([]);
const FM3G = ref([]);
const FM4G = ref([]);
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
      FM2G.value = response.data.FM2G;
      FM3G.value = response.data.FM3G;
      FM4G.value = response.data.FM4G;

      if (
        NUR2G.value.length == 0 &&
        NUR3G.value.length == 0 &&
        NUR4G.value.length == 0 &&
        FM2G.value.length == 0 &&
        FM3G.value.length == 0 &&
        FM4G.value.length == 0
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
            header: siteName.value,
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
            FM2G: FM2G.value,
            FM3G: FM3G.value,
            FM4G: FM4G.value,
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

watch(
  () => props.site_code,
  () => getSiteDetails()
); /////////////////////////the right way of writing watch

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
    `/modifications/sitemodifications/${siteCode.value}/${siteName.value}/${operationZone.value}`
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
  Energy.getSitePowerAlarms({ site_code: props.site_code })
    .then((response) => {
      if (response.data.alarms.length > 0) {
        store.dispatch("siteAlarms", {
          alarmName: "power",
          alarmData: response.data.alarms,
        });
        openDialog();
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
  Energy.getSiteHighTempAlarms({ site_code: props.site_code })
    .then((response) => {
      if (response.data.alarms.length > 0) {
        store.dispatch("siteAlarms", {
          alarmName: "highTemp",
          alarmData: response.data.alarms,
        });
        openDialog();
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
  Energy.getSiteGenAlarms({ site_code: props.site_code })
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
  Energy.getSiteDownAlarmsGroupedByWeek({ site_code: props.site_code })
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
            site_code: props.site_code,
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
  Energy.getSiteBatteriesHealth({ site_code: props.site_code })
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
  Sites.getSiteDeepDetails({ site_code: props.site_code }).then((response) => {
    console.log(response);
    if (response.data.instrument != null) {
      dialog.open(SiteDataUpdate, {
        props: {
          style: {
            width: "90vw",
          },

          modal: true,
        },

        data: {
          rowData: response.data.instrument,
          action: "Update",
          topic: "Site Data",
        },
      });
    } else {
      confirm.require({
        group: "yesNo",
        message: "There is No data, insert new data?",
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

          dialog.open(SiteDataUpdate, {
            props: {
              style: {
                width: "90vw",
              },

              modal: true,
            },

            data: {
             
              action: "insert",
              topic: "Site Data",
              site_code: props.site_code,
            },
          });
        },
        reject: () => {
          confirm.close();
        },
      });
    }
  });
};
const getRectifierData = () => {
  Sites.getRectifierDetails({ site_code: props.site_code })
    .then((response) => {
      console.log(response);
      if (response.data.instrument != null) {
        dialog.open(RectifierDataUpdate, {
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
            rowData: response.data.instrument,
            action: "Update",
            topic: "Rectifier Data",
          },
        });
      } else {
        confirm.require({
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
            dialog.open(RectifierDataUpdate, {
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
                // statestics: rectifierData,
                // id: null,
                topic: "Rectifier Data",
                // rowData: null,
                action: "Insert",
                site_code: props.site_code,
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
const getMWData = () => {
  Sites.getSiteMWDetails({ site_code: props.site_code })
    .then((response) => {
      if (response.data.instrument != null) {
        dialog.open(MWDataUpdate, {
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
            rowData: response.data.instrument,
            action: "Update",
            topic: "MW Data",
          },
        });
      } else {
        confirm.require({
          group: "yesNo",
          header: "Confirmation",
          message: "There is no MW data. Add new Data?",
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
            dialog.open(MWDataUpdate, {
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
                // statestics: rectifierData,
                // id: null,
                topic: "MW Data",
                // rowData: null,
                action: "Insert",
                site_code: props.site_code,
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
  Sites.getSiteBTSDetails({ site_code: props.site_code })
   

    .then((response) => {
      if (response.data.instrument != null) {
        dialog.open(BTSDataUpdate, {
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
            rowData: response.data.instrument,
            action: "Update",
            topic: "BTS Data",
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
            dialog.open(BTSDataUpdate, {
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
                // statestics: rectifierData,
                // id: null,
                topic: "BTS Data",
                // rowData: null,
                action: "Insert",
                site_code: props.site_code,
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
  Sites.getSitePowerDetails({ site_code: props.site_code })
    .then((response) => {
      console.log(response);
      if (response.data.instrument != null) {
        dialog.open(PowerDataUpdate, {
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
            rowData: response.data.instrument,
            action: "Update",
            topic: "Power Data",
          },
        });
      } else {
        confirm.require({
          group: "yesNo",
          header: "Confirmation",
          message: "There is no Power data. Add new Data?",
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
            dialog.open(PowerDataUpdate, {
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
                // statestics: rectifierData,
                // id: null,
                topic: "Power Data",
                // rowData: null,
                action: "Insert",
                site_code: props.site_code,
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
      site_code: props.site_code,
    },
  });
};

const showErrors = (errors) => {
  if (errors.site_code) {
    errors.reported.forEach((element) => {
      toast.add({
        severity: "error",
        summary: "Failed",
        detail: element,
        life: 3000,
      });
    });
  }
};
const viewMuxPlan = () => {
  Sites.viewMuxPlan(props.site_code)
    .then((response) => {
      console.log(response);
      if (response.data.message == "success") {
        if (response.data.muxPlans.length > 0) {
          dialog.open(SiteMuxPlanTable, {
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
              muxPlans: response.data.muxPlans,
            },
          });
        } else {
          toast.add({
            severity: "error",
            detail: "No mux plan data",
            life: 3000,
            summary: "Failed",
          });
        }
      }
    })
    .catch((error) => {
      if (error.response.status == 422) {
        let errors = error.response.data.errors;

        showErrors(errors);
      }
    });
};
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
