// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const apiKey = `${process.env.SG_U}`;
// const resLink = "https://mernstack-shrnureact.run-us-west2.goorm.io/";
// const resLink = "https://curlyadmin-dev.herokuapp.com/";
const resLink = "https://www.curlyadmin.com/";

sgMail.setApiKey(apiKey);

function sendResetLink(email, id){
	const msg = {
	  to: `${email}`,
	  from: 'romoreno@csumb.edu',
	  subject: 'Reset password instructions',
	  html: `<p>To reset your password, please click on this link:</p><br>
<p>This link will expire in 15 minutes</p><br>
${resLink}demo/curlyadmin/resetpass/${id}`,
	};

	sgMail.send(msg).then(() => {
	console.log('Message sent')
	}).catch((error) => {
		console.log(error.response.body)
		// console.log(error.response.body.errors[0].message)
	})
};

module.exports = sendResetLink;







