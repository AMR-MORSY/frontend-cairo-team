<template>
  <h3 class="text-font-main-color text-lg font-bold text-center w-full py-4">
    {{ topic }}
  </h3>
  <form @submit.prevent="submitUpdateForm()" novalidate>
    <div class="grid grid-cols-4 gap-4">
      <div class="col-span-4 md:col-span-2 lg:col-span-1">
        <div class="flex-auto">
          <label class="font-bold" for="on_air_date">On air date</label>

          <Datepicker
            v-model.trim="form.on_air_date"
            id="on_air_date"
            dateFormat="yy-mm-dd"
            showIcon
            :showOnFocus="false"
            fluid
          />
        </div>
      </div>
      <div class="col-span-4 md:col-span-2 lg:col-span-1">
        <!-- <div class="flex-auto"> -->
        <label class="font-bold" id=" last_pm_date">Last PM date</label>
        <Datepicker
          dateFormat="yy-mm-dd"
          showIcon
          :showOnFocus="false"
          v-model.trim="form.last_pm_date"
          fluid
        />
        <!-- </div> -->
      </div>
      <div class="col-span-4 md:col-span-2 lg:col-span-1">
        <div class="flex-auto">
          <label class="font-bold" id="topology">Topology</label>
          <InputText
            fluid
            :invalid="v$.topology.$errors.length > 0"
            v-model="form.topology"
            aria-describedby="topology"
          />
        </div>
        <div v-if="v$.topology.$error">
          <validationErrorMessage :errors="v$.topology.$errors" />
        </div>
      </div>
      <div class="col-span-4 md:col-span-2 lg:col-span-1">
        <div class="flex-auto">
          <label class="font-bold" id="structure">Structure</label>
          <InputText
            fluid
            :invalid="v$.structure.$error"
            v-model="v$.structure.$model"
            aria-describedby="structure"
          />
        </div>
        <div v-if="v$.structure.$error">
          <validationErrorMessage :errors="v$.structure.$errors" />
        </div>
      </div>
      <div class="col-span-4 md:col-span-2 lg:col-span-1">
        <div class="flex-auto">
          <label class="font-bold" id="equip_room">Equip Room</label>
          <InputText
            fluid
            :invalid="v$.equip_room.$error"
            v-model="v$.equip_room.$model"
            aria-describedby="equip_room"
          />
        </div>
        <div v-if="v$.equip_room.$error">
          <validationErrorMessage :errors="v$.equip_room.$errors" />
        </div>
      </div>
      <div class="col-span-4 md:col-span-2 lg:col-span-1">
        <div class="flex-auto">
          <label class="font-bold" id="ntra_cluster">NTRA</label>
          <Select
            fluid
            :invalid="v$.ntra_cluster.$error"
            :options="serve_comp_options"
            v-model.trim="v$.ntra_cluster.$model"
            aria-describedby="ntra_cluster"
          >
          </Select>
        </div>
        <div v-if="v$.ntra_cluster.$error">
          <validationErrorMessage :errors="v$.ntra_cluster.$errors" />
        </div>
      </div>
      <div class="col-span-4 md:col-span-2 lg:col-span-1">
        <div class="flex-auto">
          <label class="font-bold" id=" care_ceo">CXO</label>
          <Select
            fluid
            :invalid="v$.care_ceo.$error"
            :options="serve_comp_options"
            v-model.trim="v$.care_ceo.$model"
            aria-describedby="care_ceo"
          >
          </Select>
        </div>
        <div v-if="v$.care_ceo.$error">
          <validationErrorMessage :errors="v$.care_ceo.$errors" />
        </div>
      </div>
      <div class="col-span-4 md:col-span-2 lg:col-span-1">
        <div class="flex-auto">
          <label class="font-bold" id="axsees">Axis</label>
          <Select
            fluid
            :invalid="v$.axsees.$error"
            :options="serve_comp_options"
            v-model.trim="v$.axsees.$model"
            aria-describedby="axsees"
          >
          </Select>
        </div>
        <div v-if="v$.axsees.$error">
          <validationErrorMessage :errors="v$.axsees.$errors" />
        </div>
      </div>
      <div class="col-span-4 md:col-span-2 lg:col-span-1">
        <div class="flex-auto">
          <label class="font-bold" id="serve_compound">Serve Compound</label>
          <Select
            fluid
            :invalid="v$.serve_compound.$error"
            :options="serve_comp_options"
            v-model.trim="v$.serve_compound.$model"
            aria-describedby="serve_compound"
          >
          </Select>
        </div>
        <div v-if="v$.serve_compound.$error">
          <validationErrorMessage :errors="v$.serve_compound.$errors" />
        </div>
      </div>
      <div class="col-span-4 md:col-span-2 lg:col-span-1">
        <div class="flex-auto">
          <label class="font-bold" id="no_ldn_accounts">Universities</label>
          <Select
            fluid
            :class="v$.universities.$error"
            :options="serve_comp_options"
            v-model="v$.universities.$model"
            aria-describedby="universities"
          >
          </Select>
        </div>
        <div v-if="v$.universities.$error">
          <validationErrorMessage :errors="v$.universities.$errors" />
        </div>
      </div>
      <div class="col-span-4 md:col-span-2 lg:col-span-1">
        <div class="flex-auto">
          <label class="font-bold" id="no_tp_accounts">Hot Spot</label>
          <Select
            fluid
            :invalid="v$.hot_spot.$error"
            v-model="v$.hot_spot.$model"
            :options="serve_comp_options"
            aria-describedby="hot_spot"
          ></Select>
        </div>
        <div v-if="v$.hot_spot.$error">
          <validationErrorMessage :errors="v$.hot_spot.$errors" />
        </div>
      </div>
   
      <div class="col-span-4 md:col-span-2 lg:col-span-1">
        <div class="flex-auto">
          <label class="font-bold" id="ac1_hp">X-Coordinate</label>
          <InputText
            fluid
            :invalid="v$.x_coordinate.$error"
            v-model="v$.x_coordinate.$model"
            aria-describedby="x_coordinate"
          />
        </div>
        <div v-if="v$.x_coordinate.$error">
          <validationErrorMessage :errors="v$.x_coordinate.$errors" />
        </div>
      </div>
      <div class="col-span-4 md:col-span-2 lg:col-span-1">
        <div class="flex-auto">
          <label class="font-bold" id="ac2_type">Y-Coordinate</label>
          <InputText
            fluid
            :invalid="v$.y_coordinate.$error"
            v-model="v$.y_coordinate.$model"
            aria-describedby="y_coordinate"
          />
        </div>
        <div v-if="v$.y_coordinate.$error">
          <validationErrorMessage :errors="v$.y_coordinate.$errors" />
        </div>
      </div>
    
      <div class="col-span-4 md:col-span-2 lg:col-span-1">
        <div class="flex-auto">
          <label class="font-bold" id=" network_type">Network Type</label>
          <InputText
            fluid
            :invalid="v$.network_type.$error"
            v-model="v$.network_type.$model"
            aria-describedby=" network_type"
          />
        </div>
        <div v-if="v$.network_type.$error">
          <validationErrorMessage :errors="v$.network_type.$errors" />
        </div>
      </div>

      <div class="col-span-4 md:col-span-2 lg:col-span-1">
        <div class="flex-auto">
          <span class="font-bold" id=" need_access_permission"
            >Access Permission</span
          >
          <Select
            fluid
            :invalid="v$.need_access_permission.$error"
            v-model.trim="v$.need_access_permission.$model"
            :options="access_perm_options"
            aria-describedby=" need_access_permission"
          >
          </Select>
        </div>
        <div v-if="v$.need_access_permission.$error">
          <validationErrorMessage :errors="v$.need_access_permission.$errors" />
        </div>
      </div>
      <div class="col-span-4 md:col-span-2 lg:col-span-1">
        <div class="flex-auto">
          <label class="font-bold" id=" permission_type">Permission Type</label>
          <InputText
            fluid
            :invalid="v$.permission_type.$error"
            v-model="v$.permission_type.$model"
            aria-describedby=" permission_type"
          />
        </div>
        <div v-if="v$.permission_type.$error">
          <validationErrorMessage :errors="v$.permission_type.$errors" />
        </div>
      </div>
      <div class="col-span-4 md:col-span-2 lg:col-span-1">
        <div class="flex-auto">
          <label class="font-bold" id="address">Address</label>
          <Textarea
            fluid
            :invalid="v$.address.$error"
            v-model="v$.address.$model"
            aria-describedby="address"
             rows="5" cols="30" style="resize: none"
          />
        </div>
        <div v-if="v$.address.$error">
          <validationErrorMessage :errors="v$.address.$errors" />
        </div>
      </div>
    </div>
    <div class="w-full flex justify-center mt-4">
      <Button
        v-if="action == 'Update'"
        label="Update"
        type="submit"
        icon="pi pi-external-link"
        class="block"
        severity="success"
        text
        raised
      />
      <Button
        v-else
        label="Insert"
        type="submit"
        icon="pi pi-external-link"
        class="block"
        severity="success"
        text
        raised
      />
    </div>
  </form>
