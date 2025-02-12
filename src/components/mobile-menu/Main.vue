<template>
  <!-- BEGIN: Mobile Menu -->
  <div class="mobile-menu md:hidden no-print">
    <div class="mobile-menu-bar">
      <a href class="flex mr-auto">
        <img
          alt="Icewall Tailwind HTML Admin Template"
          class="w-6"
          src="@/assets/images/logo.svg"
        />
      </a>
      <Lucide icon="BarChart2"
        class="w-8 h-8 text-white transform -rotate-90"
        @click="toggleMobileMenu"
      />
    </div>
    <transition @enter="enter" @leave="leave">
      <ul v-if="activeMobileMenu" class="border-t border-theme-29 py-5">
        <!-- BEGIN: First Child -->
        <template v-for="(menu, menuKey) in formattedMenu">
          <li
            v-if="menu == 'devider'"
            :key="menu + menuKey"
            class="menu__devider my-6"
          ></li>
          <li v-else :key="menu + menuKey">
            <a
              href="javascript:;"
              class="menu"
              :class="{
                'menu--active': menu.active,
                'menu--open': menu.activeDropdown,
              }"
              @click="linkTo(menu, router)"
            >
              <div class="menu__icon">
                <component :is="menu.icon" />
              </div>
              <div class="menu__title">
                {{ menu.title }}
                <div
                  v-if="menu.subMenu"
                  class="menu__sub-icon"
                  :class="{
                    'transform rotate-180': menu.activeDropdown,
                  }"
                >
                  <Lucide icon="ChevronDown" />
                </div>
              </div>
            </a>
            <!-- BEGIN: Second Child -->
            <transition @enter="enter" @leave="leave">
              <ul v-if="menu.subMenu && menu.activeDropdown">
                <li v-for="(subMenu, subMenuKey) in menu.subMenu" :key="subMenuKey">
                  <a
                    href="javascript:;"
                    class="menu"
                    :class="{
                      'menu--active': subMenu.active,
                    }"
                    @click="linkTo(subMenu, router)"
                  >
                    <div class="menu__icon">
                      <Lucide icon="Activity" />
                    </div>
                    <div class="menu__title">
                      {{ subMenu.title }}
                      <div
                        v-if="subMenu.subMenu"
                        class="menu__sub-icon"
                        :class="{
                          'transform rotate-180': subMenu.activeDropdown,
                        }"
                      >
                        <Lucide icon="ChevronDown" />
                      </div>
                    </div>
                  </a>
                  <!-- BEGIN: Third Child -->
                  <transition @enter="enter" @leave="leave">
                    <ul v-if="subMenu.subMenu && subMenu.activeDropdown">
                      <li
                        v-for="(lastSubMenu, lastSubMenuKey) in subMenu.subMenu"
                        :key="lastSubMenuKey"
                      >
                        <a
                          href="javascript:;"
                          class="menu"
                          :class="{
                            'menu--active': lastSubMenu.active,
                          }"
                          @click="linkTo(lastSubMenu, router)"
                        >
                          <div class="menu__icon">
                            <Lucide icon="Zap" />
                          </div>
                          <div class="menu__title">
                            {{ lastSubMenu.title }}
                          </div>
                        </a>
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
    </transition>
  </div>
  <!-- END: Mobile Menu -->
</template>

<script>
import { defineComponent, computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUtils } from "@/compositions/utils";
import { helper as $h } from "@/utils/helper";
import { activeMobileMenu, toggleMobileMenu, linkTo, enter, leave } from "./index";
import { nestedMenu } from "@/layouts/side-menu";

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { isSetup, menuItems } = useUtils();

    const formattedMenu = ref([]);
    const mobileMenu = computed(() => nestedMenu(menuItems.value, route));

    watch(
      computed(() => route.path),
      () => {
        formattedMenu.value = $h.toRaw(mobileMenu.value);
      }
    );

    onMounted(() => {
      formattedMenu.value = $h.toRaw(mobileMenu.value);
    });

    return {
      activeMobileMenu,
      toggleMobileMenu,
      formattedMenu,
      router,
      linkTo,
      enter,
      leave,
    };
  },
});
</script>
