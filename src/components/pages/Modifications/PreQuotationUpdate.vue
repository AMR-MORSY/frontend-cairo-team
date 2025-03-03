<template>
  <div class="w-screen-2xl px-10 py-20" v-if="isQuotationFound">
    <Card class="max-w-screen-xl px-5 mx-auto">
      <template #content>
        <div v-if="isPriceQuotationFound">
          <div class="flex w-100 items-center justify-center">
            <p
              class="text-center font-Signika text-font-main-color font-semibold underline underline-offset-1"
            >
              Price List items
            </p>
          </div>
          <DataTable
            :value="priceQuotation"
            scrollable
            :paginator="true"
            :rows="5"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 15]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
            class="text-sm"
            tableStyle="min-width: 50rem"
            @row-select="onRowSelect"
            v-model:selection="selectedPriceQuotationItems"
            @rowUnselect="onRowUnselect"
          >
            <Column selectionMode="multiple"></Column>
            <Column field="item" header="#"></Column>
            <Column field="description" header="Description"></Column>
            <Column field="unit" header="Unit"></Column>
            <Column field="supply_price" header="Supply"></Column>
            <Column field="install_price" header="Installation"></Column>
            <Column field="scope" header="Scope"></Column>
            <Column field="quantity" header="Quantity"></Column>
            <Column field="item_price" header="Price"></Column>
            <template #footer>
              <div class="flex items-center justify-evenly w-100">
                <Button
                  label="Delete"
                  severity="danger"
                  :raised="true"
                  class="block"
                  :disabled="!isThereSelectedPriceQuotation"
                  @click="deletePriceListItems"
                />
                <Button
                  label="Add New Item"
                  security="info"
                  class="block"
                  @click="AddNewPriceListItem"
                />
              </div>
            </template>
          </DataTable>
        </div>

        <div v-else>
          <p
            class="text-center font-Signika text-font-main-color font-semibold underline underline-offset-1"
          >
            Price List items
          </p>
          <div class="flex justify-evenly items-center">
            <p
              class="text-start font-Signika text-font-main-color font-semibold"
            >
              No Price List items
            </p>
            <Button
              label="Add New Item"
              security="info"
              class="block"
              @click="AddNewPriceListItem"
            />
          </div>
        </div>

        <div v-if="isMailQuotationFound" class="mt-10">
          <div class="flex w-100 items-center justify-center">
            <p
              class="text-center font-Signika text-font-main-color font-semibold"
            >
              Mail items
            </p>
          </div>
          <DataTable
            :value="mailQuotation"
            scrollable
            :paginator="true"
            :rows="5"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 15]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
            class="text-sm"
            tableStyle="min-width: 50rem"
            @row-select="onRowSelect"
            v-model:selection="selectedMailQuotationItems"
          >
            <Column selectionMode="multiple"></Column>

            <Column field="description" header="Description"></Column>
            <Column field="unit" header="Unit"></Column>
            <Column field="supply_price" header="Supply"></Column>
            <Column field="install_price" header="Installation"></Column>
            <Column field="scope" header="Scope"></Column>
            <Column field="quantity" header="Quantity"></Column>
            <Column field="item_price" header="Price"></Column>

            <template #footer>
              <div class="flex items-center justify-evenly w-100">
                <Button
                  label="Delete"
                  severity="danger"
                  :raised="true"
                  class="block"
                  :disabled="!isThereSelectedMailQuotation"
                  @click="deleteMailListItems"
                />
                <Button
                  label="Add New Item"
                  security="info"
                  class="block"
                  @click="AddNewMailListItem"
                />
              </div>
            </template>
          </DataTable>
        </div>
        <div v-else>
          <p
            class="text-center font-Signika text-font-main-color font-semibold underline underline-offset-1 py-8"
          >
            Mail items
          </p>
          <div class="flex justify-evenly items-center">
            <p
              class="text-start font-Signika text-font-main-color font-semibold"
            >
              No Mail items
            </p>
            <Button
              label="Add New Item"
              security="info"
              class="block"
              @click="AddNewMailListItem"
            />
          </div>
        </div>
        <div class="flex items-center justify-between flex-wrap w-100 mt-3">
            <Button label="View Total Quotation" @click="goToQuotation" class=" block" :raised=true severity="secondary"/>
          <div class="text-font-main-color text-xl font-semibold font-Signika">
            Total Cost {{ totalCost }} LE.
          </div>
        
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { useDialog } from "primevue/usedialog";
import Quotation from "../../../../src/apis/Quotation.js";
import Modifications from "../../../apis/Modifications";
import PriceListSearchForm from "../../helpers/Modification/PriceListSearchForm.vue";
import { useConfirm } from "primevue/useconfirm";

