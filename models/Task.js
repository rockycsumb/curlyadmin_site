const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	name: {
		type: String
	},
	urgency: {
		type: String
	},
	status: {
		type: String, default: 'pending'
	},
	deadlinedate: {
		type: Date,
		require: true
	},
	comment: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'user'
			},
			text: {
				type: String,
				required: true
			},
			name: {
				type: String
			},
			date: {
				type: Date,
				default: Date.now
			}
		}
	],
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Task = mongoose.model('task', TaskSchema);