"use strict";
const express = require("express");
const router = express.Router();


router.get('/', (req, res) => {
	res.status(200).send('new csteam get route home')
});

router.post('/', (req, res) => {
	const { From, Body } = req.body
	let customerNumber = Number(From.split('+')[1])
	//send the message to all connected agents

	//check for the agent that responds and send all subsequent messages to only that agent

	res.status(200).send('new csteam post home') 
});

exports.MessageRouter = router;  