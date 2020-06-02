const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
	},
	company: {
		type: String
	},
	location: {
		type: String
	},
	bio: {
		type: String
	},
	website: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);