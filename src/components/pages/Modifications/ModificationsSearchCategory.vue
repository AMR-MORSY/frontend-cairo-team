<template>

<div v-if="serverError">
    <p style="color: red">{{ serverError }}</p>
  </div>
  <section id="analysis" class="w-screen-2xl px-10 py-40">
    <Card class="max-w-sm md:max-w-screen-sm mx-auto">
      <template #content>
        <div class="w-full">
          <h5
            class="font-Signika font-bold text-font-main-color text-center text-lg mb-5"
          >
            Modifications BY Category
          </h5>
        </div>
        <form @submit.prevent="submitFilterForm">
          <div class="grid grid-cols-2 gap-4">
            <div class="col-span-2 md:col-span-1">
              <div class="flex-auto">
                <Select
                  fluid
                  @change="submitColumn($event)"
                  v-model="column"
                  placeholder="Filter By..."
                  :options="columns"
                  id="column"
                >
                </Select>
              </div>
            </div>
            <div class="col-span-2 md:col-span-1">
              <div class="flex-auto">
                <Select
                  fluid
                  v-model="columnValue"
                  :options="columnValues"
                  id="columnValue"
                >
                </Select>
              </div>
            </div>
          </div>
          <div class="w-full flex justify-center mt-5">
            <Button
              :disabled="disabled"
              class="block"
              type="submit"
              label="Submit"
              severity="success"
              rounded
              raised
            />
          </div>
        </form>
      </template>
    </Card>
  </section>
</template>

<script setup>

import Modifications from "../../../apis/Modifications";
import Card from "primevue/card";
import { computed, ref } from "vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { email, required, requiredIf, minValue } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";
import validationErrorMessage from "../../helpers/validationErrorMessage.vue";


const router = useRouter();



const column = ref(null);
const columnValue = ref(null);
const columns = ref(null);
const columnValues = ref(null);
const status = ref(null);
const subcontractor = ref(null);
const project = ref(null);
const requester = ref(null);
const serverError = ref(null);
const actions = ref(null);
const reported = ref(null);


const disabled = computed(() => {
  if (!column.value || !columnValue.value) {
    return true;
  }
  if (column.value && columnValue.value) {
    return false;
  }
});

onMounted(() => {
  getModificationAnalysis();
});

const submitColumn = (e) => {
  column.value = e.value;

  if (column.value == "status") {
    columnValues.value = status.value;
  } else if (column.value == "subcontractor") {
    columnValues.value = subcontractor.value;
  } else if (column.value == "requester") {
    columnValues.value = requester.value;
  } else if (column.value == "project") {
    columnValues.value = project.value;
  } else if (column.value == "reported") {
    columnValues.value = reported.value;
  } else if (column.value == "actions") {
    columnValues.value = actions.value;
  }
};

const getModificationAnalysis = () => {
  Modifications.getModificationAnalysis()

    .then((response) => {
      status.value = response.data.index.status;
      subcontractor.value = response.data.index.subcontractor;
      project.value = response.data.index.project;
      requester.value = response.data.index.requester;
      actions.value = response.data.index.actions;
      reported.value = response.data.index.reported;
      columns.value = [
        "status",
        "subcontractor",
        "requester",
        "project",
        "actions",
        "reported",
      ];
    })
    .catch((error) => {
      if (error.response.status == 500) {
        serverError.value = error.response.data.message;
      }
    });
};

const submitFilterForm = () => {
  router.push(`/modifications/index/${column.value}/${columnValue.value}`);
};

</script>