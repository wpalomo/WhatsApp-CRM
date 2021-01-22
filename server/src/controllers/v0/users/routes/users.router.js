"use strict";
const express = require("express");
const router = express.Router();


router.get('/', (req, res) => {
	res.status(200).send('this is the users endpoint')
})

router.post('/', (req, res) => {
	res.status(200).send('making a new user')
})


exports.UserRouter = router; 