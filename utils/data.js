const usernames = [
  "Dog",
  "Cat",
  "Duck",
  "Goose",
  "Fish",
  "Turtle",
];

// const reactions = [
//   "needfood",
//   "squeak",
//   "meow",
//   "woof",
//   "blub",
//   "walk",
//   "treats",
//   "hi",
// ];
// const thoughts = [{}];


// Get a random item 
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random username
const randomUser = () => `${getRandom(usernames)}`;

//need to add functions and data to create thoughts with reactions

module.exports = { randomUser};
