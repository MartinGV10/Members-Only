const express = require('express')
const path = require('node:path')
const loginRoutes = require('./routes/loginRoutes')
const session = require('express-session')
const passport = require('passport')
const app = express()
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy
const db = require('./db/queries')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(session({ secret: 'cats', resave: false, saveUninitialized: false }))
app.use(passport.session())
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



passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const { rows } = await db.getSessionId(id)
        const user = rows[0]

        if (!user) {
            return done(null, false)
        }
        
        done(null, user)
    } catch (err) {
        return done(err)
    }
})