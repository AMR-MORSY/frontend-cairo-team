<template>



  <ModificationCreationForm :siteCode="site_code" :siteName="site_name" needed_action="insert" :modificationData="[]" :operation_zone="oz" />
</template>

<script setup>

import ModificationCreationForm from "../../helpers/Modification/ModificationCreationForm.vue";

const props=defineProps(["site_code","site_name",'oz']);
</script>

<style lang="scss" scoped></style>