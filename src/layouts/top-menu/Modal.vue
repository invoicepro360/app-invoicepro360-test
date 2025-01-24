<template>
  <div class="absolute box top-16 right-1 w-1/4 z-50">
    <div class="">
      <div class="">
        <ul class="border-0">
          <li v-for="(business, index) in businesses" :key="business.id">
            <div
              class="modal-business-list"
              :class="{ rounded: index == 0, rounded: index + 1 == businesses.length }"
            >
              <div>{{ business.companyName }}</div>
              <set-business
                :id="business.id"
                :default-id="defaultBusinessId"
                @set="setDefaultBusiness"
              >
              </set-business>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuth } from "@/compositions/auth";
import { useUtils } from "@/compositions/utils";
import setBusiness from "@/components/set-business/Main.vue";

export default {
  components: {
    setBusiness,
  },
  setup() {
    const { logout, setDefaultBusiness, defaultBusinessId } = useAuth();
    const { businesses } = useUtils();

    return {
      logout,
      businesses,
      setDefaultBusiness,
      defaultBusinessId,
    };
  },
};
</script>

<style></style>
