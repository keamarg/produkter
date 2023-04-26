//Sidebar ikoner
<template>
  <div class="col-md-1 pt-3 text-center mt-1 mt-md-5 ms-3">
    <router-link :to="{ name: 'Likes' }" class="d-md-block sidebar-icons">
      <i
        class="bi bi-heart-fill"
        data-bs-toggle="tooltip"
        data-bs-placement="auto"
        title="Likes"
      ></i>
      <div class="d-none d-md-block sidebar-icons-text">Gemte</div>
    </router-link>
    <router-link
      :to="{ name: 'Results', params: { id: 'alle' } }"
      class="d-md-block mx-5 mx-md-0 mt-md-2 mb-md-2 sidebar-icons"
    >
      <i
        class="bi bi-collection-fill"
        data-bs-toggle="tooltip"
        data-bs-placement="auto"
        title="Arkiv"
      ></i>
      <div class="d-none d-md-block sidebar-icons-text">Produkter</div>
    </router-link>
    <router-link
      :to="{ name: 'Profiles' }"
      class="d-md-block me-5 mx-md-0 mt-md-2 mb-md-2 sidebar-icons"
    >
      <i
        class="bi bi-people-fill"
        data-bs-toggle="tooltip"
        data-bs-placement="auto"
        title="Profiler"
      ></i>
      <div class="d-none d-md-block sidebar-icons-text">Forfattere</div>
    </router-link>
    <!-- <span class="d-md-block sidebar-icons">
      <i
        class="bi bi-info-circle-fill"
        data-bs-toggle="modal"
        data-bs-target="#aboutModal"
        title="Del"
      ></i>
      <div class="d-none d-md-block sidebar-icons-text">Om</div>
    </span> -->

    <ShareModal />
    <AboutModal />
  </div>
</template>

<script>
import ShareModal from "@/components/ShareModal.vue";
import AboutModal from "@/components/AboutModal.vue";

export default {
  name: "SideBar",
  components: {
    ShareModal,
    AboutModal,
  },
  props: {},
  data() {
    return {
      // hoverarchive: false,
      // hoverlike: false,
      // hovershare: false,
    };
  },
  methods: {
    log(item) {
      console.log(item);
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar-icons {
  color: #ced4da;
  font-size: 2.5rem; //4
  line-height: 2rem; //5
  opacity: 0.5;
  transition: all 0.3s ease-in-out;
}

.sidebar-icons:hover {
  color: white;
  cursor: pointer;
  opacity: 1;
}

.sidebar-icons-text {
  font-size: 1rem;
  overflow: hidden !important;
  text-overflow: ellipsis;
}
</style>
