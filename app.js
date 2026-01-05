const express = require('express')
const path = require('node:path')
const loginRoutes = require('./routes/loginRoutes')
const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))

const assetsPath = path.join(__dirname, 'public')
app.use(express.static(assetsPath))

app.use('/', loginRoutes)

const PORT = process.env.port || 3000

app.listen(PORT, (err) => {
    if (err) {
        throw err
    }
    console.log(`Listening at http://localhost:${PORT}`)
})