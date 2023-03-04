const { Schema, model } = require('mongoose');
// const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 500,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
   // reactions: [reactionSchema], // Embeds the Reaction schema into the Thought schema as an array of subdocuments
  },
  {
    toJSON: {
      virtuals: true, // Include virtual properties when document is converted to JSON
    },
  },
);

// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.
thoughtSchema
  .virtual('reactionCount') // Defines a virtual property called 'reactionCount'
  .get(function () { // Getter function for the virtual property
    return `${this.reactions.length}`;
  });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;

