const { Thought, User } = require("../models");

// GET to get all thoughts

// GET to get a single thought by its _id

// POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)

// // example data
// {
//   "thoughtText": "Here's a cool thought...",
//   "username": "lernantino",
//   "userId": "5edff358a0fcb779aa7b118b"
// }

// PUT to update a thought by its _id

// DELETE to remove a thought by its _id

// /api/thoughts/:thoughtId/reactions

// POST to create a reaction stored in a single thought's reactions array field

// DELETE to pull and remove a reaction by the reaction's reactionId value

module.exports = {
  // GET to get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .populate([
        "username",
        {
          path: "reactions",
          populate: ["username"],
        },
      ])
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // GET to get a single thought by its _id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .populate([
        "username",
        {
          path: "reactions",
          populate: ["username"],
        },
      ])
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thought with this id!" });
        } else {
          res.json(thought);
        }
      })
      .catch((err) => res.status(500).json(err));
  },
  // POST to create a new thought
  // push the created thought's _id to the associated user's thoughts array
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.username },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );
      res.json({ Thought: thought, User: user });
    } catch {
      (err) => {
        console.log(err);
        res.status(500).json(err);
      };
    }
  },
  // PUT to update a thought by its _id
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thought with this id!" });
        } else {
          res.json(thought);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // DELETE to remove a thought by its _id
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });
      if (!thought) {
        res.status(404).json({ message: "No thought with this id!" });
      } else {
        let user = await User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
        res.json({ message: "Thought deleted!" });
      }
    } catch {
      (err) => {
        console.log(err);
        res.status(500).json(err);
      };
    }
  },
  // POST to create a reaction stored in a single thought's reactions array field
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
    .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thought with this id!" });
        } else {
          res.json(thought);
        }
      })
      .catch((err) => res.status(500).json(err));
  },
  // DELETE to pull and remove a reaction by the reaction's reactionId value
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
    .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thought with this id!" });
        } else {
          res.json(thought);
        }
      })
      .catch((err) => res.status(500).json(err));
  },
};
