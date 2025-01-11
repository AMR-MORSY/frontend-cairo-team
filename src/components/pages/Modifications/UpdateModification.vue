<template>

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
  

</script>

<style lang="scss" scoped>
.form {
  margin-top: 10px;
  width: 100%;
  border: 1px solid black;
  border-radius: 5px;
}
</style>
