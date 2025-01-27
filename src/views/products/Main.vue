<template>
  <div class="">
    <TopBar
      @create-click="setIsOpen(true)"
      create-link-text="Add a New Product or Service"
      :can-create="permissions.create"
    >
      <template #more-action>
        <button
          v-if="permissions.export"
          class="export-btn"
          aria-expanded="false"
          @click="exportCSV"
        >
          <Lucide icon="FileText" class="w-4 h-4 mr-2" /> Export
        </button>
      </template>

      <template #search-form>
        <div class="flex">
          <div class="w-full md:w-3/7 px-1">
            <TomSelect
              v-model="filters.type"
              :options="{
                search: false,
                classNames: 'w-full',
                placeholder: 'Select Product Type',
              }"
            >
              <option value="product">Product</option>
              <option value="service">Service</option>
            </TomSelect>
          </div>
          <div class="w-full md:w-4/7 px-1">
            <div class="relative">
              <input
                v-model="filters.field"
                class="form-control yr-form-control"
                type="text"
                placeholder="Name or Description"
              />
              <div
                class="rounded absolute right-0 top-0 w-10 h-full flex items-center justify-center bg-gray-100 border-2 text-gray-600"
              >
                <Lucide icon="Search" class="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </template>
    </TopBar>

    <!-- BEGIN: HTML Table Data -->
    <div class="col-span-12 mt-6">
      <div class="items-center block h-10 intro-y sm:flex">
        <div class="flex items-center mt-3 sm:ml-auto sm:mt-0">
          <Button
          class="flex items-center !box text-slate-600 dark:text-slate-300"
          >
          <Lucide icon="FileText" class="hidden w-4 h-4 mr-2 sm:block" />
          Export to Excel
          </Button>
          <Button
          class="flex items-center ml-3 !box text-slate-600 dark:text-slate-300"
          >
          <Lucide icon="FileText" class="hidden w-4 h-4 mr-2 sm:block" />
          Export to PDF
          </Button>
        </div>
      </div>
      <div class="mt-8 overflow-auto intro-y lg:overflow-visible sm:mt-0">
        <Table class="border-spacing-y-[10px] border-separate sm:mt-2">
          <Table.Thead>
          <Table.Tr>
          <Table.Th class="border-b-0 whitespace-nowrap">
          NAME
          </Table.Th>
          <Table.Th class="text-center border-b-0 whitespace-nowrap">
          PRICE
          </Table.Th>
          <Table.Th class="text-center border-b-0 whitespace-nowrap">
          DESCRIPTION
          </Table.Th>
          <Table.Th class="text-center border-b-0 whitespace-nowrap">
          TYPE
          </Table.Th>
          <Table.Th class="text-center border-b-0 whitespace-nowrap">
          STATUS
          </Table.Th>
          <Table.Th class="text-center border-b-0 whitespace-nowrap">
          ACTIONS
          </Table.Th>
          </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
          <Table.Tr
          v-for="(product, index) in products"
          :key="product.id"
          class="intro-x"
          >
          <Table.Td
          class="box rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600"
          >
          <a href="" class="font-medium whitespace-nowrap">
            {{ product.name }}
          </a>
          <div
            class="text-slate-500 text-xs whitespace-nowrap mt-0.5"
          >
            {{ product.category }}
          </div>
          </Table.Td>
          <Table.Td
          class="text-center box rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600"
          >
          {{ product.price }}
          </Table.Td>
          <Table.Td class="text-center">{{ product.description }}</Table.Td>
          <Table.Td class="text-center">{{ product.type }}</Table.Td>
          <Table.Td
          class="box w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600"
          >
          <div
            :class="[
            'flex items-center justify-center',
            { 'text-success': product.status },
            { 'text-danger': !product.status },
            ]"
          >
            <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" />
            {{ product.status ? "Active" : "Inactive" }}
          </div>
          </Table.Td>
          <Table.Td
          :class="[
            'box w-56 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600',
            'before:absolute before:inset-y-0 before:left-0 before:my-auto before:block before:h-8 before:w-px before:bg-slate-200 before:dark:bg-darkmode-400',
          ]"
          >
          <div class="flex items-center justify-center">
            <a class="flex items-center mr-3" href="">
            <Lucide icon="CheckSquare" class="w-4 h-4 mr-1" />
            Edit
            </a>
            <a class="flex items-center text-danger" href="">
            <Lucide icon="Trash2" class="w-4 h-4 mr-1" />
            Delete
            </a>
          </div>
          </Table.Td>
          </Table.Tr>
          </Table.Tbody>
        </Table>
      </div>
      <div
      class="flex flex-wrap items-center mt-3 intro-y sm:flex-row sm:flex-nowrap"
      >
        <Pagination class="w-full sm:w-auto sm:mr-auto">
          <Pagination.Link>
          <Lucide icon="ChevronsLeft" class="w-4 h-4" />
          </Pagination.Link>
          <Pagination.Link>
          <Lucide icon="ChevronLeft" class="w-4 h-4" />
          </Pagination.Link>
          <Pagination.Link>...</Pagination.Link>
          <Pagination.Link>1</Pagination.Link>
          <Pagination.Link active>2</Pagination.Link>
          <Pagination.Link>3</Pagination.Link>
          <Pagination.Link>...</Pagination.Link>
          <Pagination.Link>
          <Lucide icon="ChevronRight" class="w-4 h-4" />
          </Pagination.Link>
          <Pagination.Link>
          <Lucide icon="ChevronsRight" class="w-4 h-4" />
          </Pagination.Link>
        </Pagination>
        <FormSelect class="w-20 mt-3 !box sm:mt-0">
          <option>10</option>
          <option>25</option>
          <option>35</option>
          <option>50</option>
        </FormSelect>
      </div>
    </div>
    <!-- END: HTML Table Data -->
    <DeleteModal
      message="Do you really want to inactive the record?"
      btn-text="Mark as Inactive"
      :isOpen="isDeleteModal"
      @delete="deleteProduct"
      @close="isDeleteModal = false"
    />
    <!-- Modal -->
    <Dialog
      :open="isOpen"
      @close="setIsOpen(false)"
      class="relative z-50"
    >
      <div class="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel>
          <CreateForm @save="onSave" @close="setIsOpen(false)" />
        </DialogPanel>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import { FormSelect } from "@/components/Form";
import Button from "@/components/Button";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/vue";
import CreateForm from "@/views/products/CreateForm.vue";
import { ref, onMounted, watch, computed } from "vue";

import {
  fetchProduct,
  deleteProduct,
  showNotification,
  exportCSV,
} from "@/compositions/products";


const {
  permissions,
  products,
  fetchProducts,
  filters,
  isDeleteModal,
  isNotify,
} = fetchProduct();

const isOpen = ref(false)

function setIsOpen(value: boolean) {
  isOpen.value = value
}

const onSave = async () => {
  setIsOpen(false); // Close the modal after successful save
};

// On reset filter
const onResetFilter = () => {
  filters.value.field = "";
  filters.value.type = "";
};

onMounted(() => {
  fetchProducts();
  filters.value.field = "";
  filters.value.type = "";
  // Notification for success / error
  if (isNotify.value) showNotification();
});

watch([isNotify], () => {
  if (isNotify.value) showNotification();
});

// watch([filters.value], () => {
//   tabulator.value.setFilter([
//     { field: "search", type: "like", value: filters.value.field },
//     { field: "type", type: "=", value: filters.value.type },
//   ]);
// });

</script>
<style type="text/css">
.tabulator-col-content .tabulator-col-title-holder {
  text-align: center !important;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
