<template>
 
  <SiteCreationForm action="update" :siteDetails="site_details" />

</template>

<script setup>
import Sites from "../../../apis/Sites";
import allInstances from "../../../apis/Api";
import SiteCreationForm from "../../helpers/Sites/SiteCreationForm.vue";
import { watch,ref, onMounted } from "vue";
import { reactive } from "vue";

const site_details = reactive({});
const props = defineProps(['siteCode'])
const getSiteDetails = () => {


  Sites.getSiteDetails(props.siteCode)
    .then((response) => {

      site_details.value = response.data.site
     
    })
}


onMounted(()=>{
  getSiteDetails()
})
</script>

<style lang="scss" scoped>
.p-button.back,
.p-button.back:hover {
  background-color: var(--pink-500);
  border-color: var(--pink-500);
}

.p-button.insert,
.p-button.insert:hover {
  background-color: var(--teal-400);
  border-color: var(--teal-400);
}

.p-inputtext {
  border-color: #79589f;
}

.p-inputtext:focus {
  box-shadow: 0px 0px 3px 2px #79589f !important;
}

.p-inputtextarea {
  resize: none;
  width: 100%;
}

// $dp__border_radius: 30px !default;

.form-select option:hover {
  background-color: #79589f !important;
}

.dp__theme_light {
  --dp-text-color: red;

  --dp-icon-color: #79589f;

  --dp-border-color: #79589f;
}

.form {
  width: 100%;
  border: 1px solid black;
  border-radius: 5px;
}

@media screen and (max-width: 576px) {}
</style>