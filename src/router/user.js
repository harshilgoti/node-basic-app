const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
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
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image file"));
    }
    cb(undefined, true);
  },
});

router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete("/users/me/avatar", auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

router.get("/users/:id/avatar", async (req, res) => {
  const user = await User.findById(req.params.id);
  try {
    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;
