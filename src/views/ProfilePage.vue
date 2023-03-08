<template>
  <div class="p-3 mb-3">
    <div class="row align-items-center">
      <!-- <p v-if="filteredProducts.length < 1">
        Du har ikke "liket" nogen produkter...
      </p> -->
      <span>
        <p>KEA Profiler...</p>
        <CardGroup :profiles="true" :displayAll="displayAll" />
      </span>
    </div>
  </div>
  <ProfileModal />
</template>

<script>
import CardGroup from "@/components/CardGroup.vue";
// import { fetchZoteroProfiles } from "../assets/common.js";
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
    // let zd = await fetchZoteroProfiles();
    // // console.log(zd);
    // store.zoteroData = zd;
    // this.profiles = zd;

    // this.store.zoteroData.map((item) => console.log(item.keaId));
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
