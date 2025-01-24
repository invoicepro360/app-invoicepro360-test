<template>
  <div class="grid grid-cols-12 gap-6">
    <div class="mt-10 col-span-12">
      <div class="box p-5 border rounded-md border-slate-200/60">
        <div
          class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60"
        >
          {{ formTitle }}
        </div>

        <form @submit.prevent="submit">
          <div class="mt-5">
            <div class="block sm:flex flex-row items-center py-3">
              <label
                class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-64 xl:!mr-10"
                ><div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Name</div>
                    <div
                      class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 text-xs rounded-md"
                    >
                      Required
                    </div>
                  </div>
                </div></label
              >
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <input
                  v-model="product.name"
                  type="text"
                  class="form-control yr-form-control"
                  :class="{ 'border-theme-6': vp$.name.$error }"
                  placeholder="Name"
                  tabindex="1"
                />
                <div
                  v-if="vp$.name.required.$invalid && vp$.name.$dirty"
                  class="text-theme-6 mt-2"
                >
                  Product name is required
                </div>
              </div>
            </div>

            <div class="block sm:flex flex-row items-start py-3">
              <label
                class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-64 xl:!mr-10"
              >
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Product Description</div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Include max. 60 characters allowed.
                  </div>
                </div>
              </label>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <textarea
                  v-model="product.description"
                  class="form-control yr-form-control"
                  cols="5"
                  rows="5"
                  placeholder="Description"
                  tabindex="2"
                  @keyup="trimDescription"
                ></textarea>
                <div class="text-xs text-slate-500 mt-2 text-right">
                  Maximum character {{ product.description?.length ?? 0 }}/60
                </div>
                <div
                  v-if="vp$.description.maxLength.$invalid && vp$.description.$dirty"
                  class="text-theme-6 mt-2"
                >
                  Maximum character 60 allowed
                </div>
              </div>
            </div>

            <div
              v-if="showIncomeAcountDropdown"
              class="block sm:flex flex-row items-center py-3"
            >
              <label
                class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-64 xl:!mr-10"
              >
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Income Account</div>
                    <div
                      class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 text-xs rounded-md"
                    >
                      Required
                    </div>
                  </div>
                </div>
              </label>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <TomSelect
                  v-model="product.income_account_id"
                  :options="{
                    search: true,
                    classNames: 'w-full',
                  }"
                  tabindex="3"
                >
                  <option>Income Account</option>
                  <option
                    v-for="(account, k) in chartAccounts"
                    :key="k"
                    :value="account.id"
                  >
                    {{ account.name }}
                  </option>
                </TomSelect>
              </div>
            </div>

            <div class="block sm:flex flex-row items-center py-3">
              <label
                class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-64 xl:!mr-10"
              >
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Price</div>
                    <div
                      class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 text-xs rounded-md"
                    >
                      Required
                    </div>
                  </div>
                </div>
              </label>

              <div class="flex-1 w-full mt-3 xl:mt-0">
                <input
                  v-model="product.price"
                  type="text"
                  class="form-control yr-form-control"
                  :class="{ 'border-theme-6': vp$.price.$error }"
                  placeholder="0.00"
                  v-decimal="'auto'"
                  tabindex="4"
                />
                <div
                  v-if="vp$.price.required.$invalid && vp$.price.$dirty"
                  class="text-theme-6 mt-2"
                >
                  Price is required
                </div>
              </div>
            </div>

            <div class="block sm:flex flex-row items-center py-3">
              <label
                class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-64 xl:!mr-10"
              >
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Type</div>
                    <div
                      class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 text-xs rounded-md"
                    >
                      Required
                    </div>
                  </div>
                </div>
              </label>

              <div class="flex-1 w-full mt-3 xl:mt-0">
                <div class="grid grid-cols-12 gap-2">
                  <div class="col-span-2 text-center">
                    <Radio
                      v-model:checked="product.type"
                      true-value="product"
                      false-value=""
                      tabindex="5"
                      >Product</Radio
                    >
                  </div>

                  <div class="col-span-2 text-center">
                    <Radio
                      classes="pl-2"
                      v-model:checked="product.type"
                      true-value="service"
                      false-value=""
                      tabindex="6"
                      >Service</Radio
                    >
                  </div>
                </div>
              </div>
            </div>

            <div class="block sm:flex flex-row items-center py-3">
              <label
                class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-64 xl:!mr-10"
              >
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Taxable</div>
                  </div>
                </div>
              </label>
              <div class="w-2/6">
                <Checkbox
                  classes="mb-3"
                  v-model:checked="product.is_taxable"
                  :true-value="1"
                  :false-value="0"
                  tabindex="7"
                />
              </div>
            </div>

            <div class="block sm:flex flex-row items-center py-3">
              <div class="">
                <button
                  type="submit"
                  class="btn btn-primary px-5 mr-3 tracking-wider"
                  :class="{ disable: showLoadingIcon }"
                  :disabled="showLoadingIcon"
                  tabindex="8"
                >
                  <span v-if="!showLoadingIcon">Save</span>
                  <LoadingIcon
                    icon="oval"
                    color="white"
                    class="w-5 h-5"
                    v-if="showLoadingIcon"
                  />
                </button>
                <button
                  type="button"
                  class="btn btn-default px-5 tracking-wider bg-white"
                  tabindex="9"
                  @click="goBack"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { saveProduct, readProduct, showNotification } from "@/compositions/products/";
export default {
  setup() {
    const formTitle = ref("Add Product & Service");

    const {
      product_id,
      product,
      chartAccounts,
      showIncomeAcountDropdown,
      submit,
      vp$,
      showLoadingIcon,
      trimDescription,
      isNotify,
    } = saveProduct();

    onMounted(() => {
      if (router.currentRoute.value.name == "edit-product") {
        formTitle.value = "Edit Product & Service";
        readProduct(router.currentRoute.value.params.id);
      }
      if (isNotify.value) showNotification();
    });

    watch([isNotify], () => {
      if (isNotify.value) showNotification();
    });

    const goBack = () => {
      router.push({ name: "product-services" });
    };

    return {
      formTitle,
      product_id,
      product,
      chartAccounts,
      showIncomeAcountDropdown,
      submit,
      goBack,
      vp$,
      showLoadingIcon,
      trimDescription,
    };
  },
};
</script>
