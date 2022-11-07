const { Schema, Types } = require('mongoose');
const { format_timestamp } = require('../utils/helpers');

// Reaction (SCHEMA ONLY)

// reactionId
    // Use Mongoose's ObjectId data type
    // Default value is set to a new ObjectId
// reactionBody
    // String
    // Required
    // 280 character maximum
// username
    // String
    // Required
// createdAt
// Date
    // Set default value to the current timestamp
    // Use a getter method to format the timestamp on query
// Schema Settings:
// This will not be a model, but rather will be used as
// the reaction field's subdocument schema in the Thought model.

const reactionSchema = new Schema({
    reactionId: { type: Schema.Types.ObjectId, default:  () => new Types.ObjectId()},
    reactionBody: { 
        type: String, 
        required: true, 
        min: [1,'You need at least one character to react!'],
        max: [280, 'Reaction length cannot exceed 280 characters.']
    },
    username: {type: Schema.Types.ObjectId, ref: 'user'},
    createdAt: { 
        type: Date, 
        default: Date.now, 
        get: format_timestamp,
        required: true}
  });

module.exports = reactionSchema;