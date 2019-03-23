const express = require('express')
const path = require('path')

const adminRoutes = require('./routes/adminRoutes')
const publicRoutes = require('./routes/publicRoutes')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes)
app.use(publicRoutes)

app.listen(4000, () => console.log('All good, running on port 4000.'))
