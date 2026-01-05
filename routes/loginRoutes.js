const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const { Router } = require('express')
const loginRoutes = Router()
const loginController = require('../controllers/loginController')

loginRoutes.get('/', loginController.getHome)

loginRoutes.get('/sign-up', loginController.getSignup)
loginRoutes.get('/log-in', loginController.getLogin)

module.exports = loginRoutes