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
              ? 'bi bi-heart-fill likeheart'
              : 'bi bi-heart unlikeheart'
          "
        ></i>
        <router-link :to="{ name: 'Product', params: { id: card.id } }">
          <img :src="card.img1" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">{{ card.title }}</h5>
            <p class="card-text">{{ card.subtitle }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
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
    productsList: function () {
      let productsList;
      if (this.displayAll) {
        productsList = this.products;
      } else {
        productsList = this.products.slice(0, 6);
      }
      return productsList;
    },
  },
  methods: {
    log(item) {
      console.log(item);
    },
    like(event, card) {
      card.liked = !card.liked;
      if (card.liked == true) {
        localStorage.setItem(card.title, card.liked);
      } else {
        localStorage.removeItem(card.title);
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
