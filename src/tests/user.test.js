const request = require("supertest");
const app = require("../app");
const User = require("../models/users");

beforeEach(async () => {
  await User.deleteMany();
});

test("Should sign up new user", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "harshil",
      email: "harshil@example.com",
      password: "MyPass777",
    })
    .expect(200);
});
