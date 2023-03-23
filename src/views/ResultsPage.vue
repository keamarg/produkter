//view til results
<template>
  <div
    :products="products"
    :loading="loading"
    class="p-3 mb-3"
    @mousewheel.passive="handleWheel"
  >
    <div class="row align-items-center">
      <p v-if="$route.params.id == 'alle'">
        Alle {{ products.length }} KEA produkter...
      </p>
      <span v-else class="d-flex">
        <p class="d-inline">
          {{
            filterListMaterial.length > 0 ||
            filterListAuthor.length > 0 ||
            filterListYear.length > 0
              ? extraFilters.length
              : filteredProducts.length
          }}
          resultater på søgningen&nbsp;
        </p>
        <router-link :to="{ name: 'Results', params: { id: 'alle' } }">
          <button
            v-if="this.filterListSearchQuery.length > 0"
            @click="removeFilter"
            type="button"
            class="btn btn-primary btn-custom-filter btn-custom-keyword rounded-pill mb-3 me-2"
          >
            <i class="bi bi-x-lg"></i>
            {{ $route.params.id }}
          </button>
        </router-link>

        <!-- <p v-else>Søgning på {{ $route.params.id }}...</p> -->
      </span>
      <span class="d-flex">
        <p
          v-if="
            filterListMaterial.length > 0 ||
            filterListAuthor.length > 0 ||
            filterListYear.length > 0
          "
        >
          Filtreret på:
          <!-- {{ filterListYear.length > 0 ? "udgivelsesår" : null }}
          {{ filterListAuthor.length > 0 ? "forfatter" : null }}
          {{ filterListMaterial.length > 0 ? "materialetype" : null }} -->
        </p>
      </span>
      <div class="filterbar d-flex ms-2 mb-3 bg-dark">
        <DropDown
          @filterupdate="addFilter"
          :filteredProducts="filteredProducts"
          title="Udgivelsesår"
          filterCategory="year"
        />
        <DropDown
          @filterupdate="addFilter"
          :filteredProducts="filteredProducts"
          title="Forfatter"
          filterCategory="author"
          class="ms-3"
        />
        <!-- test -->
        <DropDown
          @filterupdate="addFilter"
          :filteredProducts="filteredProducts"
          title="Materialetype"
          filterCategory="material"
          class="ms-3"
        />
      </div>

      <span class="w-100 d-block">
        <!-- <router-link :to="{ name: 'Results', params: { id: 'alle' } }">
          <button
            v-if="this.filterListSearchQuery.length > 0"
            @click="removeFilter"
            type="button"
            class="btn btn-primary btn-custom-filter btn-custom-keyword rounded-pill mb-3 me-2"
          >
            <i class="bi bi-x-lg"></i>
            {{ $route.params.id }}
          </button>
        </router-link>
        <span
          id="btn-custom-and"
          v-if="
            filterListSearchQuery.length > 0 &&
            (filterListYear.length > 0 ||
              filterListAuthor.length > 0 ||
              filterListMaterial.length > 0)
          "
          class="btn btn-custom-and rounded-pill mb-3 me-2"
        >
          and
        </span> -->
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
        <!-- test -->
        <span v-for="(item, index) in filterListMaterial" :key="index">
          <span
            id="btn-custom-and"
            v-if="
              index < 1 &&
              filterListMaterial.length > 0 &&
              (filterListYear.length > 0 ||
                filterListAuthor.length > 0 ||
                (filterListSearchQuery.length > 0 &&
                  filterListAuthor.length > 0))
            "
            class="btn btn-custom-and rounded-pill mb-3 me-2"
          >
            and
          </span>
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
      <h5
        v-else-if="
          filterListAuthor.length > 0 ||
          filterListYear.length > 0 ||
          filterListMaterial.length > 0
        "
      >
        ingen resultater opfylder de valgte kriterier
      </h5>
      <CardGroup
        v-else-if="filteredProducts.length > 0"
        :products="filteredProducts"
        :displayAll="displayAll"
      />
      <h5 v-else>ingen resultater</h5>
    </div>
    <div v-if="displayChevron" class="bounce">
      <i class="bi bi-chevron-down"></i>
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
      filterType: "",
      filterListYear: [],
      filterListAuthor: [],
      filterListMaterial: [],
      filterListSearchQuery: [],
      displayChevron: true,
      styleObject: {
        backgroundColor: `${
          this.$route.params.id.toLocaleLowerCase() == "design"
            ? "#ea4360"
            : this.$route.params.id.toLocaleLowerCase() == "byg"
            ? "#017740"
            : this.$route.params.id.toLocaleLowerCase() == "teknik"
            ? "#037dbb"
            : this.$route.params.id.toLocaleLowerCase() == "digital"
            ? "#e88334"
            : "#eb5045"
        }`,
      },
    };
  },
  computed: {
    // tjekker om produktet i søgningen findes i produktlisten (slice sørger for, at også søgninger på f.eks. "pod" stadig viser podcasts) !!!ændret til includes

    filteredProducts() {
      //filtrer efter ophav
      if (this.$route.params.id) {
        if (this.$route.params.id == "alle") {
          return this.products;
        } else {
          let authors = this.products.filter(
            (product) =>
              product[100][0]
                .toLowerCase()
                // .slice(0, this.$route.params.id.length)
                // .toLowerCase() == this.$route.params.id.toLowerCase()
                .includes(this.$route.params.id.toLowerCase()) ||
              product[245][0]
                .toLowerCase()
                // .slice(0, this.$route.params.id.length)
                // .toLowerCase() == this.$route.params.id.toLowerCase() ||
                .includes(this.$route.params.id.toLowerCase()) ||
              (typeof product[700] != "undefined" &&
                product[700].some((author) =>
                  author
                    // .slice(0, this.$route.params.id.length)
                    // .toLowerCase() == this.$route.params.id.toLowerCase()
                    .toLowerCase()
                    .includes(this.$route.params.id.toLowerCase())
                ))
          );

          //filtrer efter keyword
          let keywords = this.products.filter((product) =>
            product[653].some(
              (keyword) =>
                keyword.slice(0, this.$route.params.id.length).toLowerCase() ==
                this.$route.params.id.toLowerCase()
            )
          );

          //filtrer efter materialetype ikke nødvendig, da materialetype også indgår som keywords

          // saml de to arrays (authors og keywords) og filtrer for dubletter (i fald author også er kommet på som keyword)

          const collectedAndFiltered = [...new Set([...authors, ...keywords])]; // Kun concatenation, ES6 version: const collectedArrays = [...authors, ...keywords]; ES5 version: let collectedArrays = authors.concat(keywords);
          // console.log(collectedAndFiltered);
          return collectedAndFiltered;
        }
      } else {
        return null;
      }
    },

    //tilføj ekstra filtre "facetter" (filterList blev delt op i i authorFilterList og yearFilterList, for at undgå at de bliver sidestillet i filtrering)

    //facetter
    extraFilters() {
      //only years
      if (
        this.filterListYear.length > 0 &&
        !this.filterListAuthor.length > 0 &&
        !this.filterListMaterial.length > 0
      ) {
        return this.filteredProducts.filter((product) =>
          this.filterListYear.includes(product.year)
        );
        //only materials
      } else if (
        !this.filterListYear.length > 0 &&
        !this.filterListAuthor.length > 0 &&
        this.filterListMaterial.length > 0
      ) {
        return this.filteredProducts.filter((product) =>
          product[653].some(
            (
              item //console.log(item.replace(".", ""))
            ) => this.filterListMaterial.includes(item.replace(".", ""))
          )
        );
        //Only authors
      } else if (
        !this.filterListYear.length > 0 &&
        this.filterListAuthor.length > 0 &&
        !this.filterListMaterial.length > 0
      ) {
        return this.filteredProducts.filter(
          (product) =>
            this.filterListAuthor.includes(product["100"][0]) ||
            ("700" in product &&
              product["700"].some((item) =>
                this.filterListAuthor.includes(item)
              ))
        );
      }
      //years and authors
      else if (
        this.filterListYear.length > 0 &&
        this.filterListAuthor.length > 0 &&
        !this.filterListMaterial.length > 0
      ) {
        return this.filteredProducts.filter(
          (product) =>
            (this.filterListYear.includes(product.year) &&
              this.filterListAuthor.includes(product["100"][0])) ||
            (this.filterListYear.includes(product.year) &&
              "700" in product &&
              product["700"].some((item) =>
                this.filterListAuthor.includes(item)
              ))
        );
      }
      //years and materials
      else if (
        this.filterListYear.length > 0 &&
        !this.filterListAuthor.length > 0 &&
        this.filterListMaterial.length > 0
      ) {
        return this.filteredProducts.filter(
          (product) =>
            this.filterListYear.includes(product.year) &&
            product[653].some((item) =>
              this.filterListMaterial.includes(item.replace(".", ""))
            )
        );
      }

      //authors and materials
      else if (
        !this.filterListYear.length > 0 &&
        this.filterListAuthor.length > 0 &&
        this.filterListMaterial.length > 0
      ) {
        return this.filteredProducts.filter(
          (product) =>
            (product[653].some((item) =>
              this.filterListMaterial.includes(item.replace(".", ""))
            ) &&
              this.filterListAuthor.includes(product["100"][0])) ||
            (this.filterListYear.includes(product.year) &&
              "700" in product &&
              product["700"].some((item) =>
                this.filterListAuthor.includes(item)
              ))
        );
      }

      //years and authors and materials
      else if (
        this.filterListYear.length > 0 &&
        this.filterListAuthor.length > 0 &&
        this.filterListMaterial.length > 0
      ) {
        // return this.filteredProducts.filter(
        //   (product) =>
        //     (this.filterListYear.includes(product.year) &&
        //       this.filterListAuthor.includes(product["100"][0])) ||
        //     (this.filterListYear.includes(product.year) &&
        //       "700" in product &&
        //       product["700"].some((item) =>
        //         this.filterListAuthor.includes(item)
        //       ) &&
        //       product[653].some((item) =>
        //         this.filterListMaterial.includes(item.replace(".", ""))
        //       ))
        // );
        return this.filteredProducts.filter(
          (product) =>
            (product[653].some((item) =>
              this.filterListMaterial.includes(item.replace(".", ""))
            ) &&
              this.filterListYear.includes(product.year) &&
              this.filterListAuthor.includes(product["100"][0])) ||
            // this.filterListYear.includes(product.year) &&
            ("700" in product &&
              product["700"].some((item) =>
                this.filterListAuthor.includes(item)
              ))
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
    addFilter(event, filterCategory) {
      // console.log(event.target);
      this.filterType = filterCategory;
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
      //test
      else if (
        this.filterType == "material" &&
        !this.filterListMaterial.includes(event.target.innerText) &&
        event.target.innerText != "Alle"
      ) {
        this.filterListMaterial.push(event.target.innerText);
      } else if (
        event.target.innerText == "Alle" &&
        this.filterType == "year"
      ) {
        this.filterListYear = [];
      } else if (
        event.target.innerText == "Alle" &&
        this.filterType == "author"
      ) {
        this.filterListAuthor = [];
      } else if (
        event.target.innerText == "Alle" &&
        this.filterType == "material"
      ) {
        this.filterListMaterial = [];
      }
    },

    removeFilter(event) {
      this.filterListYear = this.filterListYear.filter(
        (item) => item != event.currentTarget.innerText.slice(1)
      );
      this.filterListAuthor = this.filterListAuthor.filter(
        (item) => item != event.currentTarget.innerText.slice(1)
      );
      this.filterListMaterial = this.filterListMaterial.filter(
        (item) => item != event.currentTarget.innerText.slice(1)
      );
      this.filterListSearchQuery = this.filterListSearchQuery.filter(
        (item) => item != event.currentTarget.innerText.slice(1)
      );
    },
    handleWheel() {
      // console.log(this.divHeight);
      this.displayChevron =
        window.innerHeight + window.scrollY + 10 <= document.body.offsetHeight;
    },
  },

  mounted() {
    // console.log(this.$route.params.id);
    if (this.$route.params.id !== "alle") {
      this.filterListSearchQuery.push(this.$route.params.id);
    }
  },
};
</script>
<style lang="scss" scoped>
.filterbar {
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
  // max-width: 8rem;
  // max-height: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
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
  font-size: 0.7rem; //1
  cursor: default;
  border-radius: 0.7rem; //1
}
.btn-custom-and:hover {
  color: #f8f9fa;
}

#btn-custom-and {
  background-color: $keared;
}

.btn-custom-keyword {
  color: white;
  // background-color: $teknik;
  background-color: v-bind("styleObject.backgroundColor");
}

.btn-custom-keyword i {
  color: white;
}

.bi-chevron-down {
  font-size: 2rem;
}

.bounce {
  position: fixed;
  left: 50%;
  bottom: 0;
  margin-top: -25px;
  margin-left: -25px;
  height: 50px;
  width: 50px;
  // background: red;
  color: white;
  // -webkit-animation: bounce 1.5s infinite;
  // -moz-animation: bounce 1.5s infinite;
  // -o-animation: bounce 1.5s infinite;
  animation: bounce 1.5s infinite;
}
@keyframes bounce {
  0% {
    bottom: 0px;
  }
  50% {
    bottom: 10px;
  }
  100% {
    bottom: 30;
  }
}
</style>
