const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth')
const User = require('../../models/User');
const Task = require('../../models/Task')
const {check , validationResult } = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { createUser, getUser, updateUser } = require("./passResetFunc/usersFunc");
const { createResetRequest, getResetRequest } = require("./passResetFunc/resetRequests");
const sendResetLink = require("./passResetFunc/sendEmail");
// const cors = require('cors');
// router.use(cors());

// @route 	GET api/auth
// @desc 	Test Router
// @access 	Public
router.get('/', auth, async (req, res)=> {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user)
		
	} catch(err){
		console.error(err.message);
		res.status(500).send("Server Error");
	}
	
})

// @route 	GET api/auth/resId
// @desc 	Res Pass
// @access 	Private
router.post('/resId', async (req, res)=> {
	
	try {
		const user = await User.findOne({reqRes: req.body.id});
		res.json(user)
		
	} catch(err){
		console.error(err.message);
		res.status(500).send("Server Error");
	}
	
})


// @route 	POST api/auth/updateAccount
// @desc 	Update Account
// @access 	Private
router.post('/updateAccount', auth, async (req, res)=> {

	const {plan, method} = req.body;
	
	let updateAccount = null;
	let userUpdated = null;
	let updateValue = null;
	
	if(plan !== null){
		if(plan === 'Curly'){
			updateValue = 150
		} else if(plan === 'Super') {
			updateValue = 90;
		} else {
			
			updateValue = 35;
		}
	}
	
	try{
		if(method === 'minus'){
			
			const task = await Task.findOne({_id: req.body.taskId})
			const userMinus = await User.findById({_id: task.user});
			let newAccountBalance = (userMinus.account - req.body.amount)
			updateAccount = await User.findOneAndUpdate(
													{_id: userMinus._id},
													{account: newAccountBalance}
												)
			
			userUpdated = await User.findOne({_id: userMinus._id});
	
		} else if (method === 'Gift'){
			// Using taskId as userId
			const user = await User.findOne({_id: req.body.id});
			const filter = {_id: req.body.id};
			const update = {account: user.account + parseInt(req.body.amount)};
			updateAccount = await User.findOneAndUpdate(filter, update);
			userUpdated = await User.findOne({_id: req.body.id});
		} else if (method === 'Deduct'){
			// Using taskId as userId
			const user = await User.findOne({_id: req.body.id});
			const filter = {_id: req.body.id};
			const update = {account: user.account - parseInt(req.body.amount)};
			updateAccount = await User.findOneAndUpdate(filter, update);
			userUpdated = await User.findOne({_id: req.body.id});
		} else if(method === 'add'){
			
			const user = await User.findOne({_id: req.user.id});
			const filter = {_id: req.user.id};
			const update = {account: user.account + updateValue};
			updateAccount = await User.findOneAndUpdate(filter, update);
			userUpdated = await User.findOne({_id: req.user.id});
		}
		
		res.json(userUpdated.account);
		
	} catch(err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
	
})


// @route 	GET api/auth/getAccount
// @desc 	Get account
// @access 	private
router.get('/getAccount', auth, async (req, res)=> {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user.account)
		
	} catch(err){
		console.error(err.message);
		res.status(500).send("Server Error");
	}
})

// @route 	GET api/auth/getAccount
// @desc 	Get account by id
// @access 	private
router.post('/getAccountById', auth, async (req, res)=> {
	
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user.account)
		
	} catch(err){
		console.error(err.message);
		res.status(500).send("Server Error");
	}
})

// @route 	POST api/auth
// @desc 	Authenticate User and Get Token
// @access 	Public
router.post('/', [
	check('email', "Include a valid email").isEmail(),
	check('password', "Password is required").exists()
], 
async (req, res)=> {
	const errors = validationResult(req);
	if(!errors.isEmpty()){
		return res.status(400).json({errors: errors.array()});
	}
	
	//Deconstruct
	const {email, password} = req.body;
	
	try {
		// See if user exists
		let user = await User.findOne({email});
		if(!user){
			return	res
				.status(400)
				.json({errors: [{msg: 'Invalid Credentials'}]})
		}
		
		const isMatch = await bcrypt.compare(password, user.password);
		
		if(!isMatch){
			return	res
				.status(400)
				.json({ errors: [{ msg: 'Invalid Credentials' }] })
		}

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


// @route 	POST api/auth/forgot
// @desc 	Start Forgot pass flow
// @access 	Public
router.post("/forgot", async (req, res) => {
	try {
		const thisUser = await User.findOne({email: req.body.email});
		if(thisUser) {
			const id = uuidv4();
			const request = {
				id,
				email: thisUser.email
			};
			let userInfo = await createResetRequest(request);
			//createUser(request);
			sendResetLink(thisUser.email, id);
			res.status(200).json();
		} else {
			res.send("No account exists");
		}
		
		
	} catch(err){
		console.error(err.message);
		res.status(500).send("Server Error");
	}
	
});

// @route 	patch api/auth/forgot
// @desc 	Update Pass
// @access 	Public

router.patch("/reset", async (req, res) => {
	
    const thisRequest = await getResetRequest(req.body.id);
    if (thisRequest) {
        const user = await getUser(thisRequest.email);
        bcrypt.hash(req.body.password, 10).then(hashed => {
            user.password = hashed;
            updateUser(user);
            res.status(204).json();
        })
    } else {
        res.status(404).json();
    }
});

module.exports = router;