</template>

<script setup>
import {
  maxLength,
  minLength,
  minValue,
  maxValue,
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";
import Sites from "../../../apis/Sites";

import validationErrorMessage from "../validationErrorMessage.vue";
import { reactive, ref } from "vue";
import { inject } from "vue";
import { onBeforeRouteUpdate } from "vue-router";
import { useToast } from "primevue/usetoast";
import { onMounted, computed } from "vue";
import { useConfirm } from "primevue/useconfirm";

const confirm = useConfirm();
const dialogRef = inject("dialogRef");
const toast = useToast();
const form = reactive({
  on_air_date: null,
  topology: null,
  structure: null,
  equip_room: null,
  ntra_cluster: null,
  care_ceo: null,
  axsees: null,
  serve_compound: null,
  universities: null,
  hot_spot: null,
  address: null,
  x_coordinate: null,
  y_coordinate: null,
  network_type: null,
  last_pm_date: null,
  need_access_permission: null,
  permission_type: null,
  id: null,
  site_code: null,
});

const topic = ref(null);
const action = ref(null);
const access_perm_options = ["Yes", "No"];
const serve_comp_options = ["Yes", "No"];
const stringReg = helpers.regex(/^[a-zA-Z0-9 \/]+$/);
const booleanReg = helpers.regex(/^Yes|No$/);
onBeforeRouteUpdate((to, from, next) => {
  if (to.path == "/user/login") {
    dialogRef.value.close();
  }
  // You can perform any action here before the route update
  next(); // Don't forget to call next() to confirm the navigation
});

const rules = computed(() => ({
  topology: {
    maxLength: helpers.withMessage("max 50 characters", maxLength(50)),
    stringReg: helpers.withMessage("Alphbet characters only", stringReg),
  },
  structure: {
    maxLength: helpers.withMessage("max 50 characters", maxLength(50)),
    stringReg: helpers.withMessage("Alphbet characters only", stringReg),
  },
  equip_room: {
    maxLength: helpers.withMessage("max 50 characters", maxLength(50)),
    stringReg: helpers.withMessage("Alphbet characters only", stringReg),
  },
  ntra_cluster: {
    booleanReg: helpers.withMessage("alphanumeric only", booleanReg),
  },
  care_ceo: {
    booleanReg: helpers.withMessage("alphanumeric only", booleanReg),
  },
  axsees: {
    booleanReg: helpers.withMessage("alphanumeric only", booleanReg),
  },
  serve_compound: {
    booleanReg: helpers.withMessage("alphanumeric only", booleanReg),
  },
  universities: {
    booleanReg: helpers.withMessage("alphanumeric only", booleanReg),
  },
  hot_spot: {
    booleanReg: helpers.withMessage("alphanumeric only", booleanReg),
  },
  x_coordinate: {
    maxLength: helpers.withMessage("max 50 characters", maxLength(50)),
    stringReg: helpers.withMessage("alphanumeric only", stringReg),
  },
  y_coordinate: {
    maxLength: helpers.withMessage("max 50 characters", maxLength(50)),
    stringReg: helpers.withMessage("alphanumeric only", stringReg),
  },
  address: {
    maxLength: helpers.withMessage("max 50 characters", maxLength(1000)),
    stringReg: helpers.withMessage("alphanumeric only", stringReg),
  },
  
  network_type: {
    maxLength: helpers.withMessage("max 50 characters", maxLength(50)),
    stringReg: helpers.withMessage("alphanumeric only", stringReg),
  },

  need_access_permission: {
    booleanReg: helpers.withMessage("alphanumeric only", booleanReg),
  },
  permission_type: {
    maxLength: helpers.withMessage("max 50 characters", maxLength(50)),
    stringReg: helpers.withMessage("alphanumeric only", stringReg),
  },
}));

const v$ = useVuelidate(rules, form);

onMounted(() => {
  mountData();
});

const returnDate = (stringDate) => {
  if (stringDate) {
    return new Date(stringDate);
  }
  return null;
};

const convertDate = (date) => {
  if (date && typeof date == "object") {
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth() + 1).toString();
    var dd = date.getDate().toString();

    var mmChars = mm.split("");
    var ddChars = dd.split("");

    return (
      yyyy +
      "-" +
      (mmChars[1] ? mm : "0" + mmChars[0]) +
      "-" +
      (ddChars[1] ? dd : "0" + ddChars[0])
    );
  } else if (date && typeof date == "string") {
    return date;
  }
  return null;
};
const mountData = () => {
  console.log(dialogRef.value.data);
  if (dialogRef.value.data.action == "Update") {
    form.on_air_date = returnDate(dialogRef.value.data.rowData.on_air_date);
    form.topology = dialogRef.value.data.rowData.topology;
    form.structure = dialogRef.value.data.rowData.structure;
    form.equip_room = dialogRef.value.data.rowData.equip_room;
    form.ntra_cluster = dialogRef.value.data.rowData.ntra_cluster;
    form.care_ceo = dialogRef.value.data.rowData.care_ceo;
    form.axsees = dialogRef.value.data.rowData.axsees;
    form.serve_compound = dialogRef.value.data.rowData.serve_compound;
    form.universities = dialogRef.value.data.rowData.universities;
    form.hot_spot = dialogRef.value.data.rowData.hot_spot;
    form.address = dialogRef.value.data.rowData.address;
    form.x_coordinate = dialogRef.value.data.rowData.x_coordinate;
    form.y_coordinate = dialogRef.value.data.rowData.y_coordinate;
    form.network_type = dialogRef.value.data.rowData.network_type;
    form.last_pm_date = returnDate(dialogRef.value.data.rowData.last_pm_date);
    form.need_access_permission =
      dialogRef.value.data.rowData.need_access_permission;
    form.permission_type = dialogRef.value.data.rowData.permission_type;
    form.id = dialogRef.value.data.rowData.id;
  }

  if (dialogRef.value.data.site_code) {
    form.site_code = dialogRef.value.data.site_code;
  }

  topic.value = dialogRef.value.data.topic;
  action.value = dialogRef.value.data.action;
};

