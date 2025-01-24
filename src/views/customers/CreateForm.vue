<template>
  <div class="content">
    <div class="mt-10 w-5/5 md:w-3/5 lg:w-3/5 xl:w-3/5 mx-auto">
      <div class="flex items-center">
        <h2 class="text-2xl font-bold mr-auto">{{ formTitle }}</h2>
      </div>

      <div class="mt-5 box p-5">
        <form @submit.prevent="submit">
          <ContactForm :customer="customer" :vc="validate"></ContactForm>

          <BillingForm
            :customer="customer"
            :vb="validate"
            :countries="countries"
            :states="states"
          ></BillingForm>

          <ShippingForm
            :customer="customer"
            :vs="validate"
            :countries="countries"
            :states="states"
            @sameAsBillingAddress="sameAsBillingAddress"
          ></ShippingForm>

          <div class="flex py-5">
            <button
              type="submit"
              class="btn btn-primary px-5 mr-3 tracking-wider"
              :class="{ disable: showLoadingIcon }"
              :disabled="showLoadingIcon"
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
              class="btn btn-default px-5 tracking-wider"
              @click="goBack"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import ContactForm from "@/views/customers/ContactForm.vue";
import BillingForm from "@/views/customers/BillingForm.vue";
import ShippingForm from "@/views/customers/ShippingForm.vue";
import {
  saveCustomer,
  readCustomer,
  showNotification,
  goBack,
} from "@/compositions/customer";

export default {
  components: {
    ContactForm,
    BillingForm,
    ShippingForm,
  },
  setup() {
    const formTitle = ref("New Customer");
    const {
      countries,
      states,
      customer,
      submit,
      validate,
      showLoadingIcon,
      sameAsBillingAddress,
      isNotify,
    } = saveCustomer();

    onMounted(() => {
      if (router.currentRoute.value.name == "edit-customer") {
        formTitle.value = "Edit a Customer";
        readCustomer(router.currentRoute.value.params.id);
      }
      if (isNotify.value) showNotification();
    });

    watch([isNotify], () => {
      if (isNotify.value) showNotification();
    });

    return {
      formTitle,
      countries,
      states,
      customer,
      submit,
      validate,
      showLoadingIcon,
      goBack,
      sameAsBillingAddress,
    };
  },
};
</script>

<style scoped>
.box .grid label {
  display: none;
}
</style>
