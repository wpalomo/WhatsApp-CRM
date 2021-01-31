"use strict";
const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');
const mg = require("nodemailer-mailgun-transport")
const handlebars = require("handlebars")
const fs = require("fs")
const path = require("path")
const { adminApp, db } = require("../../../../config/config");



const sendVerificationEmailAdmin = (email, name, link) => {
	const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/emails/admin.hbs"), "utf8");
	const mailgunAuth = {
		auth: {
			api_key: process.env.MAILGUN_API_KEY,
			domain: process.env.MAILGUN_SANDBOX_DOMAIN
		}
	}

	const smtpTransport = nodemailer.createTransport(mg(mailgunAuth))
	const template = handlebars.compile(emailTemplateSource)
	const htmlToSend = template({
		name: name,
		link: link	
	})
	const mailOptions = {
		from:"sauce@sauceflow.com",
		to: email,
		subject:"Sauceflow WhatsApp CRM - Please confirm your email address",
		html: htmlToSend
	}

	smtpTransport.sendMail(mailOptions, (err, res) => {
		if (err) {
			console.log('mailgun errored out >>', err)
		} else {
			console.log('the email was sent!')
		}
	})
}

const sendVerificationEmailAgent = (email, name, company, link) => {
	const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/emails/agent.hbs"), "utf8");
	const mailgunAuth = {
		auth: {
			api_key: process.env.MAILGUN_API_KEY,
			domain: process.env.MAILGUN_SANDBOX_DOMAIN
		}
	}

	const smtpTransport = nodemailer.createTransport(mg(mailgunAuth))
	const template = handlebars.compile(emailTemplateSource)
	const htmlToSend = template({
		name: name,
		company: company,
		link: link	
	})
	const mailOptions = {
		from:"sauce@sauceflow.com",
		to: email,
		subject:"Sauceflow WhatsApp CRM - Please confirm your email address",
		html: htmlToSend
	}

	smtpTransport.sendMail(mailOptions, (err, res) => {
		if (err) {
			console.log('mailgun errored out >>', err)
		} else {
			console.log('the email was sent!')
		}
	})
}


//test
//CHECK BELOW THE ROUTER EXPORTS



router.get('/', (req, res) => {
	res.status(200).send('this is the users endpoint')
})

router.post('/', (req, res) => {
	//create a new user, add it to the db users list for the company and send them a mail to auth
	let { newAgentEmail, newAgentName, companyid } = req.body.newUserData;
	let agentFirstName = newAgentName.split(" ")[0]
	let companyName;
	let snapshot = db.collection('companies').doc(companyid).get();
	if (snapshot) {
		companyName = snapshot.data().name
	}
	let company = companyName.replace("__", " ").toUpperCase()

	let companyRef = db.collection('companies').doc(companyid).collection('users');
	adminApp
		.auth() 
		.createUser({ 
			email: newAgentEmail,
			password: 'password' //default password
		})
		.then(async user => {
			let newAgentId = user.uid
			//send verification link
			adminApp
				.auth()
				.generateEmailVerificationLink(newAgentEmail)
				.then(link => {
					return sendVerificationEmailAgent(newAgentEmail, agentFirstName, company, link)
				})
				.catch((error) => {
				    console.log('error occurred when sending verification email to the agent', error)
				});
			//add to general agents
			await db.collection('allagents').add({
				agentId: newAgentId,
				companyId: companyid
			})	

			//add to company users list (check to see the subscription status of this admin and send an error messsage if they have not paid for a plan)
			await companyRef.doc(newAgentId).set({ //this will add the new agent with a custom id which is the user id
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

router.post('/admin', (req, res) => {
	const { email, name } = req.body;
	let firstName = name.split(" ")[0]
	//send verification link
	adminApp
		.auth()
		.generateEmailVerificationLink(email)
		.then(link => {
			return sendVerificationEmailAdmin(email, firstName, link)
		})
		.catch((error) => {
			console.log('error occurred when sending verification email to the admin', error)
		});
})


exports.UserRouter = router; 


// let transport = nodemailer.createTransport({ 
//   host: "smtp.mailtrap.io",
//   port: 2525,
//   auth: { 
//     user: process.env.MAILTRAP_USER,
//     pass: process.env.MAILTRAP_PASSWORD 
//   }
// })

// const sendVerificationEmailAdmin = (link, email, name) => {
// 	const message = {
// 		from: 'admin@sauceflow.com',
// 		to: `${email}`,
// 		subject: 'Sauceflow WhatsApp CRM - Please confirm your email address',
// 		html: `Hey <b>${name}!</b> <br><br> Thanks for signing up on Sauceflow. <br><br>To finish registration, please click the link below to verify your account:  <br><br> <a href=${link}>Verify email address</a> <br><br> Once verified, you can <a href="sauceflow.com/login" target="_blank">login</a>, add agents and start responding to customers on WhatsApp! <br><br>If you have any problems, please contact us: <a href="mailto:support@sauceflow.com">Sauceflow</a>`
// 	}

// 	transport.sendMail(message, (err, info) => {
// 		if (err) {
// 			console.log('an error occurred when sending verification email', err)
// 		} else {
// 			console.log('this is the info gotten from mailer >>', info)
// 		}
// 	})
// }

// const sendVerificationEmailAgent = (link, email, company, name) => {
// 	const message = {
// 		from: 'admin@sauceflow.com',
// 		to: `${email}`,
// 		subject: 'Sauceflow WhatsApp CRM - Please confirm your email address',
// 		html: `Hey <b>${name}!</b> <br><br>You have been added as a support agent with ${company}! <br><br>please click the link below to verify your email address: <br><br> <a href=${link}>Verify email address</a> <br><br> Once verified, you can <a href="sauceflow.com/login" target="_blank">login</a> <br><br> Your default password is <b>"password"</b>, (all small letters) and you will be prompted to change it! <br><br>If you have any problems, please contact us: <a href="mailto:support@sauceflow.com">Sauceflow</a>`
// 	}

// 	transport.sendMail(message, (err, info) => {
// 		if (err) {
// 			console.log('an error occurred when sending verification email', err)
// 		} else {
// 			console.log('this is the info gotten from mailer >>', info)
// 		}
// 	})
// }