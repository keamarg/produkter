//view til results
<template>
  <div :products="products" :loading="loading" class="p-3 mb-3">
    <div class="row align-items-center">
      <p>Søgning på {{ $route.params.id }}...</p>
      <div class="filterbar d-flex ms-2 mb-3 bg-dark">
        <!-- Filtrer efter...&nbsp; -->
        <DropDown
          @filterupdate="addFilter"
          :filteredProducts="filteredProducts"
          :extraFilters="extraFilters"
          title="Udgivelsesår"
          filterCategory="year"
        />
        <DropDown
          @filterupdate="addFilter"
          :filteredProducts="filteredProducts"
          :extraFilters="extraFilters"
          title="Forfatter"
          filterCategory="author"
          class="ms-3"
        />
      </div>
      <!-- <span v-for="(item, index) in filterList" :key="index"> -->
      <!-- <span v-if="item && item != 'Alle'"> -->
      <span class="w-100 d-block">
        <span v-for="(item, index) in filterListYear" :key="index">
          <span
            v-if="index > 0"
            class="btn btn-custom-and rounded-pill mb-3 me-2"
            >or</span
          >
          <button
            @click="removeFilter"
            type="button"
            class="btn btn-primary btn-custom-filter rounded-pill mb-3 me-2"
          >
            <i class="bi bi-x-lg"></i>
            {{ item }}
          </button>
        </span>
        <span
          id="btn-custom-and"
          v-if="filterListYear.length > 0 && filterListAuthor.length > 0"
          class="btn btn-custom-and rounded-pill mb-3 me-2"
        >
          and
        </span>
        <span v-for="(item, index) in filterListAuthor" :key="index">
          <span
            v-if="index > 0"
            class="btn btn-custom-and rounded-pill mb-3 me-2"
            >or</span
          >
          <button
            @click="removeFilter"
            type="button"
            class="btn btn-primary btn-custom-filter rounded-pill mb-3 me-2"
          >
            <i class="bi bi-x-lg"></i>
            {{ item }}
          </button>
        </span>
      </span>

      <CardGroup
        v-if="extraFilters.length > 0"
        :products="extraFilters"
        :displayAll="displayAll"
      />
      <h5 v-else-if="filterListAuthor.length > 0 || filterListYear.length > 0">
        ingen resultater opfylder de valgte kriterier
      </h5>
      <CardGroup
        v-else-if="filteredProducts.length > 0"
        :products="filteredProducts"
        :displayAll="displayAll"
      />
      <h5 v-else>ingen resultater</h5>
    </div>
  </div>
</template>

<script>
import CardGroup from "@/components/CardGroup.vue";
import DropDown from "@/components/DropDown.vue";

