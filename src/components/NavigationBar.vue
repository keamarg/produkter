<template>
  <nav class="navbar justify-content-start">
    <router-link :to="{ name: 'Home' }" @click="searchQuery = ''">
      <div class="navbar-brand p-0 pb-2 d-flex align-items-center">
        <img
          src="https://bibliotek.kea.dk/images/KEAprodukter/KEA_logo_EN_Web_red.png"
          class="logo d-inline"
          alt=""
        />
        <p class="navbar-title d-inline ps-2 m-0">Produkter</p>
      </div>
    </router-link>
    <div class="d-flex w-50">
      <div class="w-100">
        <input
          id="inputfield"
          @input="updateSearchQuery"
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
            <p
              tabindex="0"
              v-for="(keyword, index) in keywordSearchFilter"
              :key="index"
              @click="search(keyword)"
              @keydown.prevent.up="pick('up')"
              @keydown.prevent.down="pick('down')"
              @keydown.enter="search(this.picked.innerText.slice(2))"
              class="w-100"
            >
              <i class="bi bi-search"></i> &nbsp;{{ keyword }}
            </p>
          </div>
        </div>
      </div>
      <button
        @click="search(searchQuery)"
        class="btn-search btn btn-outline-light"
        type="button"
      >
        &nbsp;Søg&nbsp;
      </button>
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
      // imgcss: {
      //   width: "8rem", // 12
      //   "text-align": "left",
      //   // "padding-bottom": "1rem",
      // },
      // titlecss: {
      //   color: "white",
      //   "text-transform": "none",
      //   // "margin-bottom": "0.7rem",
      //   "font-size": "1.2rem", //2
      //   // "padding-bottom": "0rem",
      //   // "margin-bottom": "0rem",
      // },
      searchQuery: null,
      // keywords: [],
      filteredKeywords: [],
      picked: null,
    };
  },
  computed: {
    //liste over produkter filtreret på author og keyword
    filteredList() {
      if (this.searchQuery) {
        //filtrer efter author
        let authors = this.products.filter(
          (product) =>
            product.author.slice(0, this.searchQuery.length).toLowerCase() ==
              this.searchQuery.toLowerCase() ||
            product.author2.slice(0, this.searchQuery.length).toLowerCase() ==
              this.searchQuery.toLowerCase() ||
            product.author3.slice(0, this.searchQuery.length).toLowerCase() ==
              this.searchQuery.toLowerCase()
        );

        //filtrer efter keyword
        let keywords = this.products.filter((product) =>
          product.keywords.some(
            (keyword) =>
              keyword.slice(0, this.searchQuery.length).toLowerCase() ==
              this.searchQuery.toLowerCase()
          )
        );
        // saml de to arrays (authors og keywords) og filtrer for dubletter (i fald author også er kommet på som keyword)
        const collectedAndFiltered = [...new Set([...authors, ...keywords])]; // Kun concatenation, ES6 version: const collectedArrays = [...authors, ...keywords]; ES5 version: let collectedArrays = authors.concat(keywords);
        return collectedAndFiltered;
      } else {
        return null;
      }
    },
    // dropdown() {
    //   if (this.$refs.inputfield.value != "") {
    //     return this.$refs.dropdown.firstElementChild;
    //   } else return null;
    // },
    keywordList() {
      let keywordList = [];
      this.products.map((product) => {
        product.keywords.map((keyword) => {
          if (!keywordList.includes(keyword)) {
            keywordList.push(keyword.toLowerCase());
          }
        });
        if (!keywordList.includes(product.author.toLowerCase())) {
          keywordList.push(product.author.toLowerCase());
        }
        if (!keywordList.includes(product.author2.toLowerCase())) {
          keywordList.push(product.author2.toLowerCase());
        }
        if (!keywordList.includes(product.author3.toLowerCase())) {
          keywordList.push(product.author3.toLowerCase());
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
    updateSearchQuery() {
      this.picked = null;
      this.$emit("updateSearchQuery", this.searchQuery, this.filteredList);
    },
    search(searchQuery) {
      if (searchQuery) {
        this.$router.push({
          name: "Results",
          params: { id: searchQuery, list: "productlist" },
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
        this.picked = this.$refs.dropdown.firstElementChild;
        this.picked.focus();
      } else if (key == "down" && this.picked.nextElementSibling) {
        this.picked = this.picked.nextElementSibling;
        this.picked.focus();
      } else if (key == "up" && this.picked.previousElementSibling) {
        this.picked = this.picked.previousElementSibling;
        this.picked.focus();
      } else if (key == "up" && !this.picked.previousElementSibling) {
        this.picked = null;
        this.$refs.inputfield.focus();
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
/* @import "../styles/style.css"; */
.highlight {
  background-color: white;
}
</style>
