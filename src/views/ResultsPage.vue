//view til results
<template>
  <div :products="products" :loading="loading" class="p-3 mb-3">
    <div class="row align-items-center">
      <p>Søgning på {{ $route.params.id }}...</p>
      <CardGroup
        v-if="filteredProducts.length > 0"
        :products="filteredProducts"
        :displayAll="displayAll"
      />
      <h5 v-else>ingen resultater</h5>
    </div>
  </div>
</template>

<script>
import CardGroup from "@/components/CardGroup.vue";
export default {
  name: "ResultsPage",
  components: {
    CardGroup,
  },
  props: ["products", "loading", "productcount"],
  data() {
    return {
      displayAll: true,
    };
  },
  computed: {
    // tjekker om produktet i søgningen findes i produktlisten (slice sørger for, at også søgninger på f.eks. "pod" stadig viser podcasts)
    // filteredProducts() {
    //   if (this.$route.params.id) {
    //     return this.products.filter((product) =>
    //       product.keywords.some(
    //         (keyword) =>
    //           keyword.slice(0, this.$route.params.id.length).toLowerCase() ==
    //           this.$route.params.id.toLowerCase()
    //       )
    //     );
    //   } else {
    //     return null;
    //   }
    // },
    // filteredProducts() {
    //   // console.log(this.$route.params.id);
    //   // console.log(this.$route.params.type);
    //   //filtrer efter ophav
    //   if (this.$route.params.kind == "author") {
    //     console.log("in #1", this.$route.params.kind);
    //     return this.products.filter(
    //       (product) =>
    //         product.author.toLowerCase() ==
    //           this.$route.params.id.toLowerCase() ||
    //         product.author2.toLowerCase() ==
    //           this.$route.params.id.toLowerCase() ||
    //         product.author3.toLowerCase() == this.$route.params.id.toLowerCase()
    //     );
    //     //filtrer efter keyword
    //   } else if (this.$route.params.id) {
    //     console.log("in #2");
    //     return this.products.filter((product) =>
    //       product.keywords.some(
    //         (keyword) =>
    //           keyword.slice(0, this.$route.params.id.length).toLowerCase() ==
    //           this.$route.params.id.toLowerCase()
    //       )
    //     );
    //   } else {
    //     return null;
    //   }
    // },
    filteredProducts() {
      //filtrer efter ophav
      if (this.$route.params.id) {
        let authors = this.products.filter(
          (product) =>
            product.author.toLowerCase() ==
              this.$route.params.id.toLowerCase() ||
            product.author2.toLowerCase() ==
              this.$route.params.id.toLowerCase() ||
            product.author3.toLowerCase() == this.$route.params.id.toLowerCase()
        );
        //filtrer efter keyword
        let keywords = this.products.filter((product) =>
          product.keywords.some(
            (keyword) =>
              keyword.slice(0, this.$route.params.id.length).toLowerCase() ==
              this.$route.params.id.toLowerCase()
          )
        );
        // saml de to arrays (authors og keywords) og filtrer for dubletter (i fald author også er kommet på som keyword)
        const collectedAndFiltered = [...new Set([...authors, ...keywords])]; // Kun concatenation, ES6 version: const collectedArrays = [...authors, ...keywords]; ES5 version: let collectedArrays = authors.concat(keywords);
        return collectedAndFiltered;
      } else {
        return null;
      }
    },
  },
  methods: {},
  created() {},
};
</script>
