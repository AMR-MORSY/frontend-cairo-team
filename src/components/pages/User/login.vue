<template>
  <userNavBar></userNavBar>
  <div class=" w-screen-2xl px-5 mt-20 py-10">

    <Card class="max-w-sm mx-auto">

      <template #content>


        <p class=" text-center text-font-main-color font-Signika font-extrabold text-lg">
          Log in
        </p>

        <form @submit.prevent="submitLoginForm" novalidate>

          <div class="my-3 w-full">

            <FloatLabel class=" w-full">


              <InputText class=" w-full" :invalid="v$.email.$error" v-model.trim="v$.email.$model"
                aria-describedby="email" />
              <label>Email</label>



            </FloatLabel>
            <div v-if="v$.email.$error">
              <ValidationErrorMessage :errors="v$.email.$errors" />
            </div>
          </div>



          <div class=" w-full mt-8 ">
            <FloatLabel class=" w-full">
              <Password fluid :feedback="false" :invalid="v$.password.$error" v-model.trim="v$.password.$model"
                aria-describedby="pass" toggleMask />
              <label>Password</label>
            </FloatLabel>
            <div v-if="v$.password.$error">

              <ValidationErrorMessage :errors="v$.password.$errors" />
            </div>


          </div>




          <div class="  flex flex-col justify-center  py-2 mt-5">

            <!-- <Button label="Login"  class="text-xs block w-full rounded-full" type="submit"/> -->
            <button class=" block  text-white rounded-xl py-2 bg-font-main-color">Login</button>


            <div class=" mt-5 flex justify-between items-center">
              <router-link to="/user/resetPassword"
                class="  text-xs md:text-base font-bold font-Signika text-font-main-color underline underline-offset-1">Forgot
                Password?</router-link>
              <router-link to="/user/register"
                class="text-xs md:text-base  font-bold font-Signika text-font-main-color underline underline-offset-1">Create new
                Account</router-link>

            </div>



          </div>




        </form>







      </template>



    </Card>


  </div>

</template>

<script>

import User from "../../../apis/User";

import { email, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { helpers } from '@vuelidate/validators';
import userNavBar from "../../helpers/User/userNavBar.vue";
import ValidationErrorMessage from "../../helpers/validationErrorMessage.vue";








export default {
  setup: () => ({ v$: useVuelidate() }),

  data() {
    return {

      email: null,
      password: null,
      visible: false,
      message: "",



    };
  },
  name: "login",

  components: {
    userNavBar,
    ValidationErrorMessage
  },

  validations() {

    return {


      email: {
        required: helpers.withMessage('Email is required', required),
        email: helpers.withMessage('please enter a valid email address', email)
      },

      password: {
        required: helpers.withMessage('Password is required', required),

      }

    }
  },


  methods: {
    hideDialog() {
      this.visible = false;

    },
    async submitLoginForm() {

      const isFormCorrect = await this.v$.$validate()


      if (!isFormCorrect) return


      let form = {
        email: this.email,
        password: this.password
      }
      User.login(form)
        .then((response) => {

          if (response.data.message == "User loged in successfully") {
            sessionStorage.setItem(
              "User",
              JSON.stringify(response.data.user_data)
            );
            this.$store.dispatch("userData", response.data.user_data);

            this.$router.push({
              path: "/home",
            });

          }
          else if (response.data.message == "Account is not verified yet") {
            this.$confirm.require({
              group: "yesNo",
              message: response.data.message,
              header: 'Activation',
              icon: 'pi pi-exclamation-triangle',
              position: 'center',
              rejectProps: {
                label: 'No',
                severity: 'danger',

              },
              acceptProps: {
                label: 'Verify',
                severity: 'success',

              },
              accept: () => {
                this.$router.push({ name: 'ActivateUserAccount' })
              },
              reject: () => {
                this.$router.push({ name: 'welcome' })
                this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 4000 });
              }
            });


          }
          else {

            this.$toast.add({
              severity: "error",
              summary: "Error Message",
              detail: " This email address does not exist",
              life: 6000,
            });

          }


        })
        .catch((error) => {
          console.log(error)
          if (error.response) {

            if (error.response.status == 422) {
              if (error.response.data.errors) {
                let emailError = error.response.data.errors.email;
                emailError.forEach((error) => {
                  this.$toast.add({
                    severity: "error",
                    summary: "Error Message",
                    detail: error,
                    life: 3000,
                  });

                })
              }
              else {
                this.$toast.add({
                  severity: "error",
                  summary: "Error Message",
                  detail: "invalid credentials",
                  life: 3000,
                });

              }


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

/* button {
  background-color: #673EE6;
  border: unset;
  color: white;
} */

.links {
  font-size: clamp(13px, 2vw, 15px);
}
</style>