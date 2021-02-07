"use strict";
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
require('dotenv').config();
const { db } = require("./config/config");


const { IndexRouter } = require('./controllers/v0/index.router');
const { setupWhatsAppNetwork } = require('./controllers/v0/messages/routes/message.router');
const { setupFlutterNetwork } = require('./controllers/v0/payments/routes/payments.router');
const { trialNetwork } = require('./controllers/v0/users/routes/users.router');

const getPhones = async () => {
	const INSTANCE_URL = 'https://api.maytapi.com/api';
	const productId = '005df793-efea-42c6-b67f-b16b43399d3f' 
	const token = '9320ffa5-6b4c-450f-8602-a6defeb3f88e'
	const phoneId = '10063'
	//let url = `${INSTANCE_URL}/${productId}/listPhones`
	let url = `${INSTANCE_URL}/${productId}/${phoneId}/status`
	try {
		let response = await axios.get(url, {
			headers: {
				'Content-Type': 'application/json',
				'x-maytapi-key': token
			}
		})
		return response.data
	} catch(err) {
		console.log('an error occurred when getting phones >>', err)
	}
}

getPhones().then(console.log)

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


