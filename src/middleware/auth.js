const jwt = require("jsonwebtoken");
const User = require("../models/users");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoder = jwt.verify(token, "mynameisharshil");
    const user = await User.findOne({
      _id: decoder._id,
      "tokens.token": token,
    });

    req.token = token;
    req.user = user;
    if (!user) {
      throw new Error();
    }

    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

module.exports = auth;
