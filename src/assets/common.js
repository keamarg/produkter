export const fetchData = async function fetchData(url) {
  try {
    //henter productLinks ind fra den aktuelle portfolio, så de kan bruges til at hente products
    const response = await fetch(url, {
      headers: { "Content-type": "application/json" },
    });
    const data = await response.json();

    const productLinks = data.portfolio.map((product, index) => {
      let linkList = [];
      return (linkList[index] = {
        link: product.resource_metadata.mms_id.link,
      });
    });

    //bruger productLinks til at hente products ind
    productLinks.map(async (link) => {
      const response = await fetch(link.link, {
        headers: { "Content-type": "application/json" },
      });
      const data = await response.json();
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
    author: parsedData[0][0],
    title: parsedData[1][0],
    subtitle: parsedData[2][0],
    text: parsedData[3][0],
    keywords: parsedData[4],
    author2: parsedData[5][0],
    author3: parsedData[6][0],
    links: parsedData[7][0],
    video: parsedData[8][0],
    video2: parsedData[9][0],
    img1: parsedData[10][0],
    img2: parsedData[11][0],
    img3: parsedData[12][0],
    article: parsedData[13][0],
    id: data.mms_id,
    liked: localStorage.getItem(parsedData[1][0]),
  });
};
