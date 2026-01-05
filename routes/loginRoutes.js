const { Router } = require('express')
const loginRoutes = Router()
const loginController = require('../controllers/loginController')

loginRoutes.get('/', loginController.getHome)

loginRoutes.get('/sign-up', loginController.getSignup)
loginRoutes.post('/sign-up', loginController.postSignup)

loginRoutes.get('/log-in', loginController.getLogin)
loginRoutes.post('/log-in', loginController.postLogin)

loginRoutes.get('/clubhouse', loginController.getClubhouse)

loginRoutes.get('/new-msg', loginController.getNewMsg)
loginRoutes.post('/new-msg', loginController.ensureAuth, loginController.postNewMsg)

loginRoutes.get('/profile/:username', loginController.ensureAuth, loginController.getProfile)

module.exports = loginRoutes