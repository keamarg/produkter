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
  // mendeleyData: null,
});
