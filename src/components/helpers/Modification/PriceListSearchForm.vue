<template>
  <div class="w-full">
    <p
      class="font-Signika font-bold text-font-main-color uppercase text-center pt-5 mb-5"
    >
      Search Price List
    </p>
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
<!-- 
  <DataTable
    :value="selectedItems"
    scrollable
    :paginator="true"
    :rows="5"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[5, 10, 15]"
    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
    class="text-sm"
    tableStyle="min-width: 50rem"
    v-if="selectedItems"
  >
    <Column selectionMode="multiple"></Column>
    <Column field="item" header="#"></Column>
    <Column field="description" header="Description"></Column>
    <Column field="unit" header="Unit"></Column>
    <Column field="supply" header="Supply"></Column>
    <Column field="installation" header="Installation"></Column>
    <Column field="sup_inst" header="S&I"></Column>
    <Column field="type" header="Type"></Column>
  </DataTable> -->
  <ItemsInsertion action="priceListItemsInsertion" :items="selectedItems" :modification_id="modification_id" :quotation_id="quotation_id"/>

</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Modifications from "../../../apis/Modifications";
import { email, required, requiredIf, minValue } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";
import validationErrorMessage from "../../helpers/validationErrorMessage.vue";
import { useToast } from "primevue/usetoast";
import { useDialog } from "primevue/usedialog";
import PriceListTable from "./PriceListTable.vue";
import ItemsInsertion from "./ItemsInsertion.vue";
import { inject } from "vue";


const dialogRef = inject('dialogRef');

const modification_id=dialogRef.value.data.modification_id;

const quotation_id=dialogRef.value.data.quotation_id;

const toast = useToast();

const dialog = useDialog();

const searchPriceListRegex = helpers.regex(/^.{1,50}$/);

const searchPriceListRules = computed(() => ({
  searchPriceList: {
    required: helpers.withMessage(" item No. or keyword is required", required),
    searchPriceListRegex: helpers.withMessage(
      "invalid search format",
      searchPriceListRegex
    ),
  },
}));

const searchPriceList = ref();

const selectedItems = ref();

const val$ = useVuelidate(searchPriceListRules, {
  searchPriceList,
});

const searchBy = ref("item");

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
          priceListItems: response.data.priceList,
        },
        onClose: (opt) => {
          selectedItems.value = opt.data;
        },
      });
    }
  });
};
</script>
