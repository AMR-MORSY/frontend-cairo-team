<template>
  <div class="w-screen-2xl px-10 py-20">
    <div class="max-w-xs md:max-w-7xl mx-auto">
      <Fieldset>
        <template #legend>
          <p
            class="text-font-main-color font-Signika rounded font-semibold py-1 px-3"
          >
            {{ siteCode }}-{{ siteName }}
          </p>
        </template>
        <div class="form">
          <form>
            <div class="grid grid-cols-4 gap-4 p-5">
              <div
                class="col-span-4 md:col-span-2 lg:col-span-1"
                v-if="needed_action == 'update'"
              >
                <div class="flex-auto">
                  <label for="operation_zone">Operation Zone:</label>
                  <InputText
                    fluid
                    id="operation_zone"
                    v-model="operation_zone"
                    disabled
                  />
                </div>
              </div>
              <div
                class="col-span-4 md:col-span-2 lg:col-span-1"
                v-if="needed_action == 'update'"
              >
                <div class="flex-auto">
                  <label for="action_owner">Action owner:</label>
                  <InputText
                    fluid
                    id="action_owner"
                    v-model="action_owner"
                    disabled
                  />
                </div>
              </div>
              <div class="col-span-4 md:col-span-2 lg:col-span-1">
                <div class="flex-auto">
                  <label for="Subcontractor">Subcontractor:</label>
                  <Select
                    fluid
                    id="Subcontractor"
                    v-model="subcontractor"
                    :invalid="v$.subcontractor.$errors.length > 0"
                    :options="subcontractors"
                    :disabled="needed_action=='view'"
                  >
                  </Select>
                </div>
                <div v-if="v$.subcontractor.$error">
                  <validationErrorMessage :errors="v$.subcontractor.$errors" />
                </div>
              </div>
              <div class="col-span-4 md:col-span-2 lg:col-span-1">
                <div class="flex-auto">
                  <label for="status">Status:</label>

                  <Select
                    fluid
                    id="status"
                    :options="status_options"
                    v-model="status"
                    :invalid="v$.status.$errors.length > 0"
                     :disabled="needed_action=='view'"
                  >
                  </Select>
                </div>
                <div v-if="v$.status.$error">
                  <validationErrorMessage :errors="v$.status.$errors" />
                </div>
              </div>
              <div class="col-span-4 md:col-span-2 lg:col-span-1">
                <div class="flex-auto">
                  <label for="Requesters">Requesters:</label>
                  <Select
                    v-model="requester"
                    id="Requesters"
                    fluid
                    :invalid="v$.requester.$errors.length > 0"
                    :options="requester_options"
                     :disabled="needed_action=='view'"
                  >
                  </Select>
                </div>
                <div v-if="v$.requester.$error">
                  <validationErrorMessage :errors="v$.requester.$errors" />
                </div>
              </div>
              <div class="col-span-4 md:col-span-2 lg:col-span-1">
                <div class="flex-auto">
                  <label for="Projects">Projects:</label>

                  <Select
                    fluid
                    aria-label="Default select example"
                    :options="project_options"
                    v-model="project"
                    id="Projects"
                    :invalid="v$.project.$errors.length > 0"
                     :disabled=" needed_action=='view'"
                  >
                  </Select>
                </div>
                <div v-if="v$.project.$error">
                  <validationErrorMessage :errors="v$.project.$errors" />
                </div>
              </div>
              <div class="col-span-4 md:col-span-2 lg:col-span-1">
                <label for="request">Request Date:</label>

                <Datepicker
                  fluid
                  v-model="request_date"
                  placeholder="Request Date"
                  :invalid="v$.request_date.$errors.length > 0"
                  id="request"
                  dateFormat="yy-mm-dd"
                  showIcon
                  :showOnFocus="false"
                   :disabled=" needed_action=='view'"
                />
                <div v-if="v$.request_date.$error">
                  <validationErrorMessage :errors="v$.request_date.$errors" />
                </div>
              </div>
              <div class="col-span-4 md:col-span-2 lg:col-span-1">
                <label for="cw_date">C.W Date:</label>

                <Datepicker
                  fluid
                  v-model="cw_date"
                  :invalid="v$.cw_date.$errors.length > 0"
                  placeholder="C.W Date:"
                  id="cw_date"
                  dateFormat="yy-mm-dd"
                  showIcon
                  :showOnFocus="false"
                   :disabled="needed_action=='view'"
                />
                <div v-if="v$.cw_date.$error">
                  <validationErrorMessage :errors="v$.cw_date.$errors" />
                </div>
              </div>
              <div class="col-span-4 md:col-span-2 lg:col-span-1">
                <label for="d6_date">D6 Date:</label>

                <Datepicker
                  fluid
                  v-model="d6_date"
                  :invalid="v$.d6_date.$errors.length > 0"
                  placeholder="D6 Date:"
                  id="d6_date"
                  dateFormat="yy-mm-dd"
                  showIcon
                  :showOnFocus="false"
                   :disabled="needed_action=='view'"
                />
                <div v-if="v$.d6_date.$error">
                  <validationErrorMessage :errors="v$.d6_date.$errors" />
                </div>
              </div>
              <div class="col-span-4 md:col-span-2 lg:col-span-1">
                <div class="flex-auto">
                  <label for="est_cost">Estimated Cost</label>
                  <InputNumber
                    fluid
                    v-model="est_cost"
                    :min="0"
                    id="est_cost"
                     :disabled=" needed_action=='view'"
                  />
                </div>
                <!-- <div v-if="v$.est_cost.$error">
                  <validationErrorMessage :errors="v$.est_cost.$errors" />
                </div> -->
              </div>
              <div class="col-span-4 md:col-span-2 lg:col-span-1">
                <div class="flex-auto">
                  <label for="final_cost">Final Cost</label>
                  <InputNumber
                    fluid
                    v-model="final_cost"
                    :invalid="v$.final_cost.$errors.length > 0"
                    :min="0"
                    id="final_cost"
                     :disabled="needed_action=='view'"
                  />
                </div>
                <div v-if="v$.final_cost.$error">
                  <validationErrorMessage :errors="v$.final_cost.$errors" />
                </div>
              </div>
              <div
                class="col-span-4 md:col-span-2 lg:col-span-1"
                v-if="needed_action == 'update' || needed_action == 'view'"
              >
                <div class="flex flex-col justify-start">
                  <label for="wo_code">W.O Code</label>
                  <InputText fluid v-model="wo_code" disabled id="wo_code" />
                </div>
              </div>
              <div class="col-span-4 md:col-span-2 lg:col-span-1">
                <div class="flex flex-col justify-start">
                  <label for="Actions">Actions:</label>
                  <Select
                    fluid
                    id="Actions"
                    v-model="actions"
                    :invalid="v$.actions.$errors.length > 0"
                    :options="actions_options"
                     :disabled=" needed_action=='view'"
                  >
                  </Select>
                </div>
                <div v-if="v$.actions.$error">
                  <validationErrorMessage :errors="v$.actions.$errors" />
                </div>
              </div>
              <div class="col-span-4 md:col-span-2 lg:col-span-1">
                <div class="flex flex-col justify-start">
                  <label for="reported">Reported:</label>
                  <Select
                    fluid
                    id="reported"
                    v-model="reported"
                    :options="reported_options"
                    :invalid="v$.reported.$errors.length > 0"
                     :disabled="needed_action=='view'"
                  >
                  </Select>
                </div>
                <div v-if="v$.reported.$error">
                  <validationErrorMessage :errors="v$.reported.$errors" />
                </div>
              </div>
              <div class="col-span-4 md:col-span-2 lg:col-span-1">
                <label for="d6_date">Reporting Date:</label>

                <Datepicker
                  v-model="reported_at"
                  :invalid="v$.reported_at.$errors.length > 0"
                  placeholder="Reporting Date:"
                  id="reported_at"
                  dateFormat="yy-mm-dd"
                  showIcon
                  :showOnFocus="false"
                  fluid
                   :disabled="needed_action=='view'"
                />
                <div v-if="v$.reported_at.$error">
                  <validationErrorMessage :errors="v$.reported_at.$errors" />
                </div>
              </div>
              <div class="col-span-4 md:col-span-2">
                <div class="flex flex-col justify-start">
                  <label for="description">Description:</label>

                  <Textarea
                    v-model="description"
                    id="description"
                    :invalid="v$.description.$errors.length > 0"
                    rows="5"
                    cols="40"
                     :disabled="needed_action=='view'"
                  ></Textarea>
                </div>
                <div v-if="v$.description.$error">
                  <validationErrorMessage :errors="v$.description.$errors" />
                </div>
              </div>
            </div>
            <div class="flex justify-evenly flex-nowrap items-center">
              <Button
                label="Back"
                type="button"
                severity="success"
                raised
                @click.prevent="goBack"
                class="block"
              />
              <Button
                label="Pre-quotation"
                severity="info"
                v-if="needed_action == 'view'"
                raised
                class="block"
                @click.prevent="goToQuotation"
              />
              <Button
                label="Update"
                severity="secondary"
                v-if="needed_action == 'view'"
                raised
                class="block"
                @click.prevent="goToUpdate"
              />
              <Button
                label="Delete"
                @click.prevent="deleteModification"
               severity="danger"
                v-if="needed_action=='view'"
                raised
                class="block"
                
              />
              <template v-if="needed_action == 'update'">
                <Button
                  label="Update"
                  type="Button"
                  @click="updateModification()"
                  severity="help"
                  raised
                  class="block"
                />
              </template>
              <template v-if="needed_action == 'insert'">
                <Button
                  label="insert"
                  type="Button"
                  @click="insertNewModification()"
                  severity="help"
                  raised
                  class="block"
                />
              </template>
            </div>
          </form>
        </div>
      </Fieldset>
    </div>
  </div>
