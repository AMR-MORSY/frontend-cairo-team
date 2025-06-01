<template>
  <form @submit.prevent="submitUpdateForm()" novalidate>
    <div class="flex justify-evenly flex-wrap gap-2">
      <div class="flex-shrink-0 w-72">
        <div class="flex-auto">
          <label class="font-bold" id="title">Title</label>
          <InputText
            fluid
            :invalid="v$.title.$errors.length > 0"
            v-model.trim="form.title"
            aria-describedby="title"
          />
        </div>
        <div v-if="v$.title.$error">
          <validationErrorMessage :errors="v$.title.$errors" />
        </div>
      </div>

      <div class="flex-shrink-0 w-72">
        <div class="flex-auto">
          <label class="font-bold" id="notice_type">Notice Type</label>
          <Select
            fluid
            :options="notice_type_options"
            v-model.trim="form.notice_type"
            aria-describedby="notice_type"
            optionLabel="name"
            optionValue="id"
            :invalid="v$.notice_type.$errors.length > 0"
          >
          </Select>
        </div>
        <div v-if="v$.notice_type.$error">
          <validationErrorMessage :errors="v$.notice_type.$errors" />
        </div>
      </div>
      <div class="flex-shrink-0 w-72">
        <div class="flex-auto">
          <label class="font-bold" id="is_solved">Solved</label>
          <Select
            fluid
         
            :options="is_solved_options"
            v-model.trim="form.is_solved"
            aria-describedby="is_solved"
            :invalid="v$.is_solved.$errors.length > 0"
          >
          </Select>
        </div>
        <div v-if="v$.is_solved.$error">
          <validationErrorMessage :errors="v$.is_solved.$errors" />
        </div>
      </div>
      <div class="flex-shrink-0">
        <label class="font-bold" id="address">Description</label>
        <Textarea
          fluid
          :invalid="v$.description.$errors.length > 0"
          v-model="form.description"
          aria-describedby="form.description"
          rows="5"
          cols="30"
          style="resize: none"
        />
        <div v-if="v$.description.$error">
          <validationErrorMessage :errors="v$.description.$errors" />
        </div>
      </div>
    </div>
    <div class="w-full flex justify-center">
      <Button
        label="Update"
        class="block"
        type="submit"
        icon="pi pi-external-link"
        severity="success"
        text
        raised
        v-if="action == 'Update'"
      />
      <Button
        label="Insert"
        class="block"
        type="submit"
        icon="pi pi-external-link"
        severity="success"
        text
        raised
        v-else
      />
    </div>
  </form>
</template>
<script setup>
import { maxLength, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";
import Sites from "../../../apis/Sites";
import { inject, computed } from "vue";
import { useConfirm } from "primevue/useconfirm";
import validationErrorMessage from "../validationErrorMessage.vue";
import { reactive, ref } from "vue";
import { onMounted } from "vue";
import { useToast } from "primevue/usetoast";

const dialogRef = inject("dialogRef");
const notice_type_options = ref([]);
const is_solved_options = ref(["Yes","No"]);
const confirm = useConfirm();
const toast = useToast();
const form = reactive({
  title: null,
  description: null,
  site_code: null,
  notice_type: null,
  id: null,
  is_solved: null,
});
const stringReg = helpers.regex(/^[a-zA-Z0-9\-_!@#$%^',:&*(),.?":{}\n\t|<> ]+$/);
const action = ref();

const mountData = async () => {
  await Sites.getNoticeTypes().then((response) => {
    notice_type_options.value = response.data.notice_types;
  });

  if (dialogRef.value.data.action == "Update") {
    form.description = dialogRef.value.data.rowData.description;
    form.id = dialogRef.value.data.rowData.id;
    form.is_solved = dialogRef.value.data.rowData.is_solved;
    form.notice_type = dialogRef.value.data.rowData.notice_type.id;
    form.title = dialogRef.value.data.rowData.title;
  }
  action.value = dialogRef.value.data.action;

  if (dialogRef.value.data.site_code) {
    form.site_code = dialogRef.value.data.site_code;
  }
};

onMounted(() => {
  mountData();
});

const rules = computed(() => ({
  title: {
    maxLength: helpers.withMessage("max 100 characters", maxLength(50)),
    stringReg: helpers.withMessage("Alphbet characters only", stringReg),
    required: helpers.withMessage("Title is required", required),
  },
  description: {
    maxLength: helpers.withMessage("max 1000 characters", maxLength(1000)),
    stringReg: helpers.withMessage("Alphbet characters only", stringReg),
    required: helpers.withMessage("description is required", required),
  },
  is_solved: {
    required: helpers.withMessage("is Solved", required),
  },
  notice_type: {
    required: helpers.withMessage("notice type is required", required),
  },
}));
const v$ = useVuelidate(rules, form);

const showToast = (errorArray) => {
  errorArray.forEach((element) => {
    toast.add({
      severity: "error",
      summary: "Failed",
      detail: element,
      life: 4000,
    });
  });
};
const showErrors = (errors) => {
  if (errors.title) {
    showToast(errors.title);
  }
  if (errors.description) {
    showToast(errors.description);
  }
  if (errors.site_code) {
    showToast(errors.site_code);
  }
  if (errors.id) {
    showToast(errors.id);
  }
  if (errors.is_solved) {
    showToast(errors.is_solved);
  }
};
const submitUpdateForm = async () => {
  confirm.require({
    group: "yesNo",
    message: "Are you sure you want to proceed?",
    header: "Confirmation",
    icon: "pi pi-exclamation-triangle",
    position: "center",
    rejectProps: {
      label: "No",
      severity: "danger",
    },
    acceptProps: {
      label: "Yes",
      severity: "success",
    },
    accept: async () => {
      confirm.close();
      const isFormCorrect = await v$.value.$validate();
      if (!isFormCorrect) {
        return;
      }

      if (action.value == "Update") {
        console.log(form);
        Sites.updateSiteNotice(form)
          .then((response) => {
            if (response.data.message == "success") {
              toast.add({
                severity: "success",
                summary: "Success Message",
                detail: "Updated Successfully",
                life: 3000,
              });
              dialogRef.value.close();
            }
          })
          .catch((error) => {
            if (error.response.status == 204) {
              toast.add({
                severity: "info",
                summary: "Success Message",
                detail: "site instrument not found",
                life: 3000,
              });
            }
            if (error.response.status == 422) {
              let errors = error.response.data.errors;
              showErrors(errors);
            }
          });
      } else {
        Sites.createSiteNotice(form)
          .then((response) => {
            if (response.data.message == "success") {
              toast.add({
                severity: "success",
                summary: "Success Message",
                detail: "Inserted Successfully",
                life: 3000,
              });
              dialogRef.value.close();
            }
          })
          .catch((error) => {
            if (error.response.status == 204) {
              toast.add({
                severity: "info",
                summary: "Success Message",
                detail: "site instrument not found",
                life: 3000,
              });
            }
            if (error.response.status == 422) {
              let errors = error.response.data.errors;

              showErrors(errors);
            }
          });
      }
    },
    reject: () => {
      confirm.close();
    },
  });
};
</script>
