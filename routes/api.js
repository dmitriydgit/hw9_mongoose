const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController')


router.get('/posts', function (req, res) {
	postController.getPostList(req, res);
});

router.get('/posts/:postId/', function (req, res) {
	postController.getPostByID(req, res);
});

router.post('/posts', function (req, res) {
	postController.createPost(req, res);
});

router.patch('/posts/:postId/', function (req, res) {
	postController.editPost(req, res);
});

router.delete('/posts/:postId/', function (req, res) {
	postController.deletePost(req, res);
});

module.exports = router;

