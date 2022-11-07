const connection = require("../config/connection");
const { User, Thought } = require("../models");
// const { randomUser } = require("./data"); didnt work for now

const names = ["Dog", "Cat", "Duck", "Goose", "Fish", "Turtle"];

connection.on("error", (err) => err);
// seeding users
connection.once("open", async () => {
  console.log("connected");

  await User.deleteMany({});
  await Thought.deleteMany({});

  const users = [];

  for (let i = 0; i < names.length; i++) {
    const username = names[i]
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
