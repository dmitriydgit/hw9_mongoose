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
			//console.log(posts);
			res.json(posts);
		})
	//res.json(mockData.posts);
});

router.get('/posts/:postId/', function (req, res) {
	var postId = req.params.postId;
	console.log(postId)
	PostModel.findById(postId, function (err, post) {
		if (err) {
			console.log(err);
		}
		//console.log(post);
		res.json(post);
	})
});


router.post('/posts', function (req, res) {
	var postText = req.body.text;
	var postPicture = req.body.picture;

	if (req.files) {
		var fileName = Date.now();
		var fileLocation = `/assets/img/${fileName}.jpeg`;
		var sampleFile = req.files.picture;
		sampleFile.mv('./public' + fileLocation, function (err) {
			if (err) {
				console.log(err);
				res.status(500).send("File not saved")
			}
			console.log("File saved");
			savePost(postText, fileLocation);
			res.status(201).send({ status: 'created' });

		});
	} else {
		savePost(postText, postPicture);
		res.status(201).send({ status: 'created' });

	};
});

//PATCH


router.patch('/posts/:postId/', function (req, res) {
	var postId = req.params.postId;
	var postText = req.body.text;
	var postPicture = req.body.picture;

	if (req.files) {
		var fileName = Date.now();
		var fileLocation = `/assets/img/${fileName}.jpeg`;
		var sampleFile = req.files.picture;
		sampleFile.mv('./public' + fileLocation, function (err) {
			if (err) {
				console.log(err);
				res.status(500).send("File not saved")
			}
			console.log("File saved");
			updatePost(postId, postText, fileLocation);
			res.status(201).send({ status: 'updated' });

		});
	} else {
		console.log("File saved");
		updatePost(postId, postText, postPicture);
		res.status(201).send({ status: 'updated' });
	};
});



router.delete('/posts/:postId/', function (req, res) {
	var postId = req.params.postId;
	deletePost(postId);
	res.status(302).send('Deletad')
});


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
	};

	var post = new PostModel(newPost);
	post.save(function (err) {
		if (err) {
			console.log(err);
		}
	});
	console.log('Post saved to DB')
}



function updatePost(postId, postText, postPicture) {
	var post = {
		text: postText,
		picture: postPicture,
	}

	PostModel.findByIdAndUpdate(postId, post, function (err) {
		if (err) {
			console.log(err);
		}
	});
	console.log('Post updated')
}

function deletePost(postId) {
	PostModel.findByIdAndRemove(postId, function (err, post) {
		if (err) {
			console.log(err);
		}
		console.log("Post deleted");

	})
}



module.exports = router;

