<template>
 
<NURSheetSubmission technology="2G"/>
</template>

<script>

import NURSheetSubmission from "../../helpers/Nur/NURSheetSubmission.vue";

export default {
  
  name: "NUR2G",
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!vm.isLogin) {
        return vm.$router.push("/user/login");
      }
    });
  },
  computed: {
    token() {
      return this.$store.getters.token;
    },
    isLogin() {
      return this.$store.getters.isLogin;
    },
  },
  components:{
    NURSheetSubmission

  },
  
};
</script>

<style lang="scss" scoped>

</style>