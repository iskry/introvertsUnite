const { User, Thought } = require('../models');

module.exports = {
    // Get all thoughts
    getThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    // Create a thought
    createThought(req, res) {
        Thought.create(req.body)
            .then(({ _id }) => {
                // Update the user's thoughts array with the newly created thought id
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: _id } },
                    { runValidators: true, new: true },
                );
            })
            .then((user) => {
                // Return an error if no user is found with the provided id
                if (!user) {
                    res.status(404).json({ message: 'No user with this id!' });
                    return;
                }
                // Return the updated user object
                res.json(user);
            })
            .catch((err) => res.status(500).json(err));
    },
    // Get a single thought by id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Update a thought by id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
          )
          .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Delete a thought by id and remove it from the user's thoughts array
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
          .then((thought) =>
            // Return an error if no thought is found with the provided id
            !thought
              ? res.status(404).json({ message: 'No such thought exists' })
              : User.findOneAndUpdate(
                  { _id: req.params.userId },
                  { $pull: { thoughts: req.params.thoughtId } },
                  { new: true }
                )
          )
          .then((user) =>
            // Return an error if no user is found with the provided id
            !user
              ? res.status(404).json({
                  message: 'Thought deleted, but no user found',
                })
              : res.json({ message: 'Thought successfully deleted' })
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },
}

