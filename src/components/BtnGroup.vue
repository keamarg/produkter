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
            <button
              type="button"
              class="btn-circle me-1 me-sm-3"
              :class="category"
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
.btn-circle {
  width: 6rem;
  height: 3rem;
  color: white;
  border: none;
  border-radius: 3rem;
  font-size: 1rem;
  text-align: center;
}
.BYG {
  background-color: #01774075;
  transition: 0.3s ease-in-out;
}
.BYG:hover {
  background-color: #017740;
}
.DESIGN {
  background-color: #ea436075;
  transition: 0.3s ease-in-out;
}
.DESIGN:hover {
  background-color: #ea4360;
}
.DIGITAL {
  background-color: #e8833475;
  transition: 0.3s ease-in-out;
}
.DIGITAL:hover {
  background-color: #e88334;
}
.TEKNIK {
  background-color: #037dbb75;
  transition: 0.3s ease-in-out;
}
.TEKNIK:hover {
  background-color: #037dbb;
}
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
