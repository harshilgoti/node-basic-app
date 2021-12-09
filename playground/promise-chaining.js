require("../src/db/mongoose");
const User = require("../src/models/users");

// User.findByIdAndUpdate("614dfd8406a69a080380209f", { age: 2 })
//   .then((user) => {
//     return User.countDocuments({ age: 1 });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeAndCount("614dfd8406a69a080380209f", 3)
  .then((result) => {
    console.log("result", result);
  })
  .catch((e) => {
    console.log("error", e);
  });
