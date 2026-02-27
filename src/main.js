import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createBootstrap } from "bootstrap-vue-next";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./assets/style.scss";

createApp(App).use(router).use(createBootstrap()).mount("#app");
