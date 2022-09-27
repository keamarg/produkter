// export const fetchData = async function fetchData(url) {
export const fetchData = async function fetchData() {
  try {
    //henter productLinks ind fra den aktuelle portfolio, så de kan bruges til at hente products
    // console.log("loading products");
    // const response = await fetch(url, {
    const response = await fetch(
      "https://projekter.kea.dk/almaproxy/almaws/v1/electronic/e-collections/618551140007387/e-services/628551130007387/portfolios?limit=100&offset=0",
      {
        headers: {
          // "Content-type": "application/json",
          // // Authorization: `apikey ${api_key}`,
          Accept: "application/json",
        },
      }
    );
    const data = await response.json();

    // Ændret til "reduce" funktionen nedenfor, for at filtrere uønskede produkter fra
    // const productLinks = data.portfolio.map((product, index) => {
    //   let linkList = [];
    //   return (linkList[index] = {
    //     link: product.resource_metadata.mms_id.link,
    //   });
    // });

    const productList = data.portfolio.reduce((result, product) => {
      // console.log(product.resource_metadata.title);
      // if (product.resource_metadata.title !== "Dilemmaspil.") {
      // console.log(product.resource_metadata);
      result.push({
        value: product.resource_metadata.mms_id.value,
        title: product.resource_metadata.title,
      });
      // }
      return result;
    }, []);

    //filtrerer uønskede portfolios (f.eks. "Dilemmaspil.") fra
    const filteredProductList = productList.filter(
      (product) => product.title !== "Dilemmaspil."
    );
    // console.log(filteredProductList);
    //bruger filteredProductList til at hente products ind
    filteredProductList.map(async (product) => {
      const response = await fetch(
        "https://projekter.kea.dk/almaproxy/almaws/v1/bibs/" + product.value,
        {
          headers: {
            // "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      // console.log(data);
      this.parseProducts(data);
    });
    this.loading = false;
    // console.log(this.products);
  } catch (error) {
    console.error(error);
  }
};

export const parseProducts = function parseProducts(data) {
  // parse xml inspireret af https://www.c-sharpcorner.com/blogs/get-data-from-xml-content-using-javascript burde nok udskiftes med en Vue version, som bruger virtual DOM
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
