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
        <span class="dropdown-item" v-on:click="$emit('filterupdate', $event)"
          >Alle</span
        >
      </li>
      <li v-for="item in filteredProducts" :key="item.id">
        <span
          class="dropdown-item"
          v-on:click="$emit('filterupdate', $event)"
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
    products: Array,
    filterCategory: String,
  },
  emits: ["filterupdate"],
  data() {
    return {};
  },
  computed: {
    //filtrer de fremsøgte produkter yderligere efter kategori
    filteredProducts() {
      const data = this.products.map((product) => {
        return product[this.filterCategory];
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
</style>
