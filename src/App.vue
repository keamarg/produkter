//app.vue
<template>
  <!-- <button @click="addHashToLocation()">test replace</button> -->
  <div id="app" ref="app" class="px-3 py-2 px-sm-5 pt-5">
    <TopBar :products="products" data-cy="top-bar" />
    <div class="row mb-5">
      <SideBar data-cy="side-bar" />
      <div
        v-if="store.fetchErrorAlma"
        class="col d-flex align-items-center justify-content-center"
      >
        <div class="connecterror">
          <p>Ingen forbindelse til produktdata (Alma)...</p>
          <i
            class="bi bi-arrow-clockwise d-flex justify-content-center"
            @click="this.$router.go()"
          ></i>
        </div>
      </div>
      <div
        v-else-if="loading"
        class="loading col d-flex align-items-center justify-content-center flex-column"
      >
        <div class="pulseLoader"></div>
        <p style="margin-top: 10px; text-align: center; width: fit-content">
          {{ loadingSentence }}
        </p>
      </div>

      <router-view
        v-else
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
        data-cy="card-group"
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
import { fetchZoteroProfiles } from "@/assets/common.js";

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
      loading: true,
      loadingSentences: [
        "henter profiler...",
        "bygger siden...",
        "brygger kaffen...",
        "tæller til 10...",
      ],
      currentIndex: 0,
    };
  },
  computed: {
    loadingSentence() {
      return this.loadingSentences[this.currentIndex];
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
    // addHashToLocation() {
    //   // console.log("#" + this.$route.path);
    //   history.pushState(
    //     {},
    //     null,
    //     "#" + this.$route.path //+ "#" + encodeURIComponent(params)
    //   );
    // },
  },
  // watch: {
  //   $route() {
  //     console.log("Hash changed to:", window.location.hash);
  //     this.addHashToLocation();
  //   },
  // },
  async mounted() {
    setInterval(() => {
      this.currentIndex =
        (this.currentIndex + 1) % this.loadingSentences.length;
    }, 1000);
    let fd = await fetchData(this.fetchUrl);
    if (fd) {
      this.productCount = fd.total_record_count;
      this.products = await parseProducts(fd);
      this.loading = !fd;
    }
    this.store.zoteroData = await fetchZoteroProfiles();
  },
  // created() {
  //   console.log("Hash changed to:", window.location.hash);
  //   if (process.env.NODE_ENV != "development") {
  //     top.location = "bibliot?=" + this.$route.path;
  //   } else {
  //     top.location = `https://bibliotek.kea.dk/produkter?productid=${this.$route.path.slice(
  //       1
  //     )}`;
  //     console.log(process.env.NODE_ENV);
  //   }
  //   this.addHashToLocation();
  // },
};
</script>

<style lang="scss" scoped>
#app {
  background-color: $body-bg;
}
.loading {
  min-height: "22rem";
}
.connecterror {
  color: $lighttextcolor; // white;
  cursor: pointer;
}

.bi-arrow-clockwise {
  font-size: 2rem;
  opacity: 0.5;
  transition: all 0.3s ease-in-out;
}

.bi-arrow-clockwise:hover {
  font-size: 2rem;
  opacity: 1;
}

$pulseSize: 4em;
$pulseTiming: 1.2s;

.pulseLoader {
  width: $pulseSize;
  height: $pulseSize;
  border-radius: $pulseSize;
  background-color: $pulseloader; //white;
  outline: 1px solid transparent;
  animation: pulseanim $pulseTiming ease-in-out infinite;
}

@keyframes pulseanim {
  0% {
    transform: scale(0);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

@import "./styles/app.css";
</style>
