"use strict";
const express = require("express");
const router = express.Router();


router.get('/', (req, res) => {
	res.status(200).send('new csteam get route home')
});

router.post('/', (req, res) => {
	console.log(req.body)
	res.status(200).send('new csteam post home')
});

exports.MessageRouter = router; 