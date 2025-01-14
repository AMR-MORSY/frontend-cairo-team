<template>
  <div class="w-screen-2xl px-10 py-20" v-if="items">
    <Card class="max-w-screen-xl px-5 mx-auto">
      <template #content>
        <DataTable
          :value="items"
          editMode="cell"
          @cell-edit-complete="onCellEditComplete"
          v-model:selection="selectedItems"
          @row-select="onRowSelect"
          dataKey="id"
          scrollable
          :paginator="true"
          :rows="5"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 15]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          class="text-sm"
          tableStyle="min-width: 50rem"
        >
          <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
          <Column
            v-for="col of columns"
            :key="col.field"
            :field="col.field"
            :header="col.header"
            style="width: 25%"
          >
            <template #editor="{ data, field }">
              <template v-if="field == 'quantity'">
                <div class="flex-auto">
                  <InputNumber
                    v-model="data[field]"
                    :min="0"
                    fluid
                    :min-fraction-digits="2"
                  />
                </div>
              </template>
              <template v-else-if="field == 'scope'">
                <div class="flex-auto">
                  <Select
                    v-model="data[field]"
                    :options="scopeOptions"
                    fluid
                  ></Select>
                </div>
              </template>
              <template v-else>
                {{ data[field] }}
              </template>
            </template>
          </Column>
        </DataTable>

        <div class="w-100 flex justify-center items-center mt-2">
          <Button
            label="insert"
            class="uppercase block"
            security="danger"
            raised
            :disabled="!isRowSelected"
            @click.prevent="insertMailPricesItems"
            v-if="action == 'mailItemsInsertion'"
          />
          <Button
            label="insert"
            class="uppercase block"
            security="danger"
            raised
            :disabled="!isRowSelected"
            @click.prevent="insertPriceListItems"
            v-if="action == 'priceListItemsInsertion'"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Quotation from "../../../apis/Quotation";
import { computed } from "vue";
import { useToast } from "primevue/usetoast";
import router from "../../../router";
import { onUpdated } from "vue";
import { useConfirm } from "primevue/useconfirm";
import { watch, watchEffect } from "vue";
const props = defineProps([
  "action",
  "items",

  "modification_id",
  "quotation_id",
]);
const toast = useToast();
const confirm = useConfirm();

const items = ref([]);
const selectedItems = ref([]);

const scopeOptions = ref(["supply", "install", "s&i"]);

const isRowSelected = computed(() => {
  if (selectedItems.value.length > 0) {
    return true;
  }
  return false;
});

onMounted(() => {
  if (props.action == "priceListItemsInsertion") {
    columns.value.unshift({ field: "item", header: "Item" });
  }
});

const columns = ref([
  { field: "description", header: "Description" },
  { field: "unit", header: "Unit" },
  { field: "installation", header: "Install" },
  { field: "supply", header: "Supply" },
  { field: "sup_inst", header: "S&I" },
  { field: "type", header: "Type" },
  { field: "quantity", header: "Quantity" },
  { field: "scope", header: "Scope" },
]);
const onCellEditComplete = (event) => {
  let { data, newValue, field } = event;

  switch (field) {
    case "quantity":
      data[field] = newValue;
      if (selectedItems.value.length > 0) {
        selectedItems.value.forEach((element) => {
          if (element.id == data["id"]) {
            element.quantity == newValue;
          }
        });
      }

      break;
    case "scope":
      data[field] = newValue;
      if (selectedItems.value.length > 0) {
        selectedItems.value.forEach((element) => {
          if (element.id == data["id"]) {
            element.scope == newValue;
          }
        });
      }
      break;
  }
};

const onRowSelect = () => {
  //   console.log(selectedItems.value);
};

watchEffect(() => {
  items.value = props.items;
  items.value.forEach((element) => {
    element.quantity = 0;
    element.scope = "s&i";
  });
});

const checkSelectedItemsQuantity = () => {
  console.log(selectedItems.value);
  let isZeroQuantity = false;

  selectedItems.value.forEach((element) => {
    if (element.quantity == 0) {
      isZeroQuantity = true;
    }
  });
  return isZeroQuantity;
};

const insertMailPricesItems = () => {
  if (checkSelectedItemsQuantity()) {
    return toast.add({
      severity: "error",
      summary: "Error Message",
      detail: "One or more items Quantity is zero ",
      life: 3000,
    });
  } else {
    let data = {
      mail_prices: selectedItems.value,
    };
    console.log(props.quotation_id);
    Quotation.insertQuotationMailPricesItems(
      data,
      props.modification_id,
      props.quotation_id
    )
      .then((response) => {
        if (response.data.message == "success") {
          if (props.quotation_id) {
            router.push(
              `/quotation/update/${props.modification_id}/${props.quotation_id}`
            );
          } else {
            router.push(`/quotation/modification/${props.modification_id}`);
          }
        }
      })
      .catch((error) => {
        if (error.response.status == 422) {
          let errors = error.response.data.errors;
          if (errors.quantity) {
            errors.quantity.forEach((element) => {
              toast.add({
                severity: "error",
                summary: "Failed",
                detail: element,
                life: 3000,
              });
            });
          }
        }
      });
  }
};

const theFinalPriceListItemsSubmission = () => {
  let data = {
    priceListItems: selectedItems.value,
  };
  console.log(data);
  Quotation.insertQuotationPriceListItems(
    data,
    props.modification_id,
    props.quotation_id
  )
    .then((response) => {
      console.log(response);
      if (response.data.message == "success") {
        if (props.action == "priceListItemsInsertion") {
          toast.add({
            severity: "success",
            detail: "Inserted Successfully",
            life: 3000,
            summary: "Success Message",
          });
          //   router.push(`/quotation/update/${props.modification_id}/${props.quotation_id}`);
          window.location.reload();
        } else {
          router.push(`/quotation/modification/${props.modification_id}`);
        }
      }
    })
    .catch((error) => {
      console.log(error);
      if (error.response.status == 422) {
        let errorsKeys = Object.keys(error.response.data.errors);
        let errorsValues = Object.values(error.response.data.errors);
        console.log(errorsValues)
        for (var i = 0; i <= errorsKeys.length; i++) {

          toast.add({
              severity: "error",
              summary: "Failed",
              detail: errorsKeys[i]+"==>"+errorsValues[i][0],
              life: 5000,
            });

        }
      
         
      }
    });
};
const insertPriceListItems = () => {
  if (checkSelectedItemsQuantity()) {
    confirm.require({
      group: "yesNo",
      message:
        "One or more items Quantity is zero, proceed if the items un-priced?",
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
        theFinalPriceListItemsSubmission();
      },
      reject: () => {
        confirm.close();
      },
    });
  } else {
    theFinalPriceListItemsSubmission();
  }
};
</script>
