const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
});

// const me = new User({
//   name: "  harshil  ",
//   age: 0,
//   email: "  hello@gmail.com ",
//   password: "   abc1234   ",
// });

// me.save()
//   .then((result) => {
//     console.log("Result", result);
//   })
//   .catch((error) => {
//     console.log("Error", error);
//   });

// const Task = mongoose.model("Task", {
//   description: {
//     type: String,
//   },
//   completed: {
//     type: Boolean,
//   },
// });

// const myTask = new Task({
//   description: "My first task",
//   completed: true,
// });

// myTask
//   .save()
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((er) => {
//     console.log(er);
//   });
