const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const db = require('../db/queries')

async function getHome(req, res) {
    const messages = await db.getMessages()
    res.render('index', {
        title: 'Home',
        user: req.user,
        messages: messages
    })
}

function getSignup(req, res) {
    res.render('sign-up', {
        title: 'Sign Up'
    })
}

async function postSignup(req, res, next) {
    try {
        const { first_name, last_name, username, password, confirm_password } = req.body
        if (password === confirm_password) {
            const hashedPass = await bcrypt.hash(password, 10)
            await db.addUser({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username,
                password: hashedPass
            })
            console.log('success!')
            res.redirect('/clubhouse')
        }
        else {
            console.log('pass must match')
        }
    } catch (err) {
        return next(err)
    }
}

function getLogin(req, res) {
    res.render('log-in', {
        title: 'Log In'
    })
}

function postLogin(req, res, next) {
    console.log('db.loginUser is ' + db.loginUser)
    passport.authenticate('local', {
        successRedirect: '/clubhouse',
        failureRedirect: '/log-in'
    })(req, res, next)
}

async function getClubhouse(req, res) {
    console.log(req.user)
    const messages = await db.getMessages()
    res.render('clubhouse', {
        title: 'Clubhouse',
        user: req.user,
        messages: messages
    })
}

function ensureAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    else {
        res.redirect('/log-in')
    }
}

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const result = await db.loginUser(username)
            const user = result.rows[0]

            if (!user) {
                return done(null, false, { message: 'Incorrect username' })
            }

            const match = await bcrypt.compare(password, user.password_hash)
            if (!match) {
                return done(null, false, { message: 'Incorrect password' })
            }

            return done(null, user)
        } catch (err) {
            return done(err)
        }
    })
)

module.exports = {
    getHome,
    getSignup,
    getLogin,
    getClubhouse,
    postSignup,
    postLogin,
    ensureAuth
}