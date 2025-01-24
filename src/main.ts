import { createApp,nextTick } from "vue"
import { createPinia } from "pinia";
import App from "./App.vue"
import router from "./router"

import globalComponents from "./global-components"
import utils from "./utils"
import directive from "./utils/directive"

import "./libs"

// SASS Theme
import "./assets/sass/app.scss"
import VueClickAway from "vue3-click-away";


const DEFAULT_TITLE = 'Invoicepro360 - ';
router.afterEach((to, from) => {
    // Use next tick to handle router history correctly
    // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
    nextTick(() => {
        document.title = DEFAULT_TITLE + to.meta.title ;
    });
});


const app = createApp(App).use(router).use(VueClickAway)
app.use(createPinia());
  
globalComponents(app)
utils(app)
directive(app)

app.mount("#app")








