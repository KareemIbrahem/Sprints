const express = require('express');
const app = express();
const port = 8080;


class Product {
  constructor(id, title, price, description, category, images) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.category = category;
    this.images = images;
  }
}


class ProductController {
  constructor() {
    this.products = [
      new Product(
        1,
        "Handmade Fresh Table",
        687,
        "Andy shoes are designed to keeping in...",
        {
          id: 5,
          name: "Others",
          image: "https://placeimg.com/640/480/any?r=0.591926261873231"
        },
        [
          "https://placeimg.com/640/480/any?r=0.9178516507833767",
          "https://placeimg.com/640/480/any?r=0.9300320592588625",
          "https://placeimg.com/640/480/any?r=0.8807778235430017"
        ]
      )
      
    ];
  }

  listProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find(product => product.id === id);
  }

  createProduct(productData) {
    const newProduct = new Product(
      productData.id,
      productData.title,
      productData.price,
      productData.description,
      productData.category,
      productData.images
    );
    this.products.push(newProduct);
    return newProduct;
  }

  updateProduct(id, productData) {
    const productToUpdate = this.getProductById(id);
    if (!productToUpdate) {
      throw new Error('Product not found');
    }
    productToUpdate.title = productData.title;
    productToUpdate.price = productData.price;
    productToUpdate.description = productData.description;
    productToUpdate.category = productData.category;
    productToUpdate.images = productData.images;
    return productToUpdate;
  }

  deleteProduct(id) {
    const index = this.products.findIndex(product => product.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    const deletedProduct = this.products.splice(index, 1)[0];
    return deletedProduct;
  }
}

const controller = new ProductController();


app.use(express.json());


app.get('/products', (req, res) => {
  const products = controller.listProducts();
  res.json(products);
});


app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = controller.getProductById(id);
  if (!product) {
    res.status(404).json({ error: 'Product not found' });
  } else {
    res.json(product);
  }
});


app.post('/products', (req, res) => {
  try {
    const productData = req.body;
    const newProduct = controller.createProduct(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


app.put('/products/:id', (req, res) => {
   try {
     const id = parseInt(req.params.id);
     const productData = req.body;
     const updatedProduct = controller.updateProduct(id, productData);
     res.json(updatedProduct);
   } catch (error) {
     res.status(400).json({ error: error.message });
   }
 });

app.delete('/products/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deletedProduct = controller.deleteProduct(id);
    res.json(deletedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
