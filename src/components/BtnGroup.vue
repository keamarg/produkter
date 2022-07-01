<template>
  <div
    class="btn-group d-flex text-center"
    role="group"
    aria-label="Basic example"
  >
    <div class="col d-sm-flex justify-content-center">
      <span v-if="materials">
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
              class="btn btn-primary btn-custom-nav me-3 mb-2 mt-2 py-1 px-2 rounded-pill"
            >
              {{ material }}
            </button>
          </router-link>
        </span>
      </span>
      <span v-if="categories">
        <span
          v-for="(category, index) in categories.slice(0, 10)"
          v-bind:key="index"
        >
          <router-link
            :to="{
              name: 'Results',
              params: { id: category.toLowerCase(), list: 'productlist' },
            }"
          >
            <button
              type="button"
              class="btn btn-primary btn-custom-nav me-3 py-1 px-2 rounded-pill"
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
export default {
  name: "BtnGroup",
  props: {
    materials: Array,
    categories: Array,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss">
/* @import "../styles/style.css"; */
// .btn-custom-nav {
//   color: $keared;
//   background-color: white;
//   border-color: white;
//   font-weight: bold;
//   border: 0px;
// }
// .btn-custom-nav:hover {
//   background-color: $keared;
//   color: white;
// }

// .btn-custom-nav:active {
//   background-color: $keared;
//   color: white;
//   border: 0px;
// }

// .btn-custom-nav:focus {
//   outline: none;
// }
</style>
