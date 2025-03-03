<template>
  <TransitionCards :cards="cards" />
</template>

<script setup>
import { ref } from "vue";

import TransitionCards from "../../helpers/TransitionCards.vue";

const cards = ref([
  { id: 1, icon: "search", path: "SearchEnergy" },
  { id: 2, icon: "add_circle", path: "New Sheet" },
]);
</script>
