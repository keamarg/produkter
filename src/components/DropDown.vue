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
        <span class="dropdown-item" v-on:click="removeFilter($event, title)"
          >Alle</span
        >
      </li>

      <li v-for="item in itemCategories" :key="item.id">
        <span
          class="dropdown-item"
          @click.stop
          v-on:click="
            store.getFilterList('year').includes(item) ||
            store.getFilterList('author').includes(item) ||
            store.getFilterList('material').includes(item)
              ? removeFilter($event, item)
              : //OBS! store.updateItemCategoriesSelected(item),
                $emit('filterupdate', $event, this.filterCategory)
          "
          ><i
            class="bi"
            :class="
              store.getFilterList('year').includes(item) ||
              store.getFilterList('author').includes(item) ||
              store.getFilterList('material').includes(item)
                ? 'bi-check2-square'
                : 'bi-square'
            "
            ><span style="font-style: normal; padding-left: 0.5rem">{{
              item
            }}</span></i
          ></span
        >
      </li>
    </ul>
  </div>
</template>
<script>
import { store } from "../assets/store.js";

export default {
  name: "DropDown",
  props: {
    title: String,
    filteredProducts: Array,
    filterCategory: String,
  },
  emits: ["filterupdate", "removeFilter"],
  data() {
    return {
      store,
    };
  },
  computed: {
    //filtrer de fremsøgte produkter yderligere efter kategori
    itemCategories() {
      let data = [];
      this.filteredProducts.map((product) => {
        //test
        if (this.filterCategory == "material") {
          let materialList = [
            "artikler.",
            "thesis.",
            "rapporter.",
            "podcasts.",
            "præsentationer.",
            "e-bøger.",
            "bøger.",
            "spil.",
          ];
          if (typeof product["653"] != "undefined") {
            product[653].reduce((filtered, option) => {
              let optionStripped = option.replace(".", "");
              if (
                !data.includes(optionStripped) &&
                materialList.includes(option)
              ) {
                data.push(optionStripped);
              }
            }, []);
          }
        } else if (this.filterCategory == "author") {
          if (typeof product["100"] != "undefined") {
            data.push(product["100"][0]);
          }
          if (typeof product["700"] != "undefined") {
            product[700].map((item) => data.push(item));
          }
        } else data.push(product[this.filterCategory]);
      });
      return [...new Set(data)].sort();
    },
  },
  methods: {
    log(item) {
      console.log(item);
    },
    removeFilter(event, title) {
      this.$emit("removeFilter", event, title);
    },
  },
};
</script>

<style lang="scss" scoped>
p[type="button"] {
  -webkit-appearance: none;
}
.dropdown-item {
  cursor: pointer;
}
.dropdown-menu {
  overflow-y: scroll;
  max-height: 20rem;
}
</style>
