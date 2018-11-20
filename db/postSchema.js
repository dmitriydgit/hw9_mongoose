const mongoose = require('mongoose');

var PostSchema = mongoose.Schema({
	//_id: mongoose.Schema.Types.ObjectId,
	author: {
		_id: String,
		name: String,
		avatar: String,
		//required: true
	},
	publicationDate: {
		type: Date,
	},
	text: {
		type: String,
		required: true
	},
	picture: String,
});

const Post = mongoose.model(`Post`, PostSchema);

module.exports = Post;

