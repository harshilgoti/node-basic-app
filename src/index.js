const express = require("express");
require("./db/mongoose");
const User = require("./models/users");
const Task = require("./models/tasks");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/users", (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => {
      res.send(user);
    })
    .catch((er) => {
      res.status(400).send(er);
    });
});

app.post("/tasks", (req, res) => {
  const task = new Task(req.body);

  task
    .save()
    .then(() => {
      res.send(task);
    })
    .catch((er) => {
      res.status(400).send(er);
    });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
