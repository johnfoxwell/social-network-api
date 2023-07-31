const router = require('express').Router();
const {
  postUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
  addFriend,
} = require('../../controllers/userControllers.js');

router.route('/').get(getUser).post(postUser);

router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendID').post(addFriend);

module.exports = router;