export default {
  name: "ResultsPage",
  components: {
    CardGroup,
    DropDown,
  },
  props: ["products", "loading", "productcount"],
  data() {
    return {
      displayAll: true,
      // filter: null,
      filterList: [],
      filterType: "",
      filterListYear: [],
      filterListAuthor: [],

      // filterYear: true,
      // filterAuthor: false,
    };
  },
  computed: {
    // tjekker om produktet i søgningen findes i produktlisten (slice sørger for, at også søgninger på f.eks. "pod" stadig viser podcasts)

    filteredProducts() {
      //filtrer efter ophav
      if (this.$route.params.id) {
        let authors = this.products.filter(
          (product) =>
            product.author.toLowerCase() ==
              this.$route.params.id.toLowerCase() ||
            product.author2.toLowerCase() ==
              this.$route.params.id.toLowerCase() ||
            product.author3.toLowerCase() == this.$route.params.id.toLowerCase()
        );
        //filtrer efter keyword
        let keywords = this.products.filter((product) =>
          product.keywords.some(
            (keyword) =>
              keyword.slice(0, this.$route.params.id.length).toLowerCase() ==
              this.$route.params.id.toLowerCase()
          )
        );

        // saml de to arrays (authors og keywords) og filtrer for dubletter (i fald author også er kommet på som keyword)
        const collectedAndFiltered = [...new Set([...authors, ...keywords])]; // Kun concatenation, ES6 version: const collectedArrays = [...authors, ...keywords]; ES5 version: let collectedArrays = authors.concat(keywords);

        return collectedAndFiltered;
      } else {
        return null;
      }
    },

    //tilføj ekstra filtre (del evt. extrafilters() op i to funktioner og/eller opdel filterList i authorFilterList og yearFilterList, for at undgå at de bliver sidestillet i filtrering)

    extraFilters() {
      // console.log("filtering: " + this.filterType);

      // const result = this.filteredProducts.filter(
      //   (product) =>
      //     this.filterList.includes(product.year) ||
      //     this.filterList.includes(product.author) ||
      //     this.filterList.includes(product.author2) ||
      //     this.filterList.includes(product.author3) //|| this.filterType == "Alle"
      // );

      if (this.filterListYear.length > 0 && !this.filterListAuthor.length > 0) {
        console.log("only years");
        return this.filteredProducts.filter((product) =>
          this.filterListYear.includes(product.year)
        );
      } else if (
        !this.filterListYear.length > 0 &&
        this.filterListAuthor.length > 0
      ) {
        console.log("only Authors");
        return this.filteredProducts.filter(
          (product) =>
            this.filterListAuthor.includes(product.author) ||
            this.filterListAuthor.includes(product.author2) ||
            this.filterListAuthor.includes(product.author3) //|| this.filterType == "Alle"
        );
      } else if (
        this.filterListYear.length > 0 &&
        this.filterListAuthor.length > 0
      ) {
        console.log("both years and authors");
        return this.filteredProducts.filter(
          (product) =>
            this.filterListYear.includes(product.year) &&
            (this.filterListAuthor.includes(product.author) ||
              this.filterListAuthor.includes(product.author2) ||
              this.filterListAuthor.includes(product.author3)) //|| this.filterType == "Alle"
        );
      } else {
        return [];
      }
    },
  },
  methods: {
    log(item) {
      console.log(item);
    },
    // addFilter(event, filterCategory) {
    //   this.filterType = filterCategory;
    //   // this.filter = event.target.innerText;
    //   if (
    //     !this.filterList.includes(event.target.innerText) &&
    //     event.target.innerText != "Alle"
    //   ) {
    //     this.filterList.push(event.target.innerText);
    //   }
    //   console.log("added " + event.currentTarget.innerText);
    //   console.log("current filters: " + this.filterList);
    // },
    // removeFilter(event) {
    //   // this.filter = null;
    //   this.filterList = this.filterList.filter(
    //     (item) => item != event.currentTarget.innerText.slice(1)
    //   );
    //   console.log("removed " + event.currentTarget.innerText.slice(1));
    //   console.log("current filters: " + this.filterList);
    // },
    addFilter(event, filterCategory) {
      this.filterType = filterCategory;
      // this.filter = event.target.innerText;
      if (
        this.filterType == "year" &&
        !this.filterListYear.includes(event.target.innerText) &&
        event.target.innerText != "Alle"
      ) {
        this.filterListYear.push(event.target.innerText);
      } else if (
        this.filterType == "author" &&
        !this.filterListAuthor.includes(event.target.innerText) &&
        event.target.innerText != "Alle"
      ) {
        this.filterListAuthor.push(event.target.innerText);
      }
      // console.log("added " + event.currentTarget.innerText);
      // console.log("current year filters: " + this.filterListYear);
      // console.log("current author filters: " + this.filterListAuthor);
    },

    removeFilter(event) {
      // this.filter = null;
      // if (this.filterType == "year") {
      this.filterListYear = this.filterListYear.filter(
        (item) => item != event.currentTarget.innerText.slice(1)
      );
      // } else if (this.filterType == "author") {
      this.filterListAuthor = this.filterListAuthor.filter(
        (item) => item != event.currentTarget.innerText.slice(1)
      );
      // }
      // console.log("removed " + event.currentTarget.innerText.slice(1));
      // console.log("current year filters: " + this.filterListYear);
      // console.log("current author filters: " + this.filterListAuthor);
    },
  },
  created() {},
};
</script>
<style lang="scss" scoped>
.filterbar {
  // background-color: $textcolor;
  color: white;
  border-radius: 5px;
}

.btn-custom-filter {
  background-color: #f8f9fa;
  border: none;
  color: #343a40;
  /* padding: 0.5rem !important; */
  font-size: 0.7rem; //1
  cursor: pointer;
  border-radius: 0.7rem; //1
  // width: 20%;
}

.btn-custom-filter:hover {
  background-color: #343a40;
  color: #f8f9fa;
}

.btn-custom-filter i {
  color: #343a40;
}

.btn-custom-filter:hover i {
  color: $keared;
}

.btn-custom-and {
  background-color: #343a40;
  border: none;
  color: #f8f9fa;
  /* padding: 0.5rem !important; */
  font-size: 0.7rem; //1
  cursor: default;
  border-radius: 0.7rem; //1
  // width: 20%;
}
.btn-custom-and:hover {
  color: #f8f9fa;
}

#btn-custom-and {
  background-color: $keared;
}
</style>
