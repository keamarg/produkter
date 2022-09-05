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
          @input="updateSearchQuery"
          @keyup.enter="search(searchQuery)"
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
          <div class="dropdown-content w-100">
            <p
              v-for="(keyword, index) in keywordSearchFilter"
              v-bind:key="index"
              @click="search(keyword)"
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
    };
  },
  computed: {
    filteredList() {
      if (this.searchQuery)
        return this.products.filter((product) =>
          product.keywords.some(
            (keyword) =>
              keyword.slice(0, this.searchQuery.length).toLowerCase() ==
              this.searchQuery.toLowerCase()
          )
        );
      else {
        return null;
      }
    },

    //lav liste af unikke keywords til brug under dynamisk søgning
    keywordList() {
      let keywords = [];
      this.products.map((product) =>
        product.keywords.map((keyword) => {
          if (!keywords.includes(keyword)) {
            keywords.push(keyword.toLowerCase());
          }
        })
      );
      return keywords;
    },

    //filtrer keyword listen efter søgefeltet
    keywordSearchFilter() {
      let keywords = this.keywordList.filter(
        (keyword) =>
          keyword.slice(0, this.searchQuery.length) ==
          this.searchQuery.slice(0, this.searchQuery.length)
      );
      return keywords;
    },
  },
  methods: {
    updateSearchQuery() {
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
  },
};
</script>
<style>
/* @import "../styles/style.css"; */
</style>