const submitUpdateForm = async () => {
  confirm.require({
    group: "yesNo",
    message: "Are you sure you want to proceed?",
    header: "Confirmation",
    icon: "pi pi-exclamation-triangle",
    position: "center",
    rejectProps: {
      label: "No",
      severity: "danger",
    },
    acceptProps: {
      label: "Yes",
      severity: "success",
    },
    accept: async () => {
      confirm.close();
      const isFormCorrect = await v$.value.$validate();
      if (!isFormCorrect) {
        return;
      }

      if (action.value == "Update") {
        Sites.updatesiteDeepDetails(form)
          .then((response) => {
            if (response.data.message == "updated successfully") {
              toast.add({
                severity: "success",
                summary: "Success Message",
                detail: "Updated Successfully",
                life: 3000,
              });
            }
          })
          .catch((error) => {
            if (error.response.status == 204) {
              toast.add({
                severity: "info",
                summary: "Success Message",
                detail: "site instrument not found",
                life: 3000,
              });
            }
          });
      } else {
        Sites.insertSiteDeepDetails(form)
          .then((response) => {
            if (response.data.message == "inserted successfully") {
              toast.add({
                severity: "success",
                summary: "Success Message",
                detail: "inserted Successfully",
                life: 3000,
              });
            }
          })
          .catch((error) => {});
      }
    },
    reject: () => {
      confirm.close();
    },
  });
};

