"use strict";
const express = require("express");
const router = express.Router();
const { adminApp } = require("../../../../config/config");


router.get('/', (req, res) => {
	res.status(200).send('this is the users endpoint')
})

router.post('/', (req, res) => {
	//create a new user, add it to the db users list for the company and send them a mail to auth
	let { newAgentEmail, newAgentName, companyid } = req.body.newUserData
	console.log(companyid)
	res.status(200).send('new user was created successfully')
})


exports.UserRouter = router; 