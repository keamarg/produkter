<template>
  <div class="accordion mt-5" id="accordionExample">
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingOne">
        <button
          class="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseOne"
          aria-expanded="false"
          aria-controls="collapseOne"
        >
          <!-- Se video {{ products[getIndex()].title }} -->
          <i class="bi bi-play-circle"></i>&nbsp;
          {{ products[getIndex()].video[1] }}
        </button>
      </h2>
      <div
        id="collapseOne"
        class="accordion-collapse collapse"
        aria-labelledby="headingOne"
        data-bs-parent="#accordionExample"
      >
        <div class="accordion-body">
          <div class="iframediv ratio ratio-16x9 rounded-custom mt-3">
            <!-- {{ log(products[getIndex()].video) }} -->
            <iframe
              v-if="products[getIndex()].video[0] != 'none'"
              :src="videosrc"
              frameborder="0"
              allow="accelerometer; encrypted-media; gyroscope;"
              allowfullscreen
            >
            </iframe>
            <video
              v-else-if="products[getIndex()].video2[0]"
              width="320"
              height="240"
              controls
            >
              <source :src="videosrc2" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccordionMenu",
  props: ["products", "getIndex"],
  data() {
    return {};
  },
  computed: {
    videosrc() {
      // console.log(this.$route.params);
      return `https://www.youtube.com/embed/${
        this.products[this.getIndex()].video[0]
      }?autoplay=1`;
    },
    videosrc2() {
      // console.log(this.$route.params);
      return this.products[this.getIndex()].video2[0];
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
.accordion-item,
.accordion-button,
.accordion-button[data-v-34869972]:not(.collapsed) {
  color: white;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 1),
    rgba(0, 0, 0, 0.9),
    rgba(0, 0, 0, 0.8),
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.3)
  );
}
</style>
