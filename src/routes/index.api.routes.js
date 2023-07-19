const router = require("express").Router();
const { Post, User, Comment } = require("../../db/models");

const isAdmin = require("../middleware/isAdmin");
const isAuth = require("../middleware/isAuth");

const path = require("path");
const fs = require("fs");

const fileMiddleware = require("../middleware/image");

router.delete("/onetea", isAuth, isAdmin, async (req, res) => {
  try {
    const { id, imgPath } = req.body;
    await Post.destroy({ where: { id } });
    await fs.unlink(`${path.join(process.cwd(), "public", imgPath)}`, (err) => {
      if (err) console.log(err)
      console.log('path/file.txt was deleted');
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

router.post(
  "/onetea",
  isAuth,
  isAdmin,
  fileMiddleware.single("teaImg"),
  async (req, res) => {
    try {
      const { name, address, description } = req.body;
      const { path } = req.file;
      const photo = "/images" + path.slice(path.lastIndexOf("/"));
      const newPost = await Post.create({
        name,
        address,
        description,
        photo,
      });
      const teaId = newPost.dataValues.id;
      const teaName = newPost.dataValues.name;
      const teaPhoto = newPost.dataValues.photo;
      res.send({ teaId, teaName, teaPhoto });
    } catch (error) {
      console.log(error);
    }
  }
);

router.put("/admin", isAuth, isAdmin, async (req, res) => {
  try {
    const { newAdmin } = req.body;
    await User.update({ isAdmin: true }, { where: { email: newAdmin } });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

router.post("/comment", isAuth, async (req, res) => {
  try {
    const userId = req.session.user.id;
    const userName = req.session.user.name;
    const { input, postId } = req.body;
    const body = input.newComment;
    const newComment = await Comment.create({ body, userId, postId });
    res.send({ newComment, userName });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/comment", isAuth, async (req, res) => {
  try {
    const { id } = req.body;
    await Comment.destroy({ where: { id } });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
