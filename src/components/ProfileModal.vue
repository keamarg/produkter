// inspireret af https://therichpost.com/vue-3-bootstrap-5-modal-popup-form/ og
https://dev.to/shahednasser/how-to-easily-add-share-links-for-each-social-media-platform-1l4f

<template>
  <div class="container">
    <!-- Modal -->
    <div
      class="modal fade pt-5 pt-sm-0"
      id="profileModal"
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
              <p class="navbar-title d-inline ps-2 m-0 text-white">Produkter</p>
            </div>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="p-3 text-start">
              <!-- <span v-if="store.zoteroData != null"> -->
              <span v-for="collection in store.zoteroData" :key="collection">
                <span v-if="collection.keaId == store.currentProfile">
                  <!-- <span v-for="collection in user" :key="collection.keaId"> -->
                  <div v-for="entry in collection" :key="entry">
                    <div
                      v-if="
                        collection.keaId == store.currentProfile &&
                        entry.data.itemType == 'note'
                      "
                    >
                      <div id="imageDiv">
                        <a
                          :href="`mailto:${
                            store.currentProfile +
                            '@kea.dk' +
                            '?subject=Angående produktet ' +
                            getProperty('title')
                          }`"
                        >
                          <!-- <figure> -->
                          <img
                            class="profileimg"
                            :src="`${entry.data.tags[0].tag}`"
                          />
                          <div class="bottom-right">
                            <i class="bi bi-envelope-plus-fill"></i>
                          </div>
                          <!-- <figcaption class="btn rounded-custom">
                            Kontakt
                          </figcaption>
                        </figure> -->
                        </a>
                      </div>

                      <div>
                        <!-- <h4>Om forfatteren</h4> -->
                        <br />
                        <!-- add DOMPURIFY or similar-->
                        <div
                          class="zoteroProfile"
                          v-html="entry.data.note"
                        ></div>
                      </div>
                      <router-link
                        class="btn btn-custom-product rounded-custom me-4 mt-2 mb-4"
                        v-if="
                          store.currentProfileNumber != null &&
                          store.currentProfileNumber == '1'
                        "
                        :to="{
                          name: 'Results',
                          params: {
                            id: getProperty('author').toLowerCase(),
                            kind: `author`,
                          },
                        }"
                        >Se alle KEA produkter af
                        {{ getProperty("author") }}
                      </router-link>
                      <router-link
                        class="btn btn-custom-product rounded-custom me-4 mt-2 mb-4"
                        v-else-if="store.currentProfileNumber != null"
                        :to="{
                          name: 'Results',
                          params: {
                            id: getProperty(
                              'secAuthor'.toLowerCase(),
                              store.currentProfileNumber
                            ),
                            kind: `author`,
                          },
                        }"
                        >Se alle KEA produkter af
                        {{
                          getProperty("secAuthor", store.currentProfileNumber)
                        }}
                      </router-link>
                    </div>
                  </div>
                  <div v-if="collection.keaId == store.currentProfile">
                    <span v-for="(item, index) in collection" :key="item.key">
                      <h4 v-if="collection.length > '1' && index == 0">
                        Udvalgte referencer
                      </h4>

                      <div
                        class="zoteroReference"
                        v-if="
                          item.data.itemType != 'note' &&
                          item.data.itemType != 'attachment'
                        "
                        v-html="item.bib"
                      ></div>
                    </span>
                  </div>
                </span>
              </span>
              <!-- </span> -->
              <!-- <span v-if="authorlinks != null"> -->
              <span v-if="store.currentProfile == false">
                <span
                  v-if="
                    store.currentProfileNumber != null &&
                    store.currentProfileNumber == '1'
                  "
                >
                  {{ getProperty("author") }} har ikke en kea profil
                  <router-link
                    class="btn btn-custom-product rounded-custom me-4 mt-2 mb-4"
                    :to="{
                      name: 'Results',
                      params: {
                        id: getProperty('author').toLowerCase(),
                        kind: `author`,
                      },
                    }"
                    >Se alle KEA produkter af
                    {{ getProperty("author") }}
                  </router-link>
                </span>
                <span v-else-if="store.currentProfileNumber != null">
                  {{ getProperty("secAuthor", store.currentProfileNumber) }} har
                  ikke en kea profil
                  <router-link
                    class="btn btn-custom-product rounded-custom me-4 mt-2 mb-4"
                    :to="{
                      name: 'Results',
                      params: {
                        id: getProperty(
                          'secAuthor'.toLowerCase(),
                          store.currentProfileNumber
                        ),
                        kind: `author`,
                      },
                    }"
                    >Se alle KEA produkter af
                    {{ getProperty("secAuthor", store.currentProfileNumber) }}
                  </router-link>
                </span>
                <!-- {{ log(authorlinks) }}
                  {{ log(this.$el.querySelector("#authorlinks")) }} -->
              </span>
              <!-- </span> -->
              <!-- {{ log(store.zoteroData[0].find((profile) => profile)) }} -->
              <!-- <span v-if="store.zoterodata == null">
                Bæv
                {{ log(store.currentProfile) }}
                {{ log(store.currentProfile) }}
              </span> -->

              <!-- {{ log(store.zoteroData) }} -->

              <div data-bs-dismiss="modal" aria-label="Close"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getIndex, getProperty } from "../assets/common.js";
import { store } from "../assets/store.js";

export default {
  props: { products: Array },
  data() {
    return {
      store,
      authorlinks: null,
    };
  },
  computed: {
    // zoteroImg() {
    //   return this.store.zoteroData[0].data.tags[0];
    // },
    // zoteroDataNoNotes() {
    //   return this.store.zoteroData.filter(function (item) {
    //     // console.log(item.data.itemType);
    //     return item.data.itemType != "note";
    //   });
    // },
  },
  methods: {
    log(item) {
      console.log(item);
    },
    getIndex: getIndex,
    getProperty: getProperty,
  },
  mounted() {
    // this.authorlinks = document.querySelector("#authorlinks").childElementCount;
  },
};
</script>

<style lang="scss" scoped>
.modal-content {
  background-color: $body-bg;
}

#imageDiv {
  width: 100px;
  height: 100px;
}
.profileimg {
  vertical-align: middle;
  border-radius: 50%;
  width: 100px;
  height: 100px;
}
// figcaption {
//   text-align: center;
// }
#imageDiv {
  position: relative;
  text-align: center;
}

.bottom-right {
  position: absolute;
  bottom: -2px;
  right: -2px;
}
i {
  font-size: 1.5rem;
  color: $lighttextcolor;
}

textarea {
  width: 100%;
  resize: none;
  border: none;
  font-size: 0.8rem;
}
.zoteroProfile {
  :deep {
    p,
    h1,
    h2,
    h4,
    h5 {
      color: $lighttextcolor;
    }
    h3 {
      color: $keared;
    }
  }
}

.zoteroReference {
  :deep {
    div,
    p,
    h1,
    h2,
    h3,
    h4,
    h5 {
      font-size: 12px;
      color: $lighttextcolor;
    }
  }
}

.obs {
  color: red;
  font-size: 1rem;
}
p,
h1,
h2,
h3,
h4,
h5 {
  color: $lighttextcolor;
}

h4 {
  color: $keared;
}
</style>
