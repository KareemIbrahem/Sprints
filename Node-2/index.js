const axios = require("axios");
require("dotenv").config();

const getProductsData = async function () {
  try {
    const response = await axios.get(
      "https://api.escuelajs.co/api/v1/products",
      {
        params: {
          offset: 10,
          limit: 10,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error:", error.message);
    throw error; 
  }
};


const getExchangeRate = async function () {
  try {
    const apiKey = process.env.API_KEY; 
    const url = "https://api.apilayer.com/currency_data/convert";
    const params = {
      to: "EGP",
      from: "USD",
      amount: "1",
    };

    const response = await axios.get(url, {
      params: params,
      headers: {
        apikey: apiKey,
      },
    });

    const { result } = response.data; 
    console.log(result);
    return result.toFixed(2);
  } catch (error) {
    console.log("Error:", error.message);
    throw error;
  }
};

const getGroupedProductsByCategory = function (data) {
  const categories = data.reduce((groupedProducts, product) => {
    const id = product.category.id;
    const existingCategory = groupedProducts.find(
      (category) => category.category.id == id
    );
    if (existingCategory) {
      existingCategory.products.push(product);
    } else {
      groupedProducts.push({ category: product.category, products: [product] });
    }
    return groupedProducts;
  }, []);
  return JSON.stringify(categories, null, 2);
};

const convertPriceToEGP = function (data) {
  const exchangeRate = data[0];
  const products = data[1].map((product) => {
    if (typeof product.price === 'number' && !isNaN(product.price)) {
      return {
        ...product,
        price: `${(product.price * exchangeRate).toFixed(2)} EGP`,
      };
    } else {
      console.log(`Invalid price value for product: ${product.name}`);
      return product;
    }
  });
  return products;
};


async function fetchDataAndProcess() {
  try {
    const [exchangeRate, productsData] = await Promise.all([
      getExchangeRate(),
      getProductsData(),
    ]);
    const convertedProducts = convertPriceToEGP([exchangeRate, productsData]);
    const groupedProducts = getGroupedProductsByCategory(convertedProducts);
    console.log(groupedProducts);
  } catch (error) {
    console.log("Error:", error.message);
  }
}

fetchDataAndProcess();
