require("@babel/register");
require("dotenv").config();


const path = require("path");
const express = require("express");
const logger = require("morgan");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const ssr = require("./middleware/ssr");

const app = express();
const { PORT, SESSION_SECRET } = process.env;

const sessionConfig = {
  store: new FileStore(),
  name: "tea_guru",
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: false,
    maxAge: 100 * 60 * 1000,
  },
};

app.locals.title = "Tea Sense";

const indexRouter = require("./routes/index.routes");
const authRoute = require("./routes/auth.routes");
const apiRouter = require("./routes/index.api.routes");

app.use(session(sessionConfig));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));
app.use(express.static(path.join(process.cwd(), "public")));
app.use(ssr);

app.use("/", indexRouter);
app.use("/auth", authRoute);
app.use("/api", apiRouter);
app.get("*", (req, res) => {
  res.redirect("/");
});


app.listen(PORT, () => {
  console.log(`server started PORT: ${PORT}`);
});
