<template>


    <h3 class=" text-font-main-color text-lg font-bold text-center w-full py-8">Battery {{ action }}</h3>


    <form @submit.prevent="submitUpdateForm()" novalidate>
        <div class="grid grid-cols-4 gap-4">
            <input type="hidden" v-model.trim="form.site_code">

            <div class="col-span-4 md:col-span-2 lg:col-span-1  ">
                <div class=" flex-auto">
                    <label class=" block font-bold" id="Battery-Brand">Battery Brand</label>
                    <InputText :invalid="v$.form.batteries_brand.$error" fluid
                        v-model.trim="v$.form.batteries_brand.$model" aria-describedby="Battery-Brand" />


                </div>
                <div v-if="v$.form.batteries_brand.$error">

                    <validationErrorMessage :errors="v$.form.batteries_brand.$errors" />
                </div>

            </div>
            <div class="col-span-4 md:col-span-2 lg:col-span-1  ">
                <div class=" flex-auto">
                    <label class=" block font-bold" id="Battery-Volt">Battery Volt</label>
                    <InputText class="form-control w-50 " :invalid="v$.form.battery_volt.$error"
                        v-model.trim="v$.form.battery_volt.$model" fluid aria-describedby="Battery-Volt" />

                </div>
                <div v-if="v$.form.battery_volt.$error">
                    <validationErrorMessage :errors="v$.form.battery_volt.$errors" />
                </div>
            </div>
            <div class="col-span-4 md:col-span-2 lg:col-span-1  ">
                <div class=" flex-auto">
                    <label class=" block font-bold" id="Battery-amp">Battery Amp</label>
                    <InputText class="form-control w-50 " fluid :class="{ 'is-invalid': v$.form.battery_amp_hr.$error }"
                        v-model.trim="v$.form.battery_amp_hr.$model" aria-describedby="Battery-amp" />

                </div>
                <div v-if="v$.form.battery_amp_hr.$error">
                    <validationErrorMessage :errors="v$.form.battery_amp_hr.$errors" />
                </div>
            </div>
            <div class="col-span-4 md:col-span-2 lg:col-span-1  ">
                <div class=" flex-auto">
                    <label class=" block font-bold" id=" No.Strings">No.Strings</label>
                    <InputNumber class="form-control w-50 " :min="0" :max="100" showButtons fluid
                        :invalid="v$.form.no_strings.$error" v-model.trim="v$.form.no_strings.$model"
                        aria-describedby="No.Strings" />

                </div>
                <div v-if="v$.form.no_strings.$error">
                    <validationErrorMessage :errors="v$.form.no_strings.$errors" />
                </div>
            </div>
            <div class="col-span-4 md:col-span-2 lg:col-span-1  ">
                <div class=" flex-auto">
                    <label class=" block font-bold" id="no_batteries">Category</label>
                    <Select fluid :invalid="v$.form.category.$error" v-model="v$.form.category.$model"
                        :options="categoryOptions" aria-describedby="no_batteries">

                    </Select>

                </div>
                <div v-if="v$.form.category.$error">
                    <validationErrorMessage :errors="v$.form.category.$errors" />
                </div>
            </div>
            <div class="col-span-4 md:col-span-2 lg:col-span-1  ">
                <div class=" flex-auto">
                    <label class=" block font-bold" id="Battery-Brand">Stock</label>
                    <InputText fluid :invalid="v$.form.stock.$error" v-model.trim="v$.form.stock.$model"
                        aria-describedby="Battery-Brand" />


                </div>
                <div v-if="v$.form.stock.$error">
                    <validationErrorMessage :errors="v$.form.stock.$errors" />
                </div>
            </div>
            <div class="col-span-4 md:col-span-2 lg:col-span-1  ">
                <div class=" flex-auto">
                    <label class=" block font-bold" id="batteries_status">Batteries Status</label>
                    <InputText fluid :invalid="v$.form.batteries_status.$error"
                        v-model.trim="v$.form.batteries_status.$model" aria-describedby="batteries_status" />

                </div>
                <div v-if="v$.form.batteries_status.$error">
                    <validationErrorMessage :errors="v$.form.batteries_status.$errors" />
                </div>
            </div>

            <div class="col-span-4 md:col-span-2 lg:col-span-1 ">
                <div class=" flex-auto">
                    <label class=" block font-bold">Comment:</label>
                    <Textarea fluid rows="1" cols="10" :invalid="v$.form.comment.$error"
                        v-model.trim="v$.form.comment.$model" aria-describedby="comment"></Textarea>

                </div>
                <div v-if="v$.form.comment.$error">
                    <validationErrorMessage :errors="v$.form.comment.$errors" />
                </div>
            </div>


            <div class="col-span-4 md:col-span-2 lg:col-span-1">
                <div class=" flex-auto">
                    <label class=" block font-bold" for="theft_case">Theft Case:</label>

                    <Datepicker v-model.trim="form.theft_case" :state="!v$.form.theft_case.$error" id="theft_case" />



                </div>
                <div v-if="v$.form.theft_case.$error">
                    <validationErrorMessage :errors="v$.form.theft_case.$errors" />
                </div>

            </div>
            <div class="col-span-4 md:col-span-2 lg:col-span-1 ">
                <div class=" flex-auto">
                    <label for="on_air_date" class=" block font-bold">Installation Date:</label>

                    <Datepicker v-model.trim="form.installation_date" :state="!v$.form.installation_date.$error"
                        id="on_air_date" />


                </div>
                <div v-if="v$.form.installation_date.$error">
                    <validationErrorMessage :errors="v$.form.installation_date.$errors" />
                </div>

            </div>
            <div class="col-span-4 md:col-span-2 lg:col-span-1">
                <div class="button-container">
                    <Button :label="action" type="submit" icon="pi pi-external-link" severity="success" text raised />

                </div>
            </div>





        </div>
    </form>
















