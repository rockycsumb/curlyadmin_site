const requests = [];
const User = require('../../../models/UserDemo');

async function createResetRequest(resetRequest) {
	const {id, email} = resetRequest;
	try {
		let user = await User.findOne({email})
		if(user){
			user = await User.findOneAndUpdate(
				{email: email},
				{reqRes: id, reqResStamp: Date.now()}
			);
		}
		user = await User.findOne({email});
		return user;
	} catch(err){
		console.error(err.message);
	}
}

async function getResetRequest(id) {
    const thisRequest = await User.findOne({reqRes: id});
    return thisRequest;
}

module.exports = {
    createResetRequest,
    getResetRequest,
}