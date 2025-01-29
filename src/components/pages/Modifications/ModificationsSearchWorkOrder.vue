<template>
 
  <section id="analysis" class="w-screen-2xl px-10 py-40">
    <Card class="max-w-sm md:max-w-screen-sm mx-auto">
      <template #content>
        <div class="w-full">
          <h5
            class="font-Signika font-bold text-font-main-color text-center text-lg mb-5"
          >
            Modifications BY Work Order
          </h5>
        </div>
        <form @submit.prevent="submitSearch">
         
          <InputGroup>
            <InputText
              placeholder="Search"
              type="text"
              fluid
              v-model="search"
                :invalid="v$.search.$errors.length > 0"
            />
            <Button label="Search" severity="info" size="small" type="submit" />
          </InputGroup>
          <div v-if="v$.search.$error">
            <validationErrorMessage :errors="v$.search.$errors" />
          </div>
        </form>
      </template>
    </Card>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { maxLength, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";
import validationErrorMessage from "../../helpers/validationErrorMessage.vue";

const search = ref(null);

const nameReg = helpers.regex(/^[a-zA-Z0-9 _-]{3,}$/);

const rules = computed(() => ({
  search: {
    required: helpers.withMessage("Work order code is required", required),
   
    nameReg: helpers.withMessage(
      "please enter a valid work order code",
      nameReg
    ),
  },
}));
const v$ = useVuelidate(rules, { search });

const submitSearch = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) return;
};
</script>
