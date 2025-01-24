<template>
    <label class="yr-checkbox"  

    :class="[{
        'checked'   : isChecked,
        'unchecked' : !isChecked,        
    },classes]">
        <div class="div-checkbox">
            <input type="checkbox" class="opacity-0 absolute cursor-pointer"
            :checked="isChecked" 
            
            :true-value="trueValue" :false-value="falseValue"
            @input="check">
            <svg viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
        </div>
        <div class="select-none">            
            <slot></slot>
        </div>
    </label>
</template>

<script>
import { defineComponent, computed } from "vue"
export default defineComponent({

    props : ['trueValue','falseValue','checked','classes'],
    setup(props,{emit}) {
        
        const isChecked = computed(() => {
            return (props.checked instanceof Array) ? props.checked.includes(props.trueValue): props.checked
        });

        const check = (event) => {
            if(props.checked instanceof Array){
                (event.target.checked) ? props.checked.push(props.trueValue) : props.checked.splice(props.checked.indexOf(props.trueValue), 1)
                emit('update:checked',props.checked)

            }else{
                emit('update:checked',(event.target.checked) ?  props.trueValue : props.falseValue)
            }                                         
        }


        return {
            isChecked,
            check
        }

    }

})
</script>
