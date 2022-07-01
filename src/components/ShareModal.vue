// inspireret af https://therichpost.com/vue-3-bootstrap-5-modal-popup-form/

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
              <p>Facebook&nbsp;</p>
              <p>Twitter&nbsp;</p>
              <p>Instagram&nbsp;</p>
              <p>LinkedIn&nbsp;</p>
              <p>Mail</p>
            </div>
          </div>
          <div class="modal-footer text-start">
            <p>Eller kopier linket</p>
            <br />
            {{ "https://projekter.kea.dk/keaprodukter/dist/#" + $route.path }}
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

<style lang="scss" scoped>
p {
  color: black;
  display: inline;
}
</style>
