const { Schema, model } = require('mongoose');

// Create a new Mongoose schema for the User model
const userSchema = new Schema(
    {
        // Define a `username` field of type String
        username: {
            type: String,
            unique: true,
            required: true,
            maxLength: 30,
        },
        // Define an `email` field of type String
        email: {
            type: String,
            unique: true,
            required: true,
            maxLength: 50,
            // Use a regex pattern to validate that the email input is a valid email format
            match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 
        },
        // Define a `thoughts` field that is an array of ObjectId values referencing the `Thought` model
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        // Define a `friends` field that is an array of ObjectId values referencing the `User` model (self-reference) 
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    // Define options for the schema
    {
        toJSON: {
            virtual: true,
        },

    },
);

// Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.
userSchema
    .virtual('friendCount')
    // Define a getter function for the `friendCount` virtual field
    .get(function () {
        // Return the length of the user's `friends` array as a string
        return `${this.friends.length}`;
    });

// Create a new Mongoose model called `User` using the `userSchema` schema
const User = model('user', userSchema);

// Export the `User` model
module.exports = User;

