const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { randomUser } = require("./data");

connection.on("error", (err) => err);
// seeding users
connection.once("open", async () => {
  console.log("connected");

  await User.deleteMany({});
  await Thought.deleteMany({});

  const users = [];

  for (let i = 0; i < 7; i++) {
    const username = randomUser();
    const email = username + "@gmail.com";
    users.push({
      username,
      email,
    });
  }

  await User.collection.insertMany(users);

  console.table(users);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
