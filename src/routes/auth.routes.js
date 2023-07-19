const router = require("express").Router();
const bcrypt = require('bcryptjs')
const Signup = require("../view/Signup");
const Signin = require("../view/Signin");
const { User } = require("../../db/models");

router.get("/signup", (req, res) => {
  res.render(Signup, {});
});

router.get("/signin", (req, res) => {
  res.render(Signin, {});
});

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const isFindUserMeta = await User.findOne({ where: { email } });
  if (!isFindUserMeta) {
    const hashPassword = await bcrypt.hash(password, 10);
    const userData = await User.create({ name, email, password: hashPassword, isAdmin: false });
    const user = userData.get({ plain: true });
    req.session.user = user;
    res.json({ user });
  } else {
    res.json({ error: true });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const userData = await User.findOne({ where: { email } });
  if (userData) {
    const user = userData.get({ plain: true });
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (passwordCheck) {
      req.session.user = user;
      res.json(req.session.user);
    } else {
      res.json({ error: true });
    }
  } else {
    res.json({ error: true });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) console.error(error);
    else {
      res.clearCookie("tea_guru");
      res.redirect("/");
    }
  });
});

module.exports = router;
