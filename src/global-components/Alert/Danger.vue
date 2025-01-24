<template>
    <div
        class="alert alert-outline-danger alert-dismissible mb-2 yr-danger bg-white text-normal tracking-wide show"
        :class="{'flex items-center': !slots.header}"    
        role="alert">

        <slot name="header" v-if="slots.header" class="flex items-center"></slot>

        <Lucide icon="AlertOctagon" class="w-6 h-6 mr-2" v-if="!slots.header"/> 
        <slot />
        <button type="button" class="btn-close" data-bs-dismiss="alert"
            aria-label="Close"
            v-if="!slots.header">
            <Lucide icon="X" class="w-4 h-4" />
        </button>
    </div>
</template>

<script>
import { defineComponent, useSlots } from "vue"

export default defineComponent({
    setup (){
        const slots = useSlots()

        return {
            slots
        }
    }
})
</script>
