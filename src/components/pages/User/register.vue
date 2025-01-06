<template>
  <userNavBar></userNavBar>
  

  <div class="  w-screen-2xl px-10 py-20">

    <Card class=" max-w-xs mx-auto ">

      <template #content>


        <p class=" text-center text-font-main-color font-Signika font-extrabold text-lg">
          Register
        </p>

        <form @submit.prevent="submitRegisterForm" novalidate>
          <div class="my-3 w-full">

            <FloatLabel class=" w-full">


              <InputText class=" w-full" :invalid="v$.email.$error" type="text" v-model.trim="v$.name.$model"
                aria-describedby="name" />
              <label class=" text-xs">Name</label>



            </FloatLabel>
            <div v-if="v$.name.$error">
              <ValidationErrorMessage :errors="v$.name.$errors" />
            </div>
          </div>
          <div class="w-full mt-8">

            <FloatLabel class=" w-full">


              <InputText class=" w-full" :invalid="v$.email.$error" type="text" v-model.trim="v$.email.$model"
                aria-describedby="email" />
              <label class=" text-xs">Email</label>



            </FloatLabel>
            <div v-if="v$.email.$error">
              <ValidationErrorMessage :errors="v$.email.$errors" />
            </div>
          </div>

          <div class=" w-full mt-8 ">
            <FloatLabel class=" w-full">
              <Password fluid :invalid="v$.password.$error" v-model.trim="v$.password.$model" aria-describedby="pass"
                toggleMask>
                <template #header>
                  <div class="font-semibold text-xm mb-4">Pick a password</div>
                </template>
                <template #footer>
                  <Divider />
                  <ul class="pl-2 ml-2 my-0 leading-normal">
                    <li>At least one lowercase</li>
                    <li>At least one uppercase</li>
                    <li>At least one numeric</li>
                    <li>Minimum 8 characters</li>
                  </ul>
                </template>
              </Password>
              <label class=" text-xs">Password</label>
            </FloatLabel>
            <div v-if="v$.password.$error">

              <ValidationErrorMessage :errors="v$.password.$errors" />
            </div>


          </div>
          <div class=" w-full mt-8 ">
            <FloatLabel class=" w-full">
              <Password fluid :feedback="false" :invalid="v$.password_confirmation.$error"
                v-model.trim="v$.password_confirmation.$model" aria-describedby="pass" toggleMask />
              <label class=" text-xs">Confirmation Password</label>
            </FloatLabel>
            <div v-if="v$.password_confirmation.$error">

              <ValidationErrorMessage :errors="v$.password_confirmation.$errors" />
            </div>


          </div>





          <div class="  flex flex-col justify-center  py-2 mt-5">

            <!-- <Button label="Login"  class="text-xs block w-full rounded-full" type="submit"/> -->
            <button class=" block text-xs text-white rounded-xl py-2 bg-font-main-color">Register</button>


            <div class=" mt-5 flex justify-between items-center">
              <router-link to="/user/login"
                class=" text-sm font-bold font-Signika text-font-main-color underline underline-offset-1">have an
                account?</router-link>

            </div>



          </div>




        </form>







      </template>



    </Card>


  </div>

</template>

<script>
import User from "../../../apis/User";

import { email, required, maxLength, sameAs, alpha, minLength } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { helpers } from '@vuelidate/validators'
import userNavBar from "../../helpers/User/userNavBar.vue";
import ValidationErrorMessage from "../../helpers/validationErrorMessage.vue";
import Password from "primevue/password";

export default {
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    const passReg = helpers.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
    const nameReg = helpers.regex(/^[a-zA-Z]{3,}[a-zA-Z ]*$/);
    return {
      name: {
        required: helpers.withMessage('Name is required', required),
        minLength: helpers.withMessage("min 3 characters", minLength(3)),
        maxLength: helpers.withMessage("max 50 characters", maxLength(50)),
        nameReg: helpers.withMessage('Alphabit characters only', nameReg),

      },


      email: {
        required: helpers.withMessage('Email is required', required),
        email: helpers.withMessage('please enter a valid email address', email)
      },

      password: {
        required: helpers.withMessage('Password is required', required),
        passReg: helpers.withMessage("Password does not match requirements", passReg),

      },
      password_confirmation: {

        required: helpers.withMessage('Password is required', required),
        sameAs: helpers.withMessage('Password and confirmation are not matched', sameAs(this.password)),

      },

    }

  },
  data() {
    return {

      name: "",
      email: "",
      password: "",
      password_confirmation: "",
     

    };
  },
  components: {
    userNavBar,
    ValidationErrorMessage
  },


  methods: {
    async submitRegisterForm() {
      const isFormCorrect = await this.v$.$validate()


      if (!isFormCorrect) return

      let form = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation
      }
      User.register(form)
        .then((response) => {

          this.$confirm.require({
            group: 'info',
            header: 'Info',
            message: 'Your account has been created Successfully.Please check your e-mail to verify your account',
            icon: 'pi pi-info-circle',
            acceptProps: {
              label: 'OK',
              icon: 'pi pi-check',
              size: 'small',
              severity:"danger"
              },
            accept: () => {
              this.$toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
              this.$router.replace({name:"welcome"});
            },


          });

        

        })
        .catch((error) => {
          if (error.response.status == 422) {
            let errors = error.response.data.errors;
            if (errors.email) {
              errors.email.forEach((element) => {
                this.$toast.add({
                  severity: "error",
                  summary: "Error Message",
                  detail: element,
                  life: 6000,
                });
              });
            }
            if (errors.name) {
              errors.name.forEach((element) => {
                this.$toast.add({
                  severity: "error",
                  summary: "Error Message",
                  detail: element,
                  life: 6000,
                });
              });
            }
            if (errors.password) {
              errors.password.forEach((element) => {
                this.$toast.add({
                  severity: "error",
                  summary: "Error Message",
                  detail: element,
                  life: 6000,
                });
              });
            }
          }
        })






    },

  },
};
</script>

<style scoped>
.container {
  height: 100vh !important;



}

.form-container {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px !important;
  max-width: 350px;



}
</style>