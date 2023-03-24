<template>
  <div
    class="btn-group d-flex text-center"
    role="group"
    aria-label="Basic example"
  >
    <div class="col d-sm-flex justify-content-center mt-2 mt-xl-0">
      <!-- <span v-if="materials">
        <span
          v-for="(material, index) in materials.slice(0, 8)"
          v-bind:key="index"
        >
          <router-link
            :to="{
              name: 'Results',
              params: { id: material.toLowerCase(), list: 'productlist' },
            }"
          >
            <button
              type="button"
              class="btn btn-primary btn-custom-nav me-1 me-sm-3 mb-2 mt-2 py-1 px-1 px-sm-2 rounded-pill"
            >
              {{ material }}
            </button>
          </router-link>
        </span>
      </span> -->
      <span v-if="categories">
        <span
          v-for="(category, index) in categories.slice(0, 10)"
          v-bind:key="index"
          class="me-2 ms-2"
        >
          <router-link
            :to="{
              name: 'Results',
              params: { id: category.toLowerCase(), list: 'productlist' },
            }"
          >
            <!-- <button
              type="button"
              class="btn btn-primary btn-custom-nav me-1 me-sm-3 py-1 px-1 px-sm-2 rounded-pill"
            >
              {{ category }}
            </button> -->

            <!-- { [category + 'ACTIVE']: category + 'isActive' }, -->
            <!-- log(`${category + 'isActive'}`); -->

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
    return { store, isActive: null };
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
/* Extra small devices (phones, 576px and down) */
@media only screen and (max-width: 768px) {
  .btn-circle {
    font-size: 0.8rem;
  }
}
</style>
