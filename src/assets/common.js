// export const fetchData = async function fetchData(url) {
//   try {
//     //henter productLinks ind fra den aktuelle portfolio, så de kan bruges til at hente products
//     console.log("loading products");
//     const response = await fetch(url, {
//       headers: { "Content-type": "application/json" },
//     });
//     const data = await response.json();

//     // Ændret til "reduce" funktionen nedenfor, for at filtrere uønskede produkter fra
//     // const productLinks = data.portfolio.map((product, index) => {
//     //   let linkList = [];
//     //   return (linkList[index] = {
//     //     link: product.resource_metadata.mms_id.link,
//     //   });
//     // });

//     const productLinks = data.portfolio.reduce((result, product) => {
//       if (product.resource_metadata.title !== "Dilemmaspil.") {
//         result.push({ link: product.resource_metadata.mms_id.link });
//       }
//       return result;
//     }, []);

//     //bruger productLinks til at hente products ind
//     productLinks.map(async (link) => {
//       const response = await fetch(link.link, {
//         headers: { "Content-type": "application/json" },
//       });
//       const data = await response.json();
//       this.parseProducts(data);
//     });
//     this.loading = false;
//     // console.log(this.products);
//   } catch (error) {
//     console.error(error);
//   }
// };

export const parseProducts = function parseProducts(data) {
  this.loading = false;

  // parse xml inspireret af https://www.c-sharpcorner.com/blogs/get-data-from-xml-content-using-javascript burde nok udskiftes med en Vue version, som bruger virtual DOM
  // console.log(data[1].anies);
  let parser = new DOMParser();
  data.forEach((item) => {
    // console.log(item);
    let xmlDoc = parser.parseFromString(item.anies, "text/xml");
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
    console.log(parsedData);

    // Object.assign for at beholde reactivity
    const parsedProduct = [];
    console.log(data);

    data[0] = Object.assign({}, parsedProduct, {
      // this.products[this.products.length] = Object.assign({}, parsedProduct, {
      author: parsedData[1],
      title: parsedData[2],
      subtitle: parsedData[3],
      text: parsedData[4],
      keywords: parsedData[5], //flag
      author2: parsedData[6],
      author3: parsedData[7],
      links: parsedData[8],
      video: parsedData[9], //flag
      video2: parsedData[10], //flag
      img1: parsedData[11],
      img2: parsedData[12],
      img3: parsedData[13],
      article: parsedData,

      id: data[1].mms_id,
      liked: localStorage.getItem(parsedData[2]), //    liked: localStorage.getItem(parsedData[2][0]),
    });
  });
};
