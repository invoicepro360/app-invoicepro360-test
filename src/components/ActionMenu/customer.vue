<template>
  <Menu>
    <Menu.Button :as="Button" variant="primary">
      <Lucide icon="ChevronDown" class="w-5 h-5 text-gray-600" />
    </Menu.Button>
    <Menu.Items>
      <Menu.Item v-if="permissions.edit" @click="editCustomer">
          <Lucide icon="Edit2" class="w-4 h-4 text-gray-700 mr-2" /> Edit
      </Menu.Item>
      <Menu.Item  v-if="permissions.delete" @click="handleDelete()">
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
const props = defineProps(['data','permissions','deletebtnTxt'])
const emit = defineEmits('delete')

// console.log(props.data.status)

const showDeleteModal = inject('showDeleteModal');

// Handle the delete action
const handleDelete = () => {

  showDeleteModal(props.data);
};

const editCustomer = () => {
  router.push({
    name: "edit-customer",
    params: { customer_id: props.data.id },
  })
}

</script>