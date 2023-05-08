<template>
  <div
    class="btn-group d-flex text-center"
    role="group"
    aria-label="Basic example"
  >
    <div class="col d-sm-flex justify-content-center mt-2 mt-xl-0">
      <span v-if="categories">
        <span
          v-for="(category, index) in categories.slice(0, 10)"
          v-bind:key="index"
          class="me-2 ms-2"
        >
          <span v-if="category == 'OM'"> </span>

          <router-link
            v-else
            :to="{
              name: 'Results',
              params: { id: category.toLowerCase() }, //, list: 'productlist'
            }"
          >
            <button
              type="button"
              class="btn-circle me-0 me-xs1 px-3 py-2"
              :class="[
                category.toLowerCase() == $route.params.id
                  ? category + 'ACTIVE'
                  : '',
                category,
              ]"
            >
              {{ category }}
            </button>
          </router-link>
        </span>
      </span>
    </div>
  </div>
</template>

<script>
import { store } from "../assets/store.js";
export default {
  name: "BtnGroup",
  props: {
    materials: Array,
    categories: Array,
  },
  data() {
    return { store };
  },
  methods: {
    log(item) {
      console.log(item);
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-circle {
  // width: 6rem;
  // height: 3rem;
  color: white;
  border: none;
  border-radius: 3rem;
  font-size: 1rem;
  text-align: center;
  line-height: 2rem;
  width: 6rem;
}

.BYG {
  background-color: $bygdark;
  transition: 0.3s ease-in-out;
}
.BYGACTIVE {
  background-color: $byg;
}
.BYG:hover {
  background-color: $byg;
}
.DESIGN {
  background-color: $designdark;
  transition: 0.3s ease-in-out;
}
.DESIGNACTIVE {
  background-color: $design;
}
.DESIGN:hover {
  background-color: $design;
}
.DIGITAL {
  background-color: $digitaldark;
  transition: 0.3s ease-in-out;
}
.DIGITALACTIVE {
  background-color: $digital;
}
.DIGITAL:hover {
  background-color: $digital;
}
.TEKNIK {
  background-color: $teknikdark;
  transition: 0.3s ease-in-out;
}
.TEKNIKACTIVE {
  background-color: $teknik;
}
.TEKNIK:hover {
  background-color: $teknik;
}

/* Small devices (portrait tablets and large phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .btn-circle {
    font-size: 0.6rem;
    width: 4rem;
  }
}

/* Extra small devices (phones, 374px and down) */
@media only screen and (max-width: 374px) {
  .btn-circle {
    font-size: 0.5rem;
    width: 3.5rem;
  }
}
</style>
