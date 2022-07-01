//Sidebar ikoner
<template>
  <div class="col-md-1 pt-3 text-center mt-5">
    <router-link :to="{ name: 'Likes' }">
      <i
        class="bi bi-heart d-md-block m-5 m-md-0 sidebar-icons sidebar-icon-like"
        data-bs-toggle="tooltip"
        data-bs-placement="auto"
        title="Likes"
      ></i>
    </router-link>
    <router-link :to="{ name: 'Archive' }">
      <i
        class="bi bi bi-archive d-md-block mt-md-5 mb-md-5 mt-0 mtb-0 sidebar-icons sidebar-icon-archive"
        data-bs-toggle="tooltip"
        data-bs-placement="auto"
        title="Arkiv"
      ></i>
    </router-link>
    <i
      class="bi bi-share d-md-block m-5 m-md-0 sidebar-icons sidebar-icon-share"
      data-bs-toggle="modal"
      data-bs-target="#shareModal"
      title="Del"
    ></i>
    <ShareModal />
  </div>
</template>

<script>
import ShareModal from "@/components/ShareModal.vue";

export default {
  name: "SideBar",
  components: {
    ShareModal,
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
/* @import "../styles/style.css"; */

// .sidebar-icons {
//   color: #ced4da;
//   font-size: 4rem;
//   line-height: 5rem;
// }

// .sidebar-icons:hover {
//   color: white;
// }

// .sidebar-icon-like:before {
//   font-family: Arial, Helvetica, sans-serif;
//   content: "\F417";
//   color: white;
//   opacity: 0.5;
//   transition: all 0.6s ease-in-out;
// }

// .sidebar-icon-like:hover:before {
//   font-family: Arial, Helvetica, sans-serif;
//   content: "\f415";
//   color: white;
//   opacity: 1;
// }

// .sidebar-icon-archive:before {
//   font-family: Arial, Helvetica, sans-serif;
//   content: "\F10D";
//   color: white;
//   opacity: 0.5;
//   transition: all 0.6s ease-in-out;
// }

// .sidebar-icon-archive:hover:before {
//   font-family: Arial, Helvetica, sans-serif;
//   content: "\F10C";
//   color: white;
//   opacity: 1;
// }

// .sidebar-icon-share:before {
//   font-family: Arial, Helvetica, sans-serif;
//   content: "\F52E";
//   color: white;
//   opacity: 0.5;
//   transition: all 0.6s ease-in-out;
// }

// .sidebar-icon-share:hover:before {
//   font-family: Arial, Helvetica, sans-serif;
//   content: "\F52D";
//   color: white;
//   opacity: 1;
// }
</style>
