"use strict";
const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();
const { db } = require("./config/config");


const { IndexRouter } = require('./controllers/v0/index.router');
const { setupWhatsAppNetwork } = require('./controllers/v0/messages/routes/message.router');
const { setupFlutterNetwork } = require('./controllers/v0/payments/routes/payments.router');
const { trialNetwork } = require('./controllers/v0/users/routes/users.router');



const PORT = process.env.PORT || 4000;

const app = express();

 
app.use(bodyParser.json());
app.use('/api/v0/', IndexRouter)

app.get('/', (req, res) => {
	res.send('/api/v0/') 
})  
 
app.post('/', (req, res) => {
	res.send('/api/v0/') 
}) 


app.listen(PORT, async () => {

	//set up a network for each free trial
	const query = await db.collection('trials')
	const observer = query.onSnapshot(snapshot => {
		let trials = snapshot.docs.map(doc => ({
			token: doc.data().token,
			productId: doc.data().productId
		}))
		//trials is an array of objects
		trials.forEach(async (obj, idx) => {
			let tunnelName = `sauceflow-trial${idx}`
			const { token, productId } = obj;
			await trialNetwork(productId, token, tunnelName)
		})
	})

	//paid users
	//await setupWhatsAppNetwork() 

	//payment update
	// await setupFlutterNetwork()
	console.log(`The server is running on port ${ PORT }`)
});


