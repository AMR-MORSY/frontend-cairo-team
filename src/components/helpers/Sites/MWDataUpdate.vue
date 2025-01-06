<template>

    <h3 class=" text-font-main-color text-lg font-bold text-center w-full py-8">{{ topic }}</h3>


    <form @submit.prevent="submitUpdateForm()" novalidate>
        <div class="grid grid-cols-3 gap-4">
            <div class="col-span-3 md:col-span-2 lg:col-span-1">
                <div class="flex-auto">
                    <label class="font-bold" id="no_mw">No.MW</label>
                    <InputNumber :min="0" :max="100" fluid showButtons :invalid="v$.form.no_mw.$error"
                        v-model.trim="v$.form.no_mw.$model" aria-describedby="no_mw" />

                </div>
                <div v-if="v$.form.no_mw.$error">
                    <validationErrorMessage :errors="v$.form.no_mw.$errors" />
                </div>
            </div>


            <div class="col-span-3 md:col-span-2 lg:col-span-1">
                <div class="flex-auto">
                    <label class="font-bold" id="mw_type">MW Type</label>
                    <InputText fluid :invalid="v$.form.mw_type.$error" v-model.trim="v$.form.mw_type.$model"
                        aria-describedby="mw_type" />

                </div>
                <div v-if="v$.form.mw_type.$error">
                    <validationErrorMessage :errors="v$.form.mw_type.$errors" />
                </div>
            </div>



            <div class="col-span-3 md:col-span-2 lg:col-span-1 ">
                <div class="flex-auto">
                    <label class="font-bold" id="eband">E Band</label>
                    <Select fluid :class="v$.form.eband.$error" :options="eband_options"
                        v-model.trim="v$.form.eband.$model" aria-describedby="eband">

                    </Select>

                </div>
                <div v-if="v$.form.eband.$error">
                    <validationErrorMessage :errors="v$.form.eband.$errors" />
                </div>
            </div>






        </div>
        <div class=" w-full flex justify-center">
            <Button label="Update" class="block" type="submit" icon="pi pi-external-link" severity="success" text
                raised />

        </div>
    </form>



</template>

<script>
import { maxLength, minLength, minValue, maxValue, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { helpers } from '@vuelidate/validators';
import Sites from '../../../apis/Sites';
import InputText from 'primevue/inputtext';
import validationErrorMessage from '../validationErrorMessage.vue';
export default {
    setup: () => ({ v$: useVuelidate() }),
    data() {


        return {
            form: {

                no_mw: 0,
                mw_type: null,
                eband: "No",
                id: null,





            },
            topic: null,
            action: null,
            eband_options: ['Yes', "No"]

        };
    },
    validations() {
        const stringReg = helpers.regex(/^[a-zA-Z0-9 \/]+$/);
        const booleanReg = helpers.regex(/^Yes|No$/);

        return {


            form: {


                no_mw: {
                    required: helpers.withMessage("zero or Max 50 MW", required),

                    minValue: helpers.withMessage("min 1 MW link", minValue(1)),
                    maxValue: helpers.withMessage("max 50 MW link", maxValue(50)),




                },
                mw_type: {
                    minLength: helpers.withMessage("min 3 characters", minLength(3)),
                    maxLength: helpers.withMessage("max 50 characters", maxLength(50)),
                    stringReg: helpers.withMessage("Alphbet characters only", stringReg),



                },



                eband: {
                    required: helpers.withMessage("Yes or No", required),
                    booleanReg: helpers.withMessage("alphanumeric only", booleanReg),

                },






            },

        }
    },
    name: "MWDataUpdate",
    inject: ["dialogRef"],
    components: {
        validationErrorMessage

    },

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

            this.form.no_mw = this.dialogRef.data.rowData.no_mw;
            this.form.mw_type = this.dialogRef.data.rowData.mw_type;
            this.form.eband = this.dialogRef.data.rowData.eband;
            this.form.id = this.dialogRef.data.id;
            this.topic = this.dialogRef.data.topic;

        },
        async submitUpdateForm() {

            const isFormCorrect = await this.v$.$validate()
            if (!isFormCorrect) return


            Sites.updateSiteMWDetails(this.form).then((response) => {
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