const mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
	_id: {
		id: mongoose.Schema.Types.ObjectId,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	firstName: String,
	lastName: String,
	email: {
		type: String,
		required: [true, `Email is required`],
		validate: {
			validator: function (v) {
				var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
				return emailRegex.test(v);
			},
			message: `Email is not correct`
		}
	},
	avatarUrl: String

});

const User = mongoose.model(`User`, UserSchema, 'users');

module.exports = User;

