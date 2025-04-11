<template>
  <TransitionCards :cards="cards" />
</template>

<script setup>
import { ref } from "vue";

import TransitionCards from "../../helpers/TransitionCards.vue";

const cards = ref([
  { id: 1, icon: "pi-search", path: "SearchEnergy" },
  { id: 2, icon: "pi-plus-circle", path: "New Sheet" },
]);
</script>
