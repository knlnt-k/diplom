import { createApp, reactive } from "vue";
import router from "@/router";
import store from "@/store";
import popups from "@/popups";

import App from "./app.vue";
import Infrastructure from "@/infrastructure";
import toaster from "@/toaster";
import leftPanel from "./left-panel";
import loader from "@/loader";

const app = createApp(App);

app.config.globalProperties.$popups = reactive(popups);
app.config.globalProperties.$infra = Infrastructure;
app.config.globalProperties.$toaster = reactive(toaster);
app.config.globalProperties.$leftPanel = reactive(leftPanel);
app.config.globalProperties.$loader = reactive(loader);

app
  .use(router)
  .use(store)
  .mount("#app");
