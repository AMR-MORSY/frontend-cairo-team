<template>
  

  <TransitionCards :cards="cards" />
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
import TransitionCards from "../../helpers/TransitionCards.vue";

const dialog = useDialog();
const toast = useToast();
const router = useRouter();

const cards = ref([
  { id: 1, icon: "search", path: "Category" },
  { id: 2, icon: "search", path: "Date" },
  { id: 3, icon: "search", path: "Work Order" },
  { id: 4, icon: "search", path: "Price List" },
  { id: 5, icon: "search", path: "Invoices" },
 ]);

// const column = ref(null);
// const columnValue = ref(null);
// const columns = ref(null);
// const columnValues = ref(null);
// const status = ref(null);
// const subcontractor = ref(null);
// const project = ref(null);
// const requester = ref(null);
// const serverError = ref(null);
// const actions = ref(null);
// const reported = ref(null);

// const date_from = ref(null);
// const date_to = ref(null);

// const searchPriceList = ref();

// const dateType = ref(null);
// const searchBy = ref("item");

// const datesOptions = [
//   { name: "D6 Date", value: "d6_date" },
//   { name: "CW Date", value: "cw_date" },
//   { name: "Request Date", value: "request_date" },
// ];

// const datesRegex = helpers.regex(/^d6_date|cw_date|request_date$/);
// const searchPriceListRegex = helpers.regex(/^.{1,50}$/);

// const disabled = computed(() => {
//   if (!column.value || !columnValue.value) {
//     return true;
//   }
//   if (column.value && columnValue.value) {
//     return false;
//   }
// });

// onMounted(() => {
//   getModificationAnalysis();
// });

// const submitColumn = (e) => {
//   column.value = e.value;

//   if (column.value == "status") {
//     columnValues.value = status.value;
//   } else if (column.value == "subcontractor") {
//     columnValues.value = subcontractor.value;
//   } else if (column.value == "requester") {
//     columnValues.value = requester.value;
//   } else if (column.value == "project") {
//     columnValues.value = project.value;
//   } else if (column.value == "reported") {
//     columnValues.value = reported.value;
//   } else if (column.value == "actions") {
//     columnValues.value = actions.value;
//   }
// };

// const getModificationAnalysis = () => {
//   Modifications.getModificationAnalysis()

//     .then((response) => {
//       status.value = response.data.index.status;
//       subcontractor.value = response.data.index.subcontractor;
//       project.value = response.data.index.project;
//       requester.value = response.data.index.requester;
//       actions.value = response.data.index.actions;
//       reported.value = response.data.index.reported;
//       columns.value = [
//         "status",
//         "subcontractor",
//         "requester",
//         "project",
//         "actions",
//         "reported",
//       ];
//     })
//     .catch((error) => {
//       if (error.response.status == 500) {
//         serverError.value = error.response.data.message;
//       }
//     });
// };

// const submitFilterForm = () => {
//   router.push(`/modifications/index/${column.value}/${columnValue.value}`);
// };

// const rules = computed(() => ({
//   date_from: {
//     requiredIf: helpers.withMessage(
//       " 'From' date is required",
//       requiredIf(date_to.value == "done")
//     ),
//   },
//   date_to: {
//     requiredIf: helpers.withMessage(
//       "'To' date is required",
//       requiredIf(date_from.value == null)
//     ),
//     minValue: helpers.withMessage(
//       '"To" date must be after "From" date',
//       minValue(new Date(date_from.value))
//     ),
//   },
//   dateType: {
//     required: helpers.withMessage("Date type is required", required),
//     datesRegex: helpers.withMessage("Date Type format is invalid", datesRegex),
//   },
// }));

// const searchPriceListRules = computed(() => ({
//   searchPriceList: {
//     required: helpers.withMessage(" item No. or keyword is required", required),
//     searchPriceListRegex: helpers.withMessage(
//       "invalid search format",
//       searchPriceListRegex
//     ),
//   },
// }));

// const v$ = useVuelidate(rules, {
//   date_from,
//   date_to,
//   dateType,
// });

// const val$ = useVuelidate(searchPriceListRules, {
//   searchPriceList,
// });

// const convertDate = (date) => {
//   if (date) {
//     var yyyy = date.getFullYear().toString();
//     var mm = (date.getMonth() + 1).toString();
//     var dd = date.getDate().toString();

//     var mmChars = mm.split("");
//     var ddChars = dd.split("");

//     return (
//       yyyy +
//       "-" +
//       (mmChars[1] ? mm : "0" + mmChars[0]) +
//       "-" +
//       (ddChars[1] ? dd : "0" + ddChars[0])
//     );
//   }
//   return "no date";
// };

// const submitDateForm = async () => {
//   const isFormCorrect = await v$.value.$validate();
//   if (!isFormCorrect) {
//     return;
//   }

//   date_from.value = convertDate(date_from.value);
//   date_to.value = convertDate(date_to.value);
//   router.push(
//     `/modifications/filterdates/${dateType.value}/${date_from.value}/${date_to.value}`
//   );
// };
// const submitPriceListSearchForm = async () => {
//   const isFormCorrect = await val$.value.$validate();
//   if (!isFormCorrect) {
//     return;
//   }
//   let data = {
//     search: searchPriceList.value,
//     searchBy: searchBy.value,
//   };
//   Modifications.searchPriceList(data).then((response) => {
//     console.log(response.data);
//     if (response.data.message == "No data found") {
//       toast.add({
//         severity: "error",
//         summary: "Error Message",
//         detail: "No data Found",
//         life: 3000,
//       });
//     } else {
//       dialog.open(PriceListTable, {
//         props: {
//           style: {
//             width: "50vw",
//           },
//           breakpoints: {
//             "960px": "75vw",
//             "640px": "90vw",
//           },

//           modal: true,
//         },

//         data: {
//           priceListItems: response.data.priceList,
//         },
//       });
//     }
//   });
// };
</script>

<style lang="scss" scoped></style>
