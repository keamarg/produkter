<template>
  <div class="dropdown">
    <p
      class="dropdown-toggle mb-0"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      {{ title }}
    </p>
    <ul class="dropdown-menu dropdown-menu-dark">
      <li>
        <span
          class="dropdown-item"
          v-on:click="$emit('filterupdate', $event, this.filterCategory)"
          >Alle</span
        >
      </li>
      <!-- {{
        log(itemCategories)
      }} -->
      <!-- {{
        log(filterCategory)
      }} -->
      <li v-for="item in itemCategories" :key="item.id">
        <span
          class="dropdown-item"
          v-on:click="$emit('filterupdate', $event, this.filterCategory)"
          >{{ item }}</span
        >
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "DropDown",
  props: {
    title: String,
    filteredProducts: Array,
    // extraFilters: Array,
    filterCategory: String,
  },
  emits: ["filterupdate"],
  data() {
    return {};
  },
  computed: {
    //filtrer de fremsøgte produkter yderligere efter kategori
    itemCategories() {
      let data = [];
      this.filteredProducts.map((product) => {
        // console.log(product["year"]);

        if (this.filterCategory == "author") {
          // console.log(product);
          data.push(product["100"][0]);
          product[700].map((item) => data.push(item));
          // data.push(product.author2);
          // data.push(product.author3);
        } else data.push(product[this.filterCategory]);
        // console.log(product[this.filterCategory]);
      });
      return [...new Set(data)];
    },
  },
  methods: {
    log(item) {
      console.log(item);
    },
  },
};
</script>

<style lang="scss" scoped>
//fjern safari button styling
p[type="button"] {
  -webkit-appearance: none;
  //   -webkit-border-radius: 0;
}
.dropdown-item {
  cursor: pointer;
}
.dropdown-menu {
  overflow-y: scroll;
  max-height: 20rem;
}
</style>
