<template>
    <div class="absolute bg-white rounded shadow top-1 w-1/4 z-50">
        <div class="px-4 pt-4">
            <div class="mb-3">
                <h2 class="text-2xl font-bold ">Your Account</h2>
                <a
                    href="javascript:;"
                    class="btn btn-rounded w-10 absolute top-3 right-5 btn-primary"
                    @click="$emit('closeModalBox')">X
                </a>
            </div>
            <div class="mb-5">
                <ul class="border-0">
                    <li v-for="(business, index) in businesses" :key="business.id">
                        <div class="modal-business-list">
                            <div>{{business.companyName}}</div>
                            <set-business :id="business.id" :default-id="defaultBusinessId" 
                                @set="setDefaultBusiness">
                            </set-business>                            
                        </div>
                    </li>
                </ul> 

                <div class="mt-2 flex flex-col">

                    <a
                        href="javascript:;"
                        class="rounded text-sm font-medium"
                        @click="logout()">Signout</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useAuth } from "@/compositions/auth"
import { useUtils } from "@/compositions/utils"
import setBusiness from "@/components/set-business/Main.vue"

export default {
    components : {
        setBusiness
    },
    emits: ["closeModalBox"],
    setup() {
        const { logout, setDefaultBusiness, defaultBusinessId} = useAuth()
        const { businesses} = useUtils()

        return {        
            logout,
            businesses,
            setDefaultBusiness,
            defaultBusinessId
        }
    },
}
</script>

<style></style>
