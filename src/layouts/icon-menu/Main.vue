<template>
  <div>
    <div class="flex">
      <!-- BEGIN: Side Menu -->

      <nav v-if="!isSetup"  class="side-nav side-nav--simple no-print">
        <a href="javascript:;" class="intro-x flex items-center p-1 box">
          <img alt="Invoice PRO 360" class="" src="@/assets/images/logo.svg" />
        </a>
        <!-- END: Logo -->
        <div class="side-nav__devider my-3"></div>
        <ul>
          <li v-for="index in 5" :key="index" class="skeleton-item">
            <a href="" class="side-menu py-5">
              <div class="skeleton-icon side-menu__icon rounded-full"></div>
            </a>
          </li>
        </ul>
      </nav>

      <nav v-if="isSetup"  class="side-nav side-nav--simple no-print">
        <!-- BEGIN: Logo -->
        <a
          href="javascript:;"
          class="intro-x flex items-center p-1 box text-theme-1 mt-2"
        >
          <img alt="Invoice PRO 360" class="" src="@/assets/images/logo.svg" />
        </a>
        <!-- END: Logo -->
        <div class="side-nav__devider my-3"></div>
        <ul>
          <!-- BEGIN: First Child -->
          <template v-for="(menu, menuKey) in formattedMenu">
            <li
              v-if="menu == 'devider'"
              :key="menu + menuKey"
              class="side-nav__devider my-6"
            ></li>
            <li v-else :key="menu + menuKey">
              <Tippy
                tag="a"
                :content="menu.title"
                :options="{
                  placement: 'left'
                }"
                href="javascript:;"
                class="side-menu"
                :class="{
                  'side-menu--active': menu.active,
                  'side-menu--open': menu.activeDropdown
                }"
                @click="linkTo(menu, router)"
              >
                <div class="side-menu__icon">
                  <Lucide :icon="menu.icon" />

                </div>
                <div class="side-menu__title">
                  {{ menu.title }}
                  <Lucide icon="ChevronDown"
                    v-if="$h.isset(menu.subMenu)"
                    class="side-menu__sub-icon"
                    :class="{ 'transform rotate-180': menu.activeDropdown }"
                  />
                </div>
              </Tippy>
              <!-- BEGIN: Second Child -->
              <transition @enter="enter" @leave="leave">
                <ul v-if="$h.isset(menu.subMenu) && menu.activeDropdown">
                  <li
                    v-for="(subMenu, subMenuKey) in menu.subMenu"
                    :key="subMenuKey"
                  >
                    <Tippy
                      tag="a"
                      :content="subMenu.title"
                      :options="{
                        placement: 'left'
                      }"
                      href="javascript:;"
                      class="side-menu"
                      :class="{ 'side-menu--active': subMenu.active }"
                      @click="linkTo(subMenu, router)"
                    >
                      <div class="side-menu__icon">
                        <Lucide icon="Activity" />
                      </div>
                      <div class="side-menu__title">
                        {{ subMenu.title }}
                        <Lucide icon="ChevronDown"
                          v-if="$h.isset(subMenu.subMenu)"
                          class="side-menu__sub-icon"
                          :class="{
                            'transform rotate-180': subMenu.activeDropdown
                          }"
                        />
                      </div>
                    </Tippy>
                    <!-- BEGIN: Third Child -->
                    <transition @enter="enter" @leave="leave">
                      <ul
                        v-if="
                          $h.isset(subMenu.subMenu) && subMenu.activeDropdown
                        "
                      >
                        <li
                          v-for="(lastSubMenu,
                          lastSubMenuKey) in subMenu.subMenu"
                          :key="lastSubMenuKey"
                        >
                          <Tippy
                            tag="a"
                            :content="lastSubMenu.title"
                            :options="{
                              placement: 'left'
                            }"
                            href="javascript:;"
                            class="side-menu"
                            :class="{ 'side-menu--active': lastSubMenu.active }"
                            @click="linkTo(lastSubMenu, router)"
                          >
                            <div class="side-menu__icon">
                              <Lucide icon="Zap" />
                            </div>
                            <div class="side-menu__title">
                              {{ lastSubMenu.title }}
                            </div>
                          </Tippy>
                        </li>
                      </ul>
                    </transition>
                    <!-- END: Third Child -->
                  </li>
                </ul>
              </transition>
              <!-- END: Second Child -->
            </li>
          </template>
          <!-- END: First Child -->
        </ul>
      </nav>
      <!-- END: Side Menu -->
      <!-- BEGIN: Content -->
      <app-skeleton v-if="!isSetup && !isDashboard"></app-skeleton>
      <div class="content">
        <SideMenuContent />
        <div class="px-5">
          <router-view v-if="isSetup || isDashboard" />
        </div>
      </div>

      <!-- END: Content -->
      <DeleteBusiness></DeleteBusiness>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { helper as $h } from "@/utils/helper";
import MobileMenu from "@/components/mobile-menu/Main.vue";
import { linkTo, nestedMenu, enter, leave } from "@/layouts/icon-menu/index";
import { useUtils } from "@/compositions/utils";
import DeleteBusiness from "@/components/set-business/Modal.vue";
import ModalBox from "@/layouts/icon-menu/Modal.vue";
import AppSkeleton from "@/layouts/icon-menu/AppSkeleton.vue";
import cash from "cash-dom"

export default defineComponent({
  components: {
    MobileMenu,
    ModalBox,
    DeleteBusiness,
    AppSkeleton,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { isSetup, menuItems } = useUtils();
    const formattedMenu = ref([]);
    const sideMenu = computed(() => nestedMenu(menuItems.value, route));
    const isDashboard = ref(false);

    if (route.path == "/dashboard") isDashboard.value = true;

    watch(
      () => {
        return isSetup.value;
      },
      () => {
        sideMenu.value = computed(() => nestedMenu(menuItems.value, route));
        formattedMenu.value = $h.toRaw(sideMenu.value);
      }
    );

    watch(
      computed(() => route.path),
      () => {
        formattedMenu.value = $h.toRaw(sideMenu.value);
      }
    );

    onMounted(() => {
      cash("body").removeClass("error-page").removeClass("login").addClass("main");
      formattedMenu.value = $h.toRaw(sideMenu.value);
    });

    return {
      formattedMenu,
      router,
      linkTo,
      enter,
      leave,
      isSetup,
      isDashboard,
    };
  },
});
</script>

<style scoped>
.skeleton-item .skeleton-icon {
  width: 30px;
  height: 30px;
  animation: pulse-bg 1s infinite;
}

.skeleton-item .skeleton-title {
  height: 16px;
  width: 75% !important;
  animation: pulse-bg 1s infinite;
}

@keyframes pulse-bg {
  0% {
    background-color: #3160d8;
  }
  50% {
    background-color: #4875e6;
  }
  100% {
    background-color: #3160d8;
  }
}
</style>
