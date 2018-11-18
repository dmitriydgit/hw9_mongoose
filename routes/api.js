const express = require('express');
const router = express.Router();
const PostModel = require('../db/postSchema');
const mongoose = require('mongoose');
const mockData = require('../mock-data');
const fileUpload = require('express-fileupload');


router.get('/posts', function (req, res) {

	PostModel.find(
		{},
		'',
		{
			sort: {
				publicationDate: -1
			}
		},
		function (err, posts) {
			if (err) {
				console.log(err);
				res.status(500).send("Search fail")
			}
			console.log(posts);
			res.json(posts);
		})
	//res.json(mockData.posts);
});

router.get('/posts/:postId/', function (req, res) {
	var postId = +req.params.postId;
	var post = mockData.posts.find(element => {
		return element.id === postId;
	});
	res.json(post);
});


router.post('/posts', function (req, res) {
	var postText = req.body.text;
	var postPicture = req.body.picture;

	if (req.files) {
		var fileName = Date.now();
		var fileLocation = `/assets/img/${fileName}.jpeg`;
		var sampleFile = req.files.picture;
		//console.log(sampleFile)
		sampleFile.mv('./public' + fileLocation, function (err) {
			if (err) {
				console.log(err);
				res.status(500).send("File not saved")
			}
			console.log("File saved");
			savePost(postText, fileLocation);

			//res.status(201).send('File saved!');
		});
	} else {
		savePost(postText, postPicture);
	}

	function savePost(postText, postPicture) {
		var newPost = {
			author: {
				_id: '1',
				name: 'Dave',
				avatar: "/assets/img/avatar-dhg.png"
			},
			publicationDate: Date.now(),
			text: postText,
			picture: postPicture,
			//_id: new mongoose.Types.ObjectId()
		};

		var post = new PostModel(newPost);
		post.save(function (err) {
			if (err) {
				console.log(err);
			}
		});
		console.log('Post saved to DB')
		res.status(201).send({ status: 'created' });
	}

});

module.exports = router;

