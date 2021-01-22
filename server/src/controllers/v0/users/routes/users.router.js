"use strict";
const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');
const { adminApp, db } = require("../../../../config/config");


let transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASSWORD
  }
})

const sendVerificationEmail = (link, agentEmail) => {
	const message = {
		from: 'admin@sauceflow.com',
		to: `${agentEmail}`,
		subject: 'Goggins Co: Verify your email address ',
		html: `<p>You have been added as a support agent with Goggins Co. Click here to verify your email address: <a href=${link}>Verify Me</a></p>`
	}

	transport.sendMail(message, (err, info) => {
		if (err) {
			console.log('an error occurred when sending verification email', err)
		} else {
			console.log('this is the info gotten from mailer >>', info)
		}
	})
}



router.get('/', (req, res) => {
	res.status(200).send('this is the users endpoint')
})

router.post('/', (req, res) => {
	//create a new user, add it to the db users list for the company and send them a mail to auth
	let { newAgentEmail, newAgentName, companyid } = req.body.newUserData
	let companyRef = db.collection('companies').doc(companyid).collection('users');
	adminApp
		.auth()
		.createUser({
			email: newAgentEmail,
			password: 'password' //default password
		})
		.then(async user => {
			//send verification link
			adminApp
				.auth()
				.generateEmailVerificationLink(newAgentEmail)
				.then(link => {
					return sendVerificationEmail(link, newAgentEmail)
				})
				.catch((error) => {
				    console.log('error occurred when sending verification email', error)
				});
			//add to company users list (check to see the subscription status of this admin and send an error messsage if they have not paid for a plan)
			await companyRef.add({
				name:newAgentName, 
				role:'Agent', 
				email:newAgentEmail, 
				loggedin:"No", 
				status:"Pending", 
				activeAgent: false
			})
			res.status(200).send('New user was created successfully')
		})
		.catch((error) => {
		    res.status(400).send(error.message)
		});
})


exports.UserRouter = router; 