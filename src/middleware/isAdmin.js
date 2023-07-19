function isAdmin(req, res, next) {
  if (req.session?.user.isAdmin === true) {
    next();
  } else {
    res.redirect("/user");
  }
}

module.exports = isAdmin;
