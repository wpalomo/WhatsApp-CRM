"use strict";
const express = require("express");
const ngrok = require('ngrok');
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
	// let index = -1; //so that when it does += 1, it will start counting from zero
	let idx = -1; //so that when it does += 1, it will start counting from zero

	//set up a network for each company
	const query = await db.collection('companies')
	const observer = query.onSnapshot(async snapshot => {
		for (let coy of snapshot.docs) {
			let coySnapshot = await query.doc(coy.id).collection('trial').limit(1).get()
			if (coySnapshot.empty) {//no free trial or it ended
				let paidUsers = query.onSnapshot(async snapshot => {
					let companies = snapshot.docs.map(doc => ({ id:doc.id, token: doc.data().token, productID: doc.data().productID, name: doc.data().name, status: doc.data().active }))
					companies = companies.filter(obj => obj.token !== undefined)
					
					companies.forEach(async (company, index) => {
						const { id, token, productID, name, status } = company
						let tunnelName = `sauceflow-messages${index}`
						let unsubscribe = query.doc(id).collection('users').onSnapshot(async snapshot => {
							let users = snapshot.docs.map(doc => doc.data())
							const online = users.filter(obj => obj.loggedin === 'Yes')
							if (online.length === 0) {
								await query.doc(id).update({ active: 'No' })
								await ngrok.disconnect(`https://${tunnelName}.ngrok.io`)
								await ngrok.disconnect(`http://${tunnelName}.ngrok.io`)
							}

							if (online.length === 1) {
								//set the company active
								if (status === 'No') {
									await query.doc(id).update({ active: 'Yes' })
								}
								//if company is active, set up network else close the network
								if (status === 'Yes') {
									let url = await setupWhatsAppNetwork(productID, token, tunnelName)
								}
							}
						}, err => {
							console.log('error in paid users firebase query', err)
						})
					})
				})
			} else {//active free trial
				coySnapshot.forEach(doc => {
					idx += 1
					const { token, productId } = doc.data()
					//check if any agent is online and create a network if yes
					let users = query.doc(coy.id).collection('users').onSnapshot(async snapshot => {
						let online = snapshot.docs.filter(doc => doc.data().loggedin === 'Yes')
						if (online.length >= 1) {
							let tunnelName = `sauceflow-trial${idx}`
							await trialNetwork(productId, token, tunnelName)
						}
					})
				})
			}
		}
	})

	//payment update
	// await setupFlutterNetwork()
	console.log(`The server is running on port ${ PORT }`)
});


