const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth');
const Task = require('../../models/Task');
const Profile = require('../../models/Profile');
const User = require('../../models/User');


// @route 	POST api/task
// @desc 	Add a task
// @access 	Private
router.post('/', [auth, [
	check('title', 'A title is required').not().isEmpty(),
	check('description', 'A description is required').not().isEmpty(),
	]
],
async (req, res)=> {
	const errors = validationResult(req);
	if(!errors.isEmpty()){
		return res.status(400).json({errors: errors.array()});
	}
	
	try {
		
		const user = await User.findById(req.user.id).select('-password');
		const newTask = new Task({
			title: req.body.title,
			description: req.body.description,
			name: user.name,
			urgency: req.body.urgency,
			deadlinedate: req.body.deadlinedate,
			status: req.body.status,
			user: req.user.id
		})
		
		const task = await newTask.save();
		res.json(task);
		
	} catch(err){
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route 	GET api/task
// @desc 	Get All Tasks
// @access 	Private
router.get('/', auth, async (req, res)=>{
	try {
		const tasks = await Task.find()
		.populate('user', [
			'title',
			'description',
			'urgency',
			'status'
		]).sort({ date: -1});
		res.json(tasks);
	} catch(err){
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route 	GET api/task/:id
// @desc 	Get task by id
// @access 	Private
router.get('/:id', auth, async (req, res)=>{
	try {
		const task = await Task.findById(req.params.id);
		
		if(!task) return res.status(404).json({msg: "Task not found"});
		
		res.json(task);
		
	} catch(err){
		console.error(err.message);
		
		if(err.kind == 'ObjectId'){
			return res.status(404).json({msg: 'Task not found'});
		}
		
		res.status(500).send('Server Error');
	}
});

// @route 	DELETE api/task/:id
// @desc 	Delete task by id
// @access 	Private
router.delete('/:id', auth, async (req, res)=>{
	try {
		const task = await Task.findById(req.params.id);
		
		if(!task){
			return res.status(404).json({msg: 'Task not found'});
		}
		// console.log("user rights from db ", task.user);
		//Check user
		// if (task.user.toString() !== req.user.id || task.user.rights !== 'admin' ){
		// 	return res.status(401).json({msg: 'User not authorized'});
		// }
		
		await task.remove();
		res.json({msg: "Task removed"});
		
	} catch(err){
		console.error(err.message);
		
		if(err.kind == 'ObjectId'){
			return res.status(404).json({msg: 'Task not found'});
		}
		
		res.status(500).send('Server Error');
	}
});


// @route 	PATCH api/task/:id
// @desc 	Update task by id
// @access 	Private
router.patch('/:id', auth, async (req, res)=>{
	try{
		const filter = { _id: req.params.id}
		const update = { title: req.body.title,
						 description: req.body.description,
						 urgency: req.body.urgency,
						 status: req.body.agreement,
						 duedate: req.body.duedate
					   }
		let taskUpdate = await Task.findOneAndUpdate(filter, update);
		res.json(taskUpdate)
		
	} catch(err){
		res.status(500).send('Server Error');
	}
});


// @route 	POST api/task/comment/:id
// @desc 	Comment on a task
// @access 	Private
router.post('/comment/:id', [auth, [
	check('text', 'A message is required to comment').not().isEmpty()
	]
],
async (req, res)=> {
	const errors = validationResult(req);
	if(!errors.isEmpty()){
		return res.status(400).json({errors: errors.array()});
	}
	
	try {
		
		const user = await User.findById(req.user.id).select('-password');
		
		const task = await Task.findById(req.params.id);
		
		const newComment = {
			name: user.name,
			user: req.user.id,
			text: req.body.text
		}
		
		task.comment.unshift(newComment);
		
		await task.save();
		
		res.json(task.comment);
		
	} catch(err){
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route 	DELETE api/task/comment/:id
// @desc 	Delete comment on a task
// @access 	Private
router.delete('/comment/:id/:comment_id', auth, async (req, res)=> {
	try {
		
		const task = await Task.findById(req.params.id);
		
		//Pull out comment
		const comment = task.comment.find(
			comment => comment.id === req.params.comment_id
		);
		
		//Make sure comment exists
		
		if(!comment){
			return res.status(404).json({msg: 'Comment does not exist'});
		}
		
		//Check user
		if(comment.user.toString() !== req.user.id){
			return res.status(401).json({msg: 'User not authorized'});
		}
		
		//Get remove index
		
		const removeIndex = task.comment.map(comment => comment.user.toString()).indexOf(req.user.id);
		
		task.comment.splice(removeIndex, 1);
		
	
		
		await task.save();
		
		res.json(task.comment);
		
	} catch(err){
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});


module.exports = router;