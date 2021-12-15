<template>
    <div class="max-w-1x1 pr-4 pl-4">
        <div class="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 card-container">
            <!-- <img
            id="profile-img"
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            class="profile-img-card"
        /> -->
        <!-- <div class="block mx-auto h-12 rounded-full sm:mx-0 sm:flex-shrink-0">
            <font-awesome-icon :icon="['fas', 'user']" size="3x" />
        </div> -->
            <Form @submit="handleLogin" :validation-schema="schema">
                <div class="mb-4">
                    <label for="student_id">Student Id</label>
                    <Field name="student_id" type="text" class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded" />
                    <ErrorMessage name="student_id" class="error-feedback" />
                </div>
                <div class="mb-4">
                    <label for="password">Password</label>
                    <Field name="password" type="password" class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded" />
                    <ErrorMessage name="password" class="error-feedback" />
                </div>

                <div class="mb-4">
                    <button class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-blue-600 text-white hover:bg-blue-600 block w-full"
                    :disabled="loading">
                        <span
                        v-show="loading"
                        class="spinner-border spinner-border-sm"
                        ></span>
                        <span>Login</span>
                    </button>
                </div>

                <div class="mb-4">
                    <div v-if="message" class="relative px-3 py-3 mb-4 border rounded bg-red-200 border-red-300 text-red-800" role="alert">
                        {{ message }}
                    </div>
                </div>
            </Form>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from 'vuex'
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";


export default defineComponent({
    name: "Login",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const schema = yup.object().shape({
            student_id: yup.number().required("Student id is required!"),
            password: yup.string().required("Password is required!"),
        });

        return {
            loading: false,
            message: "",
            schema,
        };
    },
    setup(props, context) {
        const store=useStore();
        return {
            getStore:function() {
                return store;
            }
        }
    },
    computed: {
        loggedIn() {
            // return false;
            const store=useStore();
            return store.state.auth.status.loggedIn;
        },
    },
    created() {
        if (this.loggedIn) {
            this.$router.push("/");
        }
    },
    methods: {
        handleLogin(user:any) {
            this.loading = true;


            this.getStore().dispatch("auth/login", user).then(
                () => {
                    this.message="";
                    this.$router.push("/");
                },
                (error) => {
                    this.loading = false;
                    this.message =
                        (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                        error.message ||
                        error.toString();
                }
            );
        },
    }
});
</script>
<style scoped>
</style>