"use strict";

import express from "express";
const router = express.Router();

router.post('/', (req, res) => {
	const { queryResult } = req.body;
	console.log(queryResult)
	
});

export const Feature1Router = router;