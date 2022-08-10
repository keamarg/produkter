<template>
  <div :products="products" :loading="loading" class="p-3 mb-3">
    <div v-if="products[getIndex()]" class="row align-items-center">
      <div class="col pt-3 product p-5 rounded-custom" :style="css">
        <div class="col-lg-7 producttext rounded-custom">
          <h1>{{ products[getIndex()].title }}</h1>
          <p>{{ products[getIndex()].text }}</p>
          <router-link
            :to="{ name: 'ProductVideo', params: { id: $route.params.id } }"
          >
            <button
              v-if="products[getIndex()].video"
              type="button"
              class="btn btn-custom-product rounded-custom me-4 mt-5"
            >
              <i class="bi bi-play-circle"></i>&nbsp; AFSPIL VIDEO
            </button>
          </router-link>
          <a
            v-if="products[getIndex()].article"
            :href="articlesrc"
            target="_blank"
            class="btn btn-custom-product rounded-custom me-4 mt-5"
            download
            ><i class="bi bi-file-earmark-pdf"></i>&nbsp; Hent artikel</a
          >
        </div>
        <!-- <ShareThis /> -->
        <ShareThis />
        <div class="col-lg-5"></div>
      </div>
    </div>
  </div>
</template>

<script>
import ShareThis from "@/components/ShareThis";

export default {
  name: "ProductPage",
  components: { ShareThis },

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
