<template>
      <div class=" w-screen-2xl px-10 py-20">

<Card class=" max-w-screen-md mx-auto">
    <template #header>
        <!-- <p class=" text-xl font-extrabold mt-8 text-font-main-color w-full text-center font-Signika">{{
            technology }}</p> -->
    </template>
    <template #content>
        <form id="invoice" @submit.prevent="submitInvoice" enctype="multipart/form-data">


            <div class="grid grid-cols-2 gap-4">

<!-- 
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

                </div> -->
                <div class="col-span-2 ">
                    <div class="flex justify-start">
                        <!-- <label for="power" class=" font-bold">2G Sheet:</label> -->
                        <!-- <input type="file" name="energy_sheet" class="form-control" id="energy_sheet"
                            @change="Nur2GSheetFile" /> -->
                        <FileUpload ref="invoice" mode="basic" accept=".pdf"
                            :maxFileSize="2000" />

                    </div>
                    <!-- <div v-if="v$.NurSheet.$error">

                        <validationErrorMessage :errors="v$.NurSheet.$errors" />
                    </div> -->
                </div>


            </div>
            <div class=" w-full flex justify-center mt-8">
                <Button class=" block " severity="info" raised type="submit" label="Submit" />

            </div>
        </form>

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

import validationErrorMessage from '../../helpers/validationErrorMessage.vue';

const toast = useToast();

const invoice=ref(null);

const submitInvoice=()=>{

}


</script>