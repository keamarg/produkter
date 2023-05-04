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
            <template v-for="(sizeData, index) in sizeDataArray" :key="index">
              <source
                :media="sizeData.media"
                :srcset="getImage(product, sizeData.size)"
              />
            </template>
            <img
              :src="getImage(product)"
              class="d-block w-100 border-0 rounded-custom"
              alt="..."
              @load="onImgLoad"
            />
          </picture>
          <div class="carousel-caption d-block border-0 rounded-custom">
            <h5>{{ getProductTitle(product) }}</h5>
            <p>
              {{ getProductAuthor(product) }}
              <span v-if="product[700]">
                <span v-for="(product, index) in product[700]" :key="index">
                  <span>, {{ product }}</span>
                </span>
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
      // tempImg: "https://kea.dk/slir/w2200-c100x72/images/news/2021/12/Byg.jpeg",
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
    //returnerer 3 tilfældige produkter til slideren
    filteredProducts: function () {
      // console.log(shuffle(this.products, 3));
      // console.log(this.products.filter((product) => product[997]));

      // return this.products.filter((product) => product[997]);
      // return shuffle(this.products, 3);

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

    log(item) {
      console.log(item);
    },
    onImgLoad() {
      this.isLoaded = true;
    },
    getProductTitle(product) {
      // console.log(product);
      if (typeof product[245] != "undefined") {
        return product[245][0];
      } else return "no title";
    },
    getProductAuthor(product) {
      // console.log(product);
      if (typeof product[100] != "undefined") {
        return product[100][0];
      } else return "no author";
    },
  },
};
</script>
<style lang="scss" scoped>
.carousel-indicators {
  z-index: 1;
  // position: relative;
}
.carousel img {
  object-fit: cover; /* Do not scale the image */
  object-position: center; /* Center the image within the element */
  height: 20rem; //30
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
