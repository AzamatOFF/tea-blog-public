function isAuth(req, res, next) {
  if (req.user || req.session.user) {
    next();
  } else {
    res.redirect("/auth/signin");
  }
}

module.exports = isAuth;
