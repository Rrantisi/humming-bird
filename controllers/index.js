function home(req, res) {
    res.render('index', { title: 'HummingBird'});
}

module.exports = {
    home
}