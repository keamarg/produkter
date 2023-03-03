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
              <!-- {{ log(store.zoteroData) }} -->
              <span v-if="store.zoteroData == null">
                <div class="pulseLoader"></div>
              </span>
              <span v-for="collection in store.zoteroData" :key="collection">
                <!-- {{ log(collection) }} -->
                <span v-if="collection.keaId == store.currentProfile">
                  <!-- <span v-for="collection in user" :key="collection.keaId"> -->
                  <div v-for="entry in collection" :key="entry">
                    <!-- {{ log(entry) }} -->
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
                              'secAuthor',
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
                    <span
                      :id="item.data.date"
                      v-for="(item, index) in sortedCollection(collection)"
                      :key="item.key"
                    >
                      <h4 v-if="collection.length > '1' && index == 0">
                        Udvalgte referencer
                      </h4>

                      <!-- <div
                        class="zoteroReference"
                        v-if="
                          item.data.itemType != 'note' &&
                          item.data.itemType != 'attachment'
                        "
                        v-html="item.bib"
                      ></div> -->
                      <div
                        class="zoteroReference"
                        v-if="
                          item.data.itemType != 'note' &&
                          item.data.itemType != 'attachment'
                        "
                      >
                        <!-- <span v-if="item.data.itemType == 'book'"> -->
                        <a
                          :href="`${item.data.url}`"
                          target="_blank"
                          :class="
                            `${item.data.url}` == ''
                              ? 'inactiveLink'
                              : 'activeLink'
                          "
                        >
                          <p
                            v-if="
                              this.itemTypes[item.data.itemType] != undefined
                            "
                          >
                            <!-- <span
                              v-for="author in getAuthors(item)"
                              :key="author"
                              >{{ author + ", " }}</span
                            > -->
                            <span
                              v-for="property in getReferenceProperties(
                                item,
                                this.itemTypes[item.data.itemType]
                              )"
                              :key="property"
                              ><span
                                v-if="
                                  item.data.itemType === 'journalArticle' ||
                                  item.data.itemType === 'magazineArticle'
                                "
                              >
                                <!-- {{ log(Object.keys(property).toString()) }} -->
                                <span
                                  v-if="
                                    Object.keys(property).toString() ==
                                    'publicationTitle'
                                  "
                                >
                                  <i>{{
                                    Object.values(property).toString()
                                  }}</i>
                                </span>
                                <span v-else>
                                  {{ Object.values(property).toString() }}
                                </span>
                              </span>
                              <span v-else>
                                <span
                                  v-if="
                                    Object.keys(property).toString() == 'title'
                                  "
                                >
                                  <i>{{
                                    Object.values(property).toString()
                                  }}</i>
                                </span>
                                <span v-else>
                                  {{ Object.values(property).toString() }}
                                </span>
                              </span>
                            </span>
                            <!-- {{ `(${item.data.itemType})` }} -->
                            <!-- {{
                                getReferenceProperties(item, [
                                  "date",
                                  "title",
                                  "series",
                                  "seriesNumber",
                                  "edition",
                                  "place",
                                  "publisher",
                                ])
                              }} -->

                            <!-- {{ getReferenceProperty(item, "date") }}
                              <i> {{ getReferenceProperty(item, "title") }} </i>
                              {{ getReferenceProperty(item, "series") }}
                              {{ getReferenceProperty(item, "seriesNumber") }}
                              {{ getReferenceProperty(item, "edition") }}
                              {{ getReferenceProperty(item, "place") }}
                              {{ getReferenceProperty(item, "publisher") }} -->
                          </p>
                        </a>
                        <!-- </span> -->
                      </div>
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
                  ikke en kea profil<br />
                  <router-link
                    class="btn btn-custom-product rounded-custom me-4 mt-2 mb-4"
                    :to="{
                      name: 'Results',
                      params: {
                        id: getProperty(
                          'secAuthor',
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
      itemTypes: {
        book: [
          "author",
          "editor",
          "date",
          "title",
          "series",
          "seriesNumber",
          "edition",
          "place",
          "publisher",
          "DOI",
        ],
        bookSection: [
          "contributor",
          "date",
          "title",
          "series",
          "seriesNumber",
          "edition",
          "bookTitle",
          "editor",
          "pages",
          "place",
          "publisher",
          "DOI",
        ],
        magazineArticle: [
          "author",
          "date",
          "title",
          "publicationTitle",
          "pages",
          "DOI",
        ],
        newspaperArticle: [
          //tjek referencetype
          "author",
          "date",
          "title",
          "publicationTitle",
          "pages",
          "DOI",
        ],
        journalArticle: [
          "author",
          "date",
          "title",
          "publicationTitle",
          "volume",
          "issue",
          "pages",
          "DOI",
        ],

        conferencePaper: [
          "author",
          "date",
          "title",
          "conferenceName",
          "pages",
          "place",
          "DOI",
        ],
        presentation: [
          "presenter",
          "date",
          "title",
          "meetingName",
          "place",
          "DOI",
        ],
        thesis: [
          "author",
          "date",
          "title",
          "thesisType",
          "university",
          "place",
          "DOI",
        ],
        report: [
          //tjek referencetype
          "author",
          "date",
          "title",
          "institution",
          "place",
          "DOI",
        ],
        document: [
          //tjek referencetype
          "author",
          "date",
          "title",
          "DOI",
        ],
      },
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
    sortedCollection(collection) {
      const sortedCollection = [...collection]
        .sort((a, b) =>
          a.data.date > b.data.date ? 1 : b.data.date > a.data.date ? -1 : 0
        )
        .reverse();
      return sortedCollection;
    },
    getReferenceProperties(item, properties) {
      // console.log(item.data.itemType, properties);
      let propertyArray = [];
      properties.map((property) => {
        // console.log(item.data[property]);
        // console.log(property);
        if (
          property == "author" ||
          property == "presenter" ||
          property == "editor" ||
          property == "contributor"
        ) {
          // console.log(item.data.creators[0].creatorType);
          // console.log(item.data.creators);
          item.data.creators.map((author, index) => {
            let fullName = author.name
              ? author.name
              : author.firstName
              ? author.lastName + ", " + author.firstName
              : "";
            // console.log(fullName);
            // console.log(author.creatorType);
            if (property != "editor" && author.creatorType != "editor") {
              let actualAuthors = item.data.creators.filter(
                (author) => author.creatorType == "author"
              );
              // console.log(actualAuthors);
              if (actualAuthors.length < 3) {
                propertyArray.push({
                  [author.creatorType]: [fullName] + "; ",
                });
              } else if (actualAuthors.length >= 3 && index == 0) {
                propertyArray.push({
                  [author.creatorType]: [fullName] + " et al.; ",
                });
              }
            } else if (property == "editor" && author.creatorType == "editor") {
              propertyArray.push({
                [author.creatorType]: [fullName] + " (red.); ",
              });
            }

            // console.log(authors);
            // console.log(propertyArray);
          });
        } else {
          if (
            property == "volume" ||
            property == "issue" ||
            property == "pages" ||
            property == "bookTitle" ||
            property == "DOI"
          ) {
            let propertyType =
              property == "volume"
                ? "Årg. "
                : property == "issue"
                ? "nr. "
                : property == "pages"
                ? "s. "
                : property == "bookTitle"
                ? "i "
                : property == "DOI"
                ? "DOI: "
                : " ";
            propertyArray.push({
              [property]: item.data[property]
                ? item.data[property].slice(-1) == "."
                  ? item.data[property]
                  : propertyType + item.data[property] + ". "
                : " ",
            });
          } else {
            propertyArray.push({
              [property]: item.data[property]
                ? item.data[property].slice(-1) == "."
                  ? item.data[property]
                  : item.data[property] + ". "
                : " ",
            });
          }
        }
      });
      // if (item.data.itemType == "book") {
      //   console.log(Object.values(propertyArray.find((obj) => obj.title)));
      //   console.log(item.data.title);
      // }
      return propertyArray;
    },

    // getAuthors(item) {
    //   // console.log("creators");
    //   // console.log(item.data.creators);
    //   const authors = [];
    //   item.data.creators.map((author) => {
    //     let fullName = author.name
    //       ? author.name
    //       : author.firstName
    //       ? author.lastName + ", " + author.firstName
    //       : "";
    //     // console.log(fullName);
    //     authors.push(fullName);
    //     // console.log(authors);
    //   });
    //   return authors;
    // },
    getIndex: getIndex,
    getProperty: getProperty,
  },
  mounted() {
    // this.authorlinks = document.querySelector("#authorlinks").childElementCount;
  },
};
</script>

<style lang="scss" scoped>
$pulseSize: 2em;
$pulseTiming: 1.2s;

.pulseLoader {
  width: $pulseSize;
  height: $pulseSize;
  border-radius: $pulseSize;
  background-color: white;
  outline: 1px solid transparent;
  animation: pulseanim $pulseTiming ease-in-out infinite;
}

@keyframes pulseanim {
  0% {
    transform: scale(0);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

.inactiveLink {
  pointer-events: none;
  cursor: default;
}

.activeLink:hover * {
  color: $keared;
  transition: color 0.5s ease;
}

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
  object-fit: cover;
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

.zoteroReference i,
p {
  font-size: 12px;
  //       color: $lighttextcolor;
}
//Brugt til v-html versionen
// .zoteroReference {
//   :deep {
//     div,
//     p,
//     h1,
//     h2,
//     h3,
//     h4,
//     h5 {
//       font-size: 12px;
//       color: $lighttextcolor;
//     }
//   }
// }

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
