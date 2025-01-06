<template>
    <div class=" w-screen-2xl px-5 py-20 ">

        <div class="max-w-4xl   mx-auto">
            <Fieldset>
                <template #legend>
                    <div class=" flex">
                        <span class="material-symbols-rounded mx-1">add_circle</span>

                        <span class="text-sm font-bold text-font-main-color" v-if="action=='new'">New Site</span>
                        <span class="text-sm font-bold text-font-main-color uppercase" v-if="action=='update'">{{ site_code }} {{ site_name }}</span>
                    </div>

                </template>
                <div class="form">
                    <form>
                        <div class="grid grid-cols-4 gap-4  p-5">
                            <div class="col-span-2 md:col-span-1">
                                <div class=" flex-auto">

                                    <label for="siteCode" class=" block font-bold">Site Code:</label>
                                    <InputText  id="siteCode" v-model.trim="site_code"
                                       :invalid="v$.site_code.$errors.length > 0" fluid :disabled="action=='update'" />

                                </div>
                                <div v-if="v$.site_code.$error">

                                    <validationErrorMessage :errors="v$.site_code.$errors" />
                                </div>
                            </div>
                            <div class="col-span-2 md:col-span-1">
                                <div class=" flex-auto">
                                    <label for="siteName" class=" block font-bold">Site Name:</label>
                                    <InputText type="text" id="siteName" v-model.trim="site_name"
                                         :invalid="v$.site_name.$errors.length > 0" fluid />
                                </div>
                                <div v-if="v$.site_name.$error">

                                    <validationErrorMessage :errors="v$.site_name.$errors" />
                                </div>
                            </div>
                            <div class="col-span-2 md:col-span-1">
                                <div class=" flex-auto">
                                    <label for="BSC" class=" block font-bold">BSC:</label>
                                    <InputText type="text" id="BSC" v-model="BSC" fluid
                                        :invalid="v$.BSC.$errors.length > 0" />
                                </div>
                                <div v-if="v$.BSC.$error">

                                    <validationErrorMessage :errors="v$.BSC.$errors" />
                                </div>
                            </div>
                            <div class="col-span-2 md:col-span-1">
                                <div class=" flex-auto">
                                    <label for="RNC" class=" block font-bold">RNC:</label>
                                    <InputText type="text" id="RNC" v-model="RNC" fluid
                                        :invalid="v$.RNC.$errors.length > 0" />
                                </div>
                                <div v-if="v$.RNC.$error">

                                    <validationErrorMessage :errors="v$.RNC.$errors" />
                                </div>
                            </div>

                            <div class="col-span-2 md:col-span-1">
                                <div class=" flex-auto">
                                    <label for="office" class=" block font-bold">Office:</label>
                                    <InputText type="text" id="office" v-model="office"
                                        :invalid="v$.office.$errors.length > 0" fluid />
                                </div>
                                <div v-if="v$.office.$error">

                                    <validationErrorMessage :errors="v$.office.$errors" />
                                </div>
                            </div>
                            <div class="col-span-2 md:col-span-1">
                                <div class=" flex-auto">
                                    <label for="category" class=" block font-bold">Category:</label>
                                    <Select id="category" v-model="category" :options="categoryOptions"
                                        :invalid="v$.category.$errors.length > 0" fluid>


                                    </Select>
                                </div>
                                <div v-if="v$.category.$error">

                                    <validationErrorMessage :errors="v$.category.$errors" />
                                </div>
                            </div>

                            <div class="col-span-2 md:col-span-1">
                                <div class=" flex-auto">
                                    <label for="type" class=" block font-bold">Type:</label>
                                    <Select id="type" v-model="type" :invalid="v$.type.$errors.length > 0"
                                        :options="typeOptions" fluid>


                                    </Select>
                                </div>
                                <div v-if="v$.type.$error">

                                    <validationErrorMessage :errors="v$.type.$errors" />
                                </div>
                            </div>
                            <div class="col-span-2 md:col-span-1">
                                <div class=" flex-auto">
                                    <label for="severity" class=" block font-bold">severity:</label>
                                    <Select id="severity" v-model="severity" :invalid="v$.severity.$errors.length > 0"
                                        :options="severityOptions" fluid>


                                    </Select>
                                </div>
                                <div v-if="v$.severity.$error">

                                    <validationErrorMessage :errors="v$.severity.$errors" />
                                </div>
                            </div>
                            <div class="col-span-2 md:col-span-1">
                                <div class=" flex-auto">
                                    <label for="sharing" class=" block font-bold">sharing:</label>
                                    <Select id="sharing" v-model="sharing" :invalid="v$.sharing.$errors.length > 0"
                                        :options="sharingOptions" fluid>


                                    </Select>
                                </div>
                                <div v-if="v$.sharing.$error">

                                    <validationErrorMessage :errors="v$.sharing.$errors" />
                                </div>
                            </div>
                            <div class="col-span-2 md:col-span-1">
                                <div class=" flex-auto">
                                    <label for="host" class=" block font-bold">host:</label>
                                    <Select id="host" v-model="host" :invalid="v$.host.$errors.length > 0"
                                        :options="hostOptions" fluid>

                                    </Select>
                                </div>
                                <div v-if="v$.host.$error">

                                    <validationErrorMessage :errors="v$.host.$errors" />
                                </div>
                            </div>
                            <div class="col-span-2 md:col-span-1">
                                <div class=" flex-auto">
                                    <label for="gest" class=" block font-bold">guest:</label>
                                    <Select id="gest" v-model="gest" :options="gestOptions" fluid
                                        :invalid="v$.gest.$errors.length > 0">

                                    </Select>
                                </div>
                                <div v-if="v$.gest.$error">

                                    <validationErrorMessage :errors="v$.gest.$errors" />
                                </div>
                            </div>
                            <div class="col-span-2 md:col-span-1">
                                <div class=" flex-auto">
                                    <label for="vf_code" class=" block font-bold">VF Code:</label>
                                    <InputText type="text" id="office" v-model="vf_code"
                                        :invalid="v$.vf_code.$errors.length > 0" fluid />
                                </div>
                                <div v-if="v$.vf_code.$error">

                                    <validationErrorMessage :errors="v$.vf_code.$errors" />
                                </div>
                            </div>
                            <div class="col-span-2 md:col-span-1">
                                <div class=" flex-auto">
                                    <label for="et_code" class=" block font-bold">ET Code:</label>
                                    <InputText type="text" id="et_code" v-model="et_code"
                                        :invalid="v$.et_code.$errors.length > 0" fluid />
                                </div>
                                <div v-if="v$.et_code.$error">

                                    <validationErrorMessage :errors="v$.et_code.$errors" />
                                </div>
                            </div>
                            <div class="col-span-2 md:col-span-1">
                                <div class=" flex-auto">
                                    <label for="we_code" class=" block font-bold">WE Code:</label>
                                    <InputText type="text" id="we_code" v-model="we_code"
                                        :invalid="v$.we_code.$errors.length > 0" fluid />
                                </div>
                                <div v-if="v$.we_code.$error">

                                    <validationErrorMessage :errors="v$.we_code.$errors" />
                                </div>
                            </div>
                            <div class="col-span-2 md:col-span-1">
                                <div class=" flex-auto">
                                    <label for="oz" class=" block font-bold">Operation Zone:</label>
                                    <Select id="oz" v-model="oz" :options="ozOptions"
                                        :invalid="v$.oz.$errors.length > 0" fluid>

                                    </Select>
                                </div>
                                <div v-if="v$.oz.$error">

                                    <validationErrorMessage :errors="v$.oz.$errors" />
                                </div>
                            </div>
                            <div class="col-span-2 md:col-span-1">
                                <div class=" flex-auto">

                                    <label for="2G" class="font-bold block "> 2G Cells </label>

                                    <InputNumber fluid showButtons :min="0" :max="50" id="2G" v-model="cells2G"
                                        :invalid="v$.cells2G.$errors.length > 0" />
                                </div>
                                <div v-if="v$.cells2G.$error">

                                    <validationErrorMessage :errors="v$.cells2G.$errors" />
                                </div>

                            </div>
                            <div class="col-span-2 md:col-span-1">
                                <div class=" flex-auto">
                                    <label for="3G" class="font-bold block">3G Cells:</label>
                                    <InputNumber id="3G" fluid v-model="cells3G" showButtons
                                        :invalid="v$.cells3G.$errors.length > 0" :min="0" :max="50" />

                                </div>
                                <div v-if="v$.cells3G.$error">

                                    <validationErrorMessage :errors="v$.cells3G.$errors" />
                                </div>
                            </div>
                            <div class="col-span-2 md:col-span-1">
                                <div class=" flex-auto">
                                    <label for="4G" class="font-bold block">4G Cells</label>
                                    <InputNumber id="4G" fluid v-model="cells4G" showButtons :min="0"
                                        :invalid="v$.cells4G.$errors.length > 0" :max="50" />

                                </div>
                                <div v-if="v$.cells4G.$error">

                                    <validationErrorMessage :errors="v$.cells4G.$errors" />
                                </div>
                            </div>
                            <div class="col-span-2 md:col-span-1">
                                <div class=" flex-auto">
                                    <label for="status" class=" block font-bold">Status:</label>
                                    <Select id="oz" v-model="status" :options="statusOptions"
                                        :invalid="v$.status.$errors.length > 0" fluid>

                                    </Select>
                                </div>
                                <div v-if="v$.status.$error">

                                    <validationErrorMessage :errors="v$.status.$errors" />
                                </div>
                            </div>



                        </div>
                        <div class="flex justify-evenly py-4">
                            <div>
                                <Button label="back" type="button" class="p-button-raised p-button-help"
                                    @click="goBack" />
                            </div>
                            <div v-if="action == 'new'">
                                <Button label="insert" @click="insertNewSite()" type="button"
                                    class="p-button-raised p-button-warning" style="color: white" />
                            </div>
                            <div v-if="action == 'update'">
                                <Button label="Update" @click="siteUpdate()" type="button"
                                    class="p-button-raised p-button-warning" style="color: white" />
                            </div>
                        </div>
                    </form>
                </div>

            </Fieldset>
        </div>

    </div>

