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

const Task = require("./models/tasks");
const User = require("./models/users");

const main = async (req, res) => {
  // const task = await Task.findById("61c9e372afd4bc06eefda1d1");
  // await task.populate("owner");
  // console.log(task.owner);

  const user = await User.findById("61c9e352afd4bc06eefda1c0");
  await user.populate("tasks");
  // console.log(user.tasks);
};

main();
