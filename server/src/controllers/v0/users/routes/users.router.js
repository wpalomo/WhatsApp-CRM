"use strict";
const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');
const { adminApp } = require("../../../../config/config");

let transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASSWORD
  }
})



router.get('/', (req, res) => {
	res.status(200).send('this is the users endpoint')
})

router.post('/', (req, res) => {
	//create a new user, add it to the db users list for the company and send them a mail to auth
	let { newAgentEmail, newAgentName, companyid } = req.body.newUserData
	adminApp
		.auth()
		.createUser({
			email: newAgentEmail,
			password: 'password' //default password
		})
		.then(user => {
			//send verification link
			adminApp
				.auth()
				.generateEmailVerificationLink(newAgentEmail)
				.then(link => {

				})
				.catch((error) => {
				    console.log('error occurred when sending verification email', error)
				});

			//add to company users list

		})
		.catch((error) => {
		    console.log('Error creating new user:', error);
		});
	
	res.status(200).send('new user was created successfully')
})


exports.UserRouter = router; 