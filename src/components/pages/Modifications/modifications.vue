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
  {id:6,icon:"search",path:'Dashboard'}
 ]);

</script>

<style lang="scss" scoped></style>
