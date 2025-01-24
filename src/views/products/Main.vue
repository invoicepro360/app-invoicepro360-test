<template>
  <div class="">
    <TopBar
      create-link-route="add-product"
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
    <div class="intro-y border-l border-r border-b box">
      <div class="overflow-x-auto scrollbar-hidden">
        <div class="mt-8 overflow-auto intro-y lg:overflow-visible sm:mt-0">
          <Table class="w-full text-left border-spacing-y-[10px] border-separate sm:mt-2">
            <thead>
              <tr>
                <th class="font-medium px-5 py-3 dark:border-darkmode-300 border-b-0 whitespace-nowrap">
                NAME
                </th>
                <th class="font-medium px-5 py-3 dark:border-darkmode-300 text-center border-b-0 whitespace-nowrap">
                PRICE
                </th>
                <th class="font-medium px-5 py-3 dark:border-darkmode-300 text-center border-b-0 whitespace-nowrap">
                DESCRIPTION
                </th>
                <th class="font-medium px-5 py-3 dark:border-darkmode-300 text-center border-b-0 whitespace-nowrap">
                TYPE
                </th>
                <th class="font-medium px-5 py-3 dark:border-darkmode-300 text-center border-b-0 whitespace-nowrap">
                STATUS
                </th>
                <th class="font-medium px-5 py-3 dark:border-darkmode-300 text-center border-b-0 whitespace-nowrap">
                ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(product, index) in products"
                :key="product.id"
                class="intro-x"
              >
                <td
                class="px-5 py-3 border-b dark:border-darkmode-300 box rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600"
                >
                <a href="" class="font-medium whitespace-nowrap">
                  {{ product.name }}
                </a>
                <div
                  class="text-slate-500 text-xs whitespace-nowrap mt-0.5"
                >
                  {{ product.category }}
                </div>
                </td>
                <td
                class="px-5 py-3 border-b dark:border-darkmode-300 text-center box rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600"
                >
                {{ product.price }}
                </td>
                <td class="px-5 py-3 border-b dark:border-darkmode-300 text-center box rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600"><div class="flex lg:justify-center">{{ product.description }}</div></td>
                <td class="px-5 py-3 border-b dark:border-darkmode-300 text-center box rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">{{ product.type }}</td>
                <td
                class="px-5 py-3 border-b dark:border-darkmode-300 text-center box rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600"
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
                </td>
                <td
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
                </td>
            </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
    <div
      class="flex flex-wrap items-center mt-3 intro-y sm:flex-row sm:flex-nowrap"
      >
      <nav class="w-full sm:w-auto sm:mr-auto">
        <ul class="flex w-full mr-0 sm:w-auto sm:mr-auto">
        <li class="flex-1 sm:flex-initial">
        <Lucide icon="ChevronsLeft" class="w-4 h-4" />
        </li>
        <li class="flex-1 sm:flex-initial">
        <Lucide icon="ChevronLeft" class="w-4 h-4" />
        </li>
        <li class="flex-1 sm:flex-initial">...</li>
        <li class="flex-1 sm:flex-initial">1</li>
        <li class="flex-1 sm:flex-initial" active>2</li>
        <li class="flex-1 sm:flex-initial">3</li>
        <li class="flex-1 sm:flex-initial">...</li>
        <li class="flex-1 sm:flex-initial">
        <Lucide icon="ChevronRight" class="w-4 h-4" />
        </li>
        <li class="flex-1 sm:flex-initial">
        <Lucide icon="ChevronsRight" class="w-4 h-4" />
        </li>
        </ul>
      </nav>
      <select class="disabled:bg-slate-100 disabled:cursor-not-allowed disabled:dark:bg-darkmode-800/50 [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 transition duration-200 ease-in-out text-sm border-slate-200 shadow-sm rounded-md py-2 px-3 pr-8 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 w-20 mt-3 !box sm:mt-0">
        <option>10</option>
        <option>25</option>
        <option>35</option>
        <option>50</option>
      </select>
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
  </div>
</template>

<script>
import { defineComponent, onMounted, watch } from "vue";
import {
  fetchProductData,
  products,
  fetchProduct,
  deleteProduct,
  showNotification,
  exportCSV,
} from "@/compositions/products";

export default defineComponent({
  setup() {
    // Define a function to load products asynchronously
    const loadProducts = async () => {
      await fetchProductData(); // Fetch data and update the `products` ref
    };

    const {
      isNotify,
      tableRef,
      tabulator,
      filters,
      initTabulator,
      reInitOnResizeWindow,
      permissions,
      isDeleteModal,
    } = fetchProduct();

    // On reset filter
    const onResetFilter = () => {
      filters.value.field = "";
      filters.value.type = "";
    };

    onMounted(() => {
      loadProducts();
      //initTabulator();
      reInitOnResizeWindow();
      filters.value.field = "";
      filters.value.type = "";
      // Notification for success / error
      if (isNotify.value) showNotification();
    });

    watch([isNotify], () => {
      if (isNotify.value) showNotification();
    });

    watch([filters.value], () => {
      tabulator.value.setFilter([
        { field: "search", type: "like", value: filters.value.field },
        { field: "type", type: "=", value: filters.value.type },
      ]);
    });

    return {
      products,
      tableRef,
      filters,
      onResetFilter,
      deleteProduct,
      exportCSV,
      permissions,
      isDeleteModal,
    };
  },
});
</script>
<style type="text/css">
.tabulator-col-content .tabulator-col-title-holder {
  text-align: center !important;
}
</style>
