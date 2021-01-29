"use strict";
const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config()

const { IndexRouter } = require('./controllers/v0/index.router');
const { setupNetwork } = require('./controllers/v0/messages/routes/message.router');

const PORT = process.env.PORT || 4000;

const app = express()

app.use(bodyParser.json());
app.use('/api/v0/', IndexRouter)


app.get('/', (req, res) => {
	res.send('/api/v0/') 
})  
 
app.post('/', (req, res) => {
	res.send('/api/v0/') 
}) 


app.listen(PORT, async () => {
	console.log(`The server is running on port ${ PORT }`)
	await setupNetwork() 
});
 