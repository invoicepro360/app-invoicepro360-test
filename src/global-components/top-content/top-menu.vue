<template>
  <div
    class="border-b border-theme-3 no-print flex items-center box bg-theme-3 px-5 py-3 no-print"
  >
    <div class="mr-auto hidden sm:flex">
      <!-- BEGIN: Logo -->
      <a
        href="javascript:;"
        class="intro-x flex items-center p-2 rounded-md bg-white my-1 text-theme-1"
      >
        <img alt="Invoice PRO 360" class="w-32" src="@/assets/images/invoice-logo.png" />
      </a>
      <!-- END: Logo -->
    </div>

    <div class="sm:flex">
      <!-- BEGIN: Logo -->
      <a
        href="javascript:;"
        class="intro-x flex items-center p-2 rounded-md bg-white mx-2 text-theme-1"
        @click="showModalBox = !showModalBox"
      >
        <span
          class="xl:block text-theme-1 text-lg ml-3 overflow-hidden whitespace-nowrap overflow-ellipsis"
          >{{ currentBusinessName }}
        </span>
        <Lucide icon="ChevronDown" class="xl:block ml-2" v-if="!showModalBox" />
        <Lucide icon="ChevronUp" class="xl:block ml-2" v-if="showModalBox" />
      </a>
      <!-- END: Logo -->
    </div>
    <ModalBox v-if="showModalBox" @closeModalBox="closeModalBox" />
    <!-- END: Search -->
    <!-- BEGIN: Account Menu -->
    <div class="intro-x dropdown w-8 h-8">
      <div
        class="dropdown-toggle w-8 h-8 rounded-full bg-white overflow-hidden shadow-lg image-fit zoom-in"
        role="button"
        aria-expanded="false"
        data-tw-toggle="dropdown"
      >
        <Lucide icon="User" class="w-4 h-4 text-gray-700 mr-2"/>
      </div>
      <div class="dropdown-menu w-56">
        <ul class="dropdown-content bg-theme-10 text-white">
          <li class="p-2">
            <div class="font-medium">{{ user.firstName }} {{ user.lastName }}</div>
          </li>

          <li>
            <hr class="dropdown-divider border-white/[0.08]" />
          </li>

          <li class="p-2">
            <a
              href="javascript:;"
              class="dropdown-item hover:bg-white/5"
              @click="logout()"
              >Logout</a
            >
          </li>
        </ul>
      </div>
    </div>
    <!-- END: Account Menu -->
  </div>


</template>

<script setup>
import { ref } from "vue";
import { useAuth } from "@/compositions/auth";
import { useUtils } from "@/compositions/utils";
import ModalBox from "@/layouts/top-menu/Modal.vue";
	const { logout, user, setDefaultBusiness, defaultBusinessId } = useAuth();
	const showModalBox = ref(false);

	const {
		businesses,
		currentBusinessName,      
	} = useUtils();


	const closeModalBox = () => {
		showModalBox.value = false;
	};
</script>
