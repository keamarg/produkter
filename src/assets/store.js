import { reactive } from "vue";

export const store = reactive({
  // Basic properties
  iframe: null,
  path: "",
  products: null,

  // Fetch data properties
  zoteroData: null,
  currentProfile: null,
  currentProfileNumber: null,
  currentProfileName: null,
  fetchErrorZotero: false,
  fetchErrorAlma: false,

  // Filter properties
  filterListYear: [],
  filterListAuthor: [],
  filterListMaterial: [],
  filterListSearchQuery: [],
  itemCategoriesSelected: [],

  // Filter methods
  getFilterList(type) {
    const filterLists = {
      year: this.filterListYear,
      author: this.filterListAuthor,
      material: this.filterListMaterial,
      searchQuery: this.filterListSearchQuery,
    };
    return filterLists[type] || [];
  },

  setFilterList(type, value) {
    const filterLists = {
      year: () => (this.filterListYear = value),
      author: () => (this.filterListAuthor = value),
      material: () => (this.filterListMaterial = value),
      searchQuery: () => (this.filterListSearchQuery = value),
    };
    if (filterLists[type]) {
      filterLists[type]();
    }
  },
});