// export default {
//   setup: () => ({ v$: useVuelidate() }),
//   data() {
//     return {
//       form: {
//         on_air_date: null,
//         topology: null,
//         structure: null,
//         equip_room: null,
//         ntra_cluster: null,
//         care_ceo: null,
//         axsees: null,
//         serve_compound: null,
//         universities: null,
//         hot_spot: null,
//         ac1_type: null,
//         ac1_hp: null,
//         ac2_type: null,
//         ac2_hp: null,
//         network_type: null,
//         last_pm_date: null,
//         need_access_permission: null,
//         permission_type: null,
//         id: null,
//       },
//       topic: null,
//       action: null,
//       access_perm_options: ["Yes", "No"],
//       serve_comp_options: ["Yes", "No"],
//     };
//   },
//   validations() {
//     const stringReg = helpers.regex(/^[a-zA-Z0-9 \/]+$/);
//     const booleanReg = helpers.regex(/^Yes|No$/);

//     return {
//       form: {
//         topology: {
//           maxLength: helpers.withMessage("max 50 characters", maxLength(50)),
//           stringReg: helpers.withMessage("Alphbet characters only", stringReg),
//         },
//         structure: {
//           maxLength: helpers.withMessage("max 50 characters", maxLength(50)),
//           stringReg: helpers.withMessage("Alphbet characters only", stringReg),
//         },
//         equip_room: {
//           maxLength: helpers.withMessage("max 50 characters", maxLength(50)),
//           stringReg: helpers.withMessage("Alphbet characters only", stringReg),
//         },
//         ntra_cluster: {
//           booleanReg: helpers.withMessage("alphanumeric only", booleanReg),
//         },
//         care_ceo: {
//           booleanReg: helpers.withMessage("alphanumeric only", booleanReg),
//         },
//         axsees: {
//           booleanReg: helpers.withMessage("alphanumeric only", booleanReg),
//         },
//         serve_compound: {
//           booleanReg: helpers.withMessage("alphanumeric only", booleanReg),
//         },
//         universities: {
//           booleanReg: helpers.withMessage("alphanumeric only", booleanReg),
//         },
//         hot_spot: {
//           booleanReg: helpers.withMessage("alphanumeric only", booleanReg),
//         },
//         ac1_type: {
//           maxLength: helpers.withMessage("max 50 characters", maxLength(50)),
//           stringReg: helpers.withMessage("alphanumeric only", stringReg),
//         },
//         ac2_type: {
//           maxLength: helpers.withMessage("max 50 characters", maxLength(50)),
//           stringReg: helpers.withMessage("alphanumeric only", stringReg),
//         },
//         ac1_hp: {
//           maxLength: helpers.withMessage("max 50 characters", maxLength(50)),
//           stringReg: helpers.withMessage("alphanumeric only", stringReg),
//         },
//         ac2_hp: {
//           maxLength: helpers.withMessage("max 50 characters", maxLength(50)),
//           stringReg: helpers.withMessage("alphanumeric only", stringReg),
//         },
//         network_type: {
//           maxLength: helpers.withMessage("max 50 characters", maxLength(50)),
//           stringReg: helpers.withMessage("alphanumeric only", stringReg),
//         },

