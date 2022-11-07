const { Schema, model } = require('mongoose');


// username
    // String
    // Unique
    // Required
    // Trimmed
// email
    // String
    // Required
    // Unique
    // matches a valid email address using mongoose validation
// thoughts
    // Array of _id values referencing the Thought model
// friends
    // Array of _id values referencing the User model (self-reference)


// create model
const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true, trim: true },
    email: { 
        type: String, 
        unique: true, 
        required: false, 
        validate: {
          validator: function(email) {
            return /^.+@(?:[\w-]+\.)+\w+$/.test(email);
          },
          message: props => `${props.value} is not a valid email`
        }
    },
    thoughts:  [{ type: Schema.Types.ObjectId, ref: 'thought' }],
    friends:  [{ type: Schema.Types.ObjectId, ref: 'user' }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
//  Create a virtual called `friendCount`
//  that retrieves the length of the user's `friends` array field on query.
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// init model
const User = model('user', userSchema);

module.exports = User;