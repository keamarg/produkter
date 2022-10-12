export const getIndex = function getIndex() {
  return this.products
    .map((object) => object.id)
    .indexOf(this.$route.params.id);
};

//henter antallet af produkter (bruges til at sørge for, at fetchData ikke kører hvis alle produkter er hentet)
export const fetchProductCount = async function fetchProductCount() {
  try {
    // console.log("fetching length of list");
    const response = await fetch(
      // "https://projekter.kea.dk/almaproxy/almaws/v1/electronic/e-collections/618551140007387",
      `${process.env.VUE_APP_ALMA_PROXY_PATH}/almaws/v1/electronic/e-collections/618551140007387`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    const data = await response.json();
    let result = data.portfolios.value;
    return result;
  } catch (error) {
    console.error(error);
  }
};

//henter productLinks ind fra den aktuelle portfolioliste, så de kan bruges til at hente products
export const fetchData = async function fetchData(url) {
  try {
    // console.log("fetching products");
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });
    const data = await response.json();

    //bygger simpelt array af produkter ud fra den hentede liste (brugte map i tidligere version)
    const productList = data.portfolio.reduce((result, product) => {
      result.push({
        value: product.resource_metadata.mms_id.value,
        title: product.resource_metadata.title,
      });
      return result;
    }, []);

    //filtrerer uønskede portfolios (f.eks. "Dilemmaspil.") fra
    const filteredProductList = productList.filter(
      (product) => product.title !== "Dilemmaspil."
    );

    //bruger filteredProductList til at hente products ind

    // filteredProductList.map(async (product) => {
    //   const response = await fetch("https://projekter.kea.dk/almaproxy", {
    //     headers: {
    //       Accept: "application/json",
    //       "X-almaEndpoint": `/almaws/v1/bibs/${product.value}`,
    //     },
    //   });
    filteredProductList.map(async (product) => {
      const response = await fetch(
        // "https://projekter.kea.dk/almaproxy/almaws/v1/bibs/" + product.value,
        `${process.env.VUE_APP_ALMA_PROXY_PATH}/almaws/v1/bibs/${product.value}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      // console.log(data);
      this.parseProducts(data);
    });
    this.loading = false;
  } catch (error) {
    console.error(error);
  }
};

// parse xml inspireret af https://www.c-sharpcorner.com/blogs/get-data-from-xml-content-using-javascript burde nok udskiftes med en Vue version, som bruger virtual DOM
export const parseProducts = function parseProducts(data) {
  let parser = new DOMParser();
  let xmlDoc = parser.parseFromString(data.anies, "text/xml");

  var x = xmlDoc.getElementsByTagName("datafield");
  const parsedData = [];
  for (let i = 0; i < x.length; i++) {
    const subfieldData = Object.values(
      x[i].getElementsByTagName("subfield")
    ).map(function (value) {
      return value.innerHTML;
    });
    parsedData[i] = subfieldData;
  }
  // Object.assign for at beholde reactivity
  const parsedProduct = [];

  this.products[this.products.length] = Object.assign({}, parsedProduct, {
    author: parsedData[1][0],
    title: parsedData[2][0],
    subtitle: parsedData[3][0],
    text: parsedData[4][0],
    keywords: parsedData[5],
    author2: parsedData[6][0],
    author3: parsedData[7][0],
    links: parsedData[8][0],
    video: parsedData[9],
    video2: parsedData[10],
    img1: parsedData[11][0],
    img2: parsedData[12][0],
    img3: parsedData[13][0],
    article: parsedData[14],

    id: data.mms_id,
    liked: localStorage.getItem(parsedData[2][0]),
  });
};
