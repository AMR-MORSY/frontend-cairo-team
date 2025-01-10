<template>
  <!-- <div class="w-screen-2xl px-10 py-20">
    <Card class="max-w-screen-xl px-5 mx-auto">
      <template #content>
        <DataTable
          :value="mailprices"
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
          />
        </div>
      </template>
    </Card>
  </div> -->
<ItemsInsertion action="mailItemsInsertion" :items="mailprices" :modification_id="modification_id" :quotation_id="quotation_id"/>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Quotation from "../../../apis/Quotation";
import { computed } from "vue";
import { useToast } from "primevue/usetoast";
import ItemsInsertion from "../../helpers/Modification/ItemsInsertion.vue";
import router from "../../../router";
const props = defineProps(["quotation_id", "modification_id"]);
const toast = useToast();

const mailprices = ref([]);

const selectedItems = ref([]);

// const scopeOptions = ref(["supply", "install", "s&i"]);

// const isRowSelected = computed(() => {
//   if (selectedItems.value.length > 0) {
//     return true;
//   }
//   return false;
// });

onMounted(() => {
  getMailPrices();
});

// const columns = ref([
//   { field: "description", header: "Description" },
//   { field: "unit", header: "Unit" },

//   { field: "installation", header: "Install" },
//   { field: "supply", header: "Supply" },
//   { field: "sup_inst", header: "S&I" },
//   { field: "type", header: "Type" },
//   { field: "quantity", header: "Quantity" },
//   { field: "scope", header: "Scope" },
// ]);
// const onCellEditComplete = (event) => {
//   let { data, newValue, field } = event;

//   switch (field) {
//     case "quantity":
//       data[field] = newValue;
//       if (selectedItems.value.length > 0) {
//         selectedItems.value.forEach((element) => {
//           if (element.id == data["id"]) {
//             element.quantity == newValue;
//           }
//         });
//       }

//       break;
//     case "scope":
//       data[field] = newValue;
//       break;

//     // default:
//     //   if (newValue.trim().length > 0) {
//     //     data[field] = newValue;
//     //     if (selectedItems.value.length > 0) {
//     //       selectedItems.value.forEach((element) => {
//     //         if (element.id == data["id"]) {
//     //           element.quantity == newValue;
//     //         }
//     //       });
//     //     }
//     //   } else event.preventDefault();
//     //   break;
//   }
// };

const getMailPrices = () => {
  Quotation.getAllMailPrices().then((response) => {
    console.log(response);
    let prices = [];
    prices = response.data;

    prices.forEach((element) => {
      element.quantity = 0;
      element.scope = "s&i";
      mailprices.value.push(element);
    });
   
  });
};
// router.push(`/quotation/modification/${props.modificationData.id}`);
const onRowSelect = () => {
  //   console.log(selectedItems.value);
};

// const checkSelectedItemsQuantity = () => {
//   console.log(selectedItems.value);
//   let isZeroQuantity = false;

//   selectedItems.value.forEach((element) => {
//     if (element.quantity == 0) {
//       isZeroQuantity = true;
//     }
//   });
//   return isZeroQuantity;
// };
// const insertMailPricesItems = () => {
//   if (checkSelectedItemsQuantity()) {
//     return toast.add({
//       severity: "error",
//       summary: "Error Message",
//       detail: "One or more items Quantity is zero ",
//       life: 3000,
//     });
//   } else {
//     let data = {
//       mail_prices: selectedItems.value,
//     };
//     console.log(data);
//     Quotation.insertQuotationMailPricesItems(
//       data,
//       props.modification_id,
//       props.quotation_id
//     ).then((response) => {
//       console.log(response);
//       if(response.message=="success")
//       {
//         router.push(`/quotation/modification/${props.modification_id}`);
//       }
//     });
//   }
// };
</script>
