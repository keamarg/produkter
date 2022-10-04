//app.vue
<template>
  <div id="app" class="px-3 py-2 px-sm-5" @mousewheel="handleWheel">
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
import {
  fetchProductCount,
  fetchData,
  parseProducts,
} from "./assets/common.js";
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
      fetchProductCount: fetchProductCount,
      fetchData: fetchData,
      parseProducts: parseProducts,
      filteredList: [],
      title: process.env.VUE_APP_TITLE,
      loading: true,
      products: [],
      offSet: 0,
      waitWithFetch: false,
      allFetched: false,
    };
  },
  computed: {
    fetchUrl() {
      // return `https://projekter.kea.dk/almaproxy/almaws/v1/electronic/e-collections/618551140007387/e-services/628551130007387/portfolios?limit=12&offset=${this.offSet}`;
      return `http://localhost:8081/almaws/v1/electronic/e-collections/618551140007387/e-services/628551130007387/portfolios?limit=12&offset=${this.offSet}`;
    },
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
      // console.log(filteredList);
      this.filteredList = filteredList;
    },
    handleWheel() {
      if (
        window.innerHeight + window.scrollY + 10 >=
        document.body.offsetHeight
      ) {
        if (!this.waitWithFetch && !this.allFetched) {
          this.waitWithFetch = true;
          this.offSet = this.offSet + 12;
          this.fetchData(this.fetchUrl);
          setTimeout(() => {
            // console.log(this.productCount);
            if (this.offSet > this.productCount) {
              console.log("no more products");
              this.allFetched = true;
            } else {
              this.waitWithFetch = false;
            }
          }, 2000);
          // console.log("Fetched!");
        }
      }
    },
  },
  created() {},
  async mounted() {
    this.fetchData(this.fetchUrl);
    this.productCount = await this.fetchProductCount();
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
