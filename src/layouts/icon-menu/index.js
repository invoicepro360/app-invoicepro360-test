import { slideUp, slideDown } from "@/utils/helper.ts";
// Setup side menu
const findActiveMenu = (subMenu, route) => {
    let match = false
    subMenu.forEach(item => {
        if (item.pageName === route.name && !item.ignore) {
            match = true
        } else if (!match && item.subMenu) {
            match = findActiveMenu(item.subMenu, route)
        }
    })
    return match
}

const nestedMenu = (menu, route) => {
    menu.forEach((item, key) => {
        if (typeof item !== "string") {
            let menuItem = menu[key]
            menuItem.active =
                (item.pageName === route.name ||
                    (item.subMenu && findActiveMenu(item.subMenu, route))) &&
                !item.ignore

            if (item.subMenu) {
                menuItem.activeDropdown = findActiveMenu(item.subMenu, route)
                menuItem = {
                    ...item,
                    ...nestedMenu(item.subMenu, route),
                }
            }
        }
    })

    return menu
}

const linkTo = (menu, router) => {
    if (menu.subMenu) {
        menu.activeDropdown = !menu.activeDropdown
    } else {
        router.push({
            name: menu.pageName,
        })
    }
}

const enter = (el) => {
    slideDown(el, 300);
  };
  
  const leave = (el) => {
    slideUp(el, 300);
  };
  
export { nestedMenu, linkTo, enter, leave }
