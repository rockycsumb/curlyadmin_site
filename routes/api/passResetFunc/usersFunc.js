const users = [];
const User = require('../../../models/User');

function createUser(user) {
   users.push(user);
}

async function getUser(email) {
	try {
		const thisUser = await User.findOne({email: email});
		return thisUser;
	}catch(err){
		console.error(err);
	}
    
}

async function updateUser(user) {    
	try {
		let userUpdate = await User.findOneAndUpdate(
		{email: user.email},
		{password: user.password});
	
		userUpdate = await User.findOne({email: user.email});
	} catch(err) {
		console.error(err);
	}	
}

module.exports = {
    createUser,
    getUser,
    updateUser,
}