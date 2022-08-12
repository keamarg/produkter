<template>
  <div :products="products" :loading="loading" class="p-3 mb-3">
    <div v-if="products[getIndex()]" class="row align-items-center">
      <div class="col pt-3 p-5 rounded-custom align-items-center" :style="css">
        <span
          type="button"
          class="d-flex justify-content-end back-arrow"
          @click="$router.go(-1)"
        >
          <i class="bi bi-arrow-left"></i>
        </span>
        <h1>{{ products[getIndex()].title }}</h1>
        <div class="iframediv ratio ratio-16x9 rounded-custom mt-3">
          {{ log(products[getIndex()].video) }}
          <iframe
            v-if="products[getIndex()].video != 'none'"
            class="rounded-custom"
            :src="videosrc"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope;"
            allowfullscreen
          >
          </iframe>
          <video
            v-else-if="products[getIndex()].video2"
            width="320"
            height="240"
            autoplay
            controls
            class="rounded-custom"
          >
            <source
              src="https://bibliotek.kea.dk/images/Studie/video/algoritmeforstaaelse.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductVideo",
  props: ["products", "loading"],
  computed: {
    videosrc() {
      // console.log(this.$route.params);
      return `https://www.youtube.com/embed/${
        this.products[this.getIndex()].video
      }?autoplay=1`;
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
        fontSize: "10px", //16
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
  created() {},
};
</script>
