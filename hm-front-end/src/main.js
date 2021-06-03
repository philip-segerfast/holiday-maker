import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router.js";
import store from "./store/store.js";
import VueClickAway from "vue3-click-away";
import { loadStripe } from "@stripe/stripe-js";

createApp(App).use(store).use(router).use(VueClickAway).mount("#app");
