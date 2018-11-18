const mongoose = require('mongoose');

//var Schema = mongoose.Schema;

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
		//default: Date.now,
		required: true
	},
	text: {
		type: String,
		required: true
	},
	picture: String,
});

const Post = mongoose.model(`Post`, PostSchema);

module.exports = Post;

