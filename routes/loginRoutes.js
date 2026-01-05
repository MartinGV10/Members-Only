const { Router } = require('express')
const loginRoutes = Router()
const loginController = require('../controllers/loginController')

loginRoutes.get('/', loginController.getHome)

loginRoutes.get('/sign-up', loginController.getSignup)
loginRoutes.post('/sign-up', loginController.postSignup)

loginRoutes.get('/log-in', loginController.getLogin)
loginRoutes.post('/log-in', loginController.postLogin)

loginRoutes.get('/clubhouse', loginController.getClubhouse)

module.exports = loginRoutes