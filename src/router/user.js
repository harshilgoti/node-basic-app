const express = require("express");
const User = require("../models/users");

const router = new express.Router();

router.post("/users", async (req, res) => {
  try {
    const user = await new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
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

router.post("/user/login", async (req, res) => {
  try {
    const user = await User.findUserByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();

    res.status(200).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/users", async (req, res) => {
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

router.get("/user/:id", async (req, res) => {
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

router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const valiUpdates = ["name", "age", "email", "password"];
  const isValidUpdates = updates.every((update) =>
    valiUpdates.includes(update)
  );

  if (!isValidUpdates)
    return res.status(404).send({ error: "In-valid updates!" });

  try {
    //for middaleware
    const user = await User.findById(req.params.id);
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();

    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    if (!user) {
      return res.status(404).send();
    }
    return res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) return res.status(404).send();
    return res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
