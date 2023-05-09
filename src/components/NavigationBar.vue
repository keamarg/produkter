<template>
  <nav class="navbar justify-content-start">
    <router-link :to="{ name: 'Home' }" @click="searchQuery = ''">
      <div class="navbar-brand d-flex align-items-center">
        <img
          src="https://bibliotek.kea.dk/images/KEAprodukter/KEA_logo_EN_Web_red.png"
          class="logo d-inline"
          id="logo"
          alt=""
        />
        <p class="navbar-title d-inline ps-2 m-0">Produkter</p>
      </div>
    </router-link>
    <div class="d-flex w-50 align-items-center">
      <div class="w-100" @focusout="handleFocusOut">
        <input
          @focusin="this.picked = null"
          id="inputfield"
          @keydown.enter="search(searchQuery)"
          @keydown.prevent.down="pick()"
          ref="inputfield"
          v-model="searchQuery"
          name="name"
          class="searchFld form-control me-2"
          type="text"
          autocomplete="off"
          placeholder="&#xF52A;"
          style="font-family: 'bootstrap-icons', Arial"
          aria-label="Søg"
        />
        <div v-if="searchQuery" class="dropdown w-100">
          <div id="dropdown" ref="dropdown" class="dropdown-content w-100">
            <div
              tabindex="0"
              v-for="(keyword, index) in keywordSearchFilter"
              :key="index"
              @click="search(keyword)"
              @keydown.prevent.up="pick('up')"
              @keydown.prevent.down="pick('down')"
              @keydown.enter="search(this.picked.innerText.slice(2))"
              class="w-100 ps-1 dropdownItem"
            >
              <i class="bi bi-search"></i> &nbsp;{{ keyword }}
            </div>
          </div>
        </div>
      </div>
      <button
        tabindex="-1"
        @click="search(searchQuery)"
        class="btn-search btn btn-outline-light ms-1"
        type="button"
      >
        &nbsp;Søg&nbsp;
      </button>
      <i
        class="bi bi-info-circle-fill ms-2 btn-om"
        data-bs-toggle="modal"
        data-bs-target="#aboutModal"
        title="Om"
      ></i>
    </div>
  </nav>
</template>
<script>
export default {
  name: "NavigationBar",
  props: {
    products: Array,
  },
  data() {
    return {
      searchQuery: null,
      filteredKeywords: [],
      picked: null,
    };
  },
  computed: {
    //liste over produkter filtreret på author og keyword
    keywordList() {
      let keywordList = [];
      this.products.map((product) => {
        product[653].map((keyword) => {
          if (!keywordList.includes(keyword.replace(".", ""))) {
            keywordList.push(keyword.replace(".", "").toLowerCase());
          }
        });
        if (typeof product[700] != "undefined") {
          product[700].map((keyword) => {
            if (!keywordList.includes(keyword.toLowerCase())) {
              keywordList.push(keyword.toLowerCase());
            }
          });
        }
        if (!keywordList.includes(product[100][0].toLowerCase())) {
          keywordList.push(product[100][0].toLowerCase());
        }
        if (!keywordList.includes(product[245][0].toLowerCase())) {
          keywordList.push(product[245][0].toLowerCase());
        }
      });
      return keywordList;
    },

    //filtrer keyword listen efter søgefeltet
    keywordSearchFilter() {
      let keywords = this.keywordList.filter((keyword) =>
        // keyword.slice(0, this.searchQuery.length) ==
        // this.searchQuery.slice(0, this.searchQuery.length)
        keyword.includes(this.searchQuery.toLowerCase())
      );
      return keywords.sort().slice(0, 10);
    },
  },
  methods: {
    log(item) {
      console.log(item);
    },
    search(searchQuery) {
      // console.log("ping: " + searchQuery);
      if (searchQuery) {
        this.$router.push({
          name: "Results",
          params: { id: searchQuery }, //list: "productlist"
        });
        this.searchQuery = null;
      }
    },

    // styrer resultat/dropdown menu under søgefelt
    pick(key) {
      if (
        this.picked == null &&
        this.$refs.inputfield.value != "" &&
        this.$refs.dropdown.firstElementChild
      ) {
        // console.log("picked");
        this.picked = this.$refs.dropdown.firstElementChild;
        this.picked.style.backgroundColor = "grey";
        this.picked.style.color = "white";
        this.picked.focus();
      } else if (key == "down" && this.picked.nextElementSibling) {
        this.picked = this.picked.nextElementSibling;
        this.picked.previousElementSibling.style.backgroundColor = "";
        this.picked.previousElementSibling.style.color = "";
        this.picked.style.backgroundColor = "grey";
        this.picked.style.color = "white";
        this.picked.focus();
        // console.log("down");
      } else if (key == "up" && this.picked.previousElementSibling) {
        this.picked.style.backgroundColor = "";
        this.picked.style.color = "";
        this.picked = this.picked.previousElementSibling;
        this.picked.style.backgroundColor = "grey";
        this.picked.style.color = "white";
        this.picked.focus();
        // console.log("up");
      } else if (key == "up" && !this.picked.previousElementSibling) {
        this.picked.style.backgroundColor = "";
        this.picked.style.color = "";
        this.picked = null;
        this.$refs.inputfield.focus();
      }
    },

    //håndterer, at søgeresultat "dropdown" forsvinder, når man klikker et andet sted på siden.
    handleFocusOut(e) {
      // console.log("related: " + e.relatedTarget);
      // console.log(e.target);
      if (
        e.relatedTarget != null &&
        !e.relatedTarget.classList.contains("dropdownItem") &&
        !e.relatedTarget.classList.contains("btn-search")
      ) {
        this.searchQuery = "";
      }
    },
  },
  mounted() {
    // console.log(this.$refs);
    // this.picked = this.$refs.dropdown;
  },
};
</script>
<style lang="scss" scoped>
.btn-om {
  color: #ced4da;
  font-size: 2rem;
  opacity: 0.5;
  transition: all 0.3s ease-in-out;
}
.btn-om:hover {
  color: white;
  cursor: pointer;
  opacity: 1;
}

/* Small devices (portrait tablets and large phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .btn-custom-nav {
    font-size: 0.5rem;
  }
  .navbar-brand {
    font-size: 0.8rem;
  }
  .navbar-brand img {
    width: 6rem; // 12
  }
}

/* Extra small devices (phones, 375px and down) */
@media only screen and (max-width: 375px) {
  .navbar-brand img {
    width: 3rem; // 12
  }
}
/* @import "../styles/style.css"; */
.highlight {
  background-color: white;
}
.dropdownItem:hover {
  background-color: white;
}
/*search bar options*/
.dropdown {
  position: relative;
  z-index: 2;

  /* display: inline-block !important; */
}
.dropdown-content {
  /* display: none; */
  position: absolute;
  background-color: rgba(256, 256, 256, 0.8);
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 2;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 0.25rem;
}
.dropdown-content p {
  color: #343a40;
  padding: 0.2rem;
  text-decoration: none;
  display: block;
  z-index: 2;
}

.dropdown-content p:hover {
  background-color: #ddd;
}
</style>
