const router = require("express").Router();
const renderComponent = require("../lib/renderReactComponent");
const Home = require("../view/Home");
const Admin = require("../view/Admin");
const Details = require("../view/Details");

const isAdmin = require("../middleware/isAdmin");
const isAuth = require("../middleware/isAuth");

const UserPage = require("../view/User");

const { Post, Comment, User } = require("../../db/models");

router.get("/", (req, res) => {
  res.redirect("/home");
});

router.get("/home", async (req, res) => {
  try {
    res.render(Home, {});
  } catch (error) {
    console.log(error);
  }
});

router.get("/home/map", async (req, res) => {
  try {
    const result = await Post.findAll();
    const posts = result.map((e) => e.get({ plain: true }));
    res.json(posts);
  } catch (error) {
    console.log(error);
  }
});

router.get("/admin", isAdmin, async (req, res) => {
  const allTeaArr = await Post.findAll({ raw: true, nested: true,  });
  res.render(Admin, { allTeaArr });
});

router.get("/user", isAuth, async (req, res) => {
  try {
    const userId = req.session.user.id;
    const userCommentsArr = await Comment.findAll({
      where: { userId },
      raw: true,
      include: [Post, User],
    });

    res.render(UserPage, { userCommentsArr });
  } catch (error) {
    console.log(error);
  }
});

router.get("/details/:id", async (req, res) => {
  try {
    const { user } = req.session;
    const { id } = req.params;
    const oneTea = await Post.findOne({ where: { id }, raw: true, });
    const allCommentsArr = await Comment.findAll({
      where: { postId: id },
      raw: true,
      include: [User],
      order: [["id", "DESC"]],
    });
    res.render(Details, { oneTea, allCommentsArr, user });
  } catch (error) {
    console.log(error);
  }

});

module.exports = router;
