<template>
  <div class="w-full py-40">
    <p
      class="font-Signika font-bold text-font-main-color uppercase text-center pt-5 mb-5"
    >
      Search Price List
    </p>
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
  </div>

  <ItemsInsertion
    action="priceListItemsInsertion"
    :items="selectedItems"
    :modification_id="modification_id"
    :quotation_id="quotation_id"
    v-if="selectedItems.length > 0"
  />
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

const toast = useToast();

const dialog = useDialog();
let dialogRef = "";

const props = defineProps(["action"]);

const displayAddButton = ref();

const modification_id = ref();

const quotation_id = ref();

onMounted(() => {
  if (inject("dialogRef")) {
    dialogRef = inject("dialogRef");

    modification_id.value = dialogRef.value.data.modification_id;
    quotation_id.value = dialogRef.value.data.quotation_id;
    displayAddButton.value = dialogRef.value.data.displayAddButton;
  }

  if (props.displayAddButton) {
    displayAddButton.value = props.displayAddButton;
  }
});

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

const selectedItems = ref([]);

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
            width: "60vw",
          },
          breakpoints: {
            "960px": "75vw",
            "640px": "90vw",
          },

          modal: true,
        },

        data: {
          priceListItems: response.data.priceList,
          displayAddButton: displayAddButton.value,
        },
        onClose: (opt) => {
          if (displayAddButton.value) {
            opt.data.forEach((element) => {
              selectedItems.value.push(element);
            });
          }
        },
      });
    }
  });
};
</script>
