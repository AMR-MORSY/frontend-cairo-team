<template>
    <userNavBar></userNavBar>
    <div class="  w-screen-2xl px-5 mt-10">

        <Card class=" max-w-sm mx-auto" v-if="tokenValid">
            <template #title>

                <p class=" text-center text-font-main-color font-Signika font-extrabold text-lg">
                    Change Password
                </p>

            </template>
            <template #content>

                <form @submit.prevent="changePassword">
                    <div class=" w-full mt-8 ">
                        <FloatLabel class=" w-full">
                            <Password fluid :invalid="v$.newPassword.$error|| passwordBackendError" v-model.trim="v$.newPassword.$model"
                                aria-describedby="pass" toggleMask>
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
                        <div v-if="v$.newPassword.$error">

                            <validationErrorMessage :errors="v$.newPassword.$errors" />
                        </div>


                    </div>
                 
                    <div class=" w-full mt-8 ">
                        <FloatLabel class=" w-full">
                            <Password fluid :feedback="false"
                                :invalid="v$.passwordConfirmation.$error || passwordBackendError"
                                v-model.trim="v$.passwordConfirmation.$model" aria-describedby="pass" toggleMask />
                            <label class=" text-xs">Confirmation Password</label>
                        </FloatLabel>
                        <div v-if="v$.passwordConfirmation.$error">

                            <validationErrorMessage :errors="v$.passwordConfirmation.$errors" />
                        </div>


                    </div>
                  

                    <div v-if="passwordBackendError">
                        <p v-for="error in passwordBackendError" :key="error">{{ error }}</p>
                    </div>
                    <Button type="submit" class="block mx-auto mt-9" severity="danger" label="  Change Password" />


                </form>
            </template>

        </Card>
        <h1 class="text-5xl text-center w-full my-12 font-Signika text-font-main-color" v-if="invalidToken">{{
            errorToken }}
        </h1>

    </div>
</template>

<script>
import User from "../../../apis/User";

import { required, sameAs } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { helpers } from '@vuelidate/validators'
import userNavBar from "../../helpers/User/userNavBar.vue";
import Card from "primevue/card";
import validationErrorMessage from "../../helpers/validationErrorMessage.vue";
export default {
    data() {
        return {
            user_id: null,
            tokenValid: false,
            invalidToken: false,
            errorToken: false,
            newPassword: "",
            passwordConfirmation: "",
            passwordBackendError: null,




        };
    },
    name: "validateToken",
    components: {
        userNavBar,
        validationErrorMessage
    },
    props: ["token"],
    setup: () => ({ v$: useVuelidate() }),
    validations() {
        const passReg = helpers.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);

        return {


            newPassword: {
                required: helpers.withMessage('Password is required', required),
                passReg: helpers.withMessage("Password does not match requirements", passReg),

            },
            passwordConfirmation: {

                required: helpers.withMessage('Password is required', required),
                sameAs: helpers.withMessage('Password and confirmation are not matched', sameAs(this.newPassword)),

            },

        }
    },
    mounted() {
        this.validateToken();

    },
    methods: {

        validateToken() {

            let data = {
                "token": this.token
            }

            User.validateToken(data)

                .then((response) => {
                    console.log(response);
                    if (response.data.id) {

                        this.user_id = response.data.id;
                        this.tokenValid = true;

                    }
                    else if (response.data.error) {
                        this.errorToken = response.data.error;
                        this.invalidToken = true;

                    }
                })
                .catch((error) => {
                    if (error.response.status == 422) {
                        this.errorToken = error.response.data.errors.token[0];
                        this.invalidToken = true;
                    }
                })

        },
        async changePassword() {
            const isFormCorrect = await this.v$.$validate()


            if (!isFormCorrect) return


            let data = {
                user_id: this.user_id,
                password: this.newPassword,
                password_confirmation: this.passwordConfirmation,
            };
            console.log(data)

            User.resetPassword(data)

                .then((response) => {
                    sessionStorage.setItem(
                        "User",
                        JSON.stringify(response.data.user_data)
                    );
                    this.$toast.add({
                        severity: "success",
                        summary: "Success Message",
                        detail: " Password changed successfully",
                        life: 3000,
                    });
                    this.$store.dispatch("userData", response.data.user_data);

                    this.$router.push({
                        path: "/home",
                    });


                })
                .catch(error => {
                    if (error.response.status == 422) {

                        this.passwordBackendError = error.response.data.errors.password;

                    }
                })

        },

    }
}
</script>

<style lang="scss" scoped></style>