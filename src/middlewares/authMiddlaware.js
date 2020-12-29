//----------* MIDDLEWARE *----------//
module.exports = (req, res, next) => {
    if (!req.session.user) {
        res.redirect('/user/login');
    }
    return next();
}