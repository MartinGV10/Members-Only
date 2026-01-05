const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const db = require('../db/queries')

function getHome(req, res) {
    res.render('index', {
        title: 'Home'
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

function getClubhouse(req, res) {
    res.render('clubhouse', {
        title: 'Clubhouse'
    })
}

module.exports = {
    getHome,
    getSignup,
    getLogin,
    getClubhouse,
    postSignup
}