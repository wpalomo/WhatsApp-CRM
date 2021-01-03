"use strict";
const express = require("express");
const router = express.Router();
const { MessageRouter } = require('./messages/routes/message.router');


router.use('/message', MessageRouter);



router.get('/', (req, res) => {
	res.send('v0')
});

router.post('/', (req, res) => {
	res.send('v0')
});

exports.IndexRouter = router; 