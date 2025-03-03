<template>
  <!-- <div class="container mt-5">
    <div class="card index">
      <form id="energysheet" @submit.prevent="submitEnergySheet" enctype="multipart/form-data">

        <div class="row">
          <div class="col-12">
            <div v-if="serverError">
              {{ serverError }}
            </div>
          </div>
          <h5 class="text-center">Energy</h5>

          <div class="col-12 col-md-6 mb-2">
            <div class="form-group">
              <select v-model="week" id="weeks" class="form-select">
                <option value="">select week</option>

                <option v-for="week in weeks" :key="week">{{ week }}</option>
              </select>
              <div v-if="weekErrors">
                <ul>
                  <li v-for="error in weekErrors" style="color: red" :key="error">
                    {{ error }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6 mb-2">
            <div class="form-group">
              <select v-model="year" class="form-select">
                <option value="">select year</option>

                <option v-for="year in years" :key="year">{{ year }}</option>
              </select>
              <div v-if="yearErrors">
                <ul>
                  <li v-for="error in yearErrors" style="color: red" :key="error">
                    {{ error }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-6 mb-2">
            <div class="form-group">
              <label for="power">Energy Sheet:</label>
              <input type="file" name="energy_sheet" class="form-control" id="energy_sheet" @change="energySheetFile" />
              <div v-if="energySheetErrors">
                <ul>
                  <li v-for="error in energySheetErrors" style="color: red" :key="error">
                    {{ error }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="col-12 mt-2">
            <spinner-button type="submit" :show-spinner="showSpinner" class="btn"
              style="background-color:#79589f;color:white;">
              <span> Submit</span>
            </spinner-button>
          </div>
        </div>
      </form>
    </div>
    <div class="helper-table-container">
      <helper-table v-if="sheetValidationErrors">
        <template #header>
          <th scope="col">Row</th>
          <th scope="col">Attribute</th>
          <th scope="col">Errors</th>
          <th scope="col">Values</th>
        </template>
        <template #body>
          <tr style="background-color: white; color: red" v-for="error in sheetValidationErrors" :key="error">
            <td class="text-left align-middle">{{ error.row }}</td>
            <td class="text-left align-middle">{{ error.attribute }}</td>
            <td class="text-left align-middle">
              <ul v-for="rowError in error.errors" :key="rowError">
                <li>{{ rowError }}</li>
              </ul>
            </td>
            <td class="text-left align-middle">
              <ul>
                <li>Site Code:{{ error.values["Site Code"] }}</li>
                <li>Site Name:{{ error.values["Site Name"] }}</li>
                <li>Site Name:{{ error.values["Alarm Name"] }}</li>
              </ul>
            </td>
          </tr>
        </template>
      </helper-table>
    </div>
  </div>
  <modal :visible="showModal">
    <template #body>
      <p class="text-center">{{ successMessage }}</p>
    </template>
    <template #footer>
      <button class="btn btn-danger" @click="closeModal">close</button>
    </template>
  </modal> -->

  <div class="w-screen-2xl px-10 py-20">
    <Card class="max-w-screen-md mx-auto">
      <template #header>
        <h5
          class="text-center mt-6 font-bold text-font-main-color font-Signika"
        >
          Energy
        </h5>
      </template>
      <template #content>
        <form
          id="energysheet"
          @submit.prevent="submitEnergySheet"
          enctype="multipart/form-data"
        >
          <div class="grid grid-cols-4 gap-4">
            <div class="col-span-4">
              <div v-if="serverError">
                {{ serverError }}
              </div>
            </div>

            <div class="col-span-4 md:col-span-1">
              <div class="flex-auto">
                <label for="weeks" class="font-bold">Week:</label>
                <Select
                  v-model="week"
                  id="weeks"
                  fluid
                  :options="weeks"
                  :invalid="v$.week.$errors.length > 0"
                />
              </div>
              <div v-if="v$.week.$error">
                <validationErrorMessage :errors="v$.week.$errors" />
              </div>
              <!-- <div class="form-group">
                <select v-model="week" id="weeks" class="form-select">
                  <option value="">select week</option>

                  <option v-for="week in weeks" :key="week">{{ week }}</option>
                </select>
                <div v-if="weekErrors">
                  <ul>
                    <li
                      v-for="error in weekErrors"
                      style="color: red"
                      :key="error"
                    >
                      {{ error }}
                    </li>
                  </ul>
                </div>
              </div> -->
            </div>
            <div class="col-span-4 md:col-span-1">
              <!-- <div class="form-group">
                <select v-model="year" class="form-select">
                  <option value="">select year</option>

                  <option v-for="year in years" :key="year">{{ year }}</option>
                </select>
                <div v-if="yearErrors">
                  <ul>
                    <li
                      v-for="error in yearErrors"
                      style="color: red"
                      :key="error"
                    >
                      {{ error }}
                    </li>
                  </ul>
                </div>
              </div> -->
              <div class="flex-auto">
                <label for="weeks" class="font-bold">Year:</label>
                <Select
                  v-model="year"
                  id="weeks"
                  fluid
                  :options="years"
                  :invalid="v$.year.$errors.length > 0"
                />
              </div>
              <div v-if="v$.year.$error">
                <validationErrorMessage :errors="v$.year.$errors" />
              </div>
            </div>

            <div class="col-span-4 md:col-span-1 mb-2">
              <div class="flex justify-start">
             
                <FileUpload
                  ref="energySheet"
                  mode="basic"
                  accept=".xlsx,.csv,.xlsm"
                  :maxFileSize="2000000"
                />
              </div>
              <div v-if="v$.energySheet.$error">
                <validationErrorMessage :errors="v$.energySheet.$errors" />
              </div>
           
            </div>

            <div class="col-span-4 mt-2">
              <Button
                label="Submit"
                class="block"
                severity="info"
                type="submit"
              />
            </div>
          </div>
        </form>

       

        <div class="w-100" v-if="sheetValidationErrors.length>0">
          <DataTable
            :value="sheetValidationErrors"
            scrollable
            :paginator="true"
            :rows="5"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 15]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
            class="text-sm"
            tableStyle="min-width: 50rem"
          >
            <Column field="row" header="Row"   class="font-Signika text-font-main-color"></Column>
            <Column field="attribute" header="Attribute"   class="font-Signika text-font-main-color"></Column>
            <Column field="errors" header="Errors"   class="font-Signika text-font-main-color">
              <template #body="slotProps">
                <strong
                  class="font-Signika text-font-main-color"
                  v-for="error in slotProps.data.errors"
                  :key="error"
                >
                  {{ error }}
                </strong>
              </template>
            </Column>
            <Column field="values" header="Values">
              <template #body="slotProps">
                <p>
                  <strong
                    class="font-Signika text-font-main-color font-semibold"
                    >Site Code:</strong
                  >
                  {{ slotProps.data.values["site code"] }}
                </p>
                <p>
                  <strong
                    class="font-Signika text-font-main-color font-semibold"
                    >site Name:</strong
                  >
                  {{ slotProps.data.values["site name"] }}
                </p>
              
              </template>
            </Column>
          </DataTable>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import Energy from "../../../apis/Energy";
import { ref, onMounted, computed } from "vue";
import validationErrorMessage from "../../helpers/validationErrorMessage.vue";
import { useVuelidate } from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";
import { required, requiredIf } from "@vuelidate/validators";
import { useToast } from "primevue/usetoast";

const weeks = ref([]);
const years = ref([]);
const year = ref();
const week = ref();
const energySheet = ref(null);
const sheetValidationErrors = ref([]);
const toast = useToast();
const mustIncludeFile = (value) => {
  if (value.files[0]) {
    return true;
  }
  return false;
};
const yearErrors = ref(null);

const weekErrors = ref(null);

const energySheetErrors = ref(null);
const serverError = ref(null);

const rules = computed(() => ({
  year: {
    required: helpers.withMessage("Select a year", required),
  },
  week: {
    required: helpers.withMessage("Select a week", required),
  },

  energySheet: {
    mustIncludeFile: helpers.withMessage(
      "Energy sheet is required",
      mustIncludeFile
    ),
  },
}));

const v$ = useVuelidate(rules, { week, year, energySheet });

const getEnergySheetIndex = () => {
  serverError.value = null;
  yearErrors.value = null;
  weekErrors.value = null;

  Energy.getEnergySheetIndex()
    .then((response) => {
      weeks.value = response.data.weeks;
      years.value = response.data.years;
    })
    .catch((error) => {
      if (error.response.status == 500) {
        serverError.value = "internal Server Error";
      }
    });
};

const showErrors = (errors, error) => {
  if (errors) {
    if (errors.week) {
      showToast(errors.week);
    } else if (errors.year) {
      showToast(errors.year);
    } else if (errors.energy_sheet) {
      showToast(errors.energy_sheet);
    } 
  } else if (error) {
    if (error.response.data.sheet_errors) {
      sheetValidationErrors.value = error.response.data.sheet_errors;
    } else if (error.response.data.week_year) {
      toast.add({
        severity: "error",
        summary: "Failed",
        detail: error.response.data.week_year,
        life: 4000,
      });
    }
  }
};
const submitEnergySheet = async () => {
  // weekErrors.value = null;
  // serverError.value = null;
  // yearErrors.value = null;
  sheetValidationErrors.value =[];

  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    return;
  }
  var data = {
    energy_sheet: energySheet.value.files[0],
    week: week.value,
    year: year.value,
  };

  
    Energy.submitEnergySheet(data)
      .then((response) => {
        console.log(response.data.message);
        toast.add({
          severity: "success",
          summary: "Success Message",
          detail: "inserted Successfully",
          life: 3000,
        });
      })
    .catch((error) => {
      console.log(error)
      if (error.response) {
        if (error.response.status == 422) {
          if (error.response.data.errors) {
            var errors = error.response.data.errors;
            showErrors(errors, null);
          } else if (error.response.data.sheet_errors) {
            showErrors(null, error);
          } else if (error.response.data.week_year) {
            showErrors(null, error);
          }
        } else if (error.response.status == 500) {
          toast.add({
            severity: "error",
            summary: "Failed",
            detail: error.response.data.message,
            life: 4000,
          });
        }
      }
    });
};

onMounted(() => {
  getEnergySheetIndex();
});

</script>

<style lang="scss" scoped>

@media (min-width: 320px) {
  /* smartphones, iPhone, portrait 480x320 phones */

  .card {
    width: 95%;
  }
}
@media (min-width: 481px) {
  /* portrait e-readers (Nook/Kindle), smaller tablets @ 600 or @ 640 wide. */

  .card {
    width: 90%;
  }
}

@media (min-width: 641px) {
  /* portrait tablets, portrait iPad, landscape e-readers, landscape 800x480 or 854x480 phones */

  .card {
    width: 80%;
  }
}
@media (min-width: 961px) {
  /* tablet, landscape iPad, lo-res laptops ands desktops */
  #analysis {
    .card {
      width: 80%;
    }
  }
}
@media (min-width: 1025px) {
  /* big landscape tablets, laptops, and desktops */

  .card {
    width: 75%;
  }
}
</style>