//         need_access_permission: {
//           booleanReg: helpers.withMessage("alphanumeric only", booleanReg),
//         },
//         permission_type: {
//           maxLength: helpers.withMessage("max 50 characters", maxLength(50)),
//           stringReg: helpers.withMessage("alphanumeric only", stringReg),
//         },
//       },
//     };
//   },
//   name: "SiteDataUpdate",
//   inject: ["dialogRef"],

//   mounted() {
//     this.mountData();
//   },
//   watch: {
//     $route(to, from) {
//       if (to.path == "/user/login") {
//         this.dialogRef.close();
//       }
//     },
//   },
//   components: {
//     validationErrorMessage,
//   },
//   methods: {
//     mountData() {
//       if (this.dialogRef.data.action == "Update") {
//         this.form.on_air_date = this.dialogRef.data.rowData.on_air_date;
//         this.form.topology = this.dialogRef.data.rowData.topology;
//         this.form.structure = this.dialogRef.data.rowData.structure;
//         this.form.equip_room = this.dialogRef.data.rowData.equip_room;
//         this.form.ntra_cluster = this.dialogRef.data.rowData.ntra_cluster;
//         this.form.care_ceo = this.dialogRef.data.rowData.care_ceo;
//         this.form.axsees = this.dialogRef.data.rowData.axsees;
//         this.form.serve_compound = this.dialogRef.data.rowData.serve_compound;
//         this.form.universities = this.dialogRef.data.rowData.universities;
//         this.form.hot_spot = this.dialogRef.data.rowData.hot_spot;
//         this.form.ac1_type = this.dialogRef.data.rowData.ac1_type;
//         this.form.ac2_type = this.dialogRef.data.rowData.ac2_type;
//         this.form.ac1_hp = this.dialogRef.data.rowData.ac1_hp;
//         this.form.ac2_hp = this.dialogRef.data.rowData.ac2_hp;
//         this.form.network_type = this.dialogRef.data.rowData.network_type;
//         this.form.last_pm_date = this.dialogRef.data.rowData.last_pm_date;
//         this.form.need_access_permission =
//           this.dialogRef.data.rowData.need_access_permission;
//         this.form.permission_type = this.dialogRef.data.rowData.permission_type;
//         this.form.id = this.dialogRef.data.id;
//       }

//       this.topic = this.dialogRef.data.topic;
//       this.action = this.dialogRef.data.action;
//     },
//     async submitUpdateForm() {
//       const isFormCorrect = await this.v$.$validate();
//       if (!isFormCorrect) return;
//       if (this.action == "Update") {
//         console.log(this.form);
//         Sites.updatesiteDeepDetails(this.form)
//           .then((response) => {
//             if (response.data.message == "updated successfully") {
//               this.$toast.add({
//                 severity: "success",
//                 summary: "Success Message",
//                 detail: "Updated Successfully",
//                 life: 3000,
//               });
//             }
//           })
//           .catch((error) => {
//             if (error.response.status == 204) {
//               this.$toast.add({
//                 severity: "info",
//                 summary: "Success Message",
//                 detail: "site instrument not found",
//                 life: 3000,
//               });
//             }
//           });
//       } else {
//       }
//     },
//   },
// };
</script>

<style lang="scss" scoped>
.input-group {
  width: 100%;
  margin-bottom: 1rem;
}

.button-container {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-top: 1em;
}
</style>