</template>

<script setup>
import { useToast } from "primevue/usetoast";
import { computed } from "vue";
import { onUpdated, onActivated } from "vue";
import { ref, onMounted, watch, defineProps } from "vue";
import { useRouter } from "vue-router";
import { email, required, requiredIf, minValue } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";
import validationErrorMessage from "../../helpers/validationErrorMessage.vue";
import Modifications from "../../../apis/Modifications";
import InputText from "primevue/inputtext";
import { useConfirm } from "primevue/useconfirm";

const toast = useToast();
const router = useRouter();
const confirm = useConfirm();

const subcontractor = ref(null);

const est_cost = ref(null);

const final_cost = ref(null);

const subcontractors = [
  "OT",
  "Alandick",
  "Tri-Tech",
  "Siatnile",
  "Merc",
  "GP",
  "MBV",
  "Systel",
  "TELE-TECH",
  "SAG",
  "LM",
  "HAS",
  "Red Tech",
  "H-PLUS",
  "MERG",
  "STEPS",
  "GTE",
  "AFRO",
  "Benaya",
  "EEC",
  "Egypt Gate",
  "Huawei",
  "INTEGRA",
  "Unilink",
  "Tele-Trust",
  "SAMA-TEL",
];
const request_date = ref(null);

const requester = ref(null);

