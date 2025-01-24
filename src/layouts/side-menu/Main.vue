<template>
  <div>
    <MobileMenu />
    <div class="flex">
      <!-- BEGIN: Side Menu -->
      <ModalBox v-if="showModalBox" @closeModalBox="closeModalBox" />
      <nav v-if="!isSetup" class="side-nav sticky top-0 h-screen no-print">
        <a href="javascript:;" class="intro-x flex items-center p-1 box">
          <img alt="Invoice PRO 360" class="" src="@/assets/images/invoice-logo.png" />
        </a>
        <!-- END: Logo -->
        <div class="side-nav__devider my-3"></div>
        <ul>
          <li v-for="index in 5" :key="index" class="skeleton-item">
            <a href="" class="side-menu py-5">
              <div class="skeleton-icon side-menu__icon rounded-full"></div>
              <div class="skeleton-title side-menu__title rounded-full"></div>
            </a>
          </li>
        </ul>
      </nav>

      <nav v-if="isSetup" class="side-nav sticky top-0 h-screen no-print">
        <!-- BEGIN: Logo -->
        <a
          href="javascript:;"
          class="intro-x flex items-center p-1 box text-theme-1 mt-2"
        >
          <img alt="Invoice PRO 360" class="" src="@/assets/images/invoice-logo.png" />
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
              <SideMenuTooltip
                tag="a"
                :content="menu.title"
                href="javascript:;"
                class="side-menu"
                :class="{
                  'side-menu--active': menu.active,
                  'side-menu--open': menu.activeDropdown,
                }"
                @click="linkTo(menu, router)"
              >
                <div class="side-menu__icon">
                  <component :is="menu.icon" />
                </div>
                <div class="side-menu__title">
                  {{ menu.title }}
                  <div
                    v-if="menu.subMenu"
                    class="side-menu__sub-icon"
                    :class="{ 'transform rotate-180': menu.activeDropdown }"
                  >
                    <Lucide icon="ChevronDown" />
                  </div>
                </div>
              </SideMenuTooltip>
              <!-- BEGIN: Second Child -->
              <transition @enter="enter" @leave="leave">
                <ul v-if="menu.subMenu && menu.activeDropdown">
                  <li v-for="(subMenu, subMenuKey) in menu.subMenu" :key="subMenuKey">
                    <SideMenuTooltip
                      tag="a"
                      :content="subMenu.title"
                      href="javascript:;"
                      class="side-menu"
                      :class="{
                        'side-menu--active': subMenu.active,
                      }"
                      @click="linkTo(subMenu, router)"
                    >
                      <div class="side-menu__icon">
                        <component :is="subMenu.icon" />
                      </div>
                      <div class="side-menu__title">
                        {{ subMenu.title }}
                        <div
                          v-if="subMenu.subMenu"
                          class="side-menu__sub-icon"
                          :class="{
                            'transform rotate-180': subMenu.activeDropdown,
                          }"
                        >
                          <Lucide icon="ChevronDown" />
                        </div>
                      </div>
                    </SideMenuTooltip>
                    <!-- BEGIN: Third Child -->
                    <transition @enter="enter" @leave="leave">
                      <ul v-if="subMenu.subMenu && subMenu.activeDropdown">
                        <li
                          v-for="(lastSubMenu, lastSubMenuKey) in subMenu.subMenu"
                          :key="lastSubMenuKey"
                        >
                          <SideMenuTooltip
                            tag="a"
                            :content="lastSubMenu.title"
                            href="javascript:;"
                            class="side-menu"
                            :class="{
                              'side-menu--active': lastSubMenu.active,
                            }"
                            @click="linkTo(lastSubMenu, router)"
                          >
                            <div class="side-menu__icon">
                              <Lucide icon="Zap" />
                            </div>
                            <div class="side-menu__title">
                              {{ lastSubMenu.title }}
                            </div>
                          </SideMenuTooltip>
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
import SideMenuTooltip from "@/components/side-menu-tooltip/Main.vue";
import { linkTo, nestedMenu, enter, leave } from "@/layouts/side-menu/index.js";
import { useUtils } from "@/compositions/utils";
import DeleteBusiness from "@/components/set-business/Modal.vue";
import ModalBox from "@/layouts/side-menu/Modal.vue";
import AppSkeleton from "@/layouts/side-menu/AppSkeleton.vue";
import cash from "cash-dom"

export default defineComponent({
  components: {
    MobileMenu,
    SideMenuTooltip,
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
    const showModalBox = ref(false);
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

    const closeModalBox = () => {
      showModalBox.value = false;
    };

    return {
      formattedMenu,
      router,
      linkTo,
      enter,
      leave,
      showModalBox,
      closeModalBox,
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
