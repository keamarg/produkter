<template>
  <div
    id="carouselExampleCaptions"
    class="carousel slide mt-4"
    data-bs-ride="carousel"
    data-bs-interval="10000"
  >
    <div v-if="isLoaded" class="carousel-indicators">
      <button
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide-to="0"
        class="active"
        aria-current="true"
        aria-label="Slide 1"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide-to="1"
        aria-label="Slide 2"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide-to="2"
        aria-label="Slide 3"
      ></button>
    </div>
    <div class="carousel-inner border-0 rounded-custom">
      <div
        v-for="(product, index) in filteredProducts"
        class="carousel-item"
        :key="index"
        :class="{ active: index == 0 }"
      >
        <img
          :src="product.img1"
          class="d-block w-100 border-0 rounded-custom"
          alt="..."
          @load="onImgLoad"
        />
        <router-link :to="{ name: 'Product', params: { id: product.id } }">
          <div class="carousel-caption d-block border-0 rounded-custom">
            <h5>{{ product.title }}</h5>
            <p>
              {{ product.author
              }}<span v-if="product.author2 != 'none'"
                >, {{ product.author2 }}</span
              ><span v-if="product.author3 != 'none'"
                >, {{ product.author3 }}</span
              >
            </p>
          </div>
        </router-link>
      </div>
    </div>
    <button
      v-if="isLoaded"
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleCaptions"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      v-if="isLoaded"
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleCaptions"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script>
import { shuffle } from "../assets/common.js";
export default {
  name: "CarouselSlider",
  props: {
    products: { type: Array },
    loading: { type: Boolean },
  },
  data() {
    return {
      // tempImg: "https://kea.dk/slir/w2200-c100x72/images/news/2021/12/Byg.jpeg",
      isLoaded: false,
    };
  },
  computed: {
    //returnerer 3 tilfældige produkter til slideren
    filteredProducts: function () {
      return shuffle(this.products, 3);
    },
  },
  methods: {
    log(item) {
      console.log(item);
    },
    onImgLoad() {
      this.isLoaded = true;
    },
  },
};
</script>
<style lang="scss" scoped>
// .carousel img {
//   object-fit: cover; /* Do not scale the image */
//   object-position: center; /* Center the image within the element */
//   height: 30rem;
//   width: 100%;
// }
// .carousel-caption {
//   transition: all 0.2s ease-in-out;
//   background-color: rgba(0, 0, 0, 0.2);
// }

// .carousel-caption:hover {
//   background-color: rgba(0, 0, 0, 0.5);
//   transform: scale(1.05);
// }
</style>
