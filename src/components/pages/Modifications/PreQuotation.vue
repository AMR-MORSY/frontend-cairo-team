<template>
  <div class="w-screen-2xl px-10 pt-52" v-if="isQuotationNotFound">
    <Card class="max-w-sm md:max-w-screen-sm mx-auto">
      <template #content>
        <h2
          class="font-Signika text-center text-red-500 text-2xl font-extrabold uppercase"
        >
          No Quotation
        </h2>

        <div class="flex flex-wrap gap-4 mt-3">
          <p class="text-font-main-color font-extrabold uppercase font-Signika">
            Import items From:
          </p>
          <div class="flex items-center gap-2">
            <RadioButton
              v-model="searchBy"
              inputId="ingredient1"
              name="pizza"
              value="priceList"
            />
            <label
              for="ingredient1"
              class="text-font-main-color font-medium text-sm uppercase font-Signika"
              >Modifications Price List</label
            >
          </div>
          <div class="flex items-center gap-2">
            <RadioButton
              v-model="searchBy"
              inputId="ingredient2"
              name="pizza"
              value="mailList"
            />
            <label
              for="ingredient2"
              class="text-font-main-color font-medium text-sm uppercase font-Signika"
              >Approved By Mail</label
            >
          </div>
          <Button
            class="block"
            label="Import"
            @click="getSearchByChoice"
            severity=" secondary"
            :raised="true"
          />
        </div>

        <p
          class="w-100 text-center font-extrabold text-xl font-Signika text-red-500"
        >
          OR
        </p>

        <!-- <div class="flex flex-wrap gap-4 mt-3"> -->
        <p
          class="text-center uppercase font-Signika font-extrabold text-font-main-color mt-10"
        >
          upload quotation
        </p>

        <!-- <form @submit.prevent="submitQuotationSheet"> -->
        <div class="flex flex-col justify-center gap-6 items-center mt-10">
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
          <Button
            @click="submitQuotationSheet"
            raised
            severity="secondary"
            class="block"
            label="Upload"
          />
        </div>
        <!-- </form> -->
        <!-- </div> -->

        <div class="w-100" v-if="sheet_errors.length>0">
          <DataTable
            :value="sheet_errors"
            scrollable
            :paginator="true"
            :rows="5"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 15]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
            class="text-sm"
            tableStyle="min-width: 50rem"
          >
            <Column field="row" header="Row"></Column>
            <Column field="attribute" header="Attribute"></Column>
            <Column field="errors" header="Errors">
              <template #body="slotProps">
                <strong
                  class="font-Signika text-font-main-color"
                  v-for="error in slotProps.data.errors"
                  :key="error"
                >
                  {{ error }}
                </strong>
              </template>
            </Column>
            <Column field="values" header="Values">
              <template #body="slotProps">
                <p>
                  <strong
                    class="font-Signika text-font-main-color font-semibold"
                    >Item:</strong
                  >
                  {{ slotProps.data.values.item.value }}
                </p>
                <p>
                  <strong
                    class="font-Signika text-font-main-color font-semibold"
                    >Quantity:</strong
                  >
                  {{ slotProps.data.values.quantity }}
                </p>
                <p>
                  <strong
                    class="font-Signika text-font-main-color font-semibold"
                    >Scope:</strong
                  >
                  {{ slotProps.data.values.scope }}
                </p>
              </template>
            </Column>
          </DataTable>
        </div>
      </template>
    </Card>
  </div>

  <div class="w-screen-2xl px-10 py-20" v-if="isQuotationFound">
    <Card class="max-w-screen-xl px-5 mx-auto">
      <template #content>
        <DataTable
          :value="totalItems"
          scrollable
          :paginator="true"
          :rows="5"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 15]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          class="text-sm"
          tableStyle="min-width: 50rem"
        >
          <Column field="item" header="#"></Column>
          <Column field="description" header="Description"></Column>
          <Column field="unit" header="Unit"></Column>
          <Column field="supply_price" header="Supply"></Column>
          <Column field="install_price" header="Installation"></Column>
          <Column field="scope" header="Scope"></Column>
          <Column field="quantity" header="Quantity"></Column>
          <Column field="item_price" header="Price"></Column>
          <template #footer>
            <div
              class="text-font-main-color text-xl font-semibold font-Signika"
            >
              Total Cost {{ totalCost }} LE.
            </div>
            <div
              class="w-100 flex justify-evenly flex-nowrap items-center mt-3"
            >
              <Button
                label="Update"
                severity="danger"
                :raised="true"
                class="block"
                @click.prevent="goToUpdateQuotation"
              />
              <Button
                label="Download"
                severity="info"
                :raised="true"
                class="block"
                @click.prevent="downloadQuotation"
              />
              <Button
                label="Back To Modification"
                severity="primary"
                :raised="true"
                class="block"
                @click.prevent="goBackToModification"
              />
            </div>
          </template>
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
import { useRouter } from "vue-router";
import exportFromJSON from "export-from-json";
import * as XLSX from "xlsx";

