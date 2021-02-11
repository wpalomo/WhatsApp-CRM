import React,  { Component } from "react";
import axios from 'axios';
import "./styles/addphone.css";
import { db } from '../../firebase'

class AddPhone extends Component {

	constructor() {
		super()
		this.state = {
			productId:"",
			token:"",
			phoneId:"",
			phoneSuccess:"",
			phoneError:"",
			freeTrial: false,
			trialEnding:""
		}
	}

	getPhoneData = async (companyNumber) => {
		const companyRef = db.collection('companies')
		const snapshot = await companyRef.where('number', '==', companyNumber).get()
		let companyId;
		if (!snapshot.empty) {
			snapshot.forEach(doc => {
				companyId = doc.id
			})
		} 
		if (companyId) {
			//check if there is a trial collection
			const trialDoc = await companyRef.doc(companyId).collection('trial').get()
			if (trialDoc.empty) {//paid user or ended trial
				const paidSnapshot = await companyRef.doc(companyId).get()
				if (paidSnapshot.exists) {
					const { token, phoneID, productID } = paidSnapshot.data()
					if (token && phoneID && productID) {
						this.setState({
							token: token,
							phoneId: phoneID,
							productId: productID,
							freeTrial: false
						}, () => {
							this.getPhoneStatus()
						})
					}
				}
			} else {
				trialDoc.forEach(doc => {
					 const { token, phoneId, productId, trialEnd } = doc.data()
					 	if (token && phoneId && productId) {
							this.setState({
								token: token,
								phoneId: phoneId,
								productId: productId,
								freeTrial: true,
								trialEnding: trialEnd
							}, () => {
								this.getPhoneStatus()
							})
						}
				})
			}
		}
	}

	getPhoneStatus = async () => {
		const INSTANCE_URL = 'https://api.maytapi.com/api';
		const { productId, token, phoneId } = this.state
		let url = `${INSTANCE_URL}/${productId}/${phoneId}/status`
		try {
			let response = await axios.get(url, {
				headers: {
					'Content-Type': 'application/json',
					'x-maytapi-key': token
				}
			})
			if (response && response.status === 200) {
				this.setState({
					phoneSuccess: response.data.status.state.state
				})
			} else {
				this.setState({
					phoneError: response.data.status.state.state
				})
			}
		} catch(err) {
			if (err.response.status === 500) {
				this.setState({
					phoneError: 'TRIAL ENDED'
				})
			} else {
				console.log('an error occurred when getting phone status >>', err)
			}
		}
	}

	componentDidMount() {
		const { companyNumber } = this.props
		this.getPhoneData(companyNumber)
	}

	componentDidUpdate(prevProps) {
		if (prevProps.companyNumber !== this.props.companyNumber) {
			this.getPhoneData(this.props.companyNumber)
		}
	}

	trialRemainder = (endingDate) => {
		let remainder = endingDate - new Date(new Date()).getTime() //milliseconds
		let toHours = 1000 * 60 * 60
		let remainderHours = Math.floor(remainder / toHours)
		return remainderHours
	}

	render() {
		const { phoneSuccess, phoneError, productId, phoneId, token, freeTrial, trialEnding } = this.state
		const url = `https://api.maytapi.com/api/${productId}/${phoneId}/screen?token=${token}&time=${new Date(new Date()).getTime()}`
		let endtime = this.trialRemainder(trialEnding)
		let phrase;
		if (endtime > 1) {
			phrase = <p>Free Trial ends in <span className="status__red">{endtime}</span> hours</p>
		} else if (endtime === 1) {
			phrase = <p>Free Trial ends in <span className="status__red">{endtime}</span> hour</p>
		} else if (endtime === 0) {
			phrase = <p className="status__red">Free trial has ended. Please subscribe to regain access</p>
		}
		
		return(
			<div className="addphone__container">
				<div className="addphone__status">
					<p>Phone Status: { phoneSuccess === 'CONNECTED' ?  <span className="status__green">{ phoneSuccess }</span> : <span className="status__red">{ phoneError }</span> }</p>
					{ freeTrial && phrase }
				</div>
				<div className="addphone__parent">
					<img alt="" src={url}/>
				</div>
			</div>
		)
	}
}

export default AddPhone;
