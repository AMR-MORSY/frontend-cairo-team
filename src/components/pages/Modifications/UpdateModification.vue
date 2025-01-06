<template>
  <!-- <ModificationCreationForm
    needed_action="update"
    :modificationData="modificationDetails"
    :siteCode="site_code"
    :siteName="site_name"
    :site_id="id"
  /> -->
  <ModificationViewORUpdate needed_action="update" :id="modification_id"/>

</template>

<script setup>
import { reactive, watch, ref, onMounted } from "vue";
import Modifications from "../../../apis/Modifications";
import ModificationCreationForm from "../../helpers/Modification/ModificationCreationForm.vue";
import ModificationViewORUpdate from "../../helpers/Modification/ModificationViewORUpdate.vue";
import { computed } from "vue";

const props = defineProps(["id"]);

const modification_id=computed(()=>props.id);
  
// const site_code=ref();
// const site_name=ref(); 

// const modificationDetails = reactive({
//   id: null,
//   subcontractor: null,
//   request_date: null,
//   project: null,
//   requester: null,
//   status: null,
//   site_name: "",
//   site_code: "",
//   actions: null,
//   description: null,
//   oz: null,
//   action_owner: null,
//   cw_date: null,
//   d6_date: null,
//   est_cost: null,
//   final_cost: null,
//   wo_code: null,
//   reported: null,
//   reported_at:null
// });

// onMounted(() => {
//   getModificationDetails();
// });

// const getModificationDetails = () => {
//   Modifications.getModificationDetails(props.id)

//     .then((response) => {
//       //  site_code.value = response.data.details.site_code;

//       //  site_name.value = response.data.details.site_name;
//       modificationDetails.id = response.data.details.id;
//       modificationDetails.subcontractor = response.data.details.subcontractor;
//       modificationDetails.request_date = response.data.details.request_date;
//       modificationDetails.description = response.data.details.description;
//       modificationDetails.reported = response.data.details.reported;
//       modificationDetails.requester = response.data.details.requester;
//       modificationDetails.project = response.data.details.project;
//       modificationDetails.action_owner = response.data.details.action_owner.name;
//       modificationDetails.status = response.data.details.status;
//       modificationDetails.oz = response.data.details.oz;
//       modificationDetails.d6_date = response.data.details.d6_date;
//       modificationDetails.cw_date = response.data.details.cw_date;
//       modificationDetails.actions = response.data.details.actions;
//       modificationDetails.final_cost = response.data.details.final_cost;
//       modificationDetails.est_cost = response.data.details.est_cost;
//       modificationDetails.wo_code = response.data.details.wo_code;
//       modificationDetails.reported_at=response.data.details.reported_at;
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };
</script>

<style lang="scss" scoped>
.form {
  margin-top: 10px;
  width: 100%;
  border: 1px solid black;
  border-radius: 5px;
}
</style>
