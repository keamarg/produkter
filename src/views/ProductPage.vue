<template>
  <div :products="products" :loading="loading" class="p-3 mb-3">
    <div
      v-if="products[getIndex()]"
      class="row align-items-center"
      style="position: relative"
    >
      <span class="d-flex justify-content-end">
        <i class="bi bi-arrow-left arrow-left" @click="$router.go(-1)"></i>
      </span>
      <div class="col pt-3 product p-5 rounded-custom" :style="css">
        <div class="row">
          <div class="col-lg-10 producttext rounded-custom">
            <span>
              <i
                @click="like($event, products[getIndex()])"
                class="product-icon"
                :class="
                  products[getIndex()].liked
                    ? 'bi bi-heart-fill likeheart'
                    : 'bi bi-heart unlikeheart'
                "
              ></i>
              <i
                class="bi bi-share m-3 product-icon"
                data-bs-toggle="modal"
                data-bs-target="#shareModal"
                title="Del"
              ></i>
            </span>

            <h1>{{ products[getIndex()].title }}</h1>
            <div class="mt-0">
              <span class="me-3">Ophav</span>
              <router-link
                :to="{
                  name: 'Results',
                  params: {
                    id: products[getIndex()].author.toLowerCase(),
                    kind: `author`,
                  },
                }"
              >
                <span
                  class="link-custom-author me-1 me-sm-3 mb-2 mt-2 py-1 px-1 px-sm-2"
                >
                  {{ products[getIndex()].author }}
                </span>
              </router-link>
              <router-link
                :to="{
                  name: 'Results',
                  params: {
                    id: products[getIndex()].author2.toLowerCase(),
                    kind: `author`,
                  },
                }"
              >
                <span
                  class="link-custom-author me-1 me-sm-3 mb-2 mt-2 py-1 px-1 px-sm-2"
                >
                  {{ products[getIndex()].author2 }}
                </span>
              </router-link>
              <router-link
                :to="{
                  name: 'Results',
                  params: {
                    id: products[getIndex()].author3.toLowerCase(),
                    kind: `author`,
                  },
                }"
              >
                <span
                  class="link-custom-author me-1 me-sm-3 mb-2 mt-2 py-1 px-1 px-sm-2"
                >
                  {{ products[getIndex()].author3 }}
                </span>
              </router-link>
            </div>
            <p class="mt-5">{{ products[getIndex()].text }}</p>

            <!-- <router-link
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
          </router-link> -->
            <template
              v-for="(item, index) in Object.keys(products[getIndex()].article)"
              :key="item"
            >
              <a
                v-if="index % 2 == 0"
                :href="products[getIndex()].article[item]"
                target="_blank"
                class="btn btn-custom-product rounded-custom me-4 mt-2"
                download
                ><i class="bi bi-file-earmark-pdf"></i>&nbsp;
                {{ products[getIndex()].article[index + 1] }}</a
              >
            </template>
            <!-- <accordion-menu
            v-if="
              !(
                products[getIndex()].video[0] == 'none' &&
                products[getIndex()].video2[0] == 'none'
              )
            "
            :products="products"
            :getIndex="getIndex"
          /> -->
            <div
              v-if="
                !(
                  products[getIndex()].video[0] == 'none' &&
                  products[getIndex()].video2[0] == 'none'
                )
              "
              class="iframediv ratio ratio-16x9 rounded-custom mt-5"
            >
              <!-- {{ log(products[getIndex()].video) }} -->
              <iframe
                id="ytvideo"
                v-if="products[getIndex()].video[0] != 'none'"
                :src="videosrc"
                frameborder="0"
                allow="accelerometer; encrypted-media; gyroscope;"
                allowfullscreen
              >
              </iframe>
              <video
                id="video"
                v-else-if="products[getIndex()].video2[0] != 'none'"
                width="320"
                height="240"
                preload="metadata"
                controls
              >
                <source :src="videosrc2" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div class="mt-5">
              <span class="me-3">Keywords</span>
              <router-link
                v-for="item in products[getIndex()].keywords"
                :key="item"
                :to="{
                  name: 'Results',
                  params: { id: item.toLowerCase(), kind: 'keyword' },
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
          <div class="col-lg-2"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import AccordionMenu from "@/components/AccordionMenu.vue";
// import ShareThis from "@/components/ShareThis";
// import ShareModal from "@/components/ShareModal.vue";
import { getIndex } from "../assets/common.js";

export default {
  // components: { AccordionMenu },
  name: "ProductPage",
  // components: { ShareThis },
  // components: ShareModal,
  props: ["products", "loading"],
  computed: {
    articlesrc() {
      return `${this.products[this.getIndex()].article}`;
    },
    videosrc() {
      return `https://www.youtube.com/embed/${
        this.products[this.getIndex()].video[0]
      }`; //(${this.paused ? "?autoplay=0&mute=1" : "?autoplay=1&mute=1"}`;
    },
    videosrc2() {
      return `${this.products[this.getIndex()].video2[0]}#t=0.5`;
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
    getIndex: getIndex,

    // getIndex() {
    //   return this.products
    //     .map((object) => object.id)
    //     .indexOf(this.$route.params.id);
    // },
    like(event, product) {
      product.liked = !product.liked;
      if (product.liked == true) {
        localStorage.setItem(product.title, product.liked);
      } else {
        localStorage.removeItem(product.title);
      }
      // console.log(card.liked);
      // console.log(card);
      // console.log(event.target, card.id);
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
<style lang="scss" scoped>
.link-custom-author {
  border-bottom: 2px solid darkgray;
  transition: all 0.25s linear;
  position: relative;
  color: darkgray;
  font-style: italic;
}

.link-custom-author:hover {
  color: white;
}

.link-custom-author:before {
  content: "";
  display: block;
  width: 100%;
  height: 2px;
  background-color: $keared;
  position: absolute;
  left: 0;
  bottom: -2px; /* this is to match where the border is */
  transform-origin: left;
  transform: scale(0);
  transition: 0.25s linear;
  /*   will-change: transform; */
}

.link-custom-author:hover:before {
  transform: scale(1);
}
.arrow-left {
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  z-index: 3;
  opacity: 0.5;
  font-size: 1.6rem;
  color: white;
  cursor: pointer;
}

.arrow-left:hover {
  opacity: 1;
}
</style>
