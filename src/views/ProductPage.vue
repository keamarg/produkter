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
            <!-- https://vuejsexamples.com/a-custom-directive-tooltips-for-vue-3/-->
            <h1>{{ getProperty("title") }}</h1>
            <span class="me-3">Ophav</span>
            <span id="authorlinks" class="mt-0">
              <span
                class="link-custom-author me-1 me-sm-3 mb-2 mt-2 py-1 px-1 px-sm-2"
                ref="tooltip"
                @mouseover="hoverTip"
                @mouseout="removeTip"
                data-bs-html="true"
                data-bs-toggle="modal"
                data-bs-target="#profileModal"
                @click="
                  store.currentProfile = getProperty('contact');
                  store.currentProfileNumber = 1;
                "
              >
                {{ getProperty("author") }}
              </span>
              <span
                v-for="(item, index) in products[getIndex()][700]"
                :key="index"
                :id="'contact' + (index + 2)"
                @click="
                  store.currentProfile = getProperty('contact' + (index + 2));
                  store.currentProfileNumber = index + 2;
                "
                class="link-custom-author me-1 me-sm-3 mb-2 mt-2 py-1 px-1 px-sm-2"
                data-bs-html="true"
                data-bs-toggle="modal"
                data-bs-target="#profileModal"
              >
                {{ item }}
              </span>
            </span>
            <p class="mt-5">
              {{ getProperty("text") }}
            </p>
            <div v-if="products[getIndex()][505]" class="mt-4 mb-0">
              <h2>Indhold</h2>
              <p>
                {{ getProperty("antologi") }}
              </p>
            </div>
            <template
              v-for="(item, index) in products[getIndex()][856]"
              :key="index"
            >
              <a
                :href="Object.values(item).toString()"
                target="_blank"
                class="btn btn-custom-product rounded-custom me-4 mt-2"
                download
                ><i class="bi bi-file-earmark-pdf"></i>&nbsp;
                {{ Object.keys(item).toString() }}</a
              >
            </template>
            <p v-if="getProperty('videotekst')" class="mb-1 mt-5 videotekst">
              {{ getProperty("videotekst") }}
            </p>
            <div v-else class="mb-1 mt-5"></div>

            <div
              v-if="getProperty('youtube') || getProperty('keavideo')"
              class="iframediv ratio ratio-16x9 rounded-custom mt-0"
            >
              <iframe
                v-if="getProperty('youtube')"
                id="ytvideo"
                :src="videosrcYt"
                frameborder="0"
                allow="accelerometer; encrypted-media; gyroscope;"
                allowfullscreen
              >
              </iframe>
              <video
                id="video"
                v-else-if="getProperty('keavideo')"
                width="320"
                height="240"
                preload="metadata"
                controls
              >
                <source :src="videosrcKea" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div class="mt-5">
              <span class="me-3">Keywords</span>
              <router-link
                v-for="item in products[getIndex()][653]"
                :key="item"
                :to="{
                  name: 'Results',
                  params: {
                    id: item.replace('.', '').toLowerCase(),
                  },
                }"
              >
                <button
                  type="button"
                  class="btn btn-primary btn-custom-keyword me-1 me-sm-3 mb-2 mt-2 py-1 px-1 px-sm-2 rounded-pill"
                >
                  {{ item.replace(".", "") }}
                </button>
              </router-link>
              <ProfileModal :products="products" />
            </div>
          </div>
          <div class="col-lg-2"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getIndex, getProperty } from "../assets/common.js";
import { Modal } from "bootstrap";
import ProfileModal from "@/components/ProfileModal.vue";
import { store } from "../assets/store.js";

export default {
  name: "ProductPage",
  components: { ProfileModal },
  props: {
    products: { type: Array },
    loading: { type: Boolean },
    productcount: { type: Number },
  },

  computed: {
    videosrcYt() {
      return `https://www.youtube.com/embed/${this.getProperty("youtube")}`; //(${this.paused ? "?autoplay=0&mute=1" : "?autoplay=1&mute=1"}`;
    },
    videosrcKea() {
      return `${this.getProperty("keavideo")}#t=0.5`;
    },
    css() {
      return {
        textAlign: "left",
        color: "white",
        background:
          "linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0.9),rgba(0,0,0,0.8),rgba(0,0,0,0.5),rgba(0,0,0,0.3)),url(" +
          this.getProperty("billedmateriale") + //this.products[this.getIndex()].img1 +
          "), no-repeat",
        backgroundSize: "cover",
        fontSize: "16px",
        minHeight: "35rem",
      };
    },
  },

  data() {
    return {
      store,
    };
  },
  methods: {
    log(item) {
      console.log(item);
    },

    getIndex: getIndex,
    getProperty: getProperty,

    like(event, product) {
      product.liked = !product.liked;
      if (product.liked == true) {
        localStorage.setItem(product[245][0], product.liked);
      } else {
        localStorage.removeItem(product[245][0]);
      }
    },
  },

  async mounted() {
    Modal.getOrCreateInstance(
      document.getElementById("profileModal")
    )._element.addEventListener("hide.bs.modal", function (e) {
      resetProfile(e);
    });
    const resetProfile = () => {
      this.store.currentProfileNumber = null;
    };
  },
  created() {},
  beforeUnmount() {},
  beforeRouteLeave(to, from, next) {
    let modal = Modal.getOrCreateInstance(
      document.getElementById("profileModal")
    ); // Returns a Bootstrap modal instance
    // Show or hide:
    if (modal._isShown) {
      modal.toggle();
    }
    next();
  },
};
</script>
<style lang="scss" scoped>
h2 {
  font-size: 1.2rem;
}

.videotekst {
  color: darkgray;
}

.link-custom-author {
  border-bottom: 2px solid darkgray;
  transition: all 0.25s linear;
  position: relative;
  color: darkgray;
  font-style: italic;
}

.link-custom-author:hover {
  color: white;
  cursor: pointer;
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

.btn-custom-keyword {
  background-color: #343a40;
  border: none;
  color: #f8f9fa;
  font-size: 0.7rem; //1
  cursor: default;
  border-radius: 0.7rem; //1
}
.btn-custom-keyword:hover {
  color: #343a40;
  background-color: #f8f9fa;
}
.likeheart {
  color: #eb5045;
}

.likeheart:hover:before {
  content: "\F770";
}

.unlikeheart:hover:before {
  /* content: "\F415"; */
  color: $keared;
}
</style>
