import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap";
import { Tooltip } from "bootstrap";

// import { tooltip } from "./assets/common";

// import "bootstrap/dist/css/bootstrap.min.css";

// Om custom directives, se her: https://v3-migration.vuejs.org/breaking-changes/custom-directives.html og her https://stackoverflow.com/questions/64001792/how-to-make-custom-directive-in-vue-js-3 og her https://stackoverflow.com/questions/69053972/adding-bootstrap-5-tooltip-to-vue-3
createApp(App)
  .use(router)
  .directive("highlight", {
    beforeMount(el, binding) {
      el.style.background = binding.value;
    },
  })
  //   .directive("tooltip", tooltip)
  .directive("tooltip", {
    mounted(el) {
      new Tooltip(el);
    },
  })
  .mount("#app");
