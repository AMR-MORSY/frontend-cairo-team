<template>
 <NURSheetSubmission technology="3G"/>
</template>

<script>
import NURSheetSubmission from "../../helpers/Nur/NURSheetSubmission.vue";

export default {
  
    
  name: "NUR3G",
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!vm.isLogin) {
        return vm.$router.push("/user/login");
      }
    });
  },
  components:{
    NURSheetSubmission

  },
  computed: {
  
    isLogin() {
      return this.$store.getters.isLogin;
    },
  },

};
</script>

<style lang="scss" scoped>

</style>