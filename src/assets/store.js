import { reactive } from "vue";

export const store = reactive({
  iframe: null,
  path: "",
  // changeProduct(productIndex) {
  //   this.index = productIndex;
  // },
  products: null,
  zoteroData: null,
  currentProfile: null,
  currentProfileNumber: null,
  currentProfileName: null,
  fetchErrorZotero: false,
  fetchErrorAlma: false,
  // materialFilters: null,
  itemCategoriesSelected: [],
  updateItemCategoriesSelected(item) {
    // console.log(item);
    // console.log(
    //   this.itemCategoriesSelected.some((obj) => {
    //     console.log("obj " + Object.keys(obj)[0]);
    //     return Object.keys(obj)[0] === item;
    //   })
    // );

    // this.store.itemCategoriesSelected.splice(
    //   this.store.itemCategoriesSelected.indexOf(item, 1)
    // );

    if (this.itemCategoriesSelected.includes(item)) {
      // console.log(this.itemCategoriesSelected.indexOf(item));
      this.itemCategoriesSelected.splice(
        this.itemCategoriesSelected.indexOf(item),
        1
      );
      // console.log(this.itemCategoriesSelected);
    } else {
      // console.log("pong");
      this.itemCategoriesSelected.push(item);
      // this.isActive = !this.isActive;
      // console.log(this.itemCategoriesSelected);
    }
  },

  // mendeleyData: null,
});
