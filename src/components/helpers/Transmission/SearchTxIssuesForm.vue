<template>
    <div class="container">
        <h3>Search by Reporting date </h3>
        <form @submit.prevent="submitSearchForm()" novalidate>
            <div class="row gx-1">
                <div class="col-12 col-md-6 col-xl-4 mt-5 ">
                    <div class="input-group">
                        <span class="input-group-text w-25" for="on_air_date">From</span>

                        <input type="date" class="form-control" :class="{ 'is-invalid': v$.From.$error }"
                            v-model.trim="v$.From.$model" id="on_air_date" />


                    </div>
                    <div style="color: red; font-size: 0.7rem; padding-left: 3px; " v-for="error in v$.From.$errors">
                        {{ error.$message }}</div>


                </div>
                <div class="col-12 col-md-6 col-xl-4 mt-5">
                    <div class="input-group">
                        <span class="input-group-text w-25" for="Clearance Date">To</span>

                        <input type="date" class="form-control" :class="{ 'is-invalid': v$.toDate.$error }"
                            v-model.trim="v$.toDate.$model" id="Clearance Date" />



                    </div>
                    <div style="color: red; font-size: 0.7rem; padding-left: 3px; " v-for="error in v$.toDate.$errors">
                        {{ error.$message }}</div>


                </div>
                <div class="col-12 col-md-6 col-xl-4 mt-5 ">
                    <div class="input-group">
                        <span class="input-group-text w-25" id="status">Issue</span>
                        <select class="form-select w-50" :class="{ 'is-invalid': v$.issue.$error }"
                            v-model.trim="v$.issue.$model" aria-describedby="status">

                            <option value="All">All</option>
                            <option value="WAN">WAN</option>
                            <option value="XPIC">XPIC</option>
                            <option value="iP_traffic">IP traffic</option>
                        </select>


                    </div>
                    <div style="color: red; font-size: 0.7rem; padding-left: 3px; " v-for="error in v$.issue.$errors">
                        {{ error.$message }}</div>
                </div>

                <div class="col-6 mt-5">
                    <div class="button-container">
                        <Button label="Search" :disabled="v$.$invalid" type="submit" icon="pi pi-external-link"
                            severity="success" text raised />

                    </div>
                </div>


            </div>
        </form>
    </div>
</template>

<script>
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { helpers } from '@vuelidate/validators';
export default {
    setup: () => ({ v$: useVuelidate() }),
    data() {
        return {
            From: "",
            toDate: "",
            issue: "All",

        };
    },
    name: "SearchTxIssuesForm.vue",
    inject: ["dialogRef"],

    validations() {
        const mustBeEqualOrGreater = (value) => {

            if (value >= this.From) {
                return true
            }
            return false;

        };

        return {
            From: {
                required: helpers.withMessage("Required !", required),




            },
            toDate: {
                required: helpers.withMessage("Required !", required),
                mustBeEqualOrGreater: helpers.withMessage("Equal or greater than From date", mustBeEqualOrGreater)


            },
            issue: {
                required: helpers.withMessage("Required !", required),



            },





        }
    },

    methods: {
        async submitSearchForm() {

            const isFormCorrect = await this.v$.$validate()
            if (!isFormCorrect) return


            this.dialogRef.close();
            this.$router.push({ path: `/searchTxIssues/${this.From}/${this.toDate}/${this.issue}` })



        }


    },

}
</script>

<style lang="sass" scoped>

</style>