import PriceListSearchForm from "../../helpers/Modification/PriceListSearchForm.vue";

const props = defineProps(["id"]); /////////////modification id

const quotation = ref();

const priceQuotation = ref([]);
const searchBy = ref("priceList");

const totalItems = computed(() => {
  return gatheringPricesMailPrices(priceQuotation.value, mailQuotation.value);
});

const router = useRouter();

const toast = useToast();

const dialog = useDialog();

const quotationSheet = ref();

const isQuotationNotFound = ref(false);

const isQuotationFound = ref(false);

const sheet_errors = ref([]);

const mailQuotation = ref([]);

const totalCost = computed(() => {
  if (totalItems.value.length > 0) {
    return totalItems.value.reduce(function (sum, current) {
      return sum + Number(current.item_price);
    }, 0);
  }
  return 0;
});

const mustIncludeFile = (value) => {
  if (value.files[0]) {
    return true;
  }
  return false;
};

const onRowSelect = () => {};

const goBackToModification=()=>{
  router.push(`/modification/view/${props.id}`)
}

const getSearchByChoice = () => {
  if (searchBy.value == "priceList") {
    addItemsFromPriceList();
  } else {
    AddNewMailListItem();
  }
};

const rules = computed(() => ({
  quotationSheet: {
    mustIncludeFile: helpers.withMessage(
      "Quotation sheet is required",
      mustIncludeFile
    ),
  },
}));

const v$ = useVuelidate(rules, { quotationSheet });

const submitQuotationSheet = async () => {
  console.log(quotationSheet.value);
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    return;
  }

  let data = {
    quotation: quotationSheet.value.files[0],
    id: props.id,
  };
  sheet_errors.value = [];
  Quotation.uploadQuotationSheet(data)
    .then((response) => {
      if (response.data.message == "inserted Successfully") {
        toast.add({
          severity: "success",
          summary: "Success Message",
          detail: "inserted Successfully",
          life: 3000,
        });
        getModificationQuotation();
      }
    })
    .catch((error) => {
      if (error.response) {
        if ((error.response.status == 422)) {
          if (error.response.data.sheet_errors) {
            sheet_errors.value = error.response.data.sheet_errors;
            console.log(sheet_errors.value);
          } else if (error.response.data.errors) {
            console.log(error.response.data.errors);
            var errors = [];
            errors = error.response.data.errors;
            errors.forEach((element) => {
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

const addItemsFromPriceList = () => {
  dialog.open(PriceListSearchForm, {
    props: {
      style: {
        width: "75vw",
      },
      breakpoints: {
        "960px": "75vw",
        "640px": "90vw",
      },

      modal: true,
      position: "top",
    },
    data: {
      modification_id: props.id,
      quotation_id: null,
       displayAddButton:true
    }
  });
};

const AddNewMailListItem = () => {
  router.push(`/quotation/mailprices/index/${props.id}`);
};

onMounted(() => {
  getModificationQuotation();
});

const gatheringPricesMailPrices = (prices, mailPrices) => {
  let totalItems = [];
  if (mailPrices.length > 0 && prices.length > 0) {
    let newMailPrices = [];
    mailPrices.forEach((element) => {
      element.item = "Mail";
      newMailPrices.push(element);
    });
    prices.forEach((element) => {
      totalItems.push(element);
    });
    newMailPrices.forEach((element) => {
      totalItems.push(element);
    });

    return totalItems;
  } else if (mailPrices.length == 0 && prices.length > 0) {
    return prices;
  } else if (mailPrices.length > 0 && prices.length == 0) {
    let newMailPrices = [];
    mailPrices.forEach((element) => {
      element.item = "Mail";
      newMailPrices.push(element);
    });
    return newMailPrices;
  }
  else if(mailPrices.length == 0 && prices.length == 0)
  {
    return [];
  }
};

const getModificationQuotation = () => {
  Modifications.getModificationQuotation(props.id).then((response) => {
    console.log(response.data)
    if (response.data.message != "No quotation") {
      quotation.value = response.data.quotation;
      priceQuotation.value = response.data.quotation.prices;
      mailQuotation.value = response.data.quotation.mail_prices;
      isQuotationFound.value = true;
      isQuotationNotFound.value = false;
    } else {
      isQuotationFound.value = false;
      isQuotationNotFound.value = true;
    }
  });
};

const goToUpdateQuotation = () => {
  return router.push(`/quotation/update/${props.id}/${quotation.value.id}`);
};

const downloadQuotation = () => {
  let modifications = [];
  let modification = quotation.value.modification;
  modification.action_owner = modification.action_owner.name;
  modification.site = modification.site.site_name;
  modifications.push(modification);

  const modificationsSheet = XLSX.utils.json_to_sheet(modifications);
  const quotationSheet = XLSX.utils.json_to_sheet(totalItems.value);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, modificationsSheet, "modification");
  XLSX.utils.book_append_sheet(workbook, quotationSheet, "Quotation");
  XLSX.writeFile(workbook, "Quotation.xlsx", { compression: true });
};
</script>
