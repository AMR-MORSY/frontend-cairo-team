<template>

  <div class="px-5">
    <Card class="max-w-screen-md mx-auto my-20">
      <template #header>
        <p
          class="text-xl font-extrabold mt-8 text-font-main-color w-full text-center font-Signika"
        >
          New Invoice
        </p>
      </template>
      <template #content>
        <form
          id="invoice"
          @submit.prevent="submitInvoice"
          enctype="multipart/form-data"
        >
          <div class="flex justify-evenly gap-1 flex-wrap">
            <div class="flex flex-col w-72 shrink-0">
              <Datepicker
                fluid
                v-model="invoice_date"
                placeholder="Invoice Date:"
                id="d6_date"
                dateFormat="yy-mm-dd"
                showIcon
                :showOnFocus="false"
              />
              <div v-if="v$.invoice_date.$error">
                <validationErrorMessage :errors="v$.invoice_date.$errors" />
              </div>
            </div>
            <div class="flex flex-col w-72 mt-1 shrink-0">
              <Select
                fluid
                id="Subcontractor"
                v-model="subcontractor"
                :invalid="v$.subcontractor.$errors.length > 0"
                :options="subcontractors"
                optionLabel="name"
                optionValue="id"
                placeholder="Subcontractor"
              >
              </Select>

              <div v-if="v$.subcontractor.$error">
                <validationErrorMessage :errors="v$.subcontractor.$errors" />
              </div>
            </div>
            <div class="flex flex-col w-72 mt-1 shrink-0">
              <InputNumber
                fluid
                v-model="invoice_number"
                :invalid="v$.invoice_number.$errors.length > 0"
                id="invoice_number"
                placeholder="Invoice No."
              />

              <div v-if="v$.invoice_number.$error">
                <validationErrorMessage :errors="v$.invoice_number.$errors" />
              </div>
            </div>
            <div class="flex flex-col w-72 mt-1 shrink-0">
              <InputNumber
                fluid
                v-model="po_number"
                :invalid="v$.po_number.$errors.length > 0"
                id="po_number"
                placeholder="Po No."
              />

              <div v-if="v$.po_number.$error">
                <validationErrorMessage :errors="v$.po_number.$errors" />
              </div>
            </div>

            <div class="flex flex-col w-72 mt-1 shrink-0">
              <div class="flex justify-start">
                <FileUpload
                  ref="invoice"
                  mode="basic"
                  accept=".pdf"
                  :maxFileSize="3000000"
                />
              </div>
              <div v-if="v$.invoice.$error">
                <validationErrorMessage :errors="v$.invoice.$errors" />
              </div>
            </div>
            <div class="flex flex-col w-72 mt-1 shrink-0">
              <div class="card flex justify-end col-span-2">
                <Button
                  type="button"
                  icon="pi pi-share-alt"
                  label="WO code"
                  severity="primary"
                  @click="toggle"
                />

                <Popover ref="op">
                  <div class="flex flex-col gap-4 w-[25rem]">
                    <form @submit.prevent="searchWorkOrder">
                      <div>
                        <span class="font-medium block mb-2">Search By WO</span>
                        <InputGroup>
                          <InputText
                            v-model="searchWO"
                            :invalid="vv$.searchWO.$errors.length > 0"
                          />
                          <Button
                            label="Search"
                            icon="pi pi-share-alt"
                            severity="danger"
                            type="submit"
                          ></Button>
                        </InputGroup>
                      </div>
                      <div v-if="vv$.searchWO.$error">
                        <validationErrorMessage
                          :errors="vv$.searchWO.$errors"
                        />
                      </div>
                    </form>
                  </div>
                </Popover>
              </div>
              <div v-if="v$.workOrders.$error" class="flex justify-end">
                <validationErrorMessage :errors="v$.workOrders.$errors" />
              </div>
            </div>

            <div class="flex flex-col w-full mt-1 shrink-0">
              <PickList
                v-model="pickList"
                breakpoint="1400px"
                @move-to-target="getPickListDeletedItems"
                @move-to-source="getPickListAddedItems"
              >
                <template #sourceheader>
                  <p
                    class="text-center font-Signika font-semibold text-font-main-color"
                  >
                    Work Orders
                  </p>
                </template>
                <template #targetheader>
                  <p
                    class="text-center font-Signika font-semibold text-font-main-color"
                  >
                    Deleted W.O
                  </p>
                </template>
                <template #option="{ option, selected }">
                  <p>
                    {{ option }}
                  </p>
                </template>
              </PickList>
            </div>
            <div class="flex flex-col w-72 mt-1 shrink-0">
              <InputNumber
                fluid
                v-model="invoice_amount"
                :invalid="v$.invoice_amount.$errors.length > 0"
                id="invoice_amount"
                :min="0"
                placeholder="Invoice Amount"
                :minFractionDigits="2"
                :maxFractionDigits="12"
              />

              <div v-if="v$.invoice_amount.$error">
                <validationErrorMessage :errors="v$.invoice_amount.$errors" />
              </div>
            </div>

            <div class="flex flex-col w-72 mt-1 shrink-0">
              <div class="flex flex-wrap gap-4">
                <div class="flex items-center gap-2">
                  <RadioButton
                    v-model="activity"
                    inputId="ingredient1"
                    name="pizza"
                    value="install"
                  />
                  <label
                    for="ingredient1"
                    class="font-extrabold text-font-main-color w-full text-center font-Signika"
                    >Install</label
                  >
                </div>
                <div class="flex items-center gap-2">
                  <RadioButton
                    v-model="activity"
                    inputId="ingredient2"
                    name="pizza"
                    value="supply"
                  />
                  <label
                    for="ingredient2"
                    class="font-extrabold text-font-main-color w-full text-center font-Signika"
                    >Supply</label
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="w-full flex justify-center mt-8">
            <Button
              class="block"
              severity="info"
              raised
              type="submit"
              label="Submit"
            />
          </div>
        </form>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { useToast } from "primevue/usetoast";
import { computed } from "vue";

import { ref, onMounted } from "vue";
import { useConfirm } from "primevue/useconfirm";

import { required, requiredIf } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";
import Modifications from "../../../apis/Modifications";
import validationErrorMessage from "../../helpers/validationErrorMessage.vue";
import ModificationTable from "../../helpers/Modification/ModificationTable.vue";
import { useDialog } from "primevue/usedialog";
import InputNumber from "primevue/inputnumber";
const toast = useToast();
const confirm = useConfirm();
const dialog = useDialog();
const invoice = ref(null);
const op = ref();
const invoice_date = ref();
const subcontractor = ref();
const subcontractors = ref([]);
const invoice_number = ref();
const invoice_amount = ref();

const po_number = ref();
const searchWO = ref();
const workOrders = ref([]);
const pickListData = computed(() => workOrders.value);
const pickList = ref([pickListData.value, []]);
const modification = ref();
const activity = ref("install");

const mustIncludeFile = (value) => {
  if (value.files[0]) {
    return true;
  }
  return false;
};

const areWOAvailable = (value) => {
  if (value.length > 0) {
    return true;
  }
  return false;
};

const toggle = (event) => {
  op.value.toggle(event);
};

const nameReg = helpers.regex(/^(cn|CN|gz|GZ|CE|ce|cs|CS)[-]\d{3,8}$/);

const WORule = computed(() => ({
  searchWO: {
    required: helpers.withMessage("Work order code is required", required),

    nameReg: helpers.withMessage(
      "please enter a valid work order code",
      nameReg
    ),
  },
}));

const vv$ = useVuelidate(WORule, {
  searchWO,
});

const searchMultiArray = (arr, target) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === target) {
        return { row: i, col: j }; // Return the position of the target
      }
    }
  }
  return null; // Return null if the target is not found
};

const getModificationsByWO = (wo) => {
  Modifications.getModificationsFilteredByWO(wo)
    .then((response) => {
      console.log(response);

      if (response.data.message == "success") {
        modification.value = response.data.modification;

        dialog.open(ModificationTable, {
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
            modification: modification.value,
          },
          onClose: (opt) => {
            if (opt.data.selected == true) {
              const includes = searchMultiArray(pickList.value, wo);
              if (includes == null) {
                workOrders.value.push(wo);
              } else {
                toast.add({
                  severity: "error",
                  summary: "Error Message",
                  detail: "already exists",
                  life: 3000,
                });
              }
            }
          },
        });
      } else {
        confirm.require({
          group: "info",
          message: "Work order does not exist",
          header: "Confirmation",
          icon: "pi pi-exclamation-triangle",
          position: "top",

          acceptProps: {
            label: "Ok",
            severity: "success",
          },
          accept: () => {
            searchWO.value = null;
            confirm.close();
          },
        });
      }
    })
    .catch((error) => {});
};
const searchWorkOrder = async () => {
  const isFormCorrect = await vv$.value.$validate();
  if (!isFormCorrect) return;
  getModificationsByWO(searchWO.value);
};
const rules = computed(() => ({
  subcontractor: {
    required: helpers.withMessage("Subcontractor is required", required),
  },
  invoice_date: {
    required: helpers.withMessage("Invoice date is required", required),
  },
  invoice_number: {
    required: helpers.withMessage("Invoice No. is required", required),
  },
  po_number: {
    required: helpers.withMessage("PO No. is required", required),
  },
  invoice_amount: {
    required: helpers.withMessage("Invoice amount is required", required),
  },

  invoice: {
    mustIncludeFile: helpers.withMessage(
      "Invoice is required",
      mustIncludeFile
    ),
  },
  workOrders: {
    areWOAvailable: helpers.withMessage("At least one WO", areWOAvailable),
  },
}));

const v$ = useVuelidate(rules, {
  subcontractor,
  invoice_date,
  invoice_number,
  po_number,

  invoice,
  workOrders,
  invoice_amount,
});

onMounted(() => {
  getModificationAnalysis();
});

const getModificationAnalysis = () => {
  Modifications.getModificationAnalysis().then((response) => {
    subcontractors.value = response.data.index.subcontractor;
  });
};

const getPickListDeletedItems = (event) => {
  let newArray = pickList.value.filter(
    (item) =>
      !event.items.some(
        (element) => JSON.stringify(element) === JSON.stringify(item)
      )
  );

  workOrders.value = newArray[0];
};

const getPickListAddedItems = (event) => {
  let includes = false;
  event.items.forEach((item) => {
    includes = workOrders.value.includes(item);
    if (!includes) {
      workOrders.value.push(item);
    }
  });
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

const submitInvoice = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) return;
  let data = {
    subcontractor_id: subcontractor.value,
    invoice: invoice.value.files[0],
    invoice_date: convertDate(invoice_date.value),
    invoice_number: invoice_number.value,
    work_orders: workOrders.value,
    invoice_amount: invoice_amount.value,

    po_number: po_number.value,
    activity: activity.value,
  };

  Modifications.uploadInvoice(data).then((response) => {
    console.log(response);
  });

  console.log(data);
};
</script>
