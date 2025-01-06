<template>
    <div class=" w-screen-2xl px-10 py-20">

        <Card class=" max-w-screen-md mx-auto">
            <template #header>
                <p class=" text-xl font-extrabold mt-8 text-font-main-color w-full text-center font-Signika">{{
                    technology }}</p>
            </template>
            <template #content>
                <form id="energysheet" @submit.prevent="submitNurSheet" enctype="multipart/form-data">


                    <div class="grid grid-cols-2 gap-4">


                        <div class="col-span-2 md:col-span-1">
                            <div class="flex-auto">
                                <label for="weeks" class=" font-bold">Week:</label>
                                <Select v-model="week" id="weeks" fluid :options="weeks"
                                    :invalid="v$.week.$errors.length > 0" />


                            </div>
                            <div v-if="v$.week.$error">

                                <validationErrorMessage :errors="v$.week.$errors" />
                            </div>
                        </div>
                        <div class="col-span-2 md:col-span-1">
                            <div class="flex-auto">
                                <label for="year" class=" font-bold">Year:</label>
                                <Select v-model="year" id="year" fluid :invalid="v$.year.$errors.length > 0"
                                    :options="years" />



                            </div>
                            <div v-if="v$.year.$error">

                                <validationErrorMessage :errors="v$.year.$errors" />
                            </div>
                        </div>



                        <div class="col-span-2 md:col-span-1">
                            <div class="flex-auto">
                                <label for="power" class=" font-bold">{{ tech }} Cells:</label>
                                <InputNumber fluid showButtons v-model="cells" :invalid="v$.cells.$errors.length > 0"
                                    :min="0" />

                            </div>
                            <div v-if="v$.cells.$error">

                                <validationErrorMessage :errors="v$.cells.$errors" />
                            </div>
                        </div>

                        <div class="col-span-2 md:col-span-1">
                            <div class="flex-auto">
                                <label for="power" class=" font-bold">Total Net.Cells:</label>
                                <InputNumber fluid showButtons v-model="total_net_cells" :min="0"
                                    :invalid="v$.total_net_cells.$errors.length > 0" />

                            </div>
                            <div v-if="v$.total_net_cells.$error">

                                <validationErrorMessage :errors="v$.total_net_cells.$errors" />
                            </div>

                        </div>
                        <div class="col-span-2 ">
                            <div class="flex justify-start">
                                <!-- <label for="power" class=" font-bold">2G Sheet:</label> -->
                                <!-- <input type="file" name="energy_sheet" class="form-control" id="energy_sheet"
                                    @change="Nur2GSheetFile" /> -->
                                <FileUpload ref="NurSheet" mode="basic" accept=".xlsx,.csv,.xlsm"
                                    :maxFileSize="1000000" />

                            </div>
                            <div v-if="v$.NurSheet.$error">

                                <validationErrorMessage :errors="v$.NurSheet.$errors" />
                            </div>
                        </div>


                    </div>
                    <div class=" w-full flex justify-center mt-8">
                        <Button class=" block " severity="info" raised type="submit" label="Submit" />

                    </div>
                </form>

                <div class="helper-table-container">
                    <helper-table v-if="sheetValidationErrors">
                        <template #header>
                            <th scope="col">Row</th>
                            <th scope="col">Attribute</th>
                            <th scope="col">Errors</th>
                            <th scope="col">Values</th>
                        </template>
                        <template #body>
                            <tr style="background-color: white; color: red" v-for="error in sheetValidationErrors"
                                :key="error">
                                <td class="text-left align-middle">{{ error.row }}</td>
                                <td class="text-left align-middle">{{ error.attribute }}</td>
                                <td class="text-left align-middle">
                                    <ul v-for="rowError in error.errors" :key="rowError">
                                        <li>{{ rowError }}</li>
                                    </ul>
                                </td>
                                <td class="text-left align-middle">
                                    <ul>
                                        <li>
                                            Site Code:{{ error.values["problem source site code"] }}
                                        </li>
                                        <li>
                                            Site Name:{{ error.values["problem source site name"] }}
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                        </template>
                    </helper-table>
                </div>

            </template>



        </Card>


    </div>
</template>

<script setup>
import { useToast } from 'primevue/usetoast';
import { computed } from 'vue';

import { ref, onMounted, } from 'vue';

import { required, requiredIf } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { helpers } from '@vuelidate/validators';
import NUR from '../../../apis/NUR';
import validationErrorMessage from '../validationErrorMessage.vue';

const toast = useToast();

const mustIncludeFile = (value) => {
    if (value.files[0]) {
        return true;

    }
    return false;
}

const greaterThan = (value) => {
    if (value > cells.value) {
        return true;

    }

    return false;

}

const lessThan = (value) => {
    if (value > total_net_cells.value) {
        return false;

    }

    return true;

}


const weeks = ref([])
const years = ref([])
const year = ref()
const week = ref()
const cells = ref(0)
const total_net_cells = ref(0)
const NurSheet = ref(null)

const props = defineProps([
    "technology"
])
const tech = ref(props.technology)

// const cellsErrors = ref(null)
// const total_net_cellsErrors = ref(null)

