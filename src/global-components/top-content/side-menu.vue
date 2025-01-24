<template>
  <div class="top-bar border-b px-5 no-print z-50">
    <div class="mr-auto">
      <h1 class="text-xl font-medium mr-auto">{{ title }}</h1>
    </div>
    <div class="sm:flex">
      <a
        href="javascript:;"
        class="flex items-center p-2 rounded-md text-white mx-3 bg-theme-1"
        @click="showModalBox = !showModalBox"
      >
        <span class="xl:block overflow-hidden whitespace-nowrap overflow-ellipsis"
          >{{ currentBusinessName }}
        </span>
        <Lucide icon="ChevronDown" class="xl:block ml-2" v-if="!showModalBox" />
        <Lucide icon="ChevronUp" class="xl:block ml-2" v-if="showModalBox" />
      </a>
    </div>
    <ModalBox v-if="showModalBox" />

    <!-- BEGIN: Account Menu -->
    <div class="dropdown w-8 h-8">
      <div
        class="dropdown-toggle w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in"
        role="button"
        aria-expanded="false"
        data-tw-toggle="dropdown"
      >
        <Lucide icon="User" class="w-5 h-5 text-gray-700 mx-1 my-1" />
      </div>
      <div class="dropdown-menu w-56">
        <div class="dropdown-menu__content box bg-theme-26 text-white">
          <div class="p-4 border-b border-theme-27">
            <div class="font-medium">{{ user.firstName }} {{ user.lastName }}ss</div>
          </div>



          <div class="p-2 border-t border-theme-27">
            <a
              href="javascript:;"
              @click="logout()"
              class="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-theme-1 rounded-md"
            >
              <Lucide icon="ToggleRight" class="w-4 h-4 mr-2" /> Logout
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- END: Account Menu -->
  </div>


</template>

<script>
import { defineComponent, watch, ref, onMounted } from "vue";
import { useAuth } from "@/compositions/auth";

import { useUtils } from "@/compositions/utils";
import setBusiness from "@/components/set-business/Main.vue";
import ModalBox from "@/layouts/top-menu/Modal.vue";

export default defineComponent({
  components: {
    setBusiness,
    ModalBox,
  },
  emits: ["closeModalBox"],
  setup() {
    const { logout, user } = useAuth();
    const showModalBox = ref(false);
    const title = ref(router.currentRoute.value.meta.title);
    const {
      currentBusinessName,
      isSetup,
      isIntuitAccessTokenValid,
      intuitSyncSettings,
      isHideIntuitAlert,
      hideIntuitAlert,
    } = useUtils();

    watch(
      () => {
        return router.currentRoute.value.name;
      },
      () => {

        title.value = router.currentRoute.value.meta.title;
      }
    );

    return {
      title,
      user,
      isSetup,
      logout,
      showModalBox,
      currentBusinessName,
      isIntuitAccessTokenValid,
      intuitSyncSettings,
      hideIntuitAlert,
      isHideIntuitAlert,
    };
  },
});
</script>
