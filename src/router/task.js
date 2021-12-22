const express = require("express");
const Task = require("../models/tasks");

const router = new express.Router();

router.post("/tasks", async (req, res) => {
  try {
    const task = await new Task(req.body);
    await task.save();
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

router.get("/tasks", async (req, res) => {
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

router.get("/task/:id", async (req, res) => {
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

router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const valiUpdates = ["description", "completed"];
  const isValidUpdates = updates.every((update) =>
    valiUpdates.includes(update)
  );

  if (!isValidUpdates)
    return res.status(404).send({ error: "In-valid updates!" });

  try {
    const task = await Task.findById(req.params.id);
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();

    if (!task) {
      return res.status(404).send();
    }
    return res.status(200).send(task);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const user = await Task.findByIdAndDelete(req.params.id);

    if (!user) return res.status(404).send();
    return res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
