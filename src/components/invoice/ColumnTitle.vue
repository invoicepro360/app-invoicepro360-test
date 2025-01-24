<template>
<div class="mt-4">
    <span class="text-gray-800 text-base font-medium">{{name}}</span>
    <div class="mt-2">
        <div v-for="(item,index) in columns" 
        :key="index" class="flex item-center">
            <Radio classes="ml-6 mb-1"                             
                v-model:checked="checkedName.name" 
                :true-value="item.value" false-value="">
                {{item.name}}
            </Radio>
            <input 
                type="text" class="form-control yr-form-control w-48 ml-5" 
                v-model="checkedName.value"
                v-if="checkedName.name == 'others' && item.value == 'others'" />
        </div>                                        
    </div>
</div>
</template>

<script>
import { defineComponent} from "vue";
export default defineComponent({
  props : ['name','columns','checkedName'],
  setup(props) {

      return{
          name : props.name,
          columns : props.columns,
          checkedName : props.checkedName
      }
  }

})
</script>