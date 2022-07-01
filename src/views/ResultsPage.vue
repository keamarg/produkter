//view til results
<template>
  <div :products="products" :loading="loading" class="p-3 mb-3">
    <div class="row align-items-center">
      <p>Søgning på {{ $route.params.id }}...</p>
      <CardGroup
        v-if="filteredProducts.length > 0"
        :products="filteredProducts"
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
  props: ["products", "loading"],
  computed: {
    // tjekker om produktet i søgningen findes i produktlisten (slice sørger for, at også søgninger på f.eks. "pod" stadig viser podcasts)
    filteredProducts() {
      if (this.$route.params.id) {
        return this.products.filter((product) =>
          product.keywords.some(
            (keyword) =>
              keyword.slice(0, this.$route.params.id.length).toLowerCase() ==
              this.$route.params.id.toLowerCase()
          )
        );
      } else {
        return null;
      }
    },
  },
  methods: {},
  created() {},
};
</script>
