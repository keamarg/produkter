<template>
  <div class="p-3 mb-3">
    <div class="row align-items-center">
      <p v-if="filteredProducts.length < 1">
        Du har ikke "liket" nogen produkter...
      </p>
      <span v-else>
        <p>Dine "likes"...</p>
        <CardGroup :products="filteredProducts" :displayAll="displayAll" />
      </span>
    </div>
  </div>
</template>

<script>
import CardGroup from "@/components/CardGroup.vue";

export default {
  name: "LikesPage",
  components: {
    CardGroup,
  },
  props: ["products", "loading"],
  data() {
    return {
      displayAll: true,
    };
  },
  computed: {
    filteredProducts() {
      // console.log(this.products.filter((product) => product.liked));
      return this.products.filter((product) => product.liked);
    },
  },
  methods: {},
};
</script>
