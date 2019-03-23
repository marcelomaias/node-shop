const fs = require('fs')
const path = require('path')

const fileDBPath = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json')
const Cart = require('./cartModel')

const getProductsFromFile = callback => {
  fs.readFile(fileDBPath, (err, data) => {
    if (err) {
      return callback([])
    }
    callback(JSON.parse(data))
  })
}

module.exports = class Product {
  constructor(id, title, description, imgUrl, price) {
    this.id = id
    this.title = title
    this.description = description
    this.imgUrl = imgUrl
    this.price = price
  }
  save() {
    getProductsFromFile(products => {
      if (this.id) {
        console.log(this.id)
        const existingProductIndex = products.findIndex(prod => prod.id === this.id)
        const updatedProducts = [...products]
        updatedProducts[existingProductIndex] = this
        fs.writeFile(fileDBPath, JSON.stringify(updatedProducts), err => {
          console.log(err)
        })
      } else {
        this.id = Math.random().toString()
        products.push(this)
        fs.writeFile(fileDBPath, JSON.stringify(products), err => {
          console.log(err)
        })
      }
    })
  }
  static fetchAll(callback) {
    getProductsFromFile(callback)
  }
  static findById(id, callback) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id)
      callback(product)
    })
  }
  static deleteProduct(id) {
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id === id)
      const updatedProducts = products.filter(prod => prod.id !== id)
      fs.writeFile(fileDBPath, JSON.stringify(updatedProducts), err => {
        if (!err) {
          Cart.deleteProduct(id, product.price)
        }
      })
    })
  }
}
