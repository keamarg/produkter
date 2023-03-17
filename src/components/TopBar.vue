<template>
  <div class="container-fluid p-0">
    <div class="row align-items-center">
      <div class="col-xl-6">
        <NavigationBar :products="products" />
      </div>
      <div class="col-xl-6">
        <BtnGroup :materials="materials" />
        <BtnGroup :categories="categories" />
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";
import BtnGroup from "@/components/BtnGroup.vue";

export default {
  name: "TopBar",
  components: {
    NavigationBar,
    BtnGroup,
  },
  props: {
    products: Array,
  },
  data() {
    return {
      materials: [
        "E-bøger",
        "Artikler",
        "Videoer",
        "Rapporter",
        "Podcasts",
        "Bøger",
        // "newMat1",
        // "newMat2",
      ],
      categories: [
        // "Labs",
        "BYG",
        "DESIGN",
        "DIGITAL",
        "TEKNIK",
        // "Business",
        // "Produkter",
        // "newCat1",
        // "newCat2",
      ],
    };
  },
  methods: {
    log(item) {
      console.log(item);
    },
    // updateSearchQuery(value1, value2) {
    //   this.$emit("updateSearchQuery", value1, value2);
    // },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/* @import "../styles/style.css"; */
</style>
