<template>
  <Menu>
    <Menu.Button :as="Button" variant="primary">
      <Lucide icon="ChevronDown" class="w-5 h-5 text-gray-600" />
    </Menu.Button>
    <Menu.Items>
      <Menu.Item v-if="permissions.edit" @click="edit">
          <Lucide icon="Edit2" class="w-4 h-4 text-gray-700 mr-2" /> Edit
      </Menu.Item>
      <Menu.Item  v-if="permissions.delete" @click="showDeleteModal(props.data)">
         <Lucide icon="Trash" class="w-4 h-4 text-gray-700 mr-2" /> {{ deletebtnTxt }}
      </Menu.Item>
    </Menu.Items>
  </Menu>
</template>

<script setup>
import { inject } from 'vue';
import Button from '@/components/Button';
import { Menu } from '@/components/Headless';
import  Lucide  from "@/global-components/Lucide";

const props = defineProps(['data','permissions','editRoute'])
const showDeleteModal = inject('showDeleteModal');
const deletebtnTxt = props.data.status == 'active'? "Mark as Inactive" : "Mark as Active"

const edit = () => {
  router.push({
    name: props.editRoute,
    params: { id: props.data.id },
  })
}

</script>