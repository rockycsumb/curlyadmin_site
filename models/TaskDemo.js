const mongoose = require('mongoose');

const TaskDemoSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'userDemo'
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
	cost: {
		type: Number, default: 0
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

module.exports = TaskDemo = mongoose.model('taskDemo', TaskDemoSchema);