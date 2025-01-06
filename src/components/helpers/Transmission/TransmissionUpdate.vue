<template>
    <div class="container-fluid">
        <h3>{{ topic }}</h3>
        <form @submit.prevent="submitUpdateForm()" novalidate>
            <div class="row gx-1">
                <input type="hidden" v-model.trim="v$.form.site_code.$model">
                <div class="col-12 col-md-6 col-xl-3 ">
                    <div class="input-group">
                        <span class="input-group-text w-50" for="on_air_date">Reporting Date</span>

                        <input type="date" class="form-control" :class="{ 'is-invalid': v$.form.reporting_date.$error }"
                            v-model.trim="v$.form.reporting_date.$model" id="on_air_date" />


                    </div>
                    <div style="color: red; font-size: 0.7rem; padding-left: 3px; "
                        v-for="error in v$.form.reporting_date.$errors">
                        {{ error.$message }}</div>


                </div>
                <div class="col-12 col-md-6 col-xl-3 ">
                    <div class="input-group">
                        <span class="input-group-text w-50" for="Clearance Date">Clearance Date</span>

                        <input type="date" class="form-control" :class="{ 'is-invalid': v$.form.clearance_date.$error }"
                            v-model.trim="v$.form.clearance_date.$model" id="Clearance Date" />

                    </div>
              
                    <div style="color: red; font-size: 0.7rem; padding-left: 3px; "
                        v-for="error in v$.form.clearance_date.$errors">
                        {{ error.$message }}</div>


                </div>
                <div class="col-12 col-md-6 col-xl-3  ">
                    <div class="input-group">
                        <span class="input-group-text w-50" id="status" >Status</span>
                        <select class="form-select w-50" :class="{ 'is-invalid': v$.form.status.$error }"
                            v-model.trim="v$.form.status.$model" aria-describedby="status">

                            <option value="Solved">Solved</option>
                            <option value="Pending">Pending</option>
                        </select>


                    </div>
                    <div style="color: red; font-size: 0.7rem; padding-left: 3px; " v-for="error in v$.form.status.$errors">
                        {{ error.$message }}</div>
                </div>
                <div class="col-12 col-md-6 col-xl-3  ">
                    <div class="input-group">
                        <span class="input-group-text w-50" id="office">Office</span>
                        <select class="form-select w-50" :class="{ 'is-invalid': v$.form.office.$error }"
                            v-model.trim="v$.form.office.$model" aria-describedby="office">

                            <option :value="office" v-for="office in offices" :key="office">{{ office }}</option>

                        </select>

                        <div style="color: red; font-size: 0.7rem; padding-left: 3px; "
                            v-for="error in v$.form.office.$errors">
                            {{ error.$message }}</div>
                    </div>
                </div>

                <div class="col-12 col-md-6   ">
                    <div class="input-group">
                        <span class="input-group-text w-25" id="Battery-Brand">Network Element</span>
                        <input type="text" class="form-control" :class="{ 'is-invalid': v$.form.network_element.$error }"
                            v-model.trim="v$.form.network_element.$model" aria-describedby="Battery-Brand" />

                    </div>
                    <div v-if="v$.form.network_element.$error">
                        <div style="color: red; font-size: 0.7rem; padding-left: 3px; "
                            v-for="error in v$.form.network_element.$errors">
                            {{ error.$message }}</div>
                    </div>


                </div>
                <div class="col-12 col-md-6   ">
                    <div class="input-group">
                        <span class="input-group-text" id=" No.Strings">Far End</span>
                        <input type="text" class="form-control w-75 " :class="{ 'is-invalid': v$.form.far_end.$error }"
                            v-model.trim="v$.form.far_end.$model" aria-describedby="No.Strings" />

                    </div>
                    <div style="color: red; font-size: 0.7rem; padding-left: 3px; "
                        v-for="error in v$.form.far_end.$errors">
                        {{ error.$message }}</div>

                </div>

                <div class="col-12 col-md-6  ">
                    <div class="form-group">
                        <label id="maintenance">ATST Feedback:</label>
                        <textarea rows="5" cols="5" class="form-control"
                            :class="{ 'is-invalid': v$.form.ATST_feedback.$error }"
                            v-model.trim="v$.form.ATST_feedback.$model" aria-describedby="maintenance"></textarea>


                    </div>
                    <div v-if="v$.form.ATST_feedback.$error">
                        <div style="color: red; font-size: 0.7rem; padding-left: 3px; "
                            v-for="error in v$.form.ATST_feedback.$errors">
                            {{ error.$message }}</div>
                    </div>
                </div>

                <div class="col-12 col-md-6  ">
                    <div class="form-group">
                        <label id="maintenance">Maintenance Feedback:</label>
                        <textarea rows="5" cols="5" class="form-control"
                            :class="{ 'is-invalid': v$.form.maintenance_feedback.$error }"
                            v-model.trim="v$.form.maintenance_feedback.$model" aria-describedby="maintenance"></textarea>


                    </div>
                    <div v-if="v$.form.maintenance_feedback.$error">
                        <div style="color: red; font-size: 0.7rem; padding-left: 3px; "
                            v-for="error in v$.form.maintenance_feedback.$errors">
                            {{ error.$message }}</div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="button-container" v-if="purpos == 'update'">
                        <Button label="Update" type="submit" :disabled="v$.$invalid" icon="pi pi-external-link"
                            severity="success" text raised />

                    </div>
                    <div class="button-container">
                        <Button label="Add" v-if="purpos == 'New'"  type="submit"
                            icon="pi pi-external-link" severity="success" text raised />

                    </div>
                </div>


            </div>
        </form>
    </div>
    <Dialog v-model:visible="visible" modal :showHeader="false" :style="{ width: '50vw' }" :breakpoints="{ '700px': '70vw' }">

        <p class="m-0">
            <span class="confirmation">Confirmation</span>
        <p style="margin-top: 20px; font-size: clamp(14px,2vw,18px); ">{{ message }} </p>
        </p>
        <template #footer>
            <Button label="Ok" icon="pi pi-check" @click="closeConfirmation()" autofocus />
        </template>
    </Dialog>
