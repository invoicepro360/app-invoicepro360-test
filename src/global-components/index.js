import CChart from "./chart/Main.vue"
import Chart from "./Chart/Chart.vue"

import Litepicker from "./Litepicker/Litepicker.vue"
import Tippy from "./tippy/Main.vue"
import TippyContent from "./tippy-content/Main.vue"
import TomSelect from "./TomSelect/TomSelect.vue";
import LoadingIcon from "./loading-icon/Main.vue"
import FullCalendar from "./calendar/Main.vue"
import FullCalendarDraggable from "./calendar/Draggable.vue"
import DeleteModal from "./Modalbox/Delete.vue"
import DangerAlert from "./Alert/Danger.vue"
import SuccessAlert from "./Alert/Success.vue"
import TopBar from "./top-bar/Main.vue"
import TopMenuContent from "./top-content/top-menu.vue"
import SideMenuContent from "./top-content/side-menu.vue"
import Lucide from "./Lucide/Lucide.vue";
import Checkbox from "./checkbox/Main.vue"
import Radio from "./radio/Main.vue"
// import VueClickAway from "vue3-click-away";
import { VueTelInput } from "vue-tel-input";

export default app => {
    // app.component("Chart", CChart)
    app.component("Chart", Chart)

    app.component("Litepicker", Litepicker)
    app.component("Tippy", Tippy)
    app.component("TippyContent", TippyContent)
    app.component("TomSelect", TomSelect)
    app.component("LoadingIcon", LoadingIcon)
    app.component("FullCalendar", FullCalendar)
    app.component("FullCalendarDraggable", FullCalendarDraggable)
    app.component("DeleteModal", DeleteModal)
    app.component("DangerAlert", DangerAlert)
    app.component("SuccessAlert", SuccessAlert)
    app.component("TopBar", TopBar)
    app.component("TopMenuContent", TopMenuContent)
    app.component("SideMenuContent", SideMenuContent)

    app.component("VueTelInput", VueTelInput)

    app.component("Checkbox", Checkbox)
    app.component("Radio", Radio)
    app.component("Lucide", Lucide)

    // app.component('VueClickAway', VueClickAway)

    // for (const [key, icon] of Object.entries(featherIcons)) {
    //     icon.props.size.default = "24"
    //     app.component(key, icon)
    // }
}