const props = defineProps(["modification_id", "quotation_id"]);
const confirm = useConfirm();
const onRowSelect = () => {
  console.log(selectedPriceQuotationItems.value);
};

const onRowUnselect = () => {
  console.log(selectedPriceQuotationItems.value);
};

const quotation = ref();

const priceQuotation = ref([]);

const router = useRouter();
const selectedPriceQuotationItems = ref([]);
const selectedMailQuotationItems = ref([]);

const isThereSelectedPriceQuotation = computed(() => {
  if (selectedPriceQuotationItems.value.length > 0) {
    return true;
  }
  return false;
});

const isThereSelectedMailQuotation = computed(() => {
  if (selectedMailQuotationItems.value.length > 0) {
    return true;
  }
  return false;
});

const toast = useToast();

const dialog = useDialog();

const isQuotationNotFound = ref(false);

const isQuotationFound = ref(false);

const mailQuotation = ref([]);

const totalCost = computed(() => {
  if (!priceQuotation.value && !mailQuotation.value.length == 0) {
    return 0;
  } else if (priceQuotation.value && mailQuotation.value.length > 0) {
    let sumQuotation = priceQuotation.value.reduce(function (sum, current) {
      return sum + Number(current.item_price);
    }, 0);
    let sumMailQuotation = mailQuotation.value.reduce(function (sum, current) {
      return sum + Number(current.item_price);
    }, 0);
    return sumMailQuotation + sumQuotation;
  } else if (priceQuotation.value && mailQuotation.value.length == 0) {
    return priceQuotation.value.reduce(function (sum, current) {
      return sum + Number(current.item_price);
    }, 0);
  } else if (!priceQuotation.value && mailQuotation.value.length > 0) {
    return mailQuotation.value.reduce(function (sum, current) {
      return sum + Number(current.item_price);
    }, 0);
  }
});

const goToQuotation=()=>{
    router.push(`/quotation/modification/${props.modification_id}`)
}
const AddNewPriceListItem = () => {
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
      modification_id: props.modification_id,
      quotation_id: props.quotation_id,
      displayAddButton:true
    
    },
  });
};

const AddNewMailListItem = () => {
  return router.push(
    `/quotation/mailprices/index/${props.modification_id}/${props.quotation_id}`
  );
};
const isMailQuotationFound = computed(() => {
  if (mailQuotation.value.length > 0) {
    return true;
  }
  return false;
});

const isPriceQuotationFound = computed(() => {
  if (priceQuotation.value.length > 0) {
    return true;
  }
  return false;
});

onMounted(() => {
  getModificationQuotation();
});

const getModificationQuotation = () => {
  Modifications.getModificationQuotation(props.modification_id).then(
    (response) => {
      console.log(response);
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
    }
  );
};

const deletePriceListItems = () => {
  confirm.require({
    group: "yesNo",
    message: "This will going to delete the item, Are you sure?",
    header: "Confirmation",
    icon: "pi pi-exclamation-triangle",
    position: "top",

    rejectProps: {
      label: "No",
      severity: "success",
    },
    acceptProps: {
      label: "Yes",
      severity: "danger",
    },
    accept: () => {
      confirm.close();
      let data = {
        priceListItems: selectedPriceQuotationItems.value,
      };
      Quotation.deletePriceListItems(
        data,
        props.modification_id,
        props.quotation_id
      ).then((response) => {
        if (response.data.message == "deleted Successfully") {
          toast.add({
            severity: "success",
            life: 3000,
            summary: "Success Message",
            detail: "deleted Successfully",
          });
          window.location.reload();
        } else if (response.data.message == "No quotation") {
          router.push(`/quotation/modification/${props.modification_id}`);
        }
      });
    },
    reject: () => {
      confirm.close();
    },
  });
};

const deleteMailListItems = () => {
  confirm.require({
    group: "yesNo",
    message: "This will going to delete the item, Are you sure?",
    header: "Confirmation",
    icon: "pi pi-exclamation-triangle",
    position: "top",

    rejectProps: {
      label: "No",
      severity: "success",
    },
    acceptProps: {
      label: "Yes",
      severity: "danger",
    },
    accept: () => {
      confirm.close();
      let data = {
        mail_prices_items: selectedMailQuotationItems.value,
      };

      Quotation.deleteMailListItems(
        data,
        props.modification_id,
        props.quotation_id
      ).then((response) => {
        if (response.data.message == "deleted Successfully") {
          toast.add({
            severity: "success",
            life: 3000,
            summary: "Success Message",
            detail: "deleted Successfully",
          });
          window.location.reload();
        } else if (response.data.message == "No quotation") {
          router.push(`/quotation/modification/${props.modification_id}`);
        }
      });
    },
    reject: () => {
      confirm.close();
    },
  });
};
</script>
