<template>

    <h3 class=" text-font-main-color text-lg font-bold text-center w-full py-8">{{ topic }}</h3>

    <form @submit.prevent="submitUpdateForm()" novalidate>
        <div class="grid grid-cols-3 gap-4">

            <div class="col-span-3 md:col-span-2 lg:col-span-1">
                <div class="flex-auto">
                    <label class="font-bold" id="power_source">Power Source</label>
                    <InputText fluid :invalid="v$.form.power_source.$error" v-model.trim="v$.form.power_source.$model"
                        aria-describedby="power_source" />


                </div>
                <div v-if="v$.form.power_source.$error">
                    <validationErrorMessage :errors="v$.form.power_source.$errors" />
                </div>

            </div>
            <div class="col-12 col-md-6 col-xl-4  ">
                <div class="flex-auto">
                    <label class="font-bold" id="power_meter_type">PM type</label>
                    <InputText fluid :invalid="v$.form.power_meter_type.$error"
                        v-model.trim="v$.form.power_meter_type.$model" aria-describedby="power_meter_type" />

                </div>
                <div v-if="v$.form.power_meter_type.$error">
                    <validationErrorMessage :errors="v$.form.power_meter_type.$errors" />
                </div>
            </div>
            <div class="col-12 col-md-6 col-xl-4  ">
                <div class="flex-auto">
                    <label class="font-bold" id="power_cable_cross_sec">Gen Config</label>
                    <InputText fluid :invalid="v$.form.gen_config.$error"
                        v-model.trim="v$.form.gen_config.$model" aria-describedby="gen_config" />

                </div>
                <div v-if="v$.form.gen_config.$error">
                    <validationErrorMessage :errors="v$.form.gen_config.$errors" />
                </div>
            </div>
            <div class="col-12 col-md-6 col-xl-4  ">
                <div class="flex-auto">
                    <label class="font-bold" id="power_cable_length">Gen Serial</label>
                    <InputText fluid :invalid="v$.form.gen_serial.$error"
                        v-model.trim="v$.form.gen_serial.$model" aria-describedby="gen_serial" />

                </div>
                <div v-if="v$.form.gen_serial.$error">
                    <validationErrorMessage :errors="v$.form.gen_serial.$errors" />
                </div>
            </div>
            <div class="col-12 col-md-6 col-xl-4  ">
                <div class="flex-auto">
                    <label class="font-bold" id="gen_capacity">Gen Capacity</label>
                    <InputText fluid :invalid="v$.form.gen_capacity.$error" v-model.trim="v$.form.gen_capacity.$model"
                        aria-describedby="gen_capacity" />

                </div>
                <div v-if="v$.form.gen_capacity.$error">
                    <validationErrorMessage :errors="v$.form.gen_capacity.$errors" />
                </div>
            </div>
            <div class="col-12 col-md-6 col-xl-4  ">
                <div class="flex-auto">
                    <label class="font-bold" id="Battery-Volt">Overhaul Power Consumption</label>
                    <InputNumber fluid showButtons :invalid="v$.form.overhaul_power_consumption.$error"
                        v-model.trim="v$.form.overhaul_power_consumption.$model" aria-describedby="Battery-Volt" />
                    <div v-if="v$.form.overhaul_power_consumption.$error">
                        <div style="color: red; font-size: 0.7rem; padding-left: 3px; padding-top: 3px;"
                            v-for="error in v$.form.overhaul_power_consumption.$errors">
                            {{ error.$message }}</div>
                    </div>
                </div>
                <div v-if="v$.form.overhaul_power_consumption.$error">
                    <validationErrorMessage :errors="v$.form.overhaul_power_consumption.$errors" />
                </div>
            </div>



            <div class=" w-full flex justify-center">
                <Button label="Update" type="submit" :disable="!$can('update_Instrument_data')" class="block" icon="pi pi-external-link" severity="success" text raised />

            </div>

        </div>
    </form>












</template>

<script>
import { maxLength, minLength, minValue, maxValue } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { helpers } from '@vuelidate/validators';
import Sites from '../../../apis/Sites';
import InputNumber from 'primevue/inputnumber';
import validationErrorMessage from '../validationErrorMessage.vue';
export default {
    setup: () => ({ v$: useVuelidate() }),
    data() {


        return {
            form: {
                power_source: null,
                power_meter_type: null,
                gen_config: null,
                gen_serial: null,
                gen_capacity: null,
                overhaul_power_consumption: null,
                id: null,




            },
            topic: null,
            action: null,

        };
    },
    validations() {
        const stringReg = helpers.regex(/^[a-zA-Z0-9 \/]+$/);


        return {


            form: {
                power_source: {


                    maxLength: helpers.withMessage("max 50 characters", maxLength(50)),
                    // stringReg: helpers.withMessage("Alphbet characters only", stringReg),



                },

                power_meter_type: {

                    maxLength: helpers.withMessage("max 50 characters", maxLength(50)),
                    // stringReg: helpers.withMessage("Alphbet characters only", stringReg),




                },
                gen_config: {

                    maxLength: helpers.withMessage("max 50 characters", maxLength(50)),
                    // stringReg: helpers.withMessage("Alphbet characters only", stringReg),





                },
                gen_serial: {

                    maxLength: helpers.withMessage("max 50 characters", maxLength(50)),
                    // stringReg: helpers.withMessage("Alphbet characters only", stringReg),



                },
                gen_capacity: {

                    maxLength: helpers.withMessage("max 50 characters", maxLength(50)),
                    // stringReg: helpers.withMessage("Alphbet characters only", stringReg),



                },
                overhaul_power_consumption: {
                    minValue: helpers.withMessage("incorrect min value", minValue(0)),
                    maxValue: helpers.withMessage("incorrect max value", maxValue(100000)),



                }




            },

        }
    },
    name: "PowerDataUpdate",
    inject: ["dialogRef"],
    components:{validationErrorMessage},

    mounted() {
        this.mountData()

    },
    watch: {
        $route(to, from) {
            if (to.path == "/user/login") {
                this.dialogRef.close();
            }

        }

    },
    methods: {
        mountData() {
            this.form.power_source = this.dialogRef.data.rowData.power_source;
            this.form.power_meter_type = this.dialogRef.data.rowData.power_meter_type;
            this.form.gen_config = this.dialogRef.data.rowData.gen_config;
            this.form.gen_capacity = this.dialogRef.data.rowData.gen_capacity;
            this.form.gen_serial = this.dialogRef.data.rowData.gen_serial;
            this.form.overhaul_power_consumption = this.dialogRef.data.rowData.overhaul_power_consumption;
            this.topic = this.dialogRef.data.topic;
            this.form.id = this.dialogRef.data.id;


        },
        async submitUpdateForm() {
            const isFormCorrect = await this.v$.$validate()
            if (!isFormCorrect) return
            Sites.updateSitePowerDetails(this.form).then((response) => {
                if (response.data.message == "updated successfully") {
                    this.$toast.add({
                        severity: "success",
                        summary: "Success Message",
                        detail: "Updated Successfully",
                        life: 3000,
                    });

                }

            }).catch((error) => {
                if (error.response.status == 204) {
                    this.$toast.add({
                        severity: "info",
                        summary: "Success Message",
                        detail: "site instrument not found",
                        life: 3000,
                    });

                }

            });





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