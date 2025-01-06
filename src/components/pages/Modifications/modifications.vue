<template>
  <div v-if="serverError">
    <p style="color: red">{{ serverError }}</p>
  </div>
  <section id="analysis" class="w-screen-2xl px-10 py-20">
    <Card class="max-w-sm md:max-w-screen-sm mx-auto">
      <template #content>
        <div class="w-full">
          <h5
            class="font-Signika font-bold text-font-main-color text-center text-lg mb-5"
          >
            Modifications BY Category
          </h5>
        </div>
        <form @submit.prevent="submitFilterForm">
          <div class="grid grid-cols-2 gap-4">
            <div class="col-span-2 md:col-span-1">
              <div class="flex-auto">
                <Select
                  fluid
                  @change="submitColumn($event)"
                  v-model="column"
                  placeholder="Filter By..."
                  :options="columns"
                  id="column"
                >
                </Select>
              </div>
            </div>
            <div class="col-span-2 md:col-span-1">
              <div class="flex-auto">
                <Select
                  fluid
                  v-model="columnValue"
                  :options="columnValues"
                  id="columnValue"
                >
                </Select>
              </div>
            </div>
          </div>
          <div class="w-full flex justify-center mt-5">
            <Button
              :disabled="disabled"
              class="block"
              type="submit"
              label="Submit"
              severity="success"
              rounded
              raised
            />
          </div>
        </form>
      </template>
    </Card>
  </section>

  <section id="searchpricelist" class="w-screen-2xl px-10 py-20">
    <Card class="max-w-sm md:max-w-screen-sm mx-auto">
      <template #content>
        <div class="w-full">
          <h5
            class="font-Signika font-bold text-font-main-color text-center text-lg mb-5"
          >
            Search Price List
          </h5>
        </div>
        <form @submit.prevent="submitPriceListSearchForm">
          <div class="w-1/2 mx-auto">
            <InputGroup>
              <Button label="Search" type="submit" severity="success" />
              <InputText
                placeholder="Keyword/item No."
                v-model.trim="searchPriceList"
                :invalid="val$.searchPriceList.$errors.length > 0"
              />
            </InputGroup>
            <div v-if="val$.searchPriceList.$error">
              <validationErrorMessage :errors="val$.searchPriceList.$errors" />
            </div>
            <div class="flex flex-wrap gap-4 mt-3">
              <div class="flex items-center gap-2">
                <RadioButton
                  v-model="searchBy"
                  inputId="ingredient1"
                  name="pizza"
                  value="item"
                />
                <label
                  for="ingredient1"
                  class="text-font-main-color font-medium text-sm uppercase font-Signika"
                  >Item No.</label
                >
              </div>
              <div class="flex items-center gap-2">
                <RadioButton
                  v-model="searchBy"
                  inputId="ingredient2"
                  name="pizza"
                  value="description"
                />
                <label
                  for="ingredient2"
                  class="text-font-main-color font-medium text-sm uppercase font-Signika"
                  >Item Description</label
                >
              </div>
            </div>
          </div>
        </form>
      </template>
    </Card>
  </section>

  <section id="dates" class="w-screen-2xl px-10 py-20">
    <Card class="max-w-sm md:max-w-screen-sm mx-auto">
      <template #content>
        <div class="w-full">
          <h5
            class="font-Signika font-bold text-font-main-color text-center text-lg mb-5"
          >
            Modifications BY Dates
          </h5>
        </div>

        <form @submit.prevent="submitDateForm">
          <div class="grid grid-cols-2 gap-4">
            <div class="col-span-2 md:col-span-2">
              <div class="flex-auto w-1/2 mx-auto">
                <Select
                  fluid
                  :invalid="v$.dateType.$errors.length > 0"
                  v-model="dateType"
                  placeholder="Filter By... date"
                  :options="datesOptions"
                  id="date"
                  optionLabel="name"
                  optionValue="value"
                >
                </Select>
              </div>
              <div v-if="v$.dateType.$error">
                <validationErrorMessage :errors="v$.dateType.$errors" />
              </div>
            </div>
            <div class="col-span-2 md:col-span-1">
              <div class="flex-auto">
                <Datepicker
                  v-model="date_from"
                  :invalid="v$.date_from.$errors.length > 0"
                  placeholder="From"
                  id="d6_date"
                  dateFormat="yy-mm-dd"
                  showIcon
                  :showOnFocus="false"
                  fluid
                />
              </div>
              <div v-if="v$.date_from.$error">
                <validationErrorMessage :errors="v$.date_from.$errors" />
              </div>
            </div>
            <div class="col-span-2 md:col-span-1">
              <div class="flex-auto">
                <Datepicker
                  v-model="date_to"
                  :invalid="v$.date_to.$errors.length > 0"
                  placeholder="To"
                  id="to_date"
                  dateFormat="yy-mm-dd"
                  showIcon
                  :showOnFocus="false"
                  fluid
                />
              </div>
              <div v-if="v$.date_to.$error">
                <validationErrorMessage :errors="v$.date_to.$errors" />
              </div>
            </div>
          </div>
          <div class="w-full flex justify-center mt-5">
            <Button
              class="block"
              type="submit"
              label="Submit"
              severity="success"
              rounded
              raised
            />
          </div>
        </form>
      </template>
    </Card>
  </section>
