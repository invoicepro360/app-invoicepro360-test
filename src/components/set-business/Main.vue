<template>
<div>
    <Tippy v-if="defaultId == businessId" tag="div" content="Default business">
        <Lucide icon="Star"  class=" text-theme-11 default-business-star"  />
    </Tippy>

    <Tippy v-if="defaultId != businessId" tag="div" content="Click to set default business">
        <Lucide icon="Star"  class=" text-theme-11 cursor-pointer" @click="$emit('set',businessId)" />
    </Tippy>  
</div>
</template>

<script setup>
import { ref, watchEffect } from "vue"
    const props = defineProps(['defaultId','id'])
    const emits=  defineEmits(["set"])
    const defaultId     = ref(props.defaultId)
    const businessId    = props.id
    watchEffect(() => {
        defaultId.value  = props.defaultId
    })
</script>
