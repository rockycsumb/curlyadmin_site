const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const ProfileDemo = require('../../models/ProfileDemo');
const UserDemo = require('../../models/UserDemo');
const {check, validationResult} = require('express-validator');

// @route 	GET api/profile/me
// @desc 	Get current users profile
// @access 	Private
router.get('/me', auth, async (req, res) => {
	try {
		const profile = await ProfileDemo.findOne({user: req.user.id})
		.populate('user', ['name', 'rights', 'account']);
		
		if(!profile){
			return res.status(400).json({ msg: 'There is no profile for this user'});
		}
		
		res.json(profile);
		
	} catch(err){
		res.status(500).send('Server Error');
	}
});


// @route 	GET api/profile
// @desc 	Get all profiles
// @access 	Public
router.get('/', auth, async (req, res) => {
	try {
		const profiles = await ProfileDemo.find()
		.populate('user', ['name', 'rights', 'account']);
		res.json(profiles);
	} catch(err){
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});


// @route 	POST api/profile
// @desc 	Create or Update a user profile
// @access 	Private
router.post('/', auth, async (req, res) => {
	
	const {
		company,
		location,
		bio,
		website
	} = req.body;
	
	//Build Profile object
	const profileFields = {}
	profileFields.user = req.user.id;
	if(company) profileFields.company = company;
	if(location) profileFields.location = location;
	if(bio) profileFields.bio = bio;
	if(website) profileFields.website = website;
	
	try {
		let profile = await ProfileDemo.findOne({user: req.user.id});
		if(profile){
			//Update
			profile = await ProfileDemo.findOneAndUpdate(
				{user: req.user.id}, 
				{$set: profileFields}, 
				{new: true}
			);
			return res.json(profile);
		}
		
		//Create
		profile = new ProfileDemo(profileFields);
		await profile.save();
		res.json(profile);
		
	} catch(err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route 	GET api/profile/user/:user_id
// @desc 	Get profile by user id
// @access 	Public
router.get('/user/:user_id', async (req, res) => {
	try {
		const profile = await ProfileDemo.findOne({user: req.params.user_id})
		.populate('user', ['name', 'rights', 'account']);
		
		if(!profile) return res.status(400).json({ msg: "Profile not found"})
		
		
		res.json(profile);
	} catch(err){
		console.error(err.message);
		
		if(err.kind == 'ObjectId'){
			return res.status(400).json({msg: 'Profile not found'})
		}
		
		res.status(500).send('Server Error');
	}
});


// @route 	DELETE api/profile
// @desc 	Delete profile, user and tasks
// @access 	Private
router.delete('/', auth, async (req, res) => {
	try {
		//@Todo remove users comments on tasks
		//Remove profile and User
		await ProfileDemo.findOneAndRemove({user: req.user.id})
		await UserDemo.findOneAndRemove({_id: req.user.id})

		res.json({msg: 'User deleted'});
		
	} catch(err){
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});


// @route 	PUT api/profile/update
// @desc 	Updates profile
// @access 	Private
router.put('/update', auth, async (req, res) => {

	const {
		company,
		location,
		bio,
		website
	} = req.body;
	
	const updateProfile = {}
	
	updateProfile.user = req.user.id;
	if(company) updateProfile.company = company;
	if(location) updateProfile.location = location;
	if(bio) updateProfile.bio = bio;
	if(website) updateProfile.website = website;
	
	try {
		//Update
		const profile = await ProfileDemo.findOneAndUpdate(
			{user: req.user.id},
			{$set: updateProfile},
			{new: true}
		);
		
		res.json(profile);
	} catch(err){
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});



module.exports = router;