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

function getLogin(req, res) {
    res.render('log-in', {
        title: 'Log In'
    })
}

module.exports = {
    getHome,
    getSignup,
    getLogin
}