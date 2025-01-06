<template>
 <NURSheetSubmission technology="4G"/>
</template>

<script>
import NURSheetSubmission from "../../helpers/Nur/NURSheetSubmission.vue";

export default {
 
  name: "NUR4G",
  components:{
    NURSheetSubmission

  },
  computed: {
  
    isLogin() {
      return this.$store.getters.isLogin;
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!vm.isLogin) {
        return vm.$router.push("/user/login");
      }
    });
  },
 
};
</script>

<style lang="scss" scoped>

</style>