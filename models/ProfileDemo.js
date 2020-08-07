const mongoose = require('mongoose');

const ProfileDemoSchema = new mongoose.Schema({
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

module.exports = ProfileDemo = mongoose.model('profileDemo', ProfileDemoSchema);