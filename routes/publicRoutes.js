const express = require('express')
const shopControllers = require('../controllers/shopControllers')
const errorsControllers = require('../controllers/errorsControllers')

const router = express.Router()

router.get('/', shopControllers.getIndex)

router.get('/shop/products', shopControllers.getProducts)

router.get('/shop/product/:productId', shopControllers.getProduct)

router.get('/shop/cart', shopControllers.getCart)

router.post('/shop/cart', shopControllers.postCart)

router.post('/cart-delete-item', shopControllers.postCartDeleteProduct)

router.get('/shop/orders', shopControllers.getOrders)

router.use(errorsControllers.get404)

module.exports = router
