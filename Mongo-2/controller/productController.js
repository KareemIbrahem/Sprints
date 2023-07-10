const product = require("../model/productModel");
const User = require("../model/registerModel");
const getAllProduct = async (req, res) => {
  let data;
  try {
    data = await product.find();
  } catch (err) {
    console.log(err);
  }
  res.status(200).json({
    status: "success",
    data,
  });
};
const getSingleProduct = async (req, res) => {
  const productId = req.params.id;
  let data;
  try {
    data = await product.find({ _id: productId });
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    res.status(404).json({ message: "product not found" });
  }
};
const createProduct = async (req, res) => {
  let data;
  try {
    const query = req.body;
    const newProduct = new product(req.body);
    data = await newProduct.save();
    res.status(201).json({
      status: "success",
      data: data,
    });
  } catch (err) {
    res.status(500).json({ error: "internal server error" });
  }
};
const updateProduct = async (req, res) => {
  let updateData;
  try {
    const data = req.body;
    const productId = req.params.id;

    updateData = await product.updateOne({ _id: productId }, data);
    res.json({
      status: "success",
      data: updateData,
    });
  } catch {
    res.status(404).json({ message: "product not found" });
  }
};
const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    await product.findByIdAndDelete({ _id: productId });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
  res.json({
    status: "success",
    message: "product is deleted",
  });
};
const purchaseProduct = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const findUser = await User.findById(userId);
    const findProduct = await product.findById(productId);
    if (!findUser || !findProduct) {
      res.status(404).json({
        message: "user or product not not exist",
      });
    }
    if (findUser.products && findUser.products.includes(productId)) {
      return res.json({ message: "Product already exist" });
    }
    findUser.products.push(productId);
    await findUser.save();
    res.json({
      status: "success",
    });
  } catch {
    res.status(500).json({ error: "internal server error" });
  }
};
module.exports = [
  getAllProduct,
  createProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  purchaseProduct,
];
