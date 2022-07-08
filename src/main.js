import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap";
import VueSocialSharing from "vue-social-sharing";

// import "bootstrap/dist/css/bootstrap.min.css";

createApp(App).use(VueSocialSharing).use(router).mount("#app");
