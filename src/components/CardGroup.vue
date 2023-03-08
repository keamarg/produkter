<template>
  <div
    v-if="profiles"
    class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6"
  >
    <!-- <p>{{ profiles.length }}</p> -->
    <div
      class="col mb-4"
      v-for="profileCard in sortedCollection()"
      :id="profileCard.keaId"
      :key="profileCard.keaId"
    >
      <!-- {{ setZoteroProfile(profileCard.keaId) }} -->

      <!-- <p>{{ profileCard }}</p> -->
      <!-- {{ log(profileCard.keaId) }} -->
      <div class="card text-white bg-dark border-2 h-100">
        <!-- <i
            @click="like($event, card)"
            :class="
              card.liked
                ? 'bi bi-heart-fill likeheart likeheart-card'
                : 'bi bi-heart unlikeheart unlikeheart-card'
            "
          ></i> -->
        <!-- <span
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
        </span> -->
        <span
          data-bs-html="true"
          data-bs-toggle="modal"
          data-bs-target="#profileModal"
          @click="
            (store.currentProfile = profileCard.keaId),
              (store.currentProfileNumber = 'profilePage'),
              (store.currentProfileName = getZoteroProfile(
                profileCard.keaId,
                'name'
              ))
          "
        >
          <img
            :src="getZoteroProfile(profileCard.keaId, 'image')"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">
              {{ getZoteroProfile(profileCard.keaId, "name") }}
            </h5>
            <p class="card-text">
              {{ getZoteroProfile(profileCard.keaId, "title") }}
              <!-- {{ getZoteroProfile(profileCard.keaId, "bio") }} -->
            </p>
          </div>
        </span>
      </div>
    </div>
  </div>
  <div
    v-else
    class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6"
  >
    <div
      class="col mb-4"
      v-for="card in productsList"
      :id="card.id"
      :key="card.id"
    >
      <div class="card text-white bg-dark border-2 h-100">
        <i
          @click="like($event, card)"
          :class="
            card.liked
              ? 'bi bi-heart-fill likeheart likeheart-card'
              : 'bi bi-heart unlikeheart unlikeheart-card'
          "
        ></i>
        <router-link :to="{ name: 'Product', params: { id: card.id } }">
          <img :src="getImage(card)" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">{{ card[245][0] }}</h5>
            <p class="card-text">{{ card[520][0] }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { shuffle, getImage, getProperty } from "../assets/common.js";
import { store } from "../assets/store.js";

export default {
  name: "CardGroup",
  props: {
    products: { type: Array },
    profiles: { type: Boolean },
    loading: { type: Boolean },
    displayAll: { type: Boolean },
  },
  data() {
    return { getProperty, store };
  },
  computed: {
    //returnerer 3 tilfældige produkter til slideren
    productsList: function () {
      if (this.displayAll) {
        return this.products;
      } else {
        return shuffle(this.products, 6);
      }
    },
  },
  methods: {
    getImage: getImage,
    log(item) {
      console.log(item);
    },
    sortedCollection() {
      const sortedCollection = [...store.zoteroData].sort((a, b) =>
        a.keaId > b.keaId ? 1 : b.keaId > a.keaId ? -1 : 0
      );
      // .reverse();
      return sortedCollection;
    },
    getZoteroProfile(keaId, property) {
      // console.log(keaId);

      //return profile image
      if (property == "image") {
        let [zoteroData] = this.store.zoteroData
          .find((collection) => collection.keaId == keaId)
          .filter((item) => item.data.itemType == "note");
        if (typeof zoteroData.data.tags[0] !== "undefined") {
          // console.log(zoteroData.data.tags[0].tag);
          return zoteroData.data.tags[0].tag;
        }
      }

      //return profile name/bio
      const parser = new DOMParser();
      if (property == "name" || property == "bio" || property == "title") {
        let [zoteroData] = this.store.zoteroData
          .find((collection) => collection.keaId == keaId)
          .filter((item) => item.data.itemType == "note");
        const htmlDoc = parser.parseFromString(
          zoteroData.data.note,
          "text/html"
        );
        // console.log(htmlDoc);
        //bare for forsøgets skyld, checker navn med typeof, og checker bio med try/catch baseret på https://www.meticulous.ai/blog/how-to-prevent-the-error-cannot-read-property-0-of-undefined
        if (property == "name") {
          if (typeof htmlDoc.getElementsByTagName("h3")[0] !== "undefined") {
            // console.log(htmlDoc.getElementsByTagName("h3")[0].innerText);
            return htmlDoc.getElementsByTagName("h3")[0].innerText;
          } else {
            return "no name";
          }
        }
        if (property == "title") {
          if (typeof htmlDoc.getElementsByTagName("em")[0] !== "undefined") {
            // console.log(htmlDoc.getElementsByTagName("h3")[0].innerText);
            return htmlDoc.getElementsByTagName("em")[0].innerText;
          } else {
            return "titel mangler";
          }
        }
        if (property == "bio") {
          try {
            return htmlDoc.getElementsByTagName("p")[0].innerText;
          } catch {
            return "no bio";
          }
        }
      }
    },
    like(event, card) {
      card.liked = !card.liked;
      // console.log(card[245][0]);
      if (card.liked == true) {
        localStorage.setItem(card[245][0], card.liked);
      } else {
        localStorage.removeItem(card[245][0]);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
/* Cards */
.card-text {
  font-size: 0.7rem; //1
}
/* .embed-responsive .card-img-top {
    object-fit: cover;
    object-position: center; 
  } */

.card-img-top {
  // height: 20rem; //20
  height: 12rem;
  object-fit: cover;
  object-position: center;
}
.card {
  transition: all 0.2s ease-in-out;
}
.card:hover {
  transform: scale(1.03); //1.05
  /* color: #ea4e44 !important; */
}

.card-title {
  font-size: 1rem;
}
.card:hover .card-title {
  color: $keared;
}

.likeheart {
  color: #eb5045;
}

.likeheart-card {
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  z-index: 1;
  color: #eb5045;
}

.likeheart:hover:before {
  content: "\F770";
}

.unlikeheart-card {
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  z-index: 1;
}

.unlikeheart:hover:before {
  /* content: "\F415"; */
  color: $keared;
}
</style>
