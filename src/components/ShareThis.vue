<template>
  <div class="share-this">
    <!-- This is the placement code ShareThis provides. -->
    <div class="sharethis-inline-share-buttons"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    const st = window.__sharethis__;
    // console.log(st);
    if (!st) {
      const script = document.createElement("script");
      script.src =
        "https://platform-api.sharethis.com/js/sharethis.js#property=62c820df4d7c0900122da6a1>&product=sop";
      document.body.appendChild(script);
    } else if (typeof st.initialize === "function") {
      st.href = window.location.href;
      st.initialize();
    }
  },
};
</script>

<style scoped>
.share-this {
  margin-bottom: 0.5em;
}
</style>