</template>

<script setup>
import Button from "primevue/button";
import Modifications from "../../../apis/Modifications";
import Card from "primevue/card";
import { computed, ref } from "vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { email, required, requiredIf, minValue } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";
import validationErrorMessage from "../../helpers/validationErrorMessage.vue";
import { useToast } from "primevue/usetoast";
import { useDialog } from "primevue/usedialog";
import PriceListTable from "../../helpers/Modification/PriceListTable.vue";

const dialog = useDialog();
const toast = useToast();
const router = useRouter();

const column = ref(null);
const columnValue = ref(null);
const columns = ref(null);
const columnValues = ref(null);
const status = ref(null);
const subcontractor = ref(null);
const project = ref(null);
const requester = ref(null);
const serverError = ref(null);
const actions = ref(null);
const reported = ref(null);

const date_from = ref(null);
const date_to = ref(null);

const searchPriceList = ref();

const dateType = ref(null);
const searchBy = ref("item");

const datesOptions = [
  { name: "D6 Date", value: "d6_date" },
  { name: "CW Date", value: "cw_date" },
  { name: "Request Date", value: "request_date" },
];

const datesRegex = helpers.regex(/^d6_date|cw_date|request_date$/);
const searchPriceListRegex = helpers.regex(/^.{1,50}$/);

const disabled = computed(() => {
  if (!column.value || !columnValue.value) {
    return true;
  }
  if (column.value && columnValue.value) {
    return false;
  }
});

onMounted(() => {
  getModificationAnalysis();
});

const submitColumn = (e) => {
  column.value = e.value;

  if (column.value == "status") {
    columnValues.value = status.value;
  } else if (column.value == "subcontractor") {
    columnValues.value = subcontractor.value;
  } else if (column.value == "requester") {
    columnValues.value = requester.value;
  } else if (column.value == "project") {
    columnValues.value = project.value;
  } else if (column.value == "reported") {
    columnValues.value = reported.value;
  } else if (column.value == "actions") {
    columnValues.value = actions.value;
  }
};

const getModificationAnalysis = () => {
  Modifications.getModificationAnalysis()

    .then((response) => {
      status.value = response.data.index.status;
      subcontractor.value = response.data.index.subcontractor;
      project.value = response.data.index.project;
      requester.value = response.data.index.requester;
      actions.value = response.data.index.actions;
      reported.value = response.data.index.reported;
      columns.value = [
        "status",
        "subcontractor",
        "requester",
        "project",
        "actions",
        "reported",
      ];
    })
    .catch((error) => {
      if (error.response.status == 500) {
        serverError.value = error.response.data.message;
      }
    });
};

const submitFilterForm = () => {
  router.push(`/modifications/index/${column.value}/${columnValue.value}`);
};

const rules = computed(() => ({
  date_from: {
    requiredIf: helpers.withMessage(
      " 'From' date is required",
      requiredIf(date_to.value == "done")
    ),
  },
  date_to: {
    requiredIf: helpers.withMessage(
      "'To' date is required",
      requiredIf(date_from.value == null)
    ),
    minValue: helpers.withMessage(
      '"To" date must be after "From" date',
      minValue(new Date(date_from.value))
    ),
  },
  dateType: {
    required: helpers.withMessage("Date type is required", required),
    datesRegex: helpers.withMessage("Date Type format is invalid", datesRegex),
  },
}));

const searchPriceListRules = computed(() => ({
  searchPriceList: {
    required: helpers.withMessage(" item No. or keyword is required", required),
    searchPriceListRegex: helpers.withMessage(
      "invalid search format",
      searchPriceListRegex
    ),
  },
}));

const v$ = useVuelidate(rules, {
  date_from,
  date_to,
  dateType,
});

const val$ = useVuelidate(searchPriceListRules, {
  searchPriceList,
});

const convertDate = (date) => {
  if (date) {
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
  }
  return "no date";
};

const submitDateForm = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    return;
  }

  date_from.value = convertDate(date_from.value);
  date_to.value = convertDate(date_to.value);
  router.push(
    `/modifications/filterdates/${dateType.value}/${date_from.value}/${date_to.value}`
  );
};
const submitPriceListSearchForm = async () => {
  const isFormCorrect = await val$.value.$validate();
  if (!isFormCorrect) {
    return;
  }
  let data = {
    search: searchPriceList.value,
    searchBy: searchBy.value,
  };
  Modifications.searchPriceList(data).then((response) => {
    console.log(response.data);
    if (response.data.message == "No data found") {
      toast.add({
        severity: "error",
        summary: "Error Message",
        detail: "No data Found",
        life: 3000,
      });
    } else {
      dialog.open(PriceListTable, {
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
          priceListItems: response.data.priceList
        },
      });
    }
  });
};
</script>

<style lang="scss" scoped></style>
