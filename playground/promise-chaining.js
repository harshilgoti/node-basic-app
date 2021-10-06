require("../src/db/mongoose");
const User = require("../src/models/users");

User.findByIdAndUpdate("6151ed065e633213cf2339bd", { age: 1 })
  .then((user) => {
    return User.countDocuments({ age: 1 });
  })
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
