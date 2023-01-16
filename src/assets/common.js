//fælles function til image (har sin egen funktion fordi der ikke er nogen getindex mulighed)
export const getImage = function getImage(product) {
  if (typeof product[997].find((item) => item.billedmateriale) == "undefined") {
    return "https://projekter.kea.dk/assets/SoMeCard.png";
  } else {
    return Object.values(
      product["997"].find((item) => item.billedmateriale)
    )[0];
  }
};
//fælles function til andre properties
export const getProperty = function getProperty(property, authorNumber) {
  if (property == "100" || property == "author") {
    return this.products[this.getIndex()][100][0];
  } else if (property == "245" || property == "title") {
    return this.products[this.getIndex()][245][0];
  } else if (property == "700" || property == "secAuthor") {
    return this.products[this.getIndex()][700][authorNumber - 2];
  } else if (property == "subtext") {
    return this.products[this.getIndex()]["520"][0];
  } else if (property == "text") {
    return this.products[this.getIndex()]["520"][1];
  }
  // hvis property ikke findes i ovenstående tjekkes i resten af 997 feltet, returner værdien (dvs. alle urls, contact, billedmateriale, videolinks osv.)
  else if (
    typeof this.products[this.getIndex()][997].find((item) => item[property]) !=
    "undefined"
  ) {
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

// https://api.zotero.org/users/10858779/collections?v=3&format=json&include=data,bib,citation
// "collections": [
//   Marg: "5MKDPWQR",
//   Dapr: "EQJNXPB2",
//   Per: "95ZXMMWM"
//   ],
//zotero test
export const fetchZotero = async (product) => {
  try {
    const response = await fetch(
      "https://api.zotero.org/users/10924352/collections/top?v=3",
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    const data = await response.json();
    // const [contact] = Object.values(
    //   product[997].filter((item) => item.contact)[0]
    // );
    // console.log(contact);

    // const [contacts] = Object.values(
    //   product[997].filter((item, index) =>
    //     // console.log(index, item[`contact${index - 1}`].startsWith("contact"))
    //     console.log(item)
    //   )
    // );

    // let filteredEntries = Object.entries(product[997])
    //   .filter(([key]) => key.startsWith("contact"))
    //   .map(([, value]) => value);
    // console.log(filteredEntries); // ["value1", "value2", "value4"]

    // console.log(
    //   Object.keys(product[997]).filter((key) => key.startsWith("contact"))
    // );
    // console.log(product[997]);

    const contacts = product[997]
      .filter((item) => {
        let keys = Object.keys(item);
        return keys.some((key) => key.startsWith("contact"));
      })
      .map((item) => Object.values(item))
      .flat();
    // console.log(contacts);
    // log(
    //   Object.values(products[getIndex()][997]).filter((item) =>
    //     item.hasOwnProperty("contact" + (index + 2))
    //   )
    // );
    // console.log(contacts);

    // const [{ key: collectionKey }] = data.filter(
    //   (item) => item.data.name == contact
    // );
    // const [{ key: collectionKeys }] = data.filter(
    //   (item, index) => item.data.name == contacts[index]
    // );
    const collectionKeyValue = data
      .filter((item) => contacts.includes(item.data.name))
      .map((item) => ({ [item.data.name]: item.key }));
    // console.log(collectionKeyValue);
    // console.log(collectionKey);

    const collections = await Promise.all(
      collectionKeyValue.map(
        async (keyValue) => await fetchZoteroCollection(keyValue)
      )
    );
    // console.log(collections);
    // const collection = fetchZoteroCollection(collectionKey);
    // console.log(collection);
    return collections;
  } catch (error) {
    console.error(error);
  }
};

export const fetchZoteroCollection = async (collectionKeyValue) => {
  try {
    const response = await fetch(
      `https://api.zotero.org/users/10924352/collections/${Object.values(
        collectionKeyValue
      )}/items?v=3&format=json&include=data,bib,citation`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    const data = await response.json();
    [data.keaId] = Object.keys(collectionKeyValue);
    // console.log(data);
    return data;
    // return response;
  } catch (error) {
    console.error(error);
  }
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

// Ny parser
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
          return { [value.nextSibling.innerHTML]: value.innerHTML };
        }
      });

      parsedData.push([subfieldData[0]]);
    }

    const productObj = {
      year: product.date_of_publication,
      id: product.mms_id,
      liked: !!localStorage.getItem(parsedData[3][0]),
    };
    // Loop over the parsed XML data and add each field to the product object
    parsedData.forEach((field, index) => {
      // Get the tag name from the XML data
      const tagName = datafield[index].getAttribute("tag");

      // Check if the property already exists in the object
      if (Object.prototype.hasOwnProperty.call(productObj, tagName)) {
        // If it does, push the new value to the existing array
        productObj[tagName].push(...field);
      } else {
        // If it doesn't, add the field to the object

        productObj[tagName] = field;
      }
    });
    // Push the product object to the products array
    products.push(productObj);
  });

  const filteredProducts = products.filter((product) => product[998]); //only products with the 998 "kea field"

  const extraFiltered = filteredProducts.filter(
    (product) => Object.values(product["998"][0])[0] == "kea"
  );

  return extraFiltered;
  // return products;
  // return filteredProducts;
};
