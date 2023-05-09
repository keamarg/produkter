<template>
  <div
    id="carouselExampleCaptions"
    class="carousel slide mt-4"
    data-bs-ride="carousel"
    data-bs-interval="10000"
  >
    <div class="carousel-inner border-0 rounded-custom">
      <div
        v-for="(product, index) in filteredProducts"
        :key="index"
        :class="{ active: index == 0 }"
        class="carousel-item"
      >
        <router-link :to="{ name: 'Product', params: { id: product.id } }">
          <picture>
            <source
              v-for="(sizeData, index) in sizeDataArray"
              :key="index"
              :media="sizeData.media"
              :srcset="getImage(product, sizeData.size)"
            />
            <img
              :src="getImage(product)"
              class="d-block w-100 border-0 rounded-custom carousel-img"
              alt="..."
              @load="onImgLoad"
            />
          </picture>

          <div class="carousel-caption d-block border-0 rounded-custom">
            <h5>{{ getProductTitle(product) }}</h5>
            <p>
              {{ getProductAuthor(product) }}
              <span v-if="product[700]">
                {{ joinAuthors(product[700]) }}
              </span>
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
import { shuffle, getImage, getProperty } from "../assets/common.js";
export default {
  name: "CarouselSlider",
  props: {
    products: { type: Array },
    loading: { type: Boolean },
  },
  data() {
    return {
      isLoaded: true,
      sizeDataArray: [
        { size: "md", media: "(min-width:0px) and (max-width:991px)" },
        {
          size: "lg",
          media: "(min-width:992px) and (max-width:1199px)",
        },
        {
          size: "xl",
          media: "(min-width:1200px) and (max-width:1399px)",
        },
        { size: "xxl", media: "(min-width:1400px)" },
      ],
    };
  },
  computed: {
    filteredProducts: function () {
      return shuffle(
        this.products.filter((product) =>
          product[997].find((item) => item.featured === "slider")
        ),
        3
      );
    },
  },
  methods: {
    getImage: getImage,
    getProperty: getProperty,
    onImgLoad() {
      this.isLoaded = true;
    },
    getProductTitle(product) {
      if (typeof product[245] != "undefined") {
        return product[245][0];
      } else return "no title";
    },
    getProductAuthor(product) {
      if (typeof product[100] != "undefined") {
        return product[100][0];
      } else return "no author";
    },
    joinAuthors(authors) {
      return authors.slice(1).join(", ");
    },
  },
};
</script>
<style lang="scss" scoped>
.carousel-indicators {
  z-index: 1;
}
.carousel-img {
  object-fit: cover;
  object-position: center;
  height: 20rem;
  width: 100%;
}
.carousel-caption {
  transition: all 0.2s ease-in-out;
  background-color: rgba(0, 0, 0, 0.5);
}

.carousel-caption:hover {
  background-color: rgba(0, 0, 0, 0.8);
  transform: scale(1.05);
}
</style>
