<template>
    <div
        class="alert alert-outline-success alert-dismissible flex items-center mb-2 yr-success bg-white text-normal tracking-wide show"
        :class="cssClass"
        role="alert">
         <slot />

    </div>
</template>

<script>
import { defineComponent } from "vue"

export default defineComponent({
    props : ['cssClass'],
    setup(props){

        return {
            cssClass : props.cssClass            
        }
    }
})
</script>
