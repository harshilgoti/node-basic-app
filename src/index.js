const express = require("express");
require("./db/mongoose");
const userRouter = require("./router/user");
const taskRouter = require("./router/task");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

const bcrypt = require("bcryptjs");

const myPassword = async () => {
  const password = "Red1234!";
  const hashPassword = await bcrypt.hash(password, 8);

  console.log(password);
  console.log(hashPassword);

  const isMatch = await bcrypt.compare("red1234!", hashPassword);
  console.log(isMatch);
};

myPassword();

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