const sheetValidationErrors = ref(null)

// const yearErrors = ref(null)

// const weekErrors = ref(null)

// const Nur2GSheetErrors = ref(null)

// const successMessage = ref(null)



const rules = computed(() => ({
    year: {
        required: helpers.withMessage('Select a year', required),
    },
    week: {
        required: helpers.withMessage('Select a week', required),

    },
    cells: {

        required: helpers.withMessage(`${tech.value} cells is required`, required),
        lessThan: helpers.withMessage('Tech.cells must be less than total network cells', lessThan),

    },
    total_net_cells: {
        required: helpers.withMessage('Total network cells is required', required),
        greaterThan: helpers.withMessage('Total network cells must be greater than tech.cells', greaterThan),

    },
    NurSheet: {
        mustIncludeFile: helpers.withMessage('NUR sheet is required', mustIncludeFile),


    },




}))


const v$ = useVuelidate(rules, { week, year, cells, NurSheet, total_net_cells });


const showToast = (errorArray) => {
    errorArray.forEach((element) => {
        toast.add({
            severity: "error",
            summary: "Failed",
            detail: element,
            life: 4000,
        });
    });

}
const showErrors = (errors, error) => {
    if (errors) {
        if (errors.week) {
            showToast(errors.week)
        }
        else if (errors.year) {
            showToast(errors.year)
        }
        else if (errors.Nur2G_sheet) {
            showToast(errors.Nur2G_sheet)
        }
        else if (errors.Nur3G_sheet) {
            showToast(errors.Nur3G_sheet)
        }
        else if (errors.Nur4G_sheet) {
            showToast(errors.Nur4G_sheet)
        }
        else if (errors.cells) {
            showToast(errors.cells)
        }
        else if (errors.total_net_cells) {
            showToast(errors.total_net_cells)
        }

    }
    else if (error) {
        if (error.response.data.sheet_errors) {
            sheetValidationErrors.value = error.response.data.sheet_errors;
        } else if (error.response.data.week_year) {
            toast.add({
                severity: "error",
                summary: "Failed",
                detail: error.response.data.week_year,
                life: 4000,
            })

        }



    }






}
const submitNurSheet = async () => {
    sheetValidationErrors.value=(null);

    const isFormCorrect = await v$.value.$validate()
    if (!isFormCorrect) {
        return

    }
    var data = {

        week: week.value,
        year: year.value,
        cells: cells.value,
        total_net_cells: total_net_cells.value
    };

    if (props.technology == '2G') {
        data.Nur2G_sheet = NurSheet.value.files[0]
        NUR.submit2GNurSheet(data)

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
                if (error.response) {
                 

                    if (error.response.status == 422) {
                        if (error.response.data.errors) {
                            var errors = error.response.data.errors;
                            showErrors(errors, null)

                        } else if (error.response.data.sheet_errors) {
                            showErrors(null, error)
                        } else if (error.response.data.week_year) {
                            showErrors(null, error)
                        }
                    }
                    else if (error.response.status == 500) {
                        toast.add({
                            severity: "error",
                            summary: "Failed",
                            detail: error.response.data.message,
                            life: 4000,

                        })

                    }
                }

            })

    }
    else if (props.technology == '3G') {
        data.Nur3G_sheet = NurSheet.value.files[0]
        NUR.submit3GNurSheet(data)

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
                if (error.response) {
                    console.log(error.response);

                    if (error.response.status == 422) {
                        if (error.response.data.errors) {
                            var errors = error.response.data.errors;
                            showErrors(errors, null)

                        } else if (error.response.data.sheet_errors) {
                            showErrors(null, error)
                        } else if (error.response.data.week_year) {
                            showErrors(null, error)
                        }
                    }
                    else if (error.response.status == 500) {
                        toast.add({
                            severity: "error",
                            summary: "Failed",
                            detail: error.response.data.message,
                            life: 4000,

                        })

                    }
                }
            })


    }
    else if (props.technology == '4G') {
        data.Nur4G_sheet = NurSheet.value.files[0]
        NUR.submit4GNurSheet(data)

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
                if (error.response) {
                    console.log(error.response);

                    if (error.response.status == 422) {
                        if (error.response.data.errors) {
                            var errors = error.response.data.errors;
                            showErrors(errors, null)

                        } else if (error.response.data.sheet_errors) {
                            showErrors(null, error)
                        } else if (error.response.data.week_year) {
                            showErrors(null, error)
                        }
                    }
                    else if (error.response.status == 500) {
                        toast.add({
                            severity: "error",
                            summary: "Failed",
                            detail: error.response.data.message,
                            life: 4000,

                        })

                    }
                }
            })


    }
}

onMounted(() => {
    for (var i = 1; i <= 52; i++) {

        weeks.value.push(i);
    }
    for (var i = 2022; i <= 2050; i++) {
        years.value.push(i);

    }
})


</script>

<style lang="scss" scoped>
.index,
.helper-table-container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 2rem;
}
.index {
  margin-top: 6em;
  .header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    p {
      font-size: 2rem;
      font-weight: 900;
      color: darkmagenta;
    }
  }
}
</style>