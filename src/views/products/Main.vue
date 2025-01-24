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
    <div class="intro-y border-l border-r border-b box">
      <div class="overflow-x-auto scrollbar-hidden">
        <div
          id="tabulator"
          ref="tableRef"
          class="table-report table-report--tabulator"
        ></div>
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
  fetchProduct,
  deleteProduct,
  showNotification,
  exportCSV,
} from "@/compositions/products";

export default defineComponent({
  setup() {
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
      initTabulator();
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
