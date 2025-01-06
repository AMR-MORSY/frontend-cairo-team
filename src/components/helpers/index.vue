<template>
 
  <div class="w-screen-2xl pt-40">

    <Card class="max-w-xs mx-auto">

      <template #content>


        <p class=" text-center text-font-main-color font-Signika font-extrabold text-lg">
          {{ alarms }}
        </p>

        <form @submit.prevent="getNur" novalidate>

          <ul v-if="notFoundErrors">
            <li style="color: red" v-for="error in notFoundErrors" :key="error">
              {{ error }}
            </li>
          </ul>

          <div class="my-3 w-full">

            <div class=" flex-auto">
              <label for="status">Week</label>

              <Select fluid id="status" :options="periods" v-model="v$.week.$model"
                :invalid="v$.week.$errors.length > 0">

              </Select>
            </div>
            <div v-if="v$.week.$error">

              <validationErrorMessage :errors="v$.week.$errors" />
            </div>

          </div>



          <div class=" w-full mt-8 ">
            <div class=" flex-auto">
              <label for="status">Year</label>

              <Select fluid id="status" :options="years" v-model="year" :invalid="v$.year.$errors.length > 0">

              </Select>
            </div>
            <div v-if="v$.year.$error">

              <validationErrorMessage :errors="v$.year.$errors" />
            </div>

          </div>

          <div class="w-full flex justify-center items-center mt-5">
            <Button type="submit" label="Submit" severity="success" raised class="block"/>
            
          </div>








        </form>







      </template>



    </Card>


  </div>
</template>

<script setup>

import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { helpers } from '@vuelidate/validators';
import { useRouter } from 'vue-router';
import { onMounted, ref,computed } from 'vue';
import validationErrorMessage from "../../components/helpers/validationErrorMessage.vue"

const year = ref(null);
const showSpinner = ref(false);
const years = ref([]);
const periods = ref([]);
const week = ref(null)
const notFoundErrors = ref(null)
const NUR2G = ref(null);
const router = useRouter();

const props = defineProps([
  "alarms"

])

const rules = computed(() => ({
  week: {
    required: helpers.withMessage('week is required', required),
  },
  year: {
    required: helpers.withMessage('year date is required', required),

  }



}))


const v$ = useVuelidate(rules, { week, year });

const getNur = async () => {

  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) {
    return

  }
  if (props.alarms == "NUR") {
    showSpinner.value = false;
    router.push(
      `/nur/statestics/${week.value}/${year.value}`
    );
  } else {
    showSpinner.value = false;
    router.push(
      `/energy/statestics/${week.value}/${year.value}`
    );
  }
}

const mountFormData = () => {
  for (var i = 1; i <= 52; i++) {
    periods.value.push(i);
  }
  for (var i = 2022; i <= 2050; i++) {
    years.value.push(i);
  }
}

onMounted(()=>{
  mountFormData()
})

// export default {
//   setup: () => ({ v$: useVuelidate() }),
//   data() {
//     return {
//       showSpinner: false,
//       years: [],
//       year: null,

//       periods: [],


//       week: null,


//       notFoundErrors: null,
//       NUR2G: null,
//     };
//   },
//   name: "index",
//   props: ["alarms"],
//   validations() {

//     return {


//       week: {
//         required: helpers.withMessage('Please select a week', required),

//       },

//       year: {
//         required: helpers.withMessage('Please select a year', required),

//       }

//     }
//   },


//   methods: {
//     getNur() {



//       if (!this.v$.$invalid) {


//         if (this.alarms == "NUR") {
//           this.showSpinner = false;
//           this.$router.push(
//             `/nur/statestics/${this.week}/${this.year}`
//           );
//         } else {
//           this.showSpinner = false;
//           this.$router.push(
//             `/energy/statestics/${this.week}/${this.year}`
//           );


//         }

//       }



//     },
//     mountFormData() {
//       for (var i = 1; i <= 52; i++) {
//         this.periods.push(i);
//       }
//       for (var i = 2022; i <= 2050; i++) {
//         this.years.push(i);
//       }
//     },

//   },
//   mounted() {
//     this.mountFormData();
//   },
// };


</script>

<style lang="scss" scoped>
.index {
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
  padding: 2rem;
}

// .index {
//   // margin-top: 6em;
//   // .header{
//   //   width: 100%;
//   //   display: flex;
//   //   align-items: center;
//   //   justify-content: center;
//   //   p{
//   //     font-size: 2rem;
//   //     font-weight: 900;
//   //     color: darkmagenta;
//   //   }
//   // }
// }</style>