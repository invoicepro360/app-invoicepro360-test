import { ref } from "vue";
import { slideUp, slideDown } from "@/utils/helper.ts";
// Toggle mobile menu
const activeMobileMenu = ref(false);
const toggleMobileMenu = () => {
  activeMobileMenu.value = !activeMobileMenu.value;
};

// Setup mobile menu
const linkTo = (menu, router) => {
  if (menu.subMenu) {
    menu.activeDropdown = !menu.activeDropdown;
  } else {
    activeMobileMenu.value = false;
    router.push({
      name: menu.pageName
    });
  }
};

const enter = (el) => {
  slideDown(el, 300);
};

const leave = (el) => {
  slideUp(el, 300);
};

export { activeMobileMenu, toggleMobileMenu, linkTo, enter, leave };
