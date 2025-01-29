<template>


<section id="dates" class="w-screen-2xl px-10 py-40">
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


const dialog = useDialog();
const toast = useToast();
const router = useRouter();


const datesRegex = helpers.regex(/^d6_date|cw_date|request_date$/);
const date_from = ref(null);
const date_to = ref(null);
const dateType = ref(null);

const datesOptions = [
  { name: "D6 Date", value: "d6_date" },
  { name: "CW Date", value: "cw_date" },
  { name: "Request Date", value: "request_date" },
];

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



const v$ = useVuelidate(rules, {
  date_from,
  date_to,
  dateType,
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


</script>