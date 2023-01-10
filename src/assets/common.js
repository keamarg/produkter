//fælles function til image (har sin egen funktion fordi der ikke er nogen getindex mulighed)
export const getImage = function getImage(product) {
  if (typeof product[997] == "undefined") {
    return "https://projekter.kea.dk/assets/SoMeCard.png";
  } else {
    return Object.values(
      product["997"].find((item) => item.Billedmateriale)
    )[0];
  }
};
//fælles function til andre properties
export const getProperty = function getProperty(property) {
  if (property == "100" || property == "author") {
    return this.products[this.getIndex()][100][0];
  } else if (property == "245" || property == "title") {
    return this.products[this.getIndex()][245][0];
  } else if (property == "subtext") {
    return this.products[this.getIndex()]["520"][0].toLowerCase();
  } else if (property == "text") {
    return this.products[this.getIndex()]["520"][1].toLowerCase();
  }
  // hvis property ikke findes i ovenstående tjekkes i resten af 997 feltet, returner værdien (dvs. alle urls, contact, billedmateriale, videolinks osv.)
  else if (
    typeof this.products[this.getIndex()][997].find((item) => item[property]) !=
    "undefined"
  ) {
    // console.log("ping");
    // console.log(
    //   Object.values(
    //     this.products[this.getIndex()][997].find((item) => item[property])
    //   ).toString()
    // );
    // console.log(this.products[this.getIndex()]);
    return Object.values(
      this.products[this.getIndex()][997].find((item) => item[property])
    ).toString();
  } else {
    // console.log("pong");

    return false;
  }
};

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

//zotero test
export const fetchZotero = async function fetchZotero() {
  try {
    const response = await fetch(
      "https://api.zotero.org/users/10858779/items?v=3&format=json&include=data,bib,citation",
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    const data = await response.json();
    // console.log(data);
    return data;
    // return response;
  } catch (error) {
    console.error(error);
  }
};

//Mendeley test
// export const fetchMendeley = async function fetchMendeley() {
//   //fetch oauth token
//   try {
//     const response = await fetch("https://api.mendeley.com/oauth/token", {
//       body: "grant_type=client_credentials&scope=all",
//       headers: {
//         Authorization: "Basic MTQyOTI6aVRSWjVyRnRxelcybjdkbA==",
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       method: "POST",
//     });
//     const token = await response.json();
//     // console.log(token.access_token);

//     //fetch profil med oauth token
//     const res = await fetch(
//       "https://api.mendeley.com/profiles?email=marg@kea.dk",
//       {
//         headers: {
//           Accept: "application/vnd.mendeley-profiles.1+json",
//           Authorization: `Bearer ${token.access_token} `,
//         },
//       }
//     );
//     const data = await res.json();
//     // console.log(data);
//     return data;
//   } catch (error) {
//     console.error(error);
//   }
// };

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

// export const parseProducts = async (data) => {
//   const parsedData = [];
//   const products = [];

//   const parseProduct = (product) => {
//     const parser = new DOMParser();
//     const xmlDoc = parser.parseFromString(product.anies, "text/xml");

//     const x = xmlDoc.getElementsByTagName("datafield");
//     parsedData.splice(0);
//     for (let i = 0; i < x.length; i++) {
//       const subfieldData = Object.values(
//         x[i].getElementsByTagName("subfield")
//       ).map(function (value) {
//         return value.innerHTML;
//       });
//       parsedData.push(subfieldData);
//     }

//     products.push({
//       author: parsedData[1][0],
//       title: parsedData[2][0],
//       subtitle: parsedData[3][0],
//       text: parsedData[4][0],
//       keywords: parsedData[5],
//       author2: parsedData[6][0],
//       author3: parsedData[7][0],
//       contact: parsedData[8][0],
//       video: parsedData[9],
//       video2: parsedData[10],
//       img1: parsedData[11][0],
//       img2: parsedData[12][0],
//       img3: parsedData[13][0],
//       article: parsedData[14],

//       year: product.date_of_publication,
//       id: product.mms_id,
//       liked: localStorage.getItem(parsedData[2][0]),
//     });
//   };

//   data.bib.map(parseProduct);

//   return products;
// };

// Ny parsergit
export const parseProducts = async (data) => {
  const products = [];

  data.bib.map((product) => {
    const parsedData = [];
    // console.log(product);
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(product.anies, "text/xml");

    const datafield = xmlDoc.getElementsByTagName("datafield");
    // parsedData.splice(0);
    // console.log(datafield);
    for (let i = 0; i < datafield.length; i++) {
      const subfieldData = Object.values(
        datafield[i].getElementsByTagName("subfield")
      ).map(function (value) {
        if (!value.nextSibling && !value.previousSibling) {
          if (value.innerHTML != "local") {
            // console.log(value.innerHTML);
            return value.innerHTML;
          }
        } else if (value.nextSibling) {
          // console.log({ [value.nextSibling.innerHTML]: value.innerHTML });
          // console.log({ [value.nextSibling.innerHTML]: value.innerHTML });
          return { [value.nextSibling.innerHTML]: value.innerHTML };
        }
        // if (!value.nextSibling && value.getAttribute("code") != "z") {
        //   // console.log(value.innerHTML);
        //   return value.innerHTML;
        // } else if (value.getAttribute("code") == "u") {
        //   return { [value.nextSibling.innerHTML]: value.innerHTML };
        // } else if (value.getAttribute("code") != "z") return value.innerHTML;
      });

      // console.log(subfieldData[0]);

      parsedData.push([subfieldData[0]]);
    }

    const productObj = {
      year: product.date_of_publication,
      id: product.mms_id,
      liked: !!localStorage.getItem(parsedData[3][0]),
    };
    // console.log(parsedData);
    // Loop over the parsed XML data and add each field to the product object
    parsedData.forEach((field, index) => {
      // console.log(productObj);

      // console.log(parsedData);
      // Get the tag name from the XML data
      const tagName = datafield[index].getAttribute("tag");
      // console.log(tagName);
      // console.log(field);

      // Check if the property already exists in the object
      // console.log(field.filter((item) => item != "local"));
      if (Object.prototype.hasOwnProperty.call(productObj, tagName)) {
        // If it does, push the new value to the existing array
        // console.log(productObj[tagName].map((item,index) => item[index]));
        // productObj[tagName].splice(index, 0, field);
        // productObj[tagName].push(field.toString());
        // console.log(productObj);
        // console.log("field" + field + index);

        productObj[tagName].push(...field);
      } else {
        // If it doesn't, add the field to the object
        productObj[tagName] = field;
        // console.log(field);
        // console.log(productObj);
      }
    });
    // Push the product object to the products array
    // console.log(productObj);
    products.push(productObj);
  });

  const filteredProducts = products.filter((product) => product[998]); //only products with the 998 "kea field"

  // const extraFiltered = filteredProducts.filter(
  //   (product) => Object.values(product["998"][0])[0] == "keatest"
  // );

  // return extraFiltered;
  // return products;
  return filteredProducts;
};

// export const parseProducts = async (data) => {
//   // console.log(data.bib[0].anies);

//   const parsedData = [];
//   const products = [];

//   const parseProduct = (product) => {
//     console.log(product);
//     const parser = new DOMParser();
//     const xmlDoc = parser.parseFromString(product.anies, "text/xml");

//     const datafield = xmlDoc.getElementsByTagName("datafield");
//     // console.log("before");
//     // console.log(parsedData);
//     parsedData.splice(0);
//     // console.log("after");
//     // console.log(parsedData);
//     for (let i = 0; i < datafield.length; i++) {
//       const subfieldData = Object.values(
//         datafield[i].getElementsByTagName("subfield")
//       ).map(function (value) {
//         // const codeattribute = value.getAttribute("code");
//         // console.log(value.nextSibling);
//         // let prev = value.prevSibling;
//         // console.log(prev.innerText);

//         if (value.getAttribute("code") == "u") {
//           // console.log(value);
//           return { [value.nextSibling.innerHTML]: value.innerHTML };
//         } else if (value.getAttribute("code") != "z") return value.innerHTML;
//       });
//       // console.log(subfieldData);

//       //fjerner undefined værdier fra array'et
//       const filteredSubfieldData = subfieldData.filter(function (x) {
//         return x !== undefined;
//       });
//       // if (!Array.prototype.includes.call(subfieldData, undefined)) {
//       //   // console.log("ping");
//       // console.log(filteredSubfieldData);
//       parsedData.push(filteredSubfieldData);
//       // }
//       // if (!subfieldData.includes(undefined)) {
//       //   console.log("ping");
//       // }
//     }

//     const productObj = {
//       year: product.date_of_publication,
//       id: product.mms_id,
//       liked: !!localStorage.getItem(parsedData[3][0]),
//     };

//     // Loop over the parsed XML data and add each field to the product object
//     // const subfield = xmlDoc.getElementsByTagName("subfield");
//     // console.log(parsedData);
//     // console.log(parsedData);
//     parsedData.forEach((field, index) => {
//       // Get the tag name from the XML data
//       const tagName = datafield[index].getAttribute("tag");
//       // const keyName = x[index].getAttribute("tag");
//       // const valueName = x[index].getAttribute("tag");

//       // Check if the property already exists in the object
//       if (Object.prototype.hasOwnProperty.call(productObj, tagName)) {
//         // If it does, push the new value to the existing array
//         productObj[tagName].push(field.toString());
//       } else {
//         // If it doesn't, add the field to the object
//         productObj[tagName] = field;
//       }
//     });

//     // if (productObj["997"]) {
//     //   const obj = productObj["997"].find((x) => x.Billedmateriale);
//     //   console.log(obj);
//     //   productObj["Billedmateriale"] = obj["Billedmateriale"];
//     // }
//     // Push the product object to the products array
//     products.push(productObj);
//   };

//   data.bib.map(parseProduct);
//   // console.log(products);
//   // let pro = [products[0]];

//   const filteredProducts = products.filter((product) => product[998]); //only products with the 998 "kea field"

//   const extraFiltered = filteredProducts.filter(
//     (product) => product["998"][0] == "keatest"
//   );

//   return extraFiltered;
//   // return products;
// };
