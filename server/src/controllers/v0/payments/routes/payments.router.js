"use strict";
const express = require("express");
const axios = require('axios');
const router = express.Router();
const ngrok = require('ngrok');
const fs = require('fs');
const path = require("path");
const { db, admin } = require("../../../../config/config");
const bcrypt = require('bcrypt');
const { payForPhone } = require('../../../../maytapi/maytapi');


//whatsapp api to add new phone when payment is received
const INSTANCE_URL = 'https://api.maytapi.com/api';
const token = process.env.MAYTAPI_TOKEN;
const productId = process.env.MAYTAPI_PRODUCT_ID 

//Ngrok Config
const ngrokAuthToken = process.env.NGROK_AUTH_TOKEN
const user = process.env.NGROK_USER;
const password = process.env.NGROK_PASSWORD;
const PORT = process.env.PORT || 4000;

const addPhoneNumber = async (number) => {
		let url = `${INSTANCE_URL}/${productId}/addPhone`
		try {
			let response = await axios.post(url, { "number": number }, {
				headers: {
					'Content-Type': 'application/json',
					'x-maytapi-key': token
				}
			})
			return response.data
		} catch(err) {
			console.log('an error occurred when setting adding a new phone >>', err)
		}
}

const setupFlutterNetwork = async () => {
	try {
		const url = await ngrok.connect({
			authtoken: ngrokAuthToken, 
			addr: PORT,
			subdomain: 'sauceflow-payments',
			inspect: false,
		})
	} catch (err) {
		console.error('Error while connecting Ngrok to flutter', err);
        return new Error('Ngrok-flutter connection Failed');
	}
} 

//webhook hash
const saltRounds = process.env.BCRYPT_SALT_ROUNDS;
const salt = bcrypt.genSaltSync(Number(saltRounds))
const hash = bcrypt.hashSync(password, salt) 


const checkHash = hash => {
	return bcrypt.compareSync(password, hash)
}


router.post('/flutterHook', async (req, res) => {
	let hash = req.headers["verif-hash"];
	if (hash) {
		res.sendStatus(200)
		let result = checkHash(hash)
		if (result) {
			let monthlyCost = 25;
			let annualCost = 21;

			try {
				const { tx_ref, charged_amount, currency, status, customer, created_at } = req.body.data
				const { phone_number } = customer
				if (status === 'successful') {
					let companyId;
					let companySnapshot = await db.collection('companies').where('number', '==', Number(phone_number)).get()
					if (!companySnapshot.empty) {
						companySnapshot.forEach(doc => {
							companyId = doc.id
						})

						let numberOfAgents;
						let amountPaid = Number(charged_amount)
						if (amountPaid % monthlyCost === 0) { //monthly payment
							numberOfAgents = amountPaid / monthlyCost
						} else {//this is an annual payment
							numberOfAgents = amountPaid / (annualCost * 12)
						}

						//check if this is the first payment or a recurring one
						let paymentSnapshot = await db.collection('companies').doc(companyId).collection('payments').get();
						if (paymentSnapshot.empty) {//first payment
							//check if this person just finished a free trial and has added the max 2 agents. if yes, no need to increase the agent limit, if no, increase the limit
							const agentCheck = await db.collection('companies').doc(companyId).get();
							if (agentCheck.data().agentLimit < numberOfAgents) {
								//update agent limit
								let additionalAgents = numberOfAgents - agentCheck.data().agentLimit
								const updateCount = await db.collection('companies').doc(companyId).update({
									agentLimit: admin.firestore.FieldValue.increment(additionalAgents)
								})
							}
							
							//update payment information
							await db.collection('companies').doc(companyId).collection('payments').add({
								date_paid: created_at,
								amount_paid: Number(charged_amount),
								currency: currency,
								subscriptionId: tx_ref
							})

							//pay for phone in maytapi
							let maytapiResponse = await payForPhone()
							if (maytapiResponse === 'success') {
								//call the addphone api
								let phoneData = await addPhoneNumber(phone_number)
								//get the phone id and save to the company profile in the db
								let phoneId = phoneData.id 
								await db.collection('companies').doc(companyId).add({ phoneID: phoneId, productID: productId, token: token })
							}
						} else {//not the first payment, check if it is a recurring payment or a new subscription
							let trxRefs = []
							paymentSnapshot.forEach(doc => {
								trxRefs.push(doc.data().subscriptionId)
							})
							//check if the tx_ref for this payment exists
							if (trxRefs.includes(tx_ref)) {//recurring payment renewal, update payment only
								await db.collection('companies').doc(companyId).collection('payments').add({
									date_paid: created_at,
									amount_paid: Number(charged_amount),
									currency: currency,
									subscriptionId: tx_ref
								})
							} else {//additional subscription, increase agent limit
								await db.collection('companies').doc(companyId).collection('payments').add({
									date_paid: created_at,
									amount_paid: Number(charged_amount),
									currency: currency,
									subscriptionId: tx_ref
								})
								//update agent limit
								const updateCount = await db.collection('companies').doc(companyId).update({
									agentLimit: admin.firestore.FieldValue.increment(numberOfAgents)
								})
							}
						}
					}
				}
			} catch (err) {
				console.log('error when updating db with payment info', err)
			}
		}
	}
});

exports.PaymentRouter = router;
exports.setupFlutterNetwork = setupFlutterNetwork;
exports.addPhoneNumber = addPhoneNumber;

