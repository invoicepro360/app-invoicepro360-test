<template>
  <div>
    <div class="container">
      <!-- BEGIN: Error Page -->
      <div
        class="error-page flex flex-col lg:flex-row items-center justify-center h-screen text-center lg:text-left"
      >
        <div class="-intro-x lg:mr-20">
          <img
            alt="Invoice Pro 360"
            class="h-48 lg:h-auto"
            src="@/assets/images/error-illustration.svg"
          />
        </div>
        <div class="text-white mt-10 lg:mt-0">
          <div class="intro-x text-8xl font-medium">404</div>
          <div class="intro-x text-xl lg:text-3xl font-medium mt-5">
            Oops. This page has gone missing.
          </div>
          <div class="intro-x text-lg mt-3">
            You may have mistyped the address or the page may have moved.
          </div>
          <router-link 
          class="intro-x btn py-3 px-4 text-white border-white mt-10" 
          :to="{ name: 'dashboard' }"
          tag="button">Back to Dashboard</router-link>

        </div>
      </div>
      <!-- END: Error Page -->
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import cash from "cash-dom"
export default {
  setup() {
    onMounted(() => {
      cash("body")
        .removeClass("main")
        .removeClass("login")
        .addClass("error-page");
    });
  }
};
</script>