</template>

<script setup>
import { useToast } from 'primevue/usetoast';
import { computed } from 'vue';

import { ref, onMounted, watch, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { alphaNum, required, requiredIf, integer } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { helpers } from '@vuelidate/validators';
import validationErrorMessage from '../../helpers/validationErrorMessage.vue';
import Sites from '../../../apis/Sites';
import { data } from 'autoprefixer';

const toast = useToast();
const router = useRouter();

const siteCodeReg = helpers.regex(/^([0-9a-zA-Z]{4,6}(up|UP))|([0-9a-zA-Z]{4,6}(ca|CA))|([0-9a-zA-Z]{4,6}(de|DE))|([0-9a-zA-Z]{4,6}(al|AL))|([0-9a-zA-Z]{4,6}(re|RE))|([0-9a-zA-Z]{4,6}(si|SI))$/)
const nameReg = helpers.regex(/^([0-9a-zA-Z_-]){2,60}$/)
const officeReg= helpers.regex(/^([0-9a-zA-Z _-]){2,60}$/)


const site_code = ref(null)

const site_name = ref(null);

const BSC = ref(null);

const RNC = ref(null)

const office = ref(null)

const type = ref(null)

const vf_code=ref(null);
const et_code=ref(null);
const we_code=ref(null);

const typeOptions = ["Macro", "Micro", "Indoor", "Pico", "Mobile Station","LDN"]
const category = ref(null)

const categoryOptions = ["Normal", "BSC", "NDL", "LDN", "VIP + NDL", "VIP"]
const severity = ref(null)

const severityOptions = ["Bronze", "Silver", "Golden"]
const sharing = ref("No");

const sharingOptions = ["Yes", "No"]
const host = ref(null)

const hostOptions = ["VF", "OG", "ET", "WE",""]
const gest = ref(null)

const statusOptions=["On Air","Off Air"]
const status= ref("On Air");

const gestOptions = ["VF", "OG", "ET", "WE", "ET+VF", "ET+VF+WE", "VF+WE", "ET+WE","OG-Power-Only","VF-Power-Only","ET-Power-Only","WE-Power-Only",""]
const oz = ref(null)
const ozOptions = ["Cairo South", "Cairo East", "Cairo North", "Giza", "North Upper", "Red Sea", "South Upper", "Sinai", "ALEX", "NORTH COAST", "Delta South", "Delta North"]
const cells2G = ref(null)
const cells3G = ref(null)
const cells4G = ref(null)

const props = defineProps([
    "siteDetails",
    "action"
])

watch(props.siteDetails, (newValue, oldValue) => {
  
    if (newValue.length > 0 || typeof (newValue) == "object") {
      
        site_code.value=props.siteDetails.value.site_code
        site_name.value=props.siteDetails.value.site_name
        BSC.value=props.siteDetails.value.BSC
        RNC.value=props.siteDetails.value.RNC
        office.value=props.siteDetails.value.office
        type.value=props.siteDetails.value.type
        category.value=props.siteDetails.value.category
        host.value=props.siteDetails.value.host
        gest.value=props.siteDetails.value.gest
        vf_code.value=props.siteDetails.value.vf_code
        et_code.value=props.siteDetails.value.et_code
        we_code.value=props.siteDetails.value.we_code
        cells2G.value=props.siteDetails.value["2G_cells"]
        cells3G.value=props.siteDetails.value["3G_cells"]
        cells4G.value=props.siteDetails.value["4G_cells"]
        sharing.value=props.siteDetails.value.sharing
        oz.value=props.siteDetails.value.oz
        severity.value=props.siteDetails.value.severity
        status.value=props.siteDetails.value.status

    }

})

const goBack = () => {
    router.go(-1);
}
const rules = computed(() => ({
    site_code: {
        required: helpers.withMessage('Site code is required', required),
        siteCodeReg: helpers.withMessage('invalid site code', siteCodeReg)
    },
    site_name: {
        required: helpers.withMessage('site name is required', required),
        nameReg: helpers.withMessage('invalid site name', nameReg)

    },
    BSC: {

        // required: helpers.withMessage('BSC is required', required),
        nameReg: helpers.withMessage('invalid BSC name', nameReg)

    },
    RNC: {
        // required: helpers.withMessage('Requester is required', required),
        nameReg: helpers.withMessage('invalid RNC name', nameReg)

    },
    office: {
        requiredIf: helpers.withMessage('office is required',requiredIf(oz.value == 'Cairo South' || oz.value=="Cairo East" || oz.value=="Cairo North" || oz.value=="Giza")),
        officeReg: helpers.withMessage('invalid office', officeReg)


    },
    type: {
        required: helpers.withMessage('type is required', required),

    },

    category: {
        required: helpers.withMessage('category is required', required)

    },
    severity: {
        required: helpers.withMessage('severity is required', required)

    },
    status: {
        required: helpers.withMessage('status is required', required)

    },
    sharing: {
        required: helpers.withMessage('sharing is required', required)

    },
    host: {
        requiredIf: helpers.withMessage('host is required', requiredIf(sharing.value == 'Yes'))

    },
    gest: {
        requiredIf: helpers.withMessage('gest is required', requiredIf(sharing.value == 'Yes'))

    },
    oz: {
        required: helpers.withMessage('operation zone is required', required)

    },
    cells2G: {
        integer: helpers.withMessage('invalid cells number', integer)

    },
    cells3G: {
        integer: helpers.withMessage('invalid cells number', integer)

    },
    cells4G: {
        integer: helpers.withMessage('invalid cells number', integer)

    },
    vf_code:{
        nameReg: helpers.withMessage('invalid VF code', nameReg)

    },
    et_code:{
        nameReg: helpers.withMessage('invalid ET code', nameReg)

    },
    we_code:{
        nameReg: helpers.withMessage('invalid WE code', nameReg)

    }



}))


const v$ = useVuelidate(rules, {
    site_code, site_name, BSC, RNC, office, type, category, severity, sharing,status,
    host, gest, oz, cells2G, cells3G,
    cells4G
});

const formData=()=>{
    return {
        site_code: site_code.value,
        site_name: site_name.value,
        BSC: BSC.value,
        RNC: RNC.value,
        office: office.value,
        severity: severity.value,
        category: category.value,
        type: type.value,
        sharing: sharing.value,
        oz: oz.value,
        host: host.value,
        gest: gest.value,
        vf_code:vf_code.value,
        et_code:et_code.value,
        we_code:we_code.value,
        "2G_cells": cells2G.value,
        "3G_cells": cells3G.value,
        "4G_cells": cells4G.value,
        status:status.value

    }
}

const insertNewSite = async () => {

    const isFormCorrect = await v$.value.$validate()
    if (!isFormCorrect) {
        return

    }




    Sites.createNewSite(formData())
        .then((response) => {
          

            toast.add({
                severity: "success",
                summary: "Success Message",
                detail: "inserted Successfully",
                life: 3000,
            });
            router.push(`/sites/details/${site_code.value}`);
        })
        .catch((error) => {
            
            if (error.response.status == 422) {
                let errors = error.response.data.errors;
                showErrors(errors);

            }
        })

}

const showErrors = (errors) => {
    if (errors.site_code) {
        errors.site_code.forEach((element) => {
            toast.add({
                severity: "error",
                summary: "Failed",
                detail: element,
                life: 3000,
            });
        });
    }
    if (errors.status) {
        errors.status.forEach((element) => {
            toast.add({
                severity: "error",
                summary: "Failed",
                detail: element,
                life: 3000,
            });
        });
    }
    if (errors.site_name) {
        errors.site_name.forEach((element) => {
            toast.add({
                severity: "error",
                summary: "Failed",
                detail: element,
                life: 3000,
            });
        });
    }
    if (errors.BSC) {
        errors.BSC.forEach((element) => {
            toast.add({
                severity: "error",
                summary: "Failed",
                detail: element,
                life: 3000,
            });
        });
    }
    if (errors.RNC) {
        errors.RNC.forEach((element) => {
            toast.add({
                severity: "error",
                summary: "Failed",
                detail: element,
                life: 3000,
            });
        });
    }
    if (errors.office) {
        errors.office.forEach((element) => {
            toast.add({
                severity: "error",
                summary: "Failed",
                detail: element,
                life: 3000,
            });
        });
    }
    if (errors.type) {
        errors.type.forEach((element) => {
            toast.add({
                severity: "error",
                summary: "Failed",
                detail: element,
                life: 3000,
            });
        });
    }
    if (errors.category) {
        errors.category.forEach((element) => {
            toast.add({
                severity: "error",
                summary: "Failed",
                detail: element,
                life: 3000,
            });
        });
    }
    if (errors.host) {
        errors.host.forEach((element) => {
            toast.add({
                severity: "error",
                summary: "Failed",
                detail: element,
                life: 3000,
            });
        });
    }
    if (errors.gest) {
        errors.gest.forEach((element) => {
            toast.add({
                severity: "error",
                summary: "Failed",
                detail: element,
                life: 3000,
            });
        });
    }
    if (errors.vf_code) {
        errors.gest.forEach((element) => {
            toast.add({
                severity: "error",
                summary: "Failed",
                detail: element,
                life: 3000,
            });
        });
    }
    if (errors.et_code) {
        errors.gest.forEach((element) => {
            toast.add({
                severity: "error",
                summary: "Failed",
                detail: element,
                life: 3000,
            });
        });
    }
    if (errors.we_code) {
        errors.gest.forEach((element) => {
            toast.add({
                severity: "error",
                summary: "Failed",
                detail: element,
                life: 3000,
            });
        });
    }
    if (errors.sharing) {
        errors.sharing.forEach((element) => {
            toast.add({
                severity: "error",
                summary: "Failed",
                detail: element,
                life: 3000,
            });
        });
    }
    if (errors.severity) {
        errors.severity.forEach((element) => {
            toast.add({
                severity: "error",
                summary: "Failed",
                detail: element,
                life: 3000,
            });
        });
    }
    if (errors.oz) {
        errors.oz.forEach((element) => {
            toast.add({
                severity: "error",
                summary: "Failed",
                detail: element,
                life: 3000,
            });
        });
    }
    if (errors["2G_cells"]) {
        errors["2G_cells"].forEach((element) => {
            toast.add({
                severity: "error",
                summary: "Failed",
                detail: element,
                life: 3000,
            });
        });
    }
    if (errors["3G_cells"]) {
        errors["3G_cells"].forEach((element) => {
            toast.add({
                severity: "error",
                summary: "Failed",
                detail: element,
                life: 3000,
            });
        });
    }
    if (errors["4G_cells"]) {
        errors["4G_cells"].forEach((element) => {
            toast.add({
                severity: "error",
                summary: "Failed",
                detail: element,
                life: 3000,
            });
        });
    }

}

const siteUpdate =async () => {
    const isFormCorrect = await v$.value.$validate()
    if (!isFormCorrect) {
        return

    }
   
    Sites.updateSite(formData())
        .then((response) => {
           
            toast.add({
                severity: "success",
                summary: "Success Message",
                detail: "Updated Successfully",
                life: 3000,
            });
            router.push(`/sites/details/${site_code.value}`);
            // this.site_name = response.data.site.site_name;
            // this.site_code = response.data.site.site_code;
            // this.type = response.data.site.type;
            // this.severity = response.data.site.severity;
            // this.sharing = response.data.site.sharing;
            // this.host = response.data.site.host;
            // this.gest = response.data.site.gest;
            // this.cells2G = response.data.site["2G_cells"];
            // this.cells3G = response.data.site["3G_cells"];
            // this.cells4G = response.data.site["4G_cells"];
            // this.BSC = response.data.site.BSC;
            // this.RNC = response.data.site.RNC;
            // this.office = response.data.site.office;
            // this.oz = response.data.site.oz;
            // this.category = response.data.site.category;
            // this.status = response.data.site.status;
        })
        .catch((error) => {
           
            if (error.response.status == 422) {
                let errors = error.response.data.errors;
                showErrors(errors);


            }
        })

}


</script>

<style lang="scss" scoped></style>