//henter antallet af produkter (bruges til at sørge for, at fetchData ikke kører hvis alle produkter er hentet)
export const fetchProductCount = async function fetchProductCount() {
  try {
    // console.log("fetching length of list");
    const response = await fetch(
      "https://projekter.kea.dk/almaproxy/almaws/v1/electronic/e-collections/618551140007387",
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
    filteredProductList.map(async (product) => {
      const response = await fetch(
        "https://projekter.kea.dk/almaproxy/almaws/v1/bibs/" + product.value,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      this.parseProducts(data);
    });
  });
};
