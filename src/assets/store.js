import { reactive } from "vue";

export const store = reactive({
  iframe: null,
  path: "",
  products: null,

  //fetchData
  zoteroData: null,
  currentProfile: null,
  currentProfileNumber: null,
  currentProfileName: null,
  fetchErrorZotero: false,
  fetchErrorAlma: false,
  // materialFilters: null,

  // facetter
  filterListYear: [],
  filterListAuthor: [],
  filterListMaterial: [],
  filterListSearchQuery: [],
  itemCategoriesSelected: [],

  getFilterList(type) {
    let filterList = [];
    switch (type) {
      case "year":
        filterList = this.filterListYear;
        break;
      case "author":
        filterList = this.filterListAuthor;
        break;
      case "material":
        filterList = this.filterListMaterial;
        break;
      case "searchQuery":
        filterList = this.filterListSearchQuery;
        break;
    }
    return filterList;
  },

  setFilterList(type, value) {
    switch (type) {
      case "year":
        this.filterListYear = value;
        break;
      case "author":
        this.filterListAuthor = value;
        break;
      case "material":
        this.filterListMaterial = value;
        break;
      case "searchQuery":
        this.filterListSearchQuery = value;
        break;
    }
  },

  // updateItemCategoriesSelected(item) {
  //   // console.log(item);
  //   // console.log(
  //   //   this.itemCategoriesSelected.some((obj) => {
  //   //     console.log("obj " + Object.keys(obj)[0]);
  //   //     return Object.keys(obj)[0] === item;
  //   //   })
  //   // );

  //   // this.store.itemCategoriesSelected.splice(
  //   //   this.store.itemCategoriesSelected.indexOf(item, 1)
  //   // );

  //   if (this.itemCategoriesSelected.includes(item)) {
  //     // console.log(this.itemCategoriesSelected.indexOf(item));
  //     this.itemCategoriesSelected.splice(
  //       this.itemCategoriesSelected.indexOf(item),
  //       1
  //     );
  //     // console.log(this.itemCategoriesSelected);
  //   } else {
  //     // console.log("pong");
  //     this.itemCategoriesSelected.push(item);
  //     // this.isActive = !this.isActive;
  //     // console.log(this.itemCategoriesSelected);
  //   }
  // },

  // mendeleyData: null,
});
