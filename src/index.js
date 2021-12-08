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

app.get("/users", (req, res) => {
  User.find({})
    .then((users) => {
      console.log(users);
      res.send(users);
    })
    .catch((e) => {});
});

app.get("/user/:id", (req, res) => {
  const _id = req.params.id;
  User.findById({ _id })
    .then((user) => {
      if (!user) {
        return res.status(400).send();
      }
      res.send(user);
    })
    .catch((e) => {
      res.status(400).send();
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

app.get("/tasks", (req, res) => {
  Task.find({})
    .then((taks) => {
      res.send(taks);
    })
    .catch((e) => {});
});

app.get("/task/:id", (req, res) => {
  const _id = req.params.id;

  Task.findById({ _id })
    .then((task) => {
      if (!task) {
        return res.status(400).send();
      }
      res.send(task);
    })
    .catch((e) => {
      res.status(400).send();
    });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