</template>

<script>
import { maxLength, minLength, required, requiredIf } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { helpers } from '@vuelidate/validators';
import Transmission from "../../../apis/Transmission";
export default {
    setup: () => ({ v$: useVuelidate() }),
    data() {


        return {
            visible: false,
            message: '',
       
            form: {
                reporting_date: null,
                clearance_date: null,
                network_element: null,
                status: null,
                ATST_feedback: null,
                maintenance_feedback: null,
                office: null,
                far_end: null,
                site_code: null,



            },
            topic: null,
            purpos: null,
            offices: [
                "Maadi", "Shrouk", "New Cairo", "Haram", "Gisr El Suez", "Shoubra", "Mohandseen", "October", "Helwan", "New Capital", "Nasr City"

            ],


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
        const stringReg = helpers.regex(/^[a-zA-Z0-9_+-@%&# \/]+$/);
        const officeReg = helpers.regex(/^Maadi|Shrouk|New Cairo|Haram|Gisr El Suez|Shoubra|Mohandseen|October|Helwan|New Capital|Nasr City$/);
        const statusReg = helpers.regex(/^Solved|Pending$/);
        const statusCheck = (value) => {
            if (value == "Solved") {
                return true;
            }
            else {
                return false;
            }

        };

        return {


            form: {
                site_code: {
                    required: helpers.withMessage("Required !", required),

                },
                reporting_date: {
                    required: helpers.withMessage("Required !", required),
                    $autoDirty: true,


                },
                clearance_date: {
                    requiredIf: helpers.withMessage("Please enter solving date", requiredIf(statusCheck(this.form.status))),
                    $autoDirty: true,

                },
                network_element: {


                    required: helpers.withMessage("Required !", required),
                    minLength: helpers.withMessage("min 3 characters", minLength(3)),
                    maxLength: helpers.withMessage("max 100 characters", maxLength(100)),
                    stringReg: helpers.withMessage("alphanumeric only", stringReg),
                    $autoDirty: true,


                },

                far_end: {

                    required: helpers.withMessage("Required !", required),
                    minLength: helpers.withMessage("min 3 characters", minLength(3)),
                    maxLength: helpers.withMessage("max 100 characters", maxLength(100)),
                    stringReg: helpers.withMessage("alphanumeric only", stringReg),
                    $autoDirty: true,





                },
                ATST_feedback: {

                    required: helpers.withMessage("Required !", required),
                    minLength: helpers.withMessage("min 3 characters", minLength(3)),
                    maxLength: helpers.withMessage("max 200 characters", maxLength(200)),
                    stringReg: helpers.withMessage("alphanumeric only", stringReg),
                    $autoDirty: true,



                },
                maintenance_feedback: {


                    maxLength: helpers.withMessage("max 200 characters", maxLength(200)),
                    stringReg: helpers.withMessage("alphanumeric only", stringReg),


                },
                office: {

                    officeReg: helpers.withMessage("Must be one of cairo's offices", officeReg),
                    $autoDirty: true,



                },
                status: {
                    statusReg: helpers.withMessage("Pending or Solved", statusReg),
                    $autoDirty: true,



                },


            },

        }
    },
    name: "TransmissionUpdate",
    inject: ["dialogRef"],

    mounted() {
        this.mountData()

    },
    methods: {
        mountData() {
            this.form.site_code = this.dialogRef.data.rowData.site_code;
            this.form.reporting_date = this.dialogRef.data.rowData.reporting_date;
            this.form.clearance_date = this.dialogRef.data.rowData.clearance_date;
            this.form.network_element = this.dialogRef.data.rowData.network_element;
            this.form.status = this.dialogRef.data.rowData.status;
            this.form.office = this.dialogRef.data.rowData.office;
            this.form.ATST_feedback = this.dialogRef.data.rowData.ATST_feedback;
            this.topic = this.dialogRef.data.topic;
            this.purpos = this.dialogRef.data.purpos;
            this.form.maintenance_feedback = this.dialogRef.data.rowData.maintenance_feedback;
            this.form.far_end = this.dialogRef.data.rowData.far_end;

        },
        async submitUpdateForm() {
           

            const isFormCorrect = await this.v$.$validate()


            if (!isFormCorrect) return 
                

                if (this.purpos == "update" & this.topic == "WAN") {
                    Transmission.updateSiteWAN(this.form).then((response) => {
                        console.log(response)
                        this.visible = true;
                        this.message = "Site WAN issue Updated Successfully......."

                    });


                }
                else if (this.purpos == "update" & this.topic == "XPICS") {
                    Transmission.updateSiteXPIC(this.form).then((response) => {
                        this.visible = true;
                        this.message = "Site XPIC issue Updated Successfully......."

                    });

                }
                else if (this.purpos == "update" & this.topic == "ip traffics") {
                    Transmission.updateSiteIPTraffic(this.form).then((response) => {
                        this.visible = true;
                        this.message = "Site IP traffic issue Updated Successfully......."

                    });

                }
                else if (this.purpos == "New" & this.topic == "New XPIC") {
                    Transmission.addNewXPIC(this.form).then((response) => {
                        this.visible = true;
                        this.message = "New XPIC issue inserted Successfully......."

                    });

                }
                else if (this.purpos == "New" & this.topic == "New IP traffic") {
                    Transmission.addNewIPTraffic(this.form).then((response) => {
                        this.visible = true;
                        this.message = "New IP traffic issue inserted Successfully......."

                    });

                }
                else if (this.purpos == "New" & this.topic == "New WAN") {
                    Transmission.addNewWAN(this.form).then((response) => {
                        this.visible = true;
                        this.message = "New WAN issue inserted Successfully......."

                    });

                }


            
           


        },
        closeConfirmation() {
            this.visible = false
            window.location.reload();
        },
     



    },
}
</script>

<style lang="scss" scoped>
.input-group {
    width: 100%;
    margin-bottom: 10px;
    margin-top: 10px;

}

input,
label,
textarea,
span,
select,
Button {
    font-size: clamp(12px, 0.5rem + 1vw, 14px);
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