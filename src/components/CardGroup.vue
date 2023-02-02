<template>
  <div
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
import { shuffle, getImage } from "../assets/common.js";
export default {
  name: "CardGroup",
  props: {
    products: { type: Array },
    loading: { type: Boolean },
    displayAll: { type: Boolean },
  },
  data() {
    return {};
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
    like(event, card) {
      card.liked = !card.liked;
      // console.log(card[245][0]);
      if (card.liked == true) {
        localStorage.setItem(card[245][0], card.liked);
      } else {
        localStorage.removeItem(card[245][0]);
      }
      // console.log(card.liked);
      // console.log(card);
      // console.log(event.target, card.id);
    },
    // setIndex(index) {
    //   this.index = index;
    //   console.log(this.index);
    //   store.index = index;
    // },
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
// .card-text {
//   font-size: 1rem;
// }
// .card-img-top {
//   height: 20rem;
//   object-fit: cover;
//   object-position: center;
// }
// .card {
//   transition: all 0.2s ease-in-out;
// }
// .card:hover {
//   transform: scale(1.05);
//   /* color: #ea4e44 !important; */
// }

// .card:hover .card-title {
//   color: $keared;
// }
// .likeheart {
//   position: absolute;
//   top: 0.5rem;
//   right: 1rem;
//   z-index: 3;
//   color: $keared;
// }

// .likeheart:hover:before {
//   content: "\F770";
// }

// .unlikeheart {
//   position: absolute;
//   top: 0.5rem;
//   right: 1rem;
//   z-index: 3;
// }

// .unlikeheart:hover:before {
//   /* content: "\F415"; */
//   color: $keared;
// }
</style>
