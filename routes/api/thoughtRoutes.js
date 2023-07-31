const router = require('express').Router();
const {
  postThought,
  getThoughts,
  getSingleThought,
  updateThought,
  deleteThought,
  postReaction,
  deleteReaction,
} = require('../../controllers/thoughtControllers.js');

router.route('/').get(getThoughts).post(postThought);

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').post(postReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
