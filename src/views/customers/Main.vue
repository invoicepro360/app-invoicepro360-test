<template>
  <div class="content">
    <div v-if="permissions.view">
      <TopBar
        create-link-route="add-customer"
        create-link-text="Create Customer"
        :can-create="permissions.create"
      >
        <template #more-action>
          <button
            v-if="permissions.export"
            class="export-btn"
            aria-expanded="false"
            :class="{ disable: showLoadingIcon }"
            :disabled="showLoadingIcon"
            @click="exportCSV"
          >
            <LoadingIcon
              icon="oval"
              color="white"
              class="w-7 h-7"
              v-if="showLoadingIcon"
            />
            <span v-if="!showLoadingIcon">
              <Lucide icon="FileText" class="w-4 h-4 mr-2" /> Export
            </span>
          </button>
        </template>

        <template #search-form>
          <form id="tabulator-html-filter-form" class="flex">
            <div class="w-60 relative text-gray-700">
              <input
                type="text"
                class="form-control yr-form-control w-60 placeholder-theme-13"
                placeholder="Search by name or email"
              />
              <Lucide icon="Search" class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0" />
            </div>
          </form>
        </template>
      </TopBar>

      <!-- BEGIN: HTML Table Data -->
      <div class="intro-y box">
        <div class="scrollbar-hidden">
          <div
            id="tabulator"
            ref="tableRef"
            class="table-report table-report--tabulator"
          ></div>
        </div>
      </div>
      <!-- END: HTML Table Data -->
    </div>

    <DeleteModal 
      :isOpen="isDeleteModal"
      btn-text="Mark as Inactive"
      @delete="deleteCustomer"
      @close="isDeleteModal = false"
      message="Do you really want to inactive the record?"
    />
  </div>
</template>

<script>
import { defineComponent, onMounted, watch } from "vue";

import {
  fetchCustomer,
  deleteCustomer,
  exportCSV,
  showNotification,
} from "@/compositions/customer/";
export default defineComponent({
  setup() {
    const {
      tableRef,
      tabulator,
      filter,
      initTabulator,
      reInitOnResizeWindow,
      isNotify,
      permissions,
      showLoadingIcon,
      isDeleteModal
    } = fetchCustomer();

    // Filter function
    const onFilter = () => {
      tabulator.value.setFilter(filter.field, filter.type, filter.value);
    };
    // On reset filter
    const onResetFilter = () => {
      filter.field = "name";
      filter.type = "like";
      filter.value = "";
      onFilter();
    };

    onMounted(() => {
      initTabulator();
      reInitOnResizeWindow();
      if (isNotify.value) showNotification();
    });

    watch([isNotify], () => {
      if (isNotify.value) showNotification();
    });

    return {
      tableRef,
      filter,
      showLoadingIcon,
      onFilter,
      onResetFilter,
      exportCSV,
      deleteCustomer,
      isDeleteModal,
      permissions,
    };
  },
});
</script>