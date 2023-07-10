const express = require("express");
const veryifyUser = require("../controller/verifyUser");
const [
  getAllProduct,
  createProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  purchaseProduct,
] = require("../controller/productController");
const router = express.Router();
router.get("/", getAllProduct).post("/", veryifyUser, createProduct);
router
  .get("/:id", getSingleProduct)
  .delete("/:id", veryifyUser, deleteProduct)
  .put("/:id", veryifyUser, updateProduct);
router.post("/:userId/products/:productId", veryifyUser, purchaseProduct);
module.exports = router;
