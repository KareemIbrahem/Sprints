const express = require('express');
const router = express.Router();

const categoryController = require('./../controller/CategoryController');
const userController = require('./../controller/userController');

router.use(userController.protect);
router.get('/', categoryController.getAllCategories); 
router.post('/', categoryController.addCategory);
router.get('/:id', categoryController.getCategoryById); 
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
