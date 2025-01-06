<template>
  <userNavBar></userNavBar>

  <div class=" w-screen-2xl px-10 py-10">
    <Card class=" max-w-xs mx-auto">
      <template #title>

        <p class=" text-center text-font-main-color font-Signika font-extrabold text-lg">
          Reset Password
        </p>

      </template>
      <template #content>
        <form @submit.prevent="sendToken" novalidate>


          <div class="w-full mt-8">

            <FloatLabel class=" w-full">


              <InputText fluid :invalid="v$.emailForm.email.$error" type="text" v-model.trim="v$.emailForm.email.$model"
                aria-describedby="email" />
              <label class=" text-xs">Email</label>



            </FloatLabel>
            <div v-if="v$.emailForm.email.$error">
              <validationErrorMessage :errors="v$.emailForm.email.$errors" />
            </div>
          </div>

          <Button class="block mt-2" severity="success" raised label="Send Token To Email Address" type="submit" />


        </form>
        <div class="flex justify-end mt-5">
          <router-Link to="/user/login"
            class=" block text-font-main-color font-Signika font-semibold underline decoration-2"> Back to log in
            page</router-Link>

        </div>

      </template>

    </Card>




  </div>

 
</template>

<script>
import User from "../../../apis/User.js";
import userNavBar from "../../helpers/User/userNavBar.vue";
import validationErrorMessage from "../../helpers/validationErrorMessage.vue";

import { email, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { helpers } from '@vuelidate/validators';
export default {
  data() {
    return {
      emailForm: {
        email: "",
      },




    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {

    return {

      emailForm: {

        email: {
          required: helpers.withMessage('Email is required', required),
          email: helpers.withMessage('please enter a valid email address', email)
        },



      }
    }
  },

  name: "resetPassword",
  components: {
    userNavBar,
    validationErrorMessage
  },
  methods: {

    async sendToken() {
      const isFormCorrect = await this.v$.$validate()


      if (!isFormCorrect) return



      User.sendToken(this.emailForm)
        .then((response) => {
          console.log(response)

          this.$toast.add({
            severity: "success",
            summary: "Success Message",
            detail: "Password reset token has been Sent to this email, please check",
            life: 8000,
          });


        })
        .catch((error) => {
          console.log(error)
          if (error.response.status == 422) {
            this.$toast.add({
              severity: "error",
              summary: "Error Message",
              detail: error.response.data.errors.email,
              life: 3000,
            });

          }
        })
    }



  },
};
</script>

<style lang="scss" scoped>
.reset-password {

  max-width: 300px;
  margin: auto;

}
</style>