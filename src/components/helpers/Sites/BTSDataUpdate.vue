<template>

    <h3 class=" text-font-main-color text-lg font-bold text-center w-full py-8">Battery {{ action }}</h3>

    <form @submit.prevent="submitUpdateForm()" novalidate>
        <div class="grid grid-cols-4 gap-4 ">

            <div class="col-span-4 md:col-span-2 lg:col-span-1  ">
                <div class="flex-auto">
                    <label class="font-bold" id="Battery-Brand">No.BTS</label>
                    <InputNumber :min="0" :max="100" fluid showButtons :invalid="v$.form.no_bts.$error"
                        v-model.trim="v$.form.no_bts.$model" aria-describedby="Battery-Brand" />


                </div>
                <div v-if="v$.form.no_bts.$error">
                    <validationErrorMessage :errors="v$.form.no_bts.$errors" />
                </div>

            </div>
            <div class="col-span-4 md:col-span-2 lg:col-span-1  ">
                <div class="flex-auto">
                    <label class="font-bold" id="mrfu_2G">MRFU 2G</label>
                    <InputNumber :min="0" :max="100" fluid showButtons :invalid="v$.form.mrfu_2G.$error"
                        v-model.trim="v$.form.mrfu_2G.$model" aria-describedby="mrfu_2G" />

                </div>
                <div v-if="v$.form.mrfu_2G.$error">
                    <validationErrorMessage :errors="v$.form.mrfu_2G.$errors" />
                </div>
            </div>
            <div class="col-span-4 md:col-span-2 lg:col-span-1  ">
                <div class="flex-auto">
                    <label class="font-bold" id="Battery-Volt">MRFU 3G</label>
                    <InputNumber :min="0" :max="100" fluid showButtons :invalid="v$.form.mrfu_3G.$error"
                        v-model.trim="v$.form.mrfu_3G.$model" aria-describedby="Battery-Volt" />

                </div>
                <div v-if="v$.form.mrfu_3G.$error">
                    <validationErrorMessage :errors="v$.form.mrfu_3G.$errors" />

                </div>
            </div>
            <div class="col-span-4 md:col-span-2 lg:col-span-1  ">
                <div class="flex-auto">
                    <label class="font-bold" id="Battery-Volt">MRFU 4G</label>
                    <InputNumber :min="0" :max="100" fluid showButtons :invalid="v$.form.mrfu_4G.$error"
                        v-model.trim="v$.form.mrfu_4G.$model" aria-describedby="Battery-Volt" />

                </div>
                <div v-if="v$.form.mrfu_4G.$error">
                    <validationErrorMessage :errors="v$.form.mrfu_4G.$errors" />
                </div>
            </div>
            <div class="col-span-4 md:col-span-2 lg:col-span-1  ">
                <div class="flex-auto">
                    <label class="font-bold" id="tdd">TDD</label>
                    <Select :invalid="v$.form.tdd.$error" fluid v-model.trim="v$.form.tdd.$model" :options="tdd_options"
                        aria-describedby="tdd">


                    </Select>

                </div>
                <div v-if="v$.form.tdd.$error">
                    <validationErrorMessage :errors="v$.form.tdd.$errors" />
                </div>
            </div>


        </div>

        <div class="w-full flex justify-center mt-10">
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
import InputNumber from 'primevue/inputnumber';
import validationErrorMessage from '../validationErrorMessage.vue';
export default {
    setup: () => ({ v$: useVuelidate() }),
    data() {


        return {
            form: {
                no_bts: 0,
                mrfu_2G: 0,
                mrfu_3G: 0,
                mrfu_4G: 0,
                tdd: 'No',
                id: null,




            },
            topic: null,
            action: null,
            tdd_options: ['Yes', 'No']


        };
    },
    watch: {
        $route(to, from) {
            if (to.path == "/user/login") {
                this.dialogRef.close();
            }

        }

    },
    validations() {
        const stringReg = helpers.regex(/^[a-zA-Z0-9 \/]+$/);
        const booleanReg = helpers.regex(/^Yes|No$/);

        return {


            form: {
                no_bts: {
                    required: helpers.withMessage("zero or Max 50 BTS", required),

                    minValue: helpers.withMessage("No or Max 50 BTS", minValue(0)),
                    maxValue: helpers.withMessage("No or Max 50 BTS", maxValue(50)),


                },
                mrfu_2G: {
                    required: helpers.withMessage("zero or Max 50 BTS", required),
                    minValue: helpers.withMessage("No or Max 50 BTS", minValue(0)),
                    maxValue: helpers.withMessage("No or Max 50 BTS", maxValue(50)),



                },

                mrfu_3G: {
                    required: helpers.withMessage("zero or Max 50 MRFU", required),
                    minValue: helpers.withMessage("No or Max 50 MRFU", minValue(0)),
                    maxValue: helpers.withMessage("No or Max 50 MRFU", maxValue(50)),



                },
                mrfu_4G: {
                    required: helpers.withMessage("zero or Max 50 MRFU", required),
                    minValue: helpers.withMessage("No or Max 50 MRFU", minValue(0)),
                    maxValue: helpers.withMessage("No or Max 50 MRFU", maxValue(50)),



                },
                tdd: {
                    booleanReg: helpers.withMessage("Yes or No only", booleanReg),

                },




            },

        }
    },
    name: "BTSDataUpdate",
    inject: ["dialogRef"],
    components: {
        validationErrorMessage

    },

    mounted() {
        this.mountData()

    },
    methods: {
        mountData() {
            this.form.no_bts = this.dialogRef.data.rowData.no_bts;
            this.form.mrfu_2G = this.dialogRef.data.rowData.mrfu_2G;
            this.form.mrfu_3G = this.dialogRef.data.rowData.mrfu_3G;
            this.form.mrfu_4G = this.dialogRef.data.rowData.mrfu_4G;
            this.form.tdd = this.dialogRef.data.rowData.tdd;
            this.topic = this.dialogRef.data.topic;
            this.form.id = this.dialogRef.data.id;


        },
        async submitUpdateForm() {
            const isFormCorrect = await this.v$.$validate()
            if (!isFormCorrect) return
            Sites.updateSiteBTSDetails(this.form).then((response) => {
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