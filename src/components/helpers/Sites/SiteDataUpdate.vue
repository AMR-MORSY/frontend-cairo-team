<template>

    <h3 class=" text-font-main-color text-lg font-bold text-center w-full py-4">{{ topic }}</h3>
    <form @submit.prevent="submitUpdateForm()" novalidate>
        <div class="grid  grid-cols-4 gap-4">

            <div class="col-span-4 md:col-span-2 lg:col-span-1   ">
                <div class="flex-auto">
                    <label class="font-bold" for="on_air_date">On air date</label>

                    <Datepicker class="form-control w-75 " v-model.trim="form.on_air_date" id="on_air_date" />


                </div>

            </div>
            <div class="col-span-4 md:col-span-2 lg:col-span-1 ">
                <div class="flex-auto">
                    <label class="font-bold" id=" last_pm_date">Last PM date</label>
                    <Datepicker class="form-control w-75" v-model.trim="form.last_pm_date" />

                </div>
            </div>
            <div class="col-span-4 md:col-span-2 lg:col-span-1   ">
                <div class="flex-auto">
                    <label class="font-bold" id="topology">Topology</label>
                    <InputText fluid :invalid="v$.form.topology.$error" v-model="v$.form.topology.$model"
                        aria-describedby="topology" />

                </div>
                <div v-if="v$.form.topology.$error">
                    <validationErrorMessage :errors="v$.form.topology.$errors" />

                </div>
            </div>
            <div class="col-span-4 md:col-span-2 lg:col-span-1   ">
                <div class="flex-auto">
                    <label class="font-bold" id="structure">Structure</label>
                    <InputText fluid :invalid="v$.form.structure.$error" v-model="v$.form.structure.$model"
                        aria-describedby="structure" />

                </div>
                <div v-if="v$.form.structure.$error">
                    <validationErrorMessage :errors="v$.form.structure.$errors" />

                </div>
            </div>
            <div class="col-span-4 md:col-span-2 lg:col-span-1   ">
                <div class="flex-auto">
                    <label class="font-bold" id="equip_room">Equip Room</label>
                    <InputText fluid :invalid="v$.form.equip_room.$error" v-model="v$.form.equip_room.$model"
                        aria-describedby="equip_room" />

                </div>
                <div v-if="v$.form.equip_room.$error">
                    <validationErrorMessage :errors="v$.form.equip_room.$errors" />

                </div>
            </div>
            <div class="col-span-4 md:col-span-2 lg:col-span-1   ">
                <div class="flex-auto">
                    <label class="font-bold" id="ntra_cluster">NTRA</label>
                    <Select fluid :invalid="v$.form.ntra_cluster.$error" :options="serve_comp_options"
                        v-model.trim="v$.form.ntra_cluster.$model" aria-describedby="ntra_cluster">


                    </Select>


                </div>
                <div v-if="v$.form.ntra_cluster.$error">
                    <validationErrorMessage :errors="v$.form.ntra_cluster.$errors" />
                </div>
            </div>
            <div class="col-span-4 md:col-span-2 lg:col-span-1   ">
                <div class="flex-auto">
                    <label class="font-bold" id=" care_ceo">CXO</label>
                    <Select fluid :invalid="v$.form.care_ceo.$error" :options="serve_comp_options"
                        v-model.trim="v$.form.care_ceo.$model" aria-describedby="care_ceo">

                    </Select>



                </div>
                <div v-if="v$.form.care_ceo.$error">
                    <validationErrorMessage :errors="v$.form.care_ceo.$errors" />
                </div>
            </div>
            <div class="col-span-4 md:col-span-2 lg:col-span-1   ">
                <div class="flex-auto">
                    <label class="font-bold" id="axsees">Axis</label>
                    <Select fluid :invalid="v$.form.axsees.$error" :options="serve_comp_options"
                        v-model.trim="v$.form.axsees.$model" aria-describedby="axsees">


                    </Select>

                </div>
                <div v-if="v$.form.axsees.$error">
                    <validationErrorMessage :errors="v$.form.axsees.$errors" />
                </div>
            </div>
            <div class="col-span-4 md:col-span-2 lg:col-span-1   ">
                <div class="flex-auto">
                    <label class="font-bold" id="serve_compound">Serve Compound</label>
                    <Select fluid :invalid="v$.form.serve_compound.$error" :options="serve_comp_options"
                        v-model.trim="v$.form.serve_compound.$model" aria-describedby="serve_compound">


                    </Select>

                </div>
                <div v-if="v$.form.serve_compound.$error">
                    <validationErrorMessage :errors="v$.form.serve_compound.$errors" />
                </div>
            </div>
            <div class="col-span-4 md:col-span-2 lg:col-span-1   ">
                <div class="flex-auto">
                    <label class="font-bold" id="no_ldn_accounts">Universities</label>
                    <Select fluid :class="v$.form.universities.$error" :options="serve_comp_options"
                        v-model="v$.form.universities.$model" aria-describedby="universities">

                    </Select>

                </div>
                <div v-if="v$.form.universities.$error">
                    <validationErrorMessage :errors="v$.form.universities.$errors" />
                </div>
            </div>
            <div class="col-span-4 md:col-span-2 lg:col-span-1   ">
                <div class="flex-auto">
                    <label class="font-bold" id="no_tp_accounts">Hot Spot</label>
                    <Select fluid :invalid="v$.form.hot_spot.$error" v-model="v$.form.hot_spot.$model"
                        :options="serve_comp_options" aria-describedby="hot_spot"></Select>

                </div>
                <div v-if="v$.form.hot_spot.$error">
                    <validationErrorMessage :errors="v$.form.hot_spot.$errors" />
                </div>
            </div>
            <div class="col-span-4 md:col-span-2 lg:col-span-1   ">
                <div class="flex-auto">
                    <label class="font-bold" id="ac1_type">AC1 type</label>
                    <InputText fluid :invalid="v$.form.ac1_type.$error" v-model="v$.form.ac1_type.$model"
                        aria-describedby="ac1_type" />

                </div>
                <div v-if="v$.form.ac1_type.$error">
                    <validationErrorMessage :errors="v$.form.ac1_type.$errors" />
                </div>
            </div>
            <div class="col-span-4 md:col-span-2 lg:col-span-1   ">
                <div class="flex-auto">
                    <label class="font-bold" id="ac1_hp">AC1 HP</label>
                    <InputText fluid :invalid="v$.form.ac1_hp.$error" v-model="v$.form.ac1_hp.$model"
                        aria-describedby="ac1_hp" />

                </div>
                <div v-if="v$.form.ac1_hp.$error">
                    <validationErrorMessage :errors="v$.form.ac1_hp.$errors" />
                </div>
            </div>
            <div class="col-span-4 md:col-span-2 lg:col-span-1   ">
                <div class="flex-auto">
                    <label class="font-bold" id="ac2_type">AC2 type</label>
                    <InputText fluid :invalid="v$.form.ac2_type.$error" v-model="v$.form.ac2_type.$model"
                        aria-describedby="ac2_type" />

                </div>
                <div v-if="v$.form.ac2_type.$error">
                    <validationErrorMessage :errors="v$.form.ac2_type.$errors" />
                </div>
            </div>
            <div class="col-span-4 md:col-span-2 lg:col-span-1   ">
                <div class="flex-auto">
                    <label class="font-bold" id="ac2_hp">AC2 HP</label>
                    <InputText fluid :invalid="v$.form.ac2_hp.$error" v-model="v$.form.ac2_hp.$model"
                        aria-describedby="ac2_hp" />

                </div>
                <div v-if="v$.form.ac2_hp.$error">
                    <validationErrorMessage :errors="v$.form.ac2_hp.$errors" />
                </div>
            </div>
            <div class="col-span-4 md:col-span-2 lg:col-span-1   ">
                <div class="flex-auto">
                    <label class="font-bold" id=" network_type">Network Type</label>
                    <InputText fluid :invalid="v$.form.network_type.$error" v-model="v$.form.network_type.$model"
                        aria-describedby=" network_type" />

                </div>
                <div v-if="v$.form.network_type.$error">
                    <validationErrorMessage :errors="v$.form.network_type.$errors" />
                </div>
            </div>

            <div class="col-span-4 md:col-span-2 lg:col-span-1   ">
                <div class="flex-auto">
                    <span class="font-bold" id=" need_access_permission">Access Permission</span>
                    <Select fluid :invalid="v$.form.need_access_permission.$error"
                        v-model.trim="v$.form.need_access_permission.$model" :options="access_perm_options"
                        aria-describedby=" need_access_permission">


                    </Select>


                </div>
                <div v-if="v$.form.need_access_permission.$error">
                    <validationErrorMessage :errors="v$.form.need_access_permission.$errors" />
                </div>
            </div>
            <div class="col-span-4 md:col-span-2 lg:col-span-1   ">
                <div class="flex-auto">
                    <label class="font-bold" id=" permission_type">Permission Type</label>
                    <InputText fluid :invalid="v$.form.permission_type.$error" v-model="v$.form.permission_type.$model"
                        aria-describedby=" permission_type" />

                </div>
                <div v-if="v$.form.permission_type.$error">
                    <validationErrorMessage :errors="v$.form.permission_type.$errors" />
                </div>
            </div>




        </div>
        <div class=" w-full flex justify-center mt-4">
            <Button label="Update" type="submit" icon="pi pi-external-link" class=" block" severity="success" text
                raised />

        </div>

    </form>



</template>

<script>
import { maxLength, minLength, minValue, maxValue } from '@vuelidate/validators'
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
                on_air_date: null,
                topology: null,
                structure: null,
                equip_room: null,
                ntra_cluster: null,
                care_ceo: null,
                axsees: null,
                serve_compound: null,
                universities: null,
                hot_spot: null,
                ac1_type: null,
                ac1_hp: null,
                ac2_type: null,
                ac2_hp: null,
                network_type: null,
                last_pm_date: null,
                need_access_permission: null,
                permission_type: null,
                id: null,



            },
            topic: null,
            action: null,
            access_perm_options: ['Yes', 'No'],
            serve_comp_options: ['Yes', 'No'],

        };
    },
    validations() {
        const stringReg = helpers.regex(/^[a-zA-Z0-9 \/]+$/);
        const booleanReg = helpers.regex(/^Yes|No$/);

        return {


            form: {
                topology: {
                    maxLength: helpers.withMessage("max 50 characters", maxLength(50)),
                    stringReg: helpers.withMessage("Alphbet characters only", stringReg),

                },
                structure: {
                    maxLength: helpers.withMessage("max 50 characters", maxLength(50)),
                    stringReg: helpers.withMessage("Alphbet characters only", stringReg),

                },
                equip_room: {
                    maxLength: helpers.withMessage("max 50 characters", maxLength(50)),
                    stringReg: helpers.withMessage("Alphbet characters only", stringReg),

                },
                ntra_cluster: {

                    booleanReg: helpers.withMessage("alphanumeric only", booleanReg),

                },
                care_ceo: {
                    booleanReg: helpers.withMessage("alphanumeric only", booleanReg),
                },
                axsees: {
                    booleanReg: helpers.withMessage("alphanumeric only", booleanReg),
                },
                serve_compound: {
                    booleanReg: helpers.withMessage("alphanumeric only", booleanReg),
                },
                universities: {
                    booleanReg: helpers.withMessage("alphanumeric only", booleanReg),

                },
                hot_spot: {
                    booleanReg: helpers.withMessage("alphanumeric only", booleanReg),



                },
                ac1_type: {

                    maxLength: helpers.withMessage("max 50 characters", maxLength(50)),
                    stringReg: helpers.withMessage("alphanumeric only", stringReg),

                },
                ac2_type: {

                    maxLength: helpers.withMessage("max 50 characters", maxLength(50)),
                    stringReg: helpers.withMessage("alphanumeric only", stringReg),

                },
                ac1_hp: {

                    maxLength: helpers.withMessage("max 50 characters", maxLength(50)),
                    stringReg: helpers.withMessage("alphanumeric only", stringReg),

                },
                ac2_hp: {

                    maxLength: helpers.withMessage("max 50 characters", maxLength(50)),
                    stringReg: helpers.withMessage("alphanumeric only", stringReg),

                },
                network_type: {

                    maxLength: helpers.withMessage("max 50 characters", maxLength(50)),
                    stringReg: helpers.withMessage("alphanumeric only", stringReg),

                },

                need_access_permission: {
                    booleanReg: helpers.withMessage("alphanumeric only", booleanReg),

                },
                permission_type: {

                    maxLength: helpers.withMessage("max 50 characters", maxLength(50)),
                    stringReg: helpers.withMessage("alphanumeric only", stringReg),

                },






            },

        }
    },
    name: "SiteDataUpdate",
    inject: ["dialogRef"],

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
    components: {
        validationErrorMessage
    },
    methods: {
        mountData() {
            if (this.dialogRef.data.action == 'Update') {
                this.form.on_air_date = this.dialogRef.data.rowData.on_air_date;
                this.form.topology = this.dialogRef.data.rowData.topology;
                this.form.structure = this.dialogRef.data.rowData.structure;
                this.form.equip_room = this.dialogRef.data.rowData.equip_room;
                this.form.ntra_cluster = this.dialogRef.data.rowData.ntra_cluster;
                this.form.care_ceo = this.dialogRef.data.rowData.care_ceo;
                this.form.axsees = this.dialogRef.data.rowData.axsees;
                this.form.serve_compound = this.dialogRef.data.rowData.serve_compound;
                this.form.universities = this.dialogRef.data.rowData.universities;
                this.form.hot_spot = this.dialogRef.data.rowData.hot_spot;
                this.form.ac1_type = this.dialogRef.data.rowData.ac1_type;
                this.form.ac2_type = this.dialogRef.data.rowData.ac2_type;
                this.form.ac1_hp = this.dialogRef.data.rowData.ac1_hp;
                this.form.ac2_hp = this.dialogRef.data.rowData.ac2_hp;
                this.form.network_type = this.dialogRef.data.rowData.network_type;
                this.form.last_pm_date = this.dialogRef.data.rowData.last_pm_date;
                this.form.need_access_permission = this.dialogRef.data.rowData.need_access_permission;
                this.form.permission_type = this.dialogRef.data.rowData.permission_type;
                this.form.id = this.dialogRef.data.id;

            }

            this.topic = this.dialogRef.data.topic;
            this.action = this.dialogRef.data.action;



        },
        async submitUpdateForm() {

            const isFormCorrect = await this.v$.$validate()
            if (!isFormCorrect) return
            if (this.action == "Update") {
                console.log(this.form)
                Sites.updatesiteDeepDetails(this.form).then((response) => {
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
            else {

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
</style>