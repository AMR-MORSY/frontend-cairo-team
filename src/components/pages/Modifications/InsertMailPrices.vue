<template>
 
<ItemsInsertion action="mailItemsInsertion"  :items="mailprices" :modification_id="modification_id" :quotation_id="quotation_id"/>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Quotation from "../../../apis/Quotation";
import { computed } from "vue";

import ItemsInsertion from "../../helpers/Modification/ItemsInsertion.vue";






const props = defineProps(["quotation_id", "modification_id"]);


const mailprices = ref([]);









onMounted(() => {
  getMailPrices();
 
});


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

const onRowSelect = () => {
  //   console.log(selectedItems.value);
};

</script>
