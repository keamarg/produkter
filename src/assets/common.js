export const getIndex = function getIndex() {
  return this.products
    .map((object) => object.id)
    .indexOf(this.$route.params.id);
};

//henter productLinks ind fra den aktuelle portfolioliste, så de kan bruges til at hente products
export const fetchData = async function fetchData(url) {
  try {
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
    const res = await fetch(
      `${
        process.env.VUE_APP_ALMA_PROXY_PATH
      }/almaws/v1/bibs?mms_id=${filteredProductList.map(
        (product) => product.value
      )}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    const d = await res.json();
    this.parseProducts(d);
    this.loading = false;
    let totalProducts = d.total_record_count;
    return totalProducts;
  } catch (error) {
    console.error(error);
  }
};

// parse xml inspireret af https://www.c-sharpcorner.com/blogs/get-data-from-xml-content-using-javascript burde nok udskiftes med en Vue version, som bruger virtual DOM
export const parseProducts = function parseProducts(data) {
  data.bib.map((product) => {
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(product.anies, "text/xml");

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

      year: product.date_of_publication,
      id: product.mms_id,
      liked: localStorage.getItem(parsedData[2][0]),
    });
  });
};
