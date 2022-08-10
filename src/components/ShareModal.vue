// inspireret af https://therichpost.com/vue-3-bootstrap-5-modal-popup-form/ og
https://dev.to/shahednasser/how-to-easily-add-share-links-for-each-social-media-platform-1l4f

<template>
  <div class="container">
    <!-- Modal -->
    <div
      class="modal fade"
      id="shareModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-danger" id="exampleModalLabel">Del</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3 text-start">
              <p pb-5>Del produktet via...</p>
              <br />
              <a :href="getFBUrl" target="_blank">
                <i class="bi bi-facebook"></i>
              </a>
              &nbsp;
              <a :href="getTwitterUrl"><i class="bi bi-twitter"></i></a>
              &nbsp;
              <a :href="getLinkedInUrl"><i class="bi bi-linkedin"></i></a>
              &nbsp;
              <a :href="getInstagramUrl"><i class="bi bi-linkedin"></i></a>
              <p>Instagram&nbsp;</p>
              <p>LinkedIn&nbsp;</p>
              <p>Mail</p>
            </div>
          </div>
          <div class="modal-footer text-start">
            <p>Eller kopier linket</p>
            <br />
            {{ getCurrentUrl }}
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {};
  },
  computed: {
    getCurrentUrl() {
      return `https://projekter.kea.dk/keaprodukter/dist/#${this.$route.path}`;
    },
    getFBUrl() {
      return `https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fprojekter.kea.dk%2Fkeaprodukter%2Fdist%2F%23%2F${this.$route.path.slice(
        1,
        this.$route.path.length
      )}&quote=Check out this cool product from KEA!`;
    },
    getTwitterUrl() {
      return `https://twitter.com/intent/tweet?text=Check out this cool product from KEA!&url=https%3A%2F%2Fprojekter.kea.dk%2Fkeaprodukter%2Fdist%2F%23%2F${this.$route.path.slice(
        1,
        this.$route.path.length
      )}`;
    },
    getLinkedInUrl() {
      return `https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fprojekter.kea.dk%2Fkeaprodukter%2Fdist%2F%23%2F${this.$route.path.slice(
        1,
        this.$route.path.length
      )}`;
    },
    getInstagramUrl() {
      return `https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fprojekter.kea.dk%2Fkeaprodukter%2Fdist%2F%23%2F${this.$route.path.slice(
        1,
        this.$route.path.length
      )}`;
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
p {
  color: black;
  display: inline;
}
</style>
