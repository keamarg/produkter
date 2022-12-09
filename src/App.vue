//app.vue
<template>
  <div id="app" ref="app" class="px-3 py-2 px-sm-5 pt-5 pt-sm-0">
    <TopBar :products="products" />
    <div class="row mb-5">
      <SideBar />
      <div
        v-if="loading"
        class="loading col d-flex align-items-center justify-content-center"
      >
        <h5>Henter produkter, vent venligst...</h5>
      </div>
      <router-view
        v-else
        class="col"
        :products="products"
        :loading="loading"
        :productcount="productCount"
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
      productCount: "",
      filteredList: [],
      title: process.env.VUE_APP_TITLE,
      products: [],
      offSet: 0,
    };
  },
  computed: {
    loading() {
      if (this.products == []) {
        return true;
      } else return false;
    },
    fetchUrl() {
      return `${
        process.env.VUE_APP_ALMA_PROXY_PATH
      }/almaws/v1/electronic/e-collections/618551140007387/e-services/628551130007387/portfolios?limit=1000&offset=${
        this.offSet
      }&timestamp=${this.timeStamp()}`;
    },
    currentPath() {
      store.path = this.$route.path;
      return this.$route.path;
    },
    iniFrame() {
      if (window.self !== window.top) {
        return (store.iframe = true);
      } else {
        return (store.iframe = false);
      }
    },
  },
  methods: {
    log(item) {
      console.log(item);
    },
    //sendes med for at cachen cleares ved refresh
    timeStamp() {
      return new Date().getTime();
    },
    homePage() {
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
      this.filteredList = filteredList;
    },
  },
  created() {},
  async mounted() {
    let fd = await fetchData(this.fetchUrl);
    this.productCount = fd.total_record_count;
    this.products = await parseProducts(await fd);
  },
};
</script>

<style lang="scss" scoped>
#app {
  background-color: $body-bg;
}
.loading {
  min-height: "22rem";
}

@import "./styles/app.css";
</style>
