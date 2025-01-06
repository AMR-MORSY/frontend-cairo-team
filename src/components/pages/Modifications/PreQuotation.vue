<template>
  <div class="w-screen-2xl px-10 py-20" v-if="!isQuotationFound">

    <Card class="max-w-sm md:max-w-screen-sm mx-auto"  >
      <template #content>
        <h2
          class="font-Signika text-center text-red-500 text-2xl font-extrabold uppercase"
        >
          No Quotation
      </h2>
        <div class="w-full">
          <p
            class="font-Signika font-bold text-font-main-color uppercase text-center pt-5  mb-5"
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

        <p class=" text-center uppercase font-Signika font-bold text-font-main-color mt-10 ">upload quotation</p>

        <form @submit.prevent="submitQuotationSheet">
          <div class="flex flex-col justify-center items-center mt-10">
            <div class="flex justify-start">
              <FileUpload
                ref="quotationSheet"
                mode="basic"
                accept=".xlsx,.csv,.xlsm"
                :maxFileSize="1000000"
              />
            </div>
            <div v-if="v$.quotationSheet.$error">
              <validationErrorMessage :errors="v$.quotationSheet.$errors" />
            </div>
          </div>

          <Button
            type="submit"
            raised
            severity="danger"
            class="block"
            label="Submit"
          />
        </form>
        <div class="helper-table-container">
          <helper-table v-if="sheet_errors">
            <template #header>
              <th scope="col">Row</th>
              <th scope="col">Attribute</th>
              <th scope="col">Errors</th>
              <th scope="col">Values</th>
            </template>
            <template #body>
              <tr
                style="background-color: white; color: red"
                v-for="error in sheet_errors"
                :key="error"
              >
                <td class="text-left align-middle">{{ error.row }}</td>
                <td class="text-left align-middle">{{ error.attribute }}</td>
                <td class="text-left align-middle">
                  <ul v-for="rowError in error.errors" :key="rowError">
                    <li>{{ rowError }}</li>
                  </ul>
                </td>
                <td class="text-left align-middle">
                  <ul>
                    <li>Item:{{ error.values["item"] }}</li>
                    <li>Quantity:{{ error.values["quantity"] }}</li>
                  </ul>
                </td>
              </tr>
            </template>
          </helper-table>
        </div>
      </template>
    </Card>
 
  </div>
   

  <div class="w-screen-2xl px-10 py-20" v-if="isQuotationFound">
    <Card class="max-w-screen-xl px-5 mx-auto">
      <template #content>
        <DataTable
          :value="quotation"
          scrollable
          :paginator="true"
          :rows="5"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 15]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          class="text-sm"
          tableStyle="min-width: 50rem"
          @row-select="onRowSelect"
          v-model:selection="selectedItem"
        >
          <Column selectionMode="single"></Column>
          <Column field="item" header="#"></Column>
          <Column field="description" header="Description"></Column>
          <Column field="unit" header="Unit"></Column>
          <Column field="supply" header="Supply"></Column>
          <Column field="installation" header="Installation"></Column>
          <Column field="sup_inst" header="S&I"></Column>
          <Column field="type" header="Type"></Column>
        </DataTable>
      </template>
    </Card>
  </div>
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
import PriceListTable from "../../helpers/Modification/PriceListTable.vue";
import Quotation from "../../../../src/apis/Quotation.js";

const props = defineProps(["id"]); /////////////modification id

const quotation = ref();

const selectedItem=ref();

const searchPriceList = ref();

const searchBy = ref("item");

const toast = useToast();

const dialog = useDialog();

const quotationSheet = ref();

const isQuotationFound = ref(false);

const sheet_errors = ref();

const mustIncludeFile = (value) => {
  if (value.files[0]) {
    return true;
  }
  return false;
};
const searchPriceListRegex = helpers.regex(/^.{1,50}$/);
const onRowSelect=()=>{

}

const searchPriceListRules = computed(() => ({
  searchPriceList: {
    required: helpers.withMessage(" item No. or keyword is required", required),
    searchPriceListRegex: helpers.withMessage(
      "invalid search format",
      searchPriceListRegex
    ),
  },
}));

const rules = computed(() => ({
  quotationSheet: {
    mustIncludeFile: helpers.withMessage(
      "Quotation sheet is required",
      mustIncludeFile
    ),
    // fileTypeRegex:helpers.withMessage("xlx,xlsx,csv file type only",fileTypeRegex)
  },
}));

const v$ = useVuelidate(rules, { quotationSheet });

const submitQuotationSheet = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    return;
  }

  let data = {
    quotation: quotationSheet.value.files[0],
    id: props.id,
  };
 
  Quotation.uploadQuotationSheet(data)
    .then((response) => {
      
    })
    .catch((error) => {
      if (error.response) {
        if ((error.response.status = 422)) {
          if (error.response.data.sheet_errors) {
            sheet_errors.value = error.response.data.sheet_errors;
          } else if (error.response.data.errors) {
            var errors = [];
            errors = error.response.data.errors;
            errors.foreEach((element) => {
              toast.add({
                severity: "error",
                summary: "Error Message",
                detail: element,
                life: 3000,
              });
            });
          }
        }
      }
    });
};

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
  console.log(data);
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
      });
    }
  });
};

onMounted(() => {
  getModificationQuotation();
});

const getModificationQuotation = () => {
  Modifications.getModificationQuotation(props.id).then((response) => {
   
    console.log(response);
      if (response.data.message != "No quotation") {
        quotation.value = response.data.quotation.prices;
        isQuotationFound.value = true;
      
      } else {
        isQuotationFound.value=false
      }
  });
};
</script>
