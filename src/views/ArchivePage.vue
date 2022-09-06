//view til archive

<template>
  <div class="p-3 mb-3" @mousewheel="handleWheel">
    <div class="row align-items-center">
      <p>Alle KEA produkter...</p>
      <CardGroup :products="products" :displayAll="displayAll" />
    </div>
    <div v-if="displayChevron" class="bounce">
      <i class="bi bi-chevron-down"></i>
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
      displayChevron: true,
    };
  },
  computed: {},
  methods: {
    handleWheel() {
      console.log(this.divHeight);
      this.displayChevron =
        window.innerHeight + window.scrollY + 10 <= document.body.offsetHeight;
    },
  },
};
</script>
<style lang="scss" scoped>
.bi-chevron-down {
  font-size: 2rem;
}
.bounce {
  position: fixed;
  left: 50%;
  bottom: 0;
  margin-top: -25px;
  margin-left: -25px;
  height: 50px;
  width: 50px;
  // background: red;
  color: white;
  // -webkit-animation: bounce 1.5s infinite;
  // -moz-animation: bounce 1.5s infinite;
  // -o-animation: bounce 1.5s infinite;
  animation: bounce 1.5s infinite;
}

// @-webkit-keyframes bounce {
//   0% {
//     bottom: 0px;
//   }
//   50% {
//     bottom: 15px;
//   }
//   100% {
//     bottom: 30;
//   }
// }

// @-moz-keyframes bounce {
//   0% {
//     bottom: 0px;
//   }
//   50% {
//     bottom: 15px;
//   }
//   100% {
//     bottom: 30;
//   }
// }

// @-o-keyframes bounce {
//   0% {
//     bottom: 0px;
//   }
//   50% {
//     bottom: 15px;
//   }
//   100% {
//     bottom: 30;
//   }
// }

@keyframes bounce {
  0% {
    bottom: 0px;
  }
  50% {
    bottom: 10px;
  }
  100% {
    bottom: 30;
  }
}
</style>
