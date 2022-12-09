//fælles funktion til shuffle
export const shuffle = function shuffle(arr, arrLength) {
  let shuffled = arr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  return shuffled.slice(0, arrLength);
};

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
      )}&timestamp=${new Date().getTime()}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    const d = await res.json();
    return d;
  } catch (error) {
    console.error(error);
  }
};

export const parseProducts = async (data) => {
  const parsedData = [];
  const products = [];

  const parseProduct = (product) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(product.anies, "text/xml");

    const x = xmlDoc.getElementsByTagName("datafield");
    parsedData.splice(0);
    for (let i = 0; i < x.length; i++) {
      const subfieldData = Object.values(
        x[i].getElementsByTagName("subfield")
      ).map(function (value) {
        return value.innerHTML;
      });
      parsedData.push(subfieldData);
    }

    products.push({
      author: parsedData[1][0],
      title: parsedData[2][0],
      subtitle: parsedData[3][0],
      text: parsedData[4][0],
      keywords: parsedData[5],
      author2: parsedData[6][0],
      author3: parsedData[7][0],
      contact: parsedData[8][0],
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
  };

  data.bib.map(parseProduct);

  return products;
};
