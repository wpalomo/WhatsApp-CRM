"use strict";
const express = require("express");
const router = express.Router();
const { db, serverTimestamp } = require("../../../../firebase"); 

const INSTANCE_URL = 'https://api.maytapi.com/api';
console.log(process.env.MAYTAPI_TOKEN)

//NEW
router.get('/', (req, res) => {
	res.status(200).send('new csteam get route home')
})

router.post('/', (req, res) => {
	res.status(200).send('new csteam post route home')
})

exports.MessageRouter = router;  


//OLD
// router.get('/', (req, res) => {
// 	res.status(200).send('new csteam get route home')
// });
 
// router.post('/', async (req, res) => { 
// 	const { From, Body } = req.body
// 	let customerNumber = Number(From.split('+')[1])
// 	try {
// 		let agentsRef = db.collection('agents')

// 		let activeAgents = []
// 		//get all agents and message only the logged in agents
// 		let onlineAgents = await agentsRef.where('loggedin', '==', 'yes').get()
// 		onlineAgents.forEach(doc => {
// 			activeAgents.push(doc.id)
// 		}) 

// 		//customer message
// 		let data = {
// 					message: Body,
// 					name: customerNumber,
// 					timestamp: serverTimestamp
// 				}
// 		//check for current responders
// 		let responders = await db.collection('response').get()
// 		if (responders.empty) { //send to all active agents
// 			for (let agent of activeAgents) {
// 				let clientList = await agentsRef.doc(agent).collection('customers').where('name', '==', customerNumber).get()
// 				if (clientList.empty) {//new customer to be added
// 					let newCustomer = await agentsRef.doc(agent).collection('customers').add({name: customerNumber})
// 					let newCustomerMsg = agentsRef.doc(agent).collection('customers').doc(newCustomer.id).collection('messages').add(data)
// 				} else {//existing customer
// 					for (let doc of clientList.docs) {
// 						let oldCustomerMsg = agentsRef.doc(agent).collection('customers').doc(doc.id).collection('messages').add(data)
// 					} 
// 				}
// 			}  
// 			//wait for an agent response
// 			db.collection('response')
// 			  .onSnapshot(snapshot => {
// 			  	let repliers = snapshot.docs.map(doc => {
// 			  		return doc.data()
// 			  	}).filter(obj => obj.customer === customerNumber)
// 			  	if (repliers.length !== 0) {//someone responded, get the response
// 			  		let respondingAgentId = repliers[0].agentid
// 					let customerResponded = repliers[0].customerid
// 					agentsRef.doc(respondingAgentId).collection('customers').doc(customerResponded).collection('messages').orderBy('timestamp', 'desc')
// 							 .get()
// 							 .then(snapshot => {
// 							 	let message = snapshot.docs.map(doc => {
// 							 		return doc.data()
// 							 	})
// 							 	let firstResponse = message[0].message
// 							 	res.status(200).send(firstResponse) 
// 							 })
// 			  	} else {
// 			  		console.log('waiting for top-level reply')
// 			  	}
// 			  })
// 		} else {
// 			let responderList = responders.docs.map(doc => {
// 				return doc.data()
// 			}).filter(obj => obj.customer === customerNumber)
// 			if (responderList.length === 0) {//this is the first time this customer is sending a message and none of the current responders has responded to them before..send to all agents
// 				for (let agent of activeAgents) {
// 					let clientList = await agentsRef.doc(agent).collection('customers').where('name', '==', customerNumber).get()
// 					if (clientList.empty) {//new customer to be added
// 						let newCustomer = await agentsRef.doc(agent).collection('customers').add({name: customerNumber})
// 						let newCustomerMsg = agentsRef.doc(agent).collection('customers').doc(newCustomer.id).collection('messages').add(data)
// 					} else {//existing customer
// 						for (let doc of clientList.docs) {
// 							let oldCustomerMsg = agentsRef.doc(agent).collection('customers').doc(doc.id).collection('messages').add(data)
// 						}
// 					}
// 				} 
// 				//wait for an agent response
// 				db.collection('response')
// 				  .onSnapshot(snapshot => {
// 				  	let repliers = snapshot.docs.map(doc => {
// 				  		return doc.data()
// 				  	}).filter(obj => obj.customer === customerNumber)
// 				  	if (repliers.length !== 0) {//someone responded, get the response
// 				  		let respondingAgentId = repliers[0].agentid
// 						let customerResponded = repliers[0].customerid
// 						agentsRef.doc(respondingAgentId).collection('customers').doc(customerResponded).collection('messages').orderBy('timestamp', 'desc')
// 								 .get()
// 								 .then(snapshot => {
// 								 	let message = snapshot.docs.map(doc => {
// 								 		return doc.data()
// 								 	})
// 								 	let firstResponse = message[0].message
// 								 	res.status(200).send(firstResponse) 
// 								 })
// 				  	} else {
// 				  		console.log('waiting for mid-level reply')
// 				  	}
// 				  })
// 			} else {//this agent was the one that responded to the customer the first time
// 				//get the agent's id and message them alone
// 				let respondingAgentId = responderList[0].agentid
// 				let customerResponded = responderList[0].customerid
// 				//message the agent alone
// 				agentsRef.doc(respondingAgentId).collection('customers').doc(customerResponded).collection('messages').add(data)
			
// 				//listen for the agent's response and send to twilio
// 				let unsubscribe = agentsRef.doc(respondingAgentId).collection('customers').doc(customerResponded).collection('messages').orderBy('timestamp', 'desc').limit(5)
// 						 .onSnapshot(snapshot => {
// 						 	if (!snapshot.docs[0].metadata.hasPendingWrites) {
// 						 		const lastMessage = snapshot.docs[0].data()
// 						 		if (lastMessage.name === customerNumber) {
// 						 			console.log('waiting for the agent to respond')
// 						 		} else {
// 						 			let subsequentResponse = lastMessage.message
// 						 			res.status(200).send(subsequentResponse)
// 						 			unsubscribe()//this will prevent res.send() from running multiple times
// 						 		}
// 						 	}
// 						 }, (err) => {
// 						 	console.log('an error occurred in the subsequent level >>>', err)
// 						 })
// 			}
// 		}
// 	} catch(err) {
// 		return res.status(400).json({ error: err.toString() });
// 	}
// });