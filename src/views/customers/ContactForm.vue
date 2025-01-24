<template>
  <div>
    <div class="flex items-center mb-2">
      <h2 class="font-medium text-xl mr-auto">Basic Information</h2>
    </div>
    <div class="grid grid-cols-12 gap-x-5 gap-y-2 px-0 pb-5 border-b border-gray-200">
      <div class="col-span-12">
        <label for="customer" class="form-label">
          Customer <span class="text-theme-6">*</span>
        </label>
        <input
          v-model="customer.contact.customer"
          type="text"
          class="form-control yr-form-control"
          :class="{
            'border-theme-6': vc$.contact.customer.$error,
          }"
          placeholder="Person or Business name"
        />
        <div
          v-if="vc$.contact.customer.required.$invalid && vc$.contact.customer.$dirty"
          class="text-theme-6 text-xs"
        >
          Customer name is required
        </div>
      </div>

      <div class="col-span-6">
        <label for="first-name" class="form-label">First Name</label>
        <input
          v-model="customer.contact.firstName"
          type="text"
          class="form-control yr-form-control"
          placeholder="First Name"
        />
      </div>

      <div class="col-span-6">
        <label for="last-name" class="form-label">Last Name</label>
        <input
          v-model="customer.contact.lastName"
          type="text"
          class="form-control yr-form-control"
          placeholder="Last Name"
        />
      </div>

      <div class="col-span-6">
        <label for="mobile-number" class="form-label">Mobile Number</label>        
        <VueTelInput 
                    id="mobile-number" 
                    v-model="customer.contact.mobileNumber" 
                    :autoFormat="true" 
                    :default-country="''"
                    :showSearchBox="true" 
                    :inputOptions="{ placeholder: '(999) 999-999' }"/>
      </div>

      <div class="col-span-6">

        <label for="phone-number" class="form-label">Phone Number</label>
        <VueTelInput 
                    id="phone-number" 
                    v-model="customer.contact.phoneNumber" 
                    :autoFormat="true" 
                    :default-country="''"
                    :showSearchBox="true" 
                    :inputOptions="{ placeholder: '(999) 999-999' }"/>
      </div>

      <div class="col-span-6">
        <label for="email" class="form-label">Email</label>
        <input
          v-model="customer.contact.email"
          type="email"
          class="form-control yr-form-control"
          placeholder="Email"
        />
      </div>

      <div class="col-span-6">
        <label for="webiste" class="form-label">Website </label>
        <input
          v-model="customer.contact.website"
          type="text"
          class="form-control yr-form-control"
          placeholder="Website"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactForm",
  props: {
    customer: Object,
    vc: Object,
  },
  setup(props) {
    const customer = props.customer;
    const vc$ = props.vc;

    return {
      customer,
      vc$,
    };
  },
};
</script>
