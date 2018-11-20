const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController')


router.get('/posts', postController.getPostList);

router.get('/posts/:postId', postController.getPostByID);

router.post('/posts', postController.createPost);

router.patch('/posts/:postId', postController.editPost);

router.delete('/posts/:postId', postController.deletePost);

module.exports = router;

//    mongoose.disconnect(); после save зачем??
// когда редактируем в консоли (node:5431) DeprecationWarning: collection.findAndModify is deprecated. Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.
// нужен пример работы с мидлвэйр (когда сохраняем пост)
//картинка сохраняется в jpg/ как вытащить формат картинки?
//mongoose.set('useFindAndModify', false);
