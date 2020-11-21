const { findProducts, addProduct, findProductByCategory, updateStock } = require('../controllers/product.controllers');

const router = require('express').Router();

router.get('/', findProducts);
router.get('/filter/category/:category', findProductByCategory);
router.post('/', addProduct);

router.patch('/stock/:id', updateStock)

module.exports = router;