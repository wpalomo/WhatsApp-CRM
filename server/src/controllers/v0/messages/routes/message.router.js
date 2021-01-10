"use strict";
const express = require("express");
const router = express.Router();
const { db, serverTimestamp } = require("../../../../firebase"); 


// const saveResponder = async (agent, client, agentid) => {
// 	let currentResponder = await db.collection('response').get()
// 	if (currentResponder.empty) {//nobody has responded
// 		db.collection('response').add({ customer:client, agentid:agentid })
// 	} else {
// 		for (let doc of currentResponder.docs) {
// 			if (doc.data().customer === Number(client)) {
// 				alert('an agent already responded!')
// 				break;
// 			} else {
// 				db.collection('response').add({ customer:client, agentid:agentid })
// 				break;
// 			}
// 		}
// 	}
// }



router.get('/', (req, res) => {
	res.status(200).send('new csteam get route home')
});

router.post('/', async (req, res) => {
	const { From, Body } = req.body
	let customerNumber = Number(From.split('+')[1])
	try {
		let activeAgents = []
		//get all connected agents and message only the logged in agents
		let agentsRef = db.collection('agents')
		let onlineAgents = await agentsRef.where('loggedin', '==', 'yes').get()
		onlineAgents.forEach(doc => {
			activeAgents.push(doc.id)
		})

		let agentMsgMap = []
		//check if each agent has the customer
		for (let agent of activeAgents) {
			let clientList = await agentsRef.doc(agent).collection('customers').where('name', '==', customerNumber).get()
			let data = {
					message: Body,
					name: customerNumber,
					timestamp: serverTimestamp
			}
			if (clientList.empty) {//new customer to be added
				let newCustomer = await agentsRef.doc(agent).collection('customers').add({name: customerNumber})
				let newCustomerMsg = await agentsRef.doc(agent).collection('customers').doc(newCustomer.id).collection('messages').add(data)
				agentMsgMap.push({agentid:agent, customerid:newCustomer.id})
			} else {//existing customer
				for (let doc of clientList.docs) {
					let oldCustomerMsg = await agentsRef.doc(agent).collection('customers').doc(doc.id).collection('messages').add(data)
					agentMsgMap.push({agentid:agent, customerid:doc.id})
				}
			}
		}  
		
		//check which agent responded - once an agent responds, it will save a reference 
		//somewhere that the backend can access. on the backend, check if that reference exists and map all future
		//messages to the first reponding agent




		// for (let item of agentMsgMap) {
		// 	const { agentid, customerid } = item
		// 	let msgQuery = agentsRef.doc(agentid).collection('customers').doc(customerid).collection('messages').orderBy('timestamp', 'desc')
		// 	msgQuery.onSnapshot(snapshot => {
		// 		const data = snapshot.docs.map(doc => {
		// 			 return doc.data()
		// 		})	
		// 		//let agentMsg = data.filter(obj => obj.name !== customerNumber)
		// 		console.log(data)
		// 	})
		// }

	} catch(err) {
		return res.status(400).json({ error: err.toString() });
	}
	res.status(200).send('new csteam post home') 
});

exports.MessageRouter = router;  


