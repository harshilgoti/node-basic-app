const express = require("express");
require("./db/mongoose");
const User = require("./models/users");
const Task = require("./models/tasks");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/users", async (req, res) => {
  try {
    const user = await new User(req.body);
    user.save();
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
  // const user = new User(req.body);
  // user
  //   .save()
  //   .then(() => {
  //     res.send(user);
  //   })
  //   .catch((er) => {
  //     res.status(400).send(er);
  //   });
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.send();
  }
  // User.find({})
  //   .then((users) => {
  //     console.log(users);
  //     res.send(users);
  //   })
  //   .catch((e) => {});
});

app.get("/user/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).send();
    }
    res.send(user);
  } catch (e) {
    res.send();
  }
  // User.findById({ _id })
  //   .then((user) => {
  //     if (!user) {
  //       return res.status(400).send();
  //     }
  //     res.send(user);
  //   })
  //   .catch((e) => {
  //     res.status(400).send();
  //   });
});

app.post("/tasks", async (req, res) => {
  try {
    const task = await new Task(req.body);
    task.save();
    res.send(task);
  } catch (e) {
    res.send();
  }
  // task
  //   .save()
  //   .then(() => {
  //     res.send(task);
  //   })
  //   .catch((er) => {
  //     res.status(400).send(er);
  //   });
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.send();
  }
  // Task.find({})
  //   .then((taks) => {
  //     res.send(taks);
  //   })
  //   .catch((e) => {});
});

app.get("/task/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(400).send();
    }
    res.send(task);
  } catch (e) {
    res.status(400).send();
  }

  // Task.findById({ _id })
  //   .then((task) => {
  //     if (!task) {
  //       return res.status(400).send();
  //     }
  //     res.send(task);
  //   })
  //   .catch((e) => {
  //     res.status(400).send();
  //   });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
