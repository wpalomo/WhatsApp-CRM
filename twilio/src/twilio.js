const express = require("express");
const twilio = require('twilio');
const bodyParser = require('body-parser');
require('dotenv').config();
const io = require('socket.io-client');
const socket = io("http://localhost:4001/")

//start 16 Dec 2020 and end on 13 Jan 2021
const server = express();
server.use(bodyParser.urlencoded({ extended:false }));
server.use(bodyParser.json());//for local testing with postman
const PORT = process.env.PORT || 5000; 
 
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
 
(async () => {

 
	server.get('/', (req, res) => {
		res.status(200).send('welcome to csteams home')
	})

	let agentList = []
	server.post('/', (req, res) => {	
		let { Body, From } = req.body
		if (agentList.length === 0) {
			socket.emit('customerToServer', { Body, From })
			socket.once('serverToCustomer', data => {
				const { agentMessage, agentID, customerID } = data
				agentList.push({agentID, customerID})
				res.status(200).send(agentMessage)
			})
		} else {
			let customerID = From.split(':')[1]
			let allCustomers = agentList.map(obj => obj.customerID)
			if (allCustomers.includes(customerID)) {
				socket.emit('customerToOneAgent', { Body, From })
				socket.once('serverToCustomer', data => {
					const { agentMessage } = data
					res.status(200).send(agentMessage)
				})
			} else {
				socket.emit('customerToServer', { Body, From })
				socket.once('serverToCustomer', data => {
					const { agentMessage, agentID, customerID } = data
					agentList.push({agentID, customerID})
					res.status(200).send(agentMessage)
				})
			}
		}
	})

	

	server.post('/incoming', (req, res) => {
		console.log(req.body.Body) //>> this is the customer's message that will need to be shared among several numbers 
		
		// 	const twiml = new twilio.twiml.MessagingResponse()
		// 	//twiml.message(data) //>>this will be the agent's response
		// 	res.writeHead(200, { 'Content-Type': 'text/xml' })
		// 	res.end(twiml.toString())
		// })
	})

	server.post('/outgoing', (req, res) => {
		//cs line >> customers
	// client.messages
	// 	  .create({
	// 	  	from: 'whatsapp:+14155238886', 
	//         body: `Holla from Node on ${new Date()}`,
	//         to: 'whatsapp:+2347030117552'
	// 	  })
	// 	  .then(console.log);
	})

	server.listen(PORT, () => {
		console.log(`twilio is listening on port ${PORT}`)
	})
})()


