<template>
    <userNavBar></userNavBar>
    <div class=" w-screen-2xl px-10  py-10">


        <Card class="max-w-sm mx-auto">
            <template #title>

                <p class=" text-center w-full text-lg text-font-main-color font-Signika font-bold">
                    Activate your account
                </p>

            </template>

            <template #content>




                <form @submit.prevent="activateUserAccount" novalidate>
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

                   



                    <Button label="Activate" class="block" type="submit" raised severity="success"/>


                </form>
                <div class="flex justify-end" >
                    <router-Link to="/user/login" class=" block text-font-main-color font-Signika font-semibold underline decoration-2"> Back to log in page</router-Link>

                </div>

               







            </template>



        </Card>
    </div>
</template>

<script>
import userNavBar from "../../helpers/User/userNavBar.vue";
import User from "../../../apis/User";
import { email, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { helpers } from '@vuelidate/validators';
export default {
    data() {


        return {
            email: null,
        };


    },
    "name": "ActivateUserAccount",
    components: {
        userNavBar,
    },
    setup: () => ({ v$: useVuelidate() }),
    validations() {

        return {


            email: {
                required: helpers.withMessage('Email is required', required),
                email: helpers.withMessage('please enter a valid email address', email)
            },



        }
    },
    methods: {
        async activateUserAccount() {


            const isFormCorrect = await this.v$.$validate()


            if (!isFormCorrect) return


            let form = {
                email: this.email,

            }
            User.activateUserAccount(form).then((response) => {
                console.log(response)
                this.$toast.add({
                    severity: "success",
                    summary: "success Message",
                    detail: "Activation code has been sent to your email.Please check your email",
                    life: 8000,
                });

            }).catch((error) => {
                if (error.response.status == 422) {
                    this.$toast.add({
                        severity: "error",
                        summary: "Error Message",
                        detail: "Email does not exist",
                        life: 3000,
                    });

                }

            })


        }
    }

}
</script>

<style lang="scss" scoped>
.form-container {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px !important;
    max-width: 300px;

    button {
        background-color: #673EE6;
        border: unset;
        color: white;
    }

    .links {
        font-size: clamp(13px, 2vw, 15px);
        padding-top: 16px;
        display: block;
        font-weight: 500;
    }

}
</style>