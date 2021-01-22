"use strict";
const express = require("express");
const router = express.Router();
const { MessageRouter } = require('./messages/routes/message.router');
const { UserRouter } = require('./users/routes/users.router');


router.use('/message', MessageRouter);
router.use('/users', UserRouter);



router.get('/', (req, res) => {
	res.send('v0')
});

router.post('/', (req, res) => {
	res.send('v0')
});

exports.IndexRouter = router; 