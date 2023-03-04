// Import the necessary Mongoose components
const { Schema, Types } = require('mongoose');

// Define the reaction schema using Mongoose
const reactionSchema = new Schema(
    {
        // Define the ID for the reaction, which is a Mongoose ObjectID
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        // Define the text for the reaction, which is required and has a maximum length of 280 characters
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        // Define the username for the user who created the reaction, which is required
        username: {
            type: String,
            required: true,
        },
        // Define the creation date for the reaction, which is set to the current date by default
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        // Define the options for the schema, including enabling getters and disabling the ID field
        toJSON: {
            getters: true,
        },
        id: false,
    },
);

// Export the reaction schema for use in other files
module.exports = reactionSchema;

