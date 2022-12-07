// inspireret af https://therichpost.com/vue-3-bootstrap-5-modal-popup-form/ og
https://dev.to/shahednasser/how-to-easily-add-share-links-for-each-social-media-platform-1l4f

<template>
  <div class="container">
    <!-- Modal -->
    <div
      class="modal fade pt-5 pt-sm-0"
      id="profileModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <div class="navbar-brand p-0 pb-2 d-flex align-items-center">
              <img
                src="https://bibliotek.kea.dk/images/KEAprodukter/KEA_logo_EN_Web_red.png"
                class="logo d-inline"
                alt=""
              />
              <p class="navbar-title d-inline ps-2 m-0 text-dark">Produkter</p>
            </div>
            <!-- <h5 class="modal-title text-info" id="exampleModalLabel">
              Om KEA Produkter
            </h5> -->
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="p-3 text-start">
              <h2>{{ this.products[this.getIndex()].author }}</h2>
              <p>{{ this.products[this.getIndex()].contact }}</p>
              <h3 class="obs">
                API info fra Research gate, LinkedIn el. lign.
              </h3>
              <img
                width="100"
                src="https://media-exp1.licdn.com/dms/image/C4D03AQFfWAkUeLtcUA/profile-displayphoto-shrink_200_200/0/1636453477288?e=1675296000&v=beta&t=_Ma1fOO3RI92KH6ZkpitCHHIZcaQiDMDSfUt4xkZdMw"
              />
              <p>
                The new and undiscovered excites me. I am experienced in working
                with traditional craft methods as well as with combining them
                with new technologies. I see innovation in multidisciplinary
                collaborations and am very keen to make these happen.
              </p>
              <div
                class="rg-plugin"
                data-stats="true"
                data-faces="true"
                data-publications="true"
                data-height="600"
                data-width="300"
                data-theme="light"
                data-type="institution"
                data-installationId="638f00afc09dc31f410017c3"
              />
              <span data-bs-dismiss="modal" aria-label="Close">
                <router-link
                  :to="{
                    name: 'Results',
                    params: {
                      id: products[getIndex()].author.toLowerCase(),
                      kind: `author`,
                    },
                  }"
                  >Alle KEA produkter af
                  {{ this.products[this.getIndex()].author }}
                </router-link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getIndex } from "../assets/common.js";

export default {
  props: { products: Array },
  data() {
    return {};
  },
  computed: {},
  methods: {
    log(item) {
      console.log(item);
    },
    getIndex: getIndex,
  },
  async mounted() {
    console.log("ping");
    (function () {
      var st = document.createElement("script");
      st.type = "text/javascript";
      st.async = true;
      st.src =
        "https://www.researchgate.net/javascript/plugin/plugin-api-min.js";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(st, s);
    })();
  },
};
</script>

<style lang="scss" scoped>
p {
  color: black;
}
textarea {
  width: 100%;
  resize: none;
  border: none;
  font-size: 0.8rem;
}
.obs {
  color: red;
  font-size: 1rem;
}
h2 {
  color: black;
}
</style>
