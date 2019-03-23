const Product = require('../models/productModel')
const Cart = require('../models/cartModel')

exports.getIndex = (req, res) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      pageTitle: 'Main Shop Page',
      prods: products,
      path: '/'
    })
    // console.log(products)
  })
}
exports.getProducts = (req, res) => {
  Product.fetchAll(products => {
    res.render('shop/products', {
      pageTitle: 'Product List',
      prods: products,
      path: '/shop/products'
    })
    // console.log(products)
  })
}
exports.getProduct = (req, res) => {
  const prodId = req.params.productId
  Product.findById(prodId, product => {
    res.render('shop/product-detail', {
      pageTitle: product.title,
      prod: product,
      path: '/shop/products'
    })
  })
}
exports.getCart = (req, res) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = []
      for (product of products) {
        const cartProductData = cart.products.find(prod => prod.id === product.id)
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty })
        }
      }
      res.render('shop/cart', {
        pageTitle: 'Cart',
        path: '/shop/cart',
        products: cartProducts
      })
    })
  })
}
exports.postCart = (req, res) => {
  const prodId = req.body.productId
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price)
  })
  res.redirect('/shop/cart')
}
exports.postCartDeleteProduct = (req, res) => {
  const prodId = req.body.productId
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price)
    res.redirect('/shop/cart')
  })
}
exports.getCheckout = (req, res) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/shop/checkout'
  })
}
exports.getOrders = (req, res) => {
  res.render('shop/orders', {
    pageTitle: 'Orders',
    path: '/shop/orders'
  })
}
