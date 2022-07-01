//view til archive

<template>
  <div class="p-3 mb-3">
    <div class="row align-items-center">
      <p>Alle KEA produkter...</p>
      <CardGroup :products="products" :displayAll="displayAll" />
    </div>
  </div>
</template>

<script>
import CardGroup from "@/components/CardGroup.vue";

export default {
  name: "ArchivePage",
  components: {
    CardGroup,
  },
  props: ["products", "loading"],
  data() {
    return {
      displayAll: true,
    };
  },
  computed: {},
  methods: {},
};
</script>
