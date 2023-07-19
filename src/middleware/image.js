const multer = require("multer");
const storage = multer.diskStorage({
  destination(req, file, cb) {
    console.log(file)
    cb(null, process.cwd()+"/public/images");
  },
  filename(req, file, cb) {
    console.log(req.body)
    cb(null, (new Date().toISOString() + "_" + file.originalname).replaceAll(":", "_"));
  },
});


module.exports = multer({ storage });
