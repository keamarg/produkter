// inspireret af https://therichpost.com/vue-3-bootstrap-5-modal-popup-form/ og
https://dev.to/shahednasser/how-to-easily-add-share-links-for-each-social-media-platform-1l4f

<template>
  <div class="container">
    <!-- Modal -->
    <div
      class="modal fade pt-5 pt-sm-0"
      id="aboutModal"
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
              <!-- <p pb-5>Del produktet via...</p> -->
              <p class="obs">
                OBS: Siden er under opbygning, og indeholder ufærdige artikler
              </p>
              <p>
                På KEA Produkter kan du finde alle de produkter, der er udviklet
                af ansatte på KEA over de seneste år. Afhængigt af produkttype
                er der små beskrivelser, videoer og mulighed for at hente eller
                se selve produktet. Det er altid muligt at komme med input,
                ønsker og spørgsmål til platformen. For yderligere information
                kontakt: Biblioteksleder Helle Guldberg Copyright: Alt
                materialet på KEA Produkter er offentligt tilgængeligt og kan,
                med henvisning, anvendes til undervisningsformål. God
                fornøjelse!
              </p>
            </div>
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
      // return `https://projekter.kea.dk/keaprodukter/#${this.$route.path}`;
      if (this.$route.path == "/") {
        return `https://bibliotek.kea.dk/produkter`;
      } else {
        return `https://bibliotek.kea.dk/produkter?productid=${this.$route.path.slice(
          1
        )}`;
      }
    },
    getFBUrl() {
      if (this.$route.path == "/") {
        return `https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fbibliotek.kea.dk%2Fprodukter`;
      } else {
        return `https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fbibliotek.kea.dk%2Fprodukter?productid=${this.$route.path.slice(
          1,
          this.$route.path.length
        )}&quote=Check out this cool product from KEA!`;
      }
    },
    getTwitterUrl() {
      if (this.$route.path == "/") {
        return `https://twitter.com/intent/tweet?text=Check out this cool product from KEA!&url=https%3A%2F%2Fbibliotek.kea.dk%2Fprodukter`;
      } else {
        return `https://twitter.com/intent/tweet?text=Check out this cool product from KEA!&url=https%3A%2F%2Fbibliotek.kea.dk%2Fprodukter?productid=${this.$route.path.slice(
          1,
          this.$route.path.length
        )}`;
      }
    },
    getLinkedInUrl() {
      if (this.$route.path == "/") {
        return `https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fbibliotek.kea.dk%2Fprodukter`;
      } else {
        return `https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fbibliotek.kea.dk%2Fprodukter?productid=${this.$route.path.slice(
          1,
          this.$route.path.length
        )}`;
      }
    },
  },
  methods: {
    log(item) {
      console.log(item);
    },
    openSocial(media) {
      let width = 600;
      let height = 400;
      let url = "";
      // console.log(media);
      if (media == "fb") {
        url = this.getFBUrl;
      } else if (media == "tw") {
        url = this.getTwitterUrl;
      } else if (media == "li") {
        url = this.getLinkedInUrl;
      }

      // giver en fejl når det kører fra en iframe, men virker, kan nok løses med noget a la det her: https://javascript.info/cross-window-communication (Unsafe attempt to initiate navigation for frame with origin 'https://www.linkedin.com')
      window.open(
        url,
        "targetWindow",
        `toolbar=no,location=0,top=100,left=${
          (window.innerWidth - width) / 2
        },status=no,menubar=no,scrollbars=yes,resizable=yes,width=${width},height=${height}`
      );
      return false;
    },
    //virker ikke i iframe
    // copyToClipboard() {
    //   /* Get the text field */
    //   let copyText = document.getElementById("myInput");

    //   /* Select the text field */
    //   copyText.select();
    //   copyText.setSelectionRange(0, 99999); /* For mobile devices */

    //   /* Copy the text inside the text field */
    //   navigator.clipboard.writeText(copyText.value);

    //   /* Alert the copied text */
    //   alert("Copied the text: " + copyText.value);
    // },
    //deprecated, men virker i iFrame
    copyToClipboard() {
      document.querySelector("#myInput").select();
      document.execCommand("copy");
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  color: black;
  display: inline;
}
textarea {
  width: 100%;
  resize: none;
  border: none;
  font-size: 0.8rem;
}
.obs {
  color: red;
}
</style>
