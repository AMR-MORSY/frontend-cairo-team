<template>
  

  <TransitionCards :cards="cards" />
</template>

<script setup>




import { ref } from "vue";


import TransitionCards from "../../helpers/TransitionCards.vue";



const cards = ref([
  { id: 1, icon: "pi-search", path: "Category" },
  { id: 2, icon: "pi-search", path: "Date" },
  { id: 3, icon: "pi-search", path: "Work Order" },
  { id: 4, icon: "pi-search", path: "Price List" },
  { id: 5, icon: "pi-calculator", path: "Invoices" },
  {id:6,icon:"pi-book",path:'Dashboard'}
 ]);

</script>

<style lang="scss" scoped></style>
