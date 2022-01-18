const {
  calculateTip,
  fahrenheitToCelsius,
  celsiusToFahrenheit,
  add,
} = require("../math");

test("Should calculate total with tip", () => {
  const total = calculateTip(10, 0.3);
  expect(total).toBe(13);
});

test("Should calculate total with default tip", () => {
  const total = calculateTip(10);
  expect(total).toBe(12.5);
});

test("Should convert 32 F to 0 C", () => {
  const temp = fahrenheitToCelsius(32);
  expect(temp).toBe(0);
});

test("Should convert 0 C to 32 F", () => {
  const temp = celsiusToFahrenheit(0);
  expect(temp).toBe(32);
});

test("Should add two number", (done) => {
  add(1, 2).then((sum) => {
    expect(sum).toBe(3);
    done();
  });
});

test("Should add two async/await", async () => {
  const sum = await add(1, 3);
  expect(sum).toBe(4);
});
