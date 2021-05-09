exports.isAuth = (req, res, next) => {
    if(req.session.isAuth){
        next()
    }
    else res.redirect('/api/login')
}

exports.isNotAuth = (req, res, next) => {
    if(req.session.isAuth){
        res.redirect('/api/profile')
    }
    else next()
}