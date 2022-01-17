const express = require("express");
const multer = require("multer");
const User = require("../models/users");
const auth = require("../middleware/auth");

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

router.get("/users", auth, async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.send();
  }
});

router.post("/user/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();
    res.status(200).send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/user/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/user/me", auth, async (req, res) => {
  res.send(req.user);
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

router.patch("/user/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const valiUpdates = ["name", "age", "email", "password"];
  const isValidUpdates = updates.every((update) =>
    valiUpdates.includes(update)
  );

  if (!isValidUpdates)
    return res.status(404).send({ error: "In-valid updates!" });

  try {
    const user = req.user;
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();

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

router.delete("/user/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    if (!req.user) return res.status(404).send();

    return res.status(200).send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

const upload = multer({
  dest: "avatars",
});

router.post("/users/me/avatar", upload.single("avatar"), (req, res) => {
  res.send();
});

module.exports = router;
