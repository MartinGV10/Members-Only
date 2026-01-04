function getHome(req, res) {
    res.render('index', {
        title: 'Home'
    })
}

module.exports = {
    getHome
}