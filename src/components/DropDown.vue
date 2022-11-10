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
        if (this.filterCategory == "author") {
          data.push(product[this.filterCategory]);
          data.push(product.author2);
          data.push(product.author3);
        } else data.push(product[this.filterCategory]);
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
.dropdown-item {
  cursor: pointer;
}
.dropdown-menu {
  overflow-y: scroll;
  max-height: 20rem;
}
</style>
