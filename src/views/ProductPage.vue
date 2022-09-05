<template>
  <div :products="products" :loading="loading" class="p-3 mb-3">
    <div v-if="products[getIndex()]" class="row align-items-center">
      <div class="col pt-3 product p-5 rounded-custom" :style="css">
        <span
          type="button"
          class="d-flex justify-content-end back-arrow"
          @click="$router.go(-1)"
        >
          <i class="bi bi-arrow-left"></i>
        </span>
        <div class="col-lg-7 producttext rounded-custom">
          <h1>{{ products[getIndex()].title }}</h1>
          <p>{{ products[getIndex()].text }}</p>
          <router-link
            :to="{ name: 'ProductVideo', params: { id: $route.params.id } }"
          >
            <button
              v-if="
                products[getIndex()].video[0] != 'none' ||
                products[getIndex()].video2[0] != 'none'
              "
              type="button"
              class="btn btn-custom-product rounded-custom me-4 mt-5"
            >
              <i class="bi bi-play-circle"></i>&nbsp;
              {{ products[getIndex()].video[1] }}
            </button>
          </router-link>
          <template
            v-for="(item, index) in Object.keys(products[getIndex()].article)"
            :key="item"
          >
            <a
              v-if="index % 2 == 0"
              :href="products[getIndex()].article[item]"
              target="_blank"
              class="btn btn-custom-product rounded-custom me-4 mt-5"
              download
              ><i class="bi bi-file-earmark-pdf"></i>&nbsp;
              {{ products[getIndex()].article[index + 1] }}</a
            >
          </template>
          <div class="mt-5">
            <span class="me-3">Keywords</span>
            <router-link
              v-for="item in products[getIndex()].keywords"
              :key="item"
              :to="{
                name: 'Results',
                params: { id: item.toLowerCase() },
              }"
            >
              <button
                type="button"
                class="btn btn-primary btn-custom-nav me-1 me-sm-3 mb-2 mt-2 py-1 px-1 px-sm-2 rounded-pill"
              >
                {{ item }}
              </button>
              <!-- <p v-for="item in products[getIndex()].keywords" :key="item">
              {{ item }}
            </p> -->
            </router-link>
          </div>
        </div>
        <!-- <ShareThis /> -->
        <div class="col-lg-5"></div>
      </div>
    </div>
  </div>
</template>

<script>
// import ShareThis from "@/components/ShareThis";

export default {
  name: "ProductPage",
  // components: { ShareThis },
  props: ["products", "loading"],
  computed: {
    articlesrc() {
      return `${this.products[this.getIndex()].article}`;
    },
    css() {
      return {
        textAlign: "left",
        color: "white",
        background:
          "linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0.9),rgba(0,0,0,0.8),rgba(0,0,0,0.5),rgba(0,0,0,0.3)),url(" +
          this.products[this.getIndex()].img1 +
          "), no-repeat",
        backgroundSize: "cover",
        fontSize: "16px",
        minHeight: "35rem",
      };
    },
  },

  data() {
    return {
      //   store,
    };
  },
  methods: {
    log(item) {
      console.log(item);
    },
    getIndex() {
      return this.products
        .map((object) => object.id)
        .indexOf(this.$route.params.id);
    },
  },
  created() {
    // this.$watch(
    //   () => this.$route.params,
    //   (toParams, previousParams) => {
    //     if (this.products[toParams.id]) {
    //       this.css.backgroundImage =
    //         "linear-gradient(0.25turn, rgba(0,0,0,0.8), rgba(0,0,0,0.6),rgba(0,0,0,0.3), rgba(0,0,0,0.0)),url(" +
    //         this.products[toParams.id].img1 +
    //         ")";
    //     }
    //   }
    // );
  },
};
</script>
<style lang="scss" scoped></style>
