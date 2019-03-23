const Product = require('../models/productModel')

exports.getAddProduct = (req, res) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  })
}

exports.postAddProduct = (req, res) => {
  const title = req.body.title
  const description = req.body.description
  const imgUrl = req.body.imgUrl
  const price = req.body.price

  const product = new Product(null, title, description, imgUrl, price)
  product.save()
  res.redirect('/shop/products')
}

exports.getEditProduct = (req, res) => {
  const editing = req.query.editing
  if (!editing) {
    return res.redirect('/')
  }
  const prodId = req.params.productId
  Product.findById(prodId, product => {
    if (!product) {
      return res.redirect('/')
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editing,
      product: product
    })
  })
}

exports.postEditProduct = (req, res) => {
  const prodId = req.body.productId
  const updatedTitle = req.body.title
  const updatedImgUrl = req.body.imgUrl
  const updatedDescription = req.body.description
  const updatedPrice = req.body.price

  const updatedProduct = new Product(prodId, updatedTitle, updatedDescription, updatedImgUrl, updatedPrice)
  updatedProduct.save()
  res.redirect('/admin/product-list')
}

exports.getProductList = (req, res) => {
  Product.fetchAll(products => {
    res.render('admin/product-list', {
      pageTitle: 'Product List',
      prods: products,
      path: '/admin/product-list'
    })
    // console.log(products)
  })
}

exports.postDeleteProduct = (req, res) => {
  const prodId = req.body.productId
  Product.deleteProduct(prodId)
  res.redirect('/admin/product-list')
}
