//app.vue
<template>
  <div id="app" class="px-3 py-2 px-sm-5">
    <!-- <div class="sharethis-inline-share-buttons"></div> -->
    <TopBar :products="products" />
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
        // "https://api-eu.hosted.exlibrisgroup.com/almaws/v1/electronic/e-collections/618551140007387/e-services/628551130007387/portfolios?apikey=l8xx1d07986de63b4d0289d5bac8374d99c3",
        "https://alma-proxy.herokuapp.com/almaws/v1/electronic/e-collections/618551140007387/e-services/628551130007387/portfolios?limit=500&offset=0&apikey=l8xx1d07986de63b4d0289d5bac8374d99c3",
      // "http://almaproxy.me:5555/almaws/v1/electronic/e-collections/618551140007387/e-services/628551130007387/portfolios?limit=500&offset=0&apikey=l8xx1d07986de63b4d0289d5bac8374d99c3",
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
        this.$route.path == "/keaprodukter/"
      ) {
        return true;
      } else {
        return false;
      }
    },
    updateSearchQuery(searchQuery, filteredList) {
      console.log(filteredList);
      // this.filteredList = filteredList.map(
      //   (product, index) => (product.index = index)
      // );
      this.filteredList = filteredList;
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
