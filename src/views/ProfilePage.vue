<template>
  <div class="p-3 mb-3">
    <div class="row align-items-center">
      <span v-if="store.zoteroData != null">
        <p>KEA Profiler...</p>
        <CardGroup :profiles="true" :displayAll="displayAll" />
      </span>
      <div
        v-else
        class="loading col d-flex align-items-center justify-content-center"
      >
        <div class="pulseLoader"></div>
      </div>
    </div>
  </div>
  <ProfileModal />
</template>

<script>
import CardGroup from "@/components/CardGroup.vue";
import { store } from "../assets/store.js";
import ProfileModal from "@/components/ProfileModal.vue";
import { Modal } from "bootstrap";

export default {
  name: "ProfilePage",
  components: {
    CardGroup,
    ProfileModal,
  },
  props: ["products", "loading", "default", "productcount"],
  data() {
    return {
      displayAll: true,
      profiles: null,
      store,
    };
  },
  computed: {},
  methods: {},
  async mounted() {
    Modal.getOrCreateInstance(
      document.getElementById("profileModal")
    )._element.addEventListener("hide.bs.modal", function (e) {
      resetProfile(e);
    });
    const resetProfile = () => {
      this.store.currentProfileNumber = null;
    };
  },
  beforeRouteLeave(to, from, next) {
    let modal = Modal.getOrCreateInstance(
      document.getElementById("profileModal")
    ); // Returns a Bootstrap modal instance
    // Show or hide:
    if (modal._isShown) {
      modal.toggle();
    }
    next();
  },
};
</script>
<style lang="scss" scoped>
.loading {
  min-height: "22rem";
}

$pulseSize: 4em;
$pulseTiming: 1.2s;

.pulseLoader {
  width: $pulseSize;
  height: $pulseSize;
  border-radius: $pulseSize;
  background-color: white;
  outline: 1px solid transparent;
  animation: pulseanim $pulseTiming ease-in-out infinite;
}

@keyframes pulseanim {
  0% {
    transform: scale(0);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
</style>
