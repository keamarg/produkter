//app.vue
<template>
  <div id="app" class="px-3 py-2 px-sm-5">
    <!-- <div class="sharethis-inline-share-buttons"></div> -->
    <TopBar :products="products" @updateSearchQuery="updateSearchQuery" />
    <div class="row mb-5">
      <SideBar />
      <div
        v-if="loading"
        class="loading col d-flex align-items-center justify-content-center"
      >
        <h5>Loading please wait...</h5>
      </div>
      <router-view
        v-else
        class="col"
        :products="products"
        :loading="loading"
        v-slot="{ Component, route }"
      >
        <transition name="fade" mode="out-in">
          <div :key="route.fullPath" class="col">
            <component :is="Component" />
          </div>
        </transition>
      </router-view>
    </div>
    <transition name="fade" mode="out-in">
      <CardGroup
        v-if="homePage() && !loading"
        :products="products"
        :loading="loading"
      />
    </transition>
  </div>
</template>

<script>
import { store } from "./assets/store.js";
import { fetchData, parseProducts } from "./assets/common.js";
import TopBar from "@/components/TopBar.vue";
import CardGroup from "@/components/CardGroup.vue";
import SideBar from "@/components/SideBar.vue";

export default {
  components: {
    TopBar,
    CardGroup,
    SideBar,
  },
  setup() {},
  data() {
    return {
      store,
      fetchData: fetchData,
      parseProducts: parseProducts,
      filteredList: [],
      title: process.env.VUE_APP_TITLE,
      loading: true,
      products: [],
      fetchUrl:
        "https://alma-proxy.herokuapp.com/almaws/v1/electronic/e-collections/6186840000007387/e-services/6286839990007387/portfolios?limit=500&offset=0&apikey=l8xxf96f99c580364be08333d1a57b4af036",
    };
  },
  computed: {
    currentPath() {
      store.path = this.$route.path;
      return this.$route.path;
    },
    iniFrame() {
      if (window.self !== window.top) {
        return (store.iframe = true);
        // console.log(store.iframe);
        // console.log("The page is in an iFrame");
      } else {
        return (store.iframe = false);
        // console.log(store.iframe);
        // console.log("The page is not in an iFrame");
      }
    },
  },
  methods: {
    log(item) {
      console.log(item);
    },
    homePage() {
      // console.log(this.$route.path);
      if (
        this.$route.path == "/" ||
        this.$route.path == "/home" ||
        this.$route.path == "/keaprodukter/dist/"
      ) {
        return true;
      } else {
        return false;
      }
    },
    updateSearchQuery(value1, value2) {
      // console.log(value2);
      // this.filteredList = value2.map(
      //   (product, index) => (product.index = index)
      // );
      this.filteredList = value2;
    },
  },
  created() {},
  mounted() {
    this.fetchData(this.fetchUrl);
  },
};
</script>

<style lang="scss" scoped>
// @import "./styles/style.css";
#app {
  background-color: $body-bg;
}
.loading {
  min-height: "22rem";
}

@import "./styles/app.css";
</style>
