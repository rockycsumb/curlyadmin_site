const express = require('express');
const router = express.Router();
const {check , validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const User = require("../../models/User");
const config = require('config');

// @route 	POST api/users
// @desc 	Register User
// @access 	Public
router.post('/', [
	check('name', "Name is required").not().isEmpty(),
	check('email', "Include a valid email").isEmail(),
	check('password', "Password: 7 or more characters").isLength({min: 7}),
	check('privacy', "Agreement must be confirmed").isIn("true").not().isEmpty()
	
], 
async (req, res)=> {
	const errors = validationResult(req);
	if(!errors.isEmpty()){
		return res.status(400).json({errors: errors.array()});
	}
	
	//Deconstruct
	const {name, email, password, rights, privacy} = req.body;
	
	try {
		// See if user exists
		let user = await User.findOne({email});
		if(user){
			return res.status(400).json({errors: [{msg: 'User already exisits'}]})
		}
		
		user = new User({
		name,
		email,
		password,
		rights,
		privacy
		})
	
		//Encrypt password
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);

		//Save User
		await user.save();

		const payload = {
			user: {
				id: user.id
			}
		}
		
		jwt.sign(
			payload, 
			config.get('jwtSecret'),
		{ expiresIn: 360000},
		(err, token) =>{
			if(err) throw err;
			res.json({token});
		});
		
	} catch(err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}	
  }
);

// @route 	GET api/users
// @desc 	Get all users
// @access 	private
router.get("/allusers", auth, async (req, res)=>{
	try{
		
		const allUsers = await User.find();
		
		res.json(allUsers)
		
	}catch(err){
		console.error(err.message);
		res.status(500).send('Server Error');
	}

})


module.exports = router;