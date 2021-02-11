import React,  { useState, useEffect } from "react";
import axios from 'axios';
import "./styles/addphone.css";
import { db } from '../../firebase'

const AddPhone = ({ companyNumber }) => {
	const [productId, setProductId] = useState("");
	const [token, setToken] = useState("");
	const [phoneId, setPhoneId] = useState("");
	const [phoneSuccess, setPhoneSuccess] = useState("");
	const [phoneError, setPhoneError] = useState("")


	useEffect(() => {
		db.collection('companies')
		  .where('number', '==', companyNumber)
		  .get()
		  .then(data => {
		  		let phoneData = data.docs.map(doc => doc.data())
		  		let keys = Object.keys(phoneData[0])
		  		if (keys.includes('phoneID') && keys.includes('productID') && keys.includes('token')) {//paid user
		  			data.forEach(doc => {
						setProductId(doc.data().productID)
						setToken(doc.data().token)
						setPhoneId(doc.data().phoneID)
					})
		  		} else {//free trial
		  			db.collection('companies').where('number', '==', companyNumber) 
		  			.get()
		  			.then(snapshot => {
		  				let id = snapshot.docs.map(doc => doc.id)
		  				let companyId = id[0]
		  				//get trial data
		  				db.collection('companies').doc(companyId).collection('trial').limit(1).get()
		  				  .then(trialSnapshot => {
		  				  	const trialData = trialSnapshot.docs.map(doc => doc.data())
		  				  	if (trialData.length !== 0) {
		  				  		const { phoneId, productId, token } = trialData[0]
		  				  		setProductId(productId)
								setToken(token)
								setPhoneId(phoneId)
		  				  	}
		  				})
		  			})
		  		}
			}, 
			err => {
				console.log('error in addphone useEffect', err)
			}
		)
	}, [companyNumber])

	//get the status of the phone
	useEffect(() => {
		const getPhoneStatus = async () => {
			const INSTANCE_URL = 'https://api.maytapi.com/api';
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
		getPhoneStatus().then(data => {
			if (data && (data.success === true)) {
				setPhoneSuccess(data.status.state.state)
			} else {
				setPhoneError("NOT CONNECTED")
			}
		})
	}, [productId, phoneId, token])


	const url = `https://api.maytapi.com/api/${productId}/${phoneId}/screen?token=${token}&time=${new Date(new Date()).getTime()}`
	
	return(
		<div className="addphone__container">
			<div className="addphone__status">
				<p>Phone Status: { phoneSuccess === 'CONNECTED' ?  <span className="status__green">{ phoneSuccess }</span> : <span className="status__red">{ phoneError }</span> }</p>
			</div>
			<div className="addphone__parent">
				<img alt="" src={url}/>
			</div>
		</div>
	)
}

export default AddPhone;
