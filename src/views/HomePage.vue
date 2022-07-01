<template>
  <div>
    <CarouselSlider :products="products" :loading="loading" />
  </div>
</template>

<script>
// @ is an alias to /src
import CarouselSlider from "@/components/CarouselSlider.vue";

export default {
  name: "HomePage",
  components: {
    CarouselSlider,
  },
  props: ["products", "loading"],
};
</script>
