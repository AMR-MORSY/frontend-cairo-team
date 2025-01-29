<template>
 <!-- <section id="searchpricelist" class="w-screen-2xl px-10 py-20">
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
  </section> -->

  <PriceListSearchForm action="search"/>
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
import PriceListSearchForm from "../../helpers/Modification/PriceListSearchForm.vue";



const dialog = useDialog();
const toast = useToast();
const router = useRouter();


const searchPriceList = ref();


const searchBy = ref("item");


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

const val$ = useVuelidate(searchPriceListRules, {
  searchPriceList,
});

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
          action:"search"
        },
      });
    }
  });
};
</script>