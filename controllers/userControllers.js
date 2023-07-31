const { User, Thought } = require('../models');

module.exports = {
    //post
    async postUser(req, res) {
        try {
            const user = await User.create(req.body)
            res.json(user)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    // get users
    async getUser(req, res) {
        try {
            const users = await User.find() 
            res.json(users)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    // get user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId }) 

            if (!user) {
                return res.status(400).json({ message: "ID not found"})
            }
            res.json(user)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    //update user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            )
            if (!user) {
                res.status(400).json({ message: "Cannot update user"})
            }
            res.json(user)
        } catch (err) {
            res.staus(500).json(err)
        }
    },

    //delete user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete(
                { _id: req.params.userId }
            )
            if (!user) {
                res.status(400).json({ message: "Cannot delete user"})
            }
            res.json({ message: "Deleted" })
        } catch (err) {
            res.staus(500).json(err)
        }
    },

    //add friend
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: {friends: req.params.friendId} },
                { runValidators: true, new: true }
            )
            if (!user) {
                res.status(400).json({ message: "Cannot add friend"})
            }
            res.json(user)
        } catch (err) {
            res.staus(500).json(err)
        }
    },

    //delete friend
    // async deleteFriend(req, res) {
    //     try {
    //         const user = await User.findOneAndDelete(
    //             { _id: req.params.userId },
    //             { $addToSet: {friends: req.params.friendId} },
    //             { runValidators: true, new: true }
    //         )
    //         if (!user) {
    //             res.status(400).json({ message: "Cannot delete friend"})
    //         }
    //         res.json(user)
    //     } catch (err) {
    //         res.staus(500).json(err)
    //     }
    // },
}