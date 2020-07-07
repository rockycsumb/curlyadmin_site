const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	reqRes: {
		type: String
	},
	reqResStamp: {
		type: Date,
		default: Date.now
	},
	
	privacy: {
		type: String,
		required: true
	},
	rights: {
		type: String, default: 'user'
	},
	account: {
		type: Number, default: 0
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = User = mongoose.model('user', UserSchema);