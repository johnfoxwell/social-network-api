const { Thought, User } = require('../models');
const { Schema, model } = require("mongoose")

module.exports = {
    //post
    async postThought(req, res) {
        try {
            const thought = await Thought.create(req.body)
            const user = await User.findOneAndUpdate(
                { username: thought.username },
                { $addToSet: { thoughts: thought._id} },
                { runValidators: true, new: true }
            )
            if (!user) {
                res.stauts(400).json({ message: "Cannot find user"})
            }
            res.json(user)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    // get thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find()
            res.json(thoughts)
        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    },
    // get thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })

            if (!thought) {
                return res.status(400).json({ message: "Cannot find thought"})
            }
            res.json(thought)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    //update thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            )
            if (!thought) {
                res.status(400).json({ message: "Cannot update user"})
            }
            res.json(thought)
        } catch (err) {
            res.staus(500).json(err)
        }
    },

    //delete thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete(
                { _id: req.params.thoughtId }
            )
            if (!thought) {
                res.status(400).json({ message: "Cannot delete thought"})
            }
            res.json({ message: "Deleted" })
        } catch (err) {
            res.staus(500).json(err)
        }
    },

    //add reaction
    async postReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: {friends: req.params.friendId} },
                { runValidators: true, new: true }
            )
            if (!thought) {
                res.status(400).json({ message: "Cannot find thought"})
            }
            res.json(thought)
        } catch (err) {
            res.staus(500).json(err)
        }
    },

    // delete reaction
    async deleteReaction(req, res) {
        try {
            const thought = await thought.findOneAndDelete(
                { _id: req.params.thoughtId },
                { $pull: {reactions: {reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            )
            if (!thought) {
                res.status(400).json({ message: "Cannot delete thought"})
            }
            res.json({ message: "Deleted" })
        } catch (err) {
            res.staus(500).json(err)
        }
    },
}