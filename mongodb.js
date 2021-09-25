// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;

const { MongoClient, ObjectId } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

const id = new ObjectId();
console.log(id.getTimestamp());
console.log(id.id);
console.log(id.id.length);

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect database!");
    }

    const db = client.db(databaseName);

    // db.collection("task").insertOne(
    //   {
    //     name: "Harshil Goti",
    //     age: 26,
    //   },
    //   (er, result) => {
    //     if (er) {
    //       return console.log("Unable to connect!");
    //     }
    //     console.log(result);
    //   }
    // );

    // db.collection("users").insertMany(
    //   [
    //     {
    //       name: "Harshil Goti",
    //       age: 26,
    //     },
    //     {
    //       name: "hari",
    //       age: 25,
    //     },
    //   ],
    //   (er, result) => {
    //     if (er) {
    //       return console.log("Unable to connect!");
    //     }
    //     console.log(result);
    //   }
    // );
  }
);
