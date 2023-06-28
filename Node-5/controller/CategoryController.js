const data = [
    {
      "name": "Product 1",
      "price": 10,
      "category_id": 1
    },
    {
      "name": "Product 2",
      "price": 20,
      "category_id": 2
    },
    {
      "name": "Product 3",
      "price": 30,
      "category_id": 1
    }
  ];
  
  class CategoryController {
    getAllCategories(req, res) {
      res.json(data);
    }
  
    getCategoryById(req, res) {
      const categoryId = parseInt(req.params.id);
      const category = data.find(category => category.category_id === categoryId);
      res.json(category);
    }
  
    getProductsByCategory(req, res) {
      const categoryId = parseInt(req.params.id);
      const products = data.filter(product => product.category_id === categoryId);
      res.json(products);
    }
  
    addCategory(req, res) {
      const newCategory = req.body;
      data.push(newCategory);
      res.json(newCategory);
    }
  
    updateCategory(req, res) {
      const categoryId = parseInt(req.params.id);
      const updatedCategory = req.body;
      const index = data.findIndex(category => category.category_id === categoryId);
      if (index !== -1) {
        data[index] = { ...data[index], ...updatedCategory };
        res.json(data[index]);
      } else {
        res.status(404).json({ message: "Category not found" });
      }
    }
  
    deleteCategory(req, res) {
      const categoryId = parseInt(req.params.id);
      const index = data.findIndex(category => category.category_id === categoryId);
      if (index !== -1) {
        const deletedCategory = data[index];
        data.splice(index, 1);
        res.json(deletedCategory);
      } else {
        res.status(404).json({ message: "Category not found" });
      }
    }
  }
  
  module.exports = new CategoryController();
  