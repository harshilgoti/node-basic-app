require("../src/db/mongoose");
const User = require("../src/models/users");

User.findByIdAndUpdate("614dfd8406a69a080380209f", { age: 1 })
  .then((user) => {
    return User.countDocuments({ age: 1 });
  })
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