const requester_options = [
  "Management Team",
  "Civil Team",
  "Maintenance",
  "Radio",
  "Rollout",
  "Transmission",
  "GA",
  "Soc",
  "Sharing team",
];
const project = ref(null);

const project_options = [
  "Site Dismantle",
  "NTRA",
  "Unsafe Existing",
  "B2B",
  "LTE",
  "5G",
  "Sharing",
  "Site Security",
  "Adding Sec",
  "TDD",
  "Power Modification",
  "L1 Modification",
  "Tx Modification",
  "G2G",
  "New Sites",
];
const status = ref(null);

const status_options = ["waiting D6", "done", "in progress"];
const cw_date = ref(null);
const d6_date = ref(null);

const actions = ref(null);
const description = ref("");
const reported = ref(null);
const reported_at = ref(null);
const operation_zone = ref(null);
const action_owner = ref(null);

const reported_options = ["Yes", "No"];

const mustBeYes = (value) => {
  if (reported_at.value != null && value == "No") {
    return false;
  }
  return true;
};

const actions_options = [
  "Retrofitting",
  "Antenna Swap",
  "Repair",
  "Adding SA",
  "Change Power Cable",
  "WE Sharing Panel",
  "PT Ring",
  "Adding Antennas",
  "Extending Cables",
  "Concrete Works",
  "Cable Trays",
];

const wo_code = ref(null);

const props = defineProps([
  "modificationData",
  "needed_action",
  "siteCode",
  "siteName",
]);

watch(props.modificationData, (newValue, oldValue) => {
  if (newValue.length > 0 || typeof newValue == "object") {
    subcontractor.value = props.modificationData.subcontractor;
    request_date.value = returnDate(props.modificationData.request_date);
    requester.value = props.modificationData.requester;
    project.value = props.modificationData.project;
    status.value = props.modificationData.status;
    d6_date.value = returnDate(props.modificationData.d6_date);
    cw_date.value = returnDate(props.modificationData.cw_date);
    actions.value = props.modificationData.actions;
    est_cost.value = Number(props.modificationData.est_cost);
    final_cost.value = Number(props.modificationData.final_cost);
    description.value = props.modificationData.description;
    wo_code.value = props.modificationData.wo_code;
    reported.value = props.modificationData.reported;
    operation_zone.value = props.modificationData.oz;
    action_owner.value = props.modificationData.action_owner;
    reported_at.value = returnDate(props.modificationData.reported_at);
  }
});

const goBack = () => {
  router.go(-1);
};

const goToQuotation = () => {
  router.push(`/quotation/modification/${props.modificationData.id}`);
};

const rules = computed(() => ({
  subcontractor: {
    required: helpers.withMessage("Subcontractor is required", required),
  },
  request_date: {
    required: helpers.withMessage("Request date is required", required),
  },
  cw_date: {
    requiredIf: helpers.withMessage(
      "C.W date is required",
      requiredIf(status.value == "done")
    ),
    minValue: helpers.withMessage(
      "must be after request date",
      minValue(request_date.value)
    ),
  },
  d6_date: {
    requiredIf: helpers.withMessage(
      "D6 date is required",
      requiredIf(status.value == "done")
    ),
    minValue: helpers.withMessage(
      "must be after request date",
      minValue(request_date.value)
    ),
  },
  requester: {
    required: helpers.withMessage("Requester is required", required),
  },
  project: {
    required: helpers.withMessage("project is required", required),
  },
  status: {
    required: helpers.withMessage("status is required", required),
  },
  actions: {
    required: helpers.withMessage("Action is required", required),
  },
  description: {
    requiredIf: helpers.withMessage(
      "description is required",
      requiredIf(actions.value != null)
    ),
  },
  final_cost: {
    requiredIf: helpers.withMessage(
      "Cost is required",
      requiredIf(status.value == "done")
    ),
  },
  reported: {
    mustBeYes: helpers.withMessage(
      "Must be 'Yes' along with a Reporting date",
      mustBeYes
    ),
  },
  reported_at: {
    requiredIf: helpers.withMessage(
      "Reporting date is required",
      requiredIf(reported.value == "Yes")
    ),
    minValue: helpers.withMessage(
      "must be after request date",
      minValue(request_date.value)
    ),
  },
}));

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

const v$ = useVuelidate(rules, {
  subcontractor,
  request_date,
  requester,
  project,
  status,
  d6_date,
  actions,
  final_cost,
  cw_date,
  description,
  reported_at,
  reported,
});

const formData = () => {
  return {
    subcontractor: subcontractor.value,
    requester: requester.value,
    request_date: convertDate(request_date.value),
    cw_date: convertDate(cw_date.value),
    d6_date: convertDate(d6_date.value),
    est_cost: est_cost.value,
    final_cost: final_cost.value,
    project: project.value,
    status: status.value,
    actions: actions.value,
    description: description.value,
    reported: reported.value,
    reported_at: convertDate(reported_at.value),
  };
};
const updateModification = () => {
  // console.log(props.modificationData);

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

      let data = formData();
      console.log(data);

      Modifications.updateModification(data, props.modificationData.id)

        .then((response) => {
          toast.add({
            severity: "success",
            summary: "Success Message",
            detail: "Updated Successfully",
            life: 3000,
          });
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status == 422) {
            let errors = error.response.data.errors;
            showErrors(errors);
          }
        });
    },
    reject: () => {
      confirm.close();
    },
  });
};

const insertNewModification = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    return;
  }

  // let data = {
  //   site_code: props.siteCode,
  //   subcontractor: subcontractor.value,
  //   requester: requester.value,
  //   request_date: convertDate(request_date.value),
  //   cw_date: convertDate(cw_date.value),
  //   d6_date: convertDate(d6_date.value),
  //   est_cost: est_cost.value,
  //   final_cost: final_cost.value,
  //   project: project.value,
  //   status: status.value,
  //   actions: actions.value,
  //   description: description.value,
  //   reported: reported.value,
  //   reported_at: convertDate(reported_at.value),
  // };

  let data = formData();

  data.site_code = props.siteCode;

  // console.log(data)
  Modifications.insertNewModification(data)

    .then((response) => {
      toast.add({
        severity: "success",
        summary: "Success Message",
        detail: "inserted Successfully",
        life: 3000,
      });
      router.push(
        `/modifications/sitemodifications/${props.siteCode}/${props.siteName}`
      );
    })
    .catch((error) => {
      console.log(error);
      if (error.response.status == 422) {
        let errors = error.response.data.errors;

        showErrors(errors);
      }
    });
};

const showErrors = (errors) => {
  if (errors.reported) {
    errors.reported.forEach((element) => {
      toast.add({
        severity: "error",
        summary: "Failed",
        detail: element,
        life: 3000,
      });
    });
  }
  if (errors.est_cost) {
    errors.est_cost.forEach((element) => {
      toast.add({
        severity: "error",
        summary: "Failed",
        detail: element,
        life: 3000,
      });
    });
  }
  if (errors.description) {
    errors.description.forEach((element) => {
      toast.add({
        severity: "error",
        summary: "Failed",
        detail: element,
        life: 3000,
      });
    });
  }
  if (errors.final_cost) {
    errors.final_cost.forEach((element) => {
      toast.add({
        severity: "error",
        summary: "Failed",
        detail: element,
        life: 3000,
      });
    });
  }
  if (errors.cw_date) {
    errors.cw_date.forEach((element) => {
      toast.add({
        severity: "error",
        summary: "Failed",
        detail: element,
        life: 3000,
      });
    });
  }
  if (errors.d6_date) {
    errors.d6_date.forEach((element) => {
      toast.add({
        severity: "error",
        summary: "Failed",
        detail: element,
        life: 3000,
      });
    });
  }
  if (errors.subcontractor) {
    errors.subcontractor.forEach((element) => {
      toast.add({
        severity: "error",
        summary: "Failed",
        detail: element,
        life: 3000,
      });
    });
  }
  if (errors.project) {
    errors.project.forEach((element) => {
      toast.add({
        severity: "error",
        summary: "Failed",
        detail: element,
        life: 3000,
      });
    });
  }
  if (errors.status) {
    errors.status.forEach((element) => {
      toast.add({
        severity: "error",
        summary: "Failed",
        detail: element,
        life: 3000,
      });
    });
  }
  if (errors.requester) {
    errors.requester.forEach((element) => {
      toast.add({
        severity: "error",
        summary: "Failed",
        detail: element,
        life: 3000,
      });
    });
  }
  if (errors.request_date) {
    errors.request_date.forEach((element) => {
      toast.add({
        severity: "error",
        summary: "Failed",
        detail: element,
        life: 3000,
      });
    });
  }
  if (errors.actions) {
    errors.actions.forEach((element) => {
      toast.add({
        severity: "error",
        summary: "Failed",
        detail: element,
        life: 3000,
      });
    });
  }

  if (errors.reported_at) {
    errors.reported_at.forEach((element) => {
      toast.add({
        severity: "error",
        summary: "Failed",
        detail: element,
        life: 3000,
      });
    });
  }
};

const deleteModification = () => {
  confirm.require({
    group: "yesNo",
    message: "Are you sure you want to proceed?",
    header: "Confirmation",
    icon: "pi pi-exclamation-triangle",
    position: "center",
    rejectProps: {
      label: "No",

      severity: "success",
    },
    acceptProps: {
      label: "Yes",
      severity: "danger",
    },
    accept: () => {
      confirm.close();
    

      let data = {
        id: props.modificationData.id,
      };

      Modifications.deleteModification(data)

        .then((response) => {
          if (response.data.message == "Deleted Successfully") {
            toast.add({
              severity: "success",
              summary: "Success Message",
              detail: "Deleted Successfully",
              life: 3000,
            });
           router.go(-1);
          }
        })
        .catch((error) => {});
    },
    reject: () => {
      confirm.close();
      isRowSelected.value = false;
      //callback to execute when user rejects the action
    },
  });
};
const goToUpdate = () => {
  router.push(
    `/modification/update/${props.modificationData.id}`
  );
};
</script>

<style lang="scss" scoped></style>
