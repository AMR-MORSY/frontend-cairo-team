<template>
 <SiteCreationForm action="new" :siteDetails="[]"/>

</template>

<script>

import SiteCreationForm from "../../helpers/Sites/SiteCreationForm.vue";

export default {
  data() {
   
  },
  name: "NewSiteInsert",

  emits: ["displayNoneSpinner"],
  components:{SiteCreationForm},

  mounted() { },
  computed: {
    token() {
      return this.$store.getters.token;
    },
  },

  
};
</script>

<style lang="scss" scoped>

</style>