</template>

<script>
import { maxLength, minLength, integer, required, requiredIf } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { helpers } from '@vuelidate/validators';
import Sites from '../../../apis/Sites';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import validationErrorMessage from '../validationErrorMessage.vue';
export default {
    setup: () => ({ v$: useVuelidate() }),
    data() {


        return {
            form: {
                batteries_brand: null,
                battery_volt: null,
                battery_amp_hr: null,
                no_strings: null,
                stock: null,
                batteries_status: null,
                comment: null,
                site_code: null,
                id: null,
                installation_date: null,
                theft_case: null,
                category: null,




            },
            topic: null,
            action: "insert",
            displayDatesError: false,
            categoryOptions: ['Tested', 'New', 'Used']


        };
    },
    validations() {
        const stringReg = helpers.regex(/^[a-zA-Z0-9 \/+]+$/);

        return {


            form: {
                batteries_brand: {

                    minLength: helpers.withMessage("min 3 characters", minLength(3)),
                    maxLength: helpers.withMessage("max 50 characters", maxLength(50)),
                    stringReg: helpers.withMessage("alphanumeric only", stringReg),
                    required: helpers.withMessage("batteries brand is required", required),


                },

                battery_volt: {

                    maxLength: helpers.withMessage("max 50 characters", maxLength(50)),
                    stringReg: helpers.withMessage("alphanumeric only", stringReg),



                },
                battery_amp_hr: {

                    maxLength: helpers.withMessage("max 50 characters", maxLength(50)),
                    stringReg: helpers.withMessage("alphanumeric only", stringReg),

                },
                no_strings: {

                    integer: helpers.withMessage("max 50 strings", integer),
                    required: helpers.withMessage("number of strings is required", required),

                },
                stock: {

                    maxLength: helpers.withMessage("max 50 characters", maxLength(50)),
                    stringReg: helpers.withMessage("alphanumeric only", stringReg),

                },
                category: {

                    maxLength: helpers.withMessage("max 50 characters", maxLength(50)),
                    stringReg: helpers.withMessage("alphanumeric only", stringReg),
                    required: helpers.withMessage("Category is required", required),

                },
                batteries_status: {
                    minLength: helpers.withMessage("min 3 characters", minLength(3)),
                    maxLength: helpers.withMessage("max 50 characters", maxLength(50)),
                    stringReg: helpers.withMessage("alphanumeric only", stringReg),

                },
                comment: {

                    maxLength: helpers.withMessage("max 250 characters", maxLength(50)),
                    stringReg: helpers.withMessage("alphanumeric only", stringReg),

                },
                theft_case: {
                    requiredIf: helpers.withMessage("theft case date is required", requiredIf(this.form.installation_date == null)),

                },
                installation_date: {
                    requiredIf: helpers.withMessage("installation date is required", requiredIf(this.form.theft_case == null)),
                }


            },

        }
    },
    name: "BatteriesUpdate",
    components: {
        validationErrorMessage

    },
    inject: ["dialogRef"],
    watch: {
        $route(to, from) {
            if (to.path == "/user/login") {
                this.dialogRef.close();
            }

        }

    },

    mounted() {
        this.mountData()

    },
    methods: {
        mountData() {
            if (this.dialogRef.data.action == "update") {
                this.form.batteries_brand = this.dialogRef.data.battery.batteries_brand;
                this.form.battery_volt = this.dialogRef.data.battery.battery_volt;
                this.form.battery_amp_hr = this.dialogRef.data.battery.battery_amp_hr;
                this.form.no_strings = this.dialogRef.data.battery.no_strings;
                this.form.stock = this.dialogRef.data.battery.stock;
                this.form.category = this.dialogRef.data.battery.category;
                this.form.site_code = this.dialogRef.data.battery.site_code;
                this.form.comment = this.dialogRef.data.battery.comment;
                this.form.batteries_status = this.dialogRef.data.battery.batteries_status;
                this.form.id = this.dialogRef.data.battery.id;
                this.form.installation_date = this.dialogRef.data.battery.installation_date;
                this.form.theft_case = this.dialogRef.data.battery.theft_case;
                this.action = "update"

            }
            else {
                this.form.site_code = this.dialogRef.data.site_code;
            }


        },
        showToasts(errors) {
            errors.forEach((element) => {
                this.$toast.add({
                    severity: "danger",
                    summary: "Error Message",
                    detail: element,
                    life: 3000,
                });

            })

        },
        showErrors(error) {
            if (error.response.status == 422) {
                let errors = error.response.data[0];
                if (errors.batteries_brand) {
                    this.showToasts(errors.batteries_brand)

                }
                if (errors.battery_amp_hr) {
                    this.showToasts(errors.battery_amp_hr)

                }
                if (errors.battery_volt) {
                    this.showToasts(errors.battery_volt)

                }
                if (errors.batteries_status) {
                    this.showToasts(errors.batteries_status)

                }
                if (errors.comment) {
                    this.showToasts(errors.comment)

                }
                if (errors.stock) {
                    this.showToasts(errors.stock)

                }
                if (errors.no_strings) {
                    this.showToasts(errors.no_strings)

                }
                if (errors.category) {
                    this.showToasts(errors.category)

                }
                if (errors.site_code) {
                    this.showToasts(errors.site_code)

                }



            }



        },
        async submitUpdateForm() {

            const isFormCorrect = await this.v$.$validate()

            if (!isFormCorrect) return

            if (this.form.installation_date == null && this.form.theft_case == null) {
                this.displayDatesError = true;
                return

            }

            if (this.action == "update") {

                Sites.updateBatteriesData(this.form.id, this.form).then((response) => {
                    if (response.data.success == true) {
                        this.$toast.add({
                            severity: "success",
                            summary: "Success Message",
                            detail: "Updated Successfully",
                            life: 3000,
                        });

                    }

                }).catch((error) => {
                    this.showErrors(error)

                });

            }
            else {
                Sites.insertNewBatterydata(this.form).then((response) => {
                    if (response.data.success == true) {
                        this.$toast.add({
                            severity: "success",
                            summary: "Success Message",
                            detail: "New Batteries data inserted Successfully",
                            life: 3000,
                        });

                    }

                }).catch((error) => {
                    this.showErrors(error)

                });


            }








        }


    },
}
</script>

<style lang="scss" scoped>
.input-group {
    width: 100%;
    margin-bottom: 1rem;
}

.button-container {

    width: 100%;
    display: flex;
    justify-content: flex-start;
    margin-top: 1em;

}

@media screen and (min-width:320px) and (max-width: 480px) {

    /* smartphones, iPhone, portrait 480x320 phones */

}

@media screen and (min-width:481px) and (max-width: 640px) {

    /* portrait e-readers (Nook/Kindle), smaller tablets @ 600 or @ 640 wide. */


}

@media screen and (min-width:641px) and (max-width: 960) {

    /* portrait tablets, portrait iPad, landscape e-readers, landscape 800x480 or 854x480 phones */

}
</style>