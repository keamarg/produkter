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
          v-on:click="
            removeFilter($event, title) //$emit('filterupdate', $event, this.filterCategory), log('clicked')
          "
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
          v-on:click="
            store.itemCategoriesSelected.includes(item)
              ? removeFilter($event, item)
              : store.updateItemCategoriesSelected(item),
              $emit('filterupdate', $event, this.filterCategory)
          "
          ><i
            class="bi"
            :class="
              store.itemCategoriesSelected.includes(item)
                ? 'bi-check2-square'
                : 'bi-square'
            "
            style="font-style: normal; padding-right: 0.5rem"
            >{{ item }}</i
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
    // extraFilters: Array,
    filterCategory: String,
  },
  emits: ["filterupdate", "removeFilter"],
  data() {
    return {
      // isActive: true,
      // itemCategoriesSelected: [],
      store,
    };
  },
  computed: {
    //filtrer de fremsøgte produkter yderligere efter kategori
    itemCategories() {
      let data = [];
      this.filteredProducts.map((product) => {
        // console.log(product["year"]);

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
            // product[653].map((item) => data.push(item));
            product[653].reduce((filtered, option) => {
              let optionStripped = option.replace(".", "");
              if (
                !data.includes(optionStripped) &&
                materialList.includes(option)
              ) {
                // console.log(optionStripped);
                data.push(optionStripped);
              }
              // return filtered;
              // this.store.materialFilters = data;
            }, []);
          }
        } else if (this.filterCategory == "author") {
          // console.log(product);
          if (typeof product["100"] != "undefined") {
            data.push(product["100"][0]);
          }
          if (typeof product["700"] != "undefined") {
            product[700].map((item) => data.push(item));
          } // data.push(product.author2);
          // data.push(product.author3);
        } else data.push(product[this.filterCategory]);
        // console.log(product[this.filterCategory]);
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
      // console.log("inside removeFilter " + item);
      // console.log(this.store.itemCategoriesSelected.indexOf(item));
      // console.log(this.store.itemCategoriesSelected);
      // this.store.itemCategoriesSelected.splice(
      //   this.store.itemCategoriesSelected.indexOf(item, 1)
      // );
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
