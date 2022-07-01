import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import ResultsPage from "../views/ResultsPage.vue";
import LikesPage from "../views/LikesPage.vue";
import ArchivePage from "../views/ArchivePage.vue";
import ProductPage from "../views/ProductPage.vue";
import ProductVideoPage from "../views/ProductVideoPage.vue";

// import { store } from "../assets/store.js";

// console.log("path from store " + store.path);
// console.log("path from env " + process.env.VUE_APP_PATH);

const routerHistory = createWebHashHistory();
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      name: "Home",
      path: "/",
      component: HomePage,
    },
    { name: "Product", path: "/:id", component: ProductPage },
    {
      name: "ProductVideo",
      path: "/:id/video",
      component: ProductVideoPage,
    },
    {
      name: "Likes",
      path: "/liked",
      component: LikesPage,
    },

    {
      name: "Results",
      path: "/results/:id",
      component: ResultsPage,
    },

    {
      name: "Archive",
      path: "/archive",
      component: ArchivePage,
    },
    // {
    //   name: "Home",
    //   path: process.env.VUE_APP_PATH,
    //   component: HomePage,
    // },
    // {
    //   name: "Product",
    //   path: process.env.VUE_APP_PATH + ":id",
    //   component: ProductPage,
    // },
    // {
    //   name: "ProductVideo",
    //   path: process.env.VUE_APP_PATH + ":id/video",
    //   component: ProductVideoPage,
    // },
    // {
    //   name: "Likes",
    //   path: process.env.VUE_APP_PATH + "liked",
    //   component: LikesPage,
    // },
    // {
    //   name: "Results",
    //   path: process.env.VUE_APP_PATH + "results/:id",
    //   component: ResultsPage,
    // },

    // {
    //   name: "Archive",
    //   path: process.env.VUE_APP_PATH + "archive",
    //   component: ArchivePage,
    // },
  ],
});

export default router;
