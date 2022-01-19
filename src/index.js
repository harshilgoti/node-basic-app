const app = require("./app");
const port = process.env.PORT;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const myPassword = async () => {
  const password = "Red1234!";
  const hashPassword = await bcrypt.hash(password, 8);
  // console.log(password);
  // console.log(hashPassword);
  const isMatch = await bcrypt.compare("red1234!", hashPassword);
  // console.log(isMatch);
  const token = jwt.sign({ _id: "abc123" }, process.env.JWT_SECRET, {
    expiresIn: "7 days",
  });
  // console.log(token);
  const data = jwt.verify(token, process.env.JWT_SECRET);
  // console.log(data);
};

myPassword();

const multer = require("multer");
const upload = multer({
  dest: "images",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }
    cb(undefined, true);
  },
});

app.post(
  "/upload",
  upload.single("upload"),
  (req, res) => {
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
