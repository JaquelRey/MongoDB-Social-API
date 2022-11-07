const { Schema, model } = require('mongoose');
const { format_timestamp } = require('../utils/helpers');
const Reaction = require('./Reaction');


// thoughtText
    // String
    // Required
    // Must be between 1 and 280 characters
// createdAt
    // Date
    // Set default value to the current timestamp
    // Use a getter method to format the timestamp on query
// username (The user that created this thought)
    // String
    // Required
// reactions (These are like replies)
    // Array of nested documents created with the reactionSchema


// create model
const thoughtSchema = new Schema(
  {
    thoughtText: { 
        type: String, 
        min: [1,'You need at least one character to post!'],
        max: [280, 'Thought length cannot exceed 280 characters.'],
        unique: true, 
        required: true
    },
    createdAt: { 
        type: Date, 
        default: Date.now, 
        get: format_timestamp,
        required: true},
    username: { type: Schema.Types.ObjectId, ref: 'user' },
    reactions: [Reaction]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual called reactionCount that retrieves the  
// length of the thought's reactions array field on query.

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// init model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;