<template>
  <div class="billing-section">
    <div class="flex items-center mt-5 my-2">
      <h2 class="font-medium text-xl mr-auto">Billing Address</h2>
    </div>
    <div class="grid grid-cols-12 gap-x-5 gap-y-2 px-0 pb-5 border-b border-gray-200">
      <div class="col-span-6">
        <label for="billing-address-line-2" class="form-label">Address Line 1</label>
        <input
          v-model="customer.billing.addressLine1"
          type="text"
          class="form-control yr-form-control"
          placeholder="Address"
        />
      </div>

      <div class="col-span-6">
        <label for="billing-address-line-2" class="form-label">Address Line 2</label>
        <input
          v-model="customer.billing.addressLine2"
          type="text"
          class="form-control yr-form-control"
          placeholder="Address 2"
        />
      </div>

      <div class="col-span-6 select-control">
        <label for="billing-country">Country</label>
        <div>
          <TomSelect
            v-model="customer.billing.country"
            :options="{
              search: true,
              classNames: 'w-full',
            }"
          >
            <option>Select country</option>
            <option v-for="(country, key) in countries" :key="key" :value="country.code">
              {{ country.name }}
            </option>
          </TomSelect>
        </div>
      </div>

      <div class="col-span-6 select-control">
        <label for="billing-states">States</label>
        <div>
          <TomSelect
            v-model="customer.billing.state"
            :options="{
              search: true,
              classNames: 'w-full',
            }" 
            >
            <option
              v-for="state in billingStates"
              :key="state.id"
              :value="state.state_code"
            >
              {{ state.name }}
            </option>
          </TomSelect>
        </div>
      </div>

      <div class="col-span-6">
        <label for="billing-city" class="form-label">City</label>
        <input
          v-model="customer.billing.city"
          type="text"
          class="form-control yr-form-control"
          placeholder="City"
        />
      </div>

      <div class="col-span-6">
        <label for="billing-zip-code" class="form-label">Postal/Zip Code</label>
        <input
          v-model="customer.billing.zipCode"
          type="text"
          class="form-control yr-form-control"
          placeholder=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watchEffect } from "vue";
export default {
  name: "BillingForm",
  props: {
    customer: Object,
    vb: Object,
    countries: Object,
    states: Array,
  },
  setup(props) {
    const customer = props.customer;
    const vb$ = props.vb;
    const countries = props.countries;
    const states = props.states;

    //computed property for dependent billing states
    const billingStates = computed(() => {
      return states.filter((st) => st.country_code == customer.billing.country);
    });

    watchEffect(() => {
      return customer.billing.country;
    }, billingStates);

    return {
      customer,
      vb$,
      billingStates,
      countries,
      states,
    };
  },
};
</script>
