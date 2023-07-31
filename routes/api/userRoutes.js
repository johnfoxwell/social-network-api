const router = require('express').Router();
const {
  postUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController.js');

router.route('/').get(getUsers).post(postUser);

router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendID').post(addFriend).delete(deleteFriend);

module.exports = router;
