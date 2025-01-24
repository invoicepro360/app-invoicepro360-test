<template>
    <div class="container sm:px-10">
        <!-- BEGIN: Login Form -->
        <div class="h-screen flex">
            <div class="m-auto box p-8 w-full sm:w-3/4 lg:w-2/5">
                     <a href="" class="pb-5 flex justify-center">
                        <img
                            alt="Invoice Pro 360"
                            class="w-6"
                            src="@/assets/images/logo.svg"
                        />
                        <span class="text-theme-1 text-3xl ml-3">
                            Invoice Pro <span class="font-medium">360</span>
                        </span>
                    </a>

                    <h2 class="text-2xl text-center text-theme-1">
                        Sign In
                    </h2>
                    <div class="mt-2 text-gray-500 text-center">
                        A few more clicks to sign in to your account.
                    </div>
                <form @submit.prevent="submit">
                   
                    <div class="mt-5">
                        <input
                            v-model="formData.username"
                            type="text"
                            class="form-control py-3 px-4 border-gray-300 block"
                            placeholder="Username"
                            :class="{
                                'border-theme-6': validate.username.$error,
                            }"
                        />
                        <div v-if="validate.username.required.$invalid && validate.username.$dirty"
                            class="text-theme-6 mt-2">
                            {{validate.username.required.$message}}
                        </div>

                        <div v-if="isInvalidUser" class="text-theme-6 mt-2">
                            {{ invalidUserMessage }}
                        </div>
                        <div class="relative">
                            <input
                                v-model="formData.password"
                                :type="passwordType"
                                class="form-control py-3 px-4 border-gray-300 block mt-4"
                                placeholder="Password" />
                            <Lucide icon="EyeOff" 
                                class="w-5 h-5 absolute my-auto inset-y-0 mr-3 right-0 z-10 text-gray-700 cursor-pointer" 
                                v-if="passwordType === 'password'"
                                @click="switchVisibility()" />

                            <Lucide icon="Eye" 
                                class="w-5 h-5 absolute my-auto inset-y-0 mr-3 right-0 z-10 text-gray-700 cursor-pointer" 
                                v-if="passwordType === 'text'"
                                @click="switchVisibility()" />
                        </div>

                        <div
                            v-if="validate.password.required.$invalid && validate.password.$dirty"
                            class="text-theme-6 mt-2">
                            
                            {{validate.password.required.$message}}
                        </div>
                    </div>
                    <div class="mt-4 text-center">
                        <button class="btn btn-primary-auth" 
                        :class="{'disable' : showLoadingIcon}"
                        :disabled='showLoadingIcon'>                        
                            <span v-if="!showLoadingIcon">Login</span>
                            <LoadingIcon icon="oval" color="white" class="w-7 h-7" v-if="showLoadingIcon" />
                        </button>

                        <div class="border-gray-1 bg-gray-300 h-px leading-px my-5 flex justify-center">
                            <div class="bg-white text-black-500 px-5 -mt-2">
                                OR
                            </div>
                        </div>
                        <div class="mt-3 flex justify-center">
                            <button class="btn bg-theme-2 w-half mr-3 align-top">
                                <Lucide icon="Facebook" class="w-4 h-4 mr-2" /> Sign in with Facebook
                            </button>
                            <button class="btn bg-theme-2 w-half ml-3 align-top">

                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-google mr-2 w-4 h-4">
                                 <path d="M21.8,10h-2.6l0,0H12v4h5.7c-0.8,2.3-3,4-5.7,4c-3.3,0-6-2.7-6-6s2.7-6,6-6c1.7,0,3.2,0.7,4.2,1.8l2.8-2.8C17.3,3.1,14.8,2,12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10C22,11.3,21.9,10.6,21.8,10z"></path>
                            </svg> Sign in with Google
                            </button>
                        </div>
                       
                    </div>
                    
                </form>
            </div>
        </div>
        <!-- END: Login Form -->
    </div>
</template>

<script setup>
import { onMounted, watch } from "vue"
import { login } from "@/compositions/auth"

    const {
        formData,
        passwordType,
        showLoadingIcon,
        submit,
        switchVisibility,
        validate,
        isInvalidUser,
        invalidUserMessage,
    } = login()

    onMounted(() => {
        document.body.classList.remove("main",'error-page')
        document.body.classList.add('login')
    })

    watch([isInvalidUser], () => {
        setTimeout(() => {
            isInvalidUser.value = false
        }, 4000)
    })

</script>
