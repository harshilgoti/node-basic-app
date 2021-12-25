const express = require("express");
require("./db/mongoose");
const userRouter = require("./router/user");
const taskRouter = require("./router/task");

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     res.send("Get requests are desabled");
//   } else {
//     next();
//   }
// });

// app.use((req, res, next) => {
//   res.status(503).send("Side is down please try back soon!");
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const myPassword = async () => {
  const password = "Red1234!";
  const hashPassword = await bcrypt.hash(password, 8);
  // console.log(password);
  // console.log(hashPassword);
  const isMatch = await bcrypt.compare("red1234!", hashPassword);
  // console.log(isMatch);
  const token = jwt.sign({ _id: "abc123" }, "mynameisharshil", {
    expiresIn: "7 days",
  });
  // console.log(token);
  const data = jwt.verify(token, "mynameisharshil");
  // console.log(data);
};

myPassword();

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
