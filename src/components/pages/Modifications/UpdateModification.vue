<template>
  <ModificationViewORUpdate needed_action="update" :id="modification_id" />
</template>

<script setup>
import { reactive, watch, ref, onMounted } from "vue";
import Modifications from "../../../apis/Modifications";
import ModificationCreationForm from "../../helpers/Modification/ModificationCreationForm.vue";
import ModificationViewORUpdate from "../../helpers/Modification/ModificationViewORUpdate.vue";
import { computed } from "vue";

const props = defineProps(["id"]);

const modification_id = computed(() => props.id);

// onBeforeRouteUpdate((to, from, next) => {
//   Modifications.getModificationDetails(to.params.id)

//     .then((response) => {
//       console.log(response);
//       let updateCairoSouth = false;
//       let updateCairoEast = false;
//       let updateCairoNorth = false;
//       let updateGiza = false;

//       store.getters.userPermissions.forEach((element) => {
//         if (element == "update_CS_modification") {
//           updateCairoSouth = true;
//         }
//         if (element == "update_CE_modification") {
//           updateCairoEast = true;
//         }
//         if (element == "update_CN_modification") {
//           updateCairoNorth = true;
//         }
//         if (element == "update_GZ_modification") {
//           updateGiza = true;
//         }
//       });

//       if (updateCairoEast && response.data.details.oz == "Cairo East") next();
//       else if (updateCairoNorth && response.data.details.oz == "Cairo North")
//         next();
//       else if (updateCairoSouth && response.data.details.oz == "Cairo South")
//         next();
//       else if (updateGiza && response.data.details.oz == "Giza") next();
//       else {
//         from();
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });
</script>

<style lang="scss" scoped>
.form {
  margin-top: 10px;
  width: 100%;
  border: 1px solid black;
  border-radius: 5px;
}
</style>
