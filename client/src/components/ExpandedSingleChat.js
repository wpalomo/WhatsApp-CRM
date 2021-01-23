import React, { Component } from 'react';
import { withFirebase } from "../firebase/index";
import history from "./History";
import { Avatar, IconButton, Button } from "@material-ui/core";
import { AttachFile } from "@material-ui/icons";
//import { SearchOutlined, MoreVert } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { db, serverTimestamp } from '../firebase';

import "./styles/chat.css";


class ExpandedSingleChat extends Component {

	constructor(props) {
		super(props)
		this.state = { 
			agentMessage:"", 
			agentUid: this.props.agentUid,
			customerNum: Number(this.props.secret.decryption(sessionStorage.getItem('iiI'))),
			companyUid: this.props.secret.decryption(sessionStorage.getItem('iIi')),
			chats:[]

		}
	}  

	getAllMessages = (customerId, agentID, coyid) => {
		let messageRef = db.collection('companies').doc(coyid).collection('users').doc(agentID).collection('customers').doc(customerId).collection('messages').orderBy('timestamp', 'asc')
		this.cleanMessageListener = messageRef
									  .onSnapshot(snapshot => {
									  	this.setState({
									  		chats: snapshot.docs.map(doc => doc.data())
									  	})
									})
	}


	componentDidMount() {
		const { companyUid, agentUid } = this.state
		const { secret } = this.props

		//get code from sessionstorage and decrypt - customer id
		let codedcustomerId = sessionStorage.getItem('iio')
		let deCodedcustomerId = secret.decryption(codedcustomerId)
		let customerId  = deCodedcustomerId;

		let agentID = agentUid
		if (customerId && agentID && companyUid) {
			this.getAllMessages(customerId, agentID, companyUid)
		} 
	}

	componentDidUpdate(prevProps, prevState) {
		if ((prevProps.selectedCustomer.name !== this.props.selectedCustomer.name) || (prevProps.agentUid !== this.props.agentUid)) { //this condition handles when the agent selects another customer OR if the page is refreshed
			const { companyUid } = this.state
			const { agentUid, secret } = this.props
			//get code from sessionstorage and decrypt - customer id
			let codedcustomerId = sessionStorage.getItem('iio')
			let deCodedcustomerId = secret.decryption(codedcustomerId)
			let customerId  = deCodedcustomerId;

			let agentID = agentUid
			if (customerId && agentID && companyUid) {
				this.getAllMessages(customerId, agentID, companyUid)
			}
		}
	}
 
	getAgentMessage = e => {
		this.setState({
			agentMessage: e.target.value
		})
	}


	saveResponder = (coyid, client, agentid, clientid, agentMessage, agentName, serverTimestamp, cid) => {
		db.collection('companies').doc(coyid).collection('response')
		  .get()
		  .then(snapshot => {
		  	let data = snapshot.docs.map(doc => {
		  		return doc.data()
		  	}).filter(obj => obj.customer === Number(client))

		  	if (data.length !== 0) { //someone has responded
				//check who responded
				let responder = data[0].agentid
				if (responder === agentid) {
					this.sendResponse(coyid, agentid, clientid, agentMessage, agentName, serverTimestamp)
				} else {
					alert('an agent already responded to this customer!')
				}
			} else {//no one has responded
				this.sendResponse(coyid, agentid, clientid, agentMessage, agentName, serverTimestamp)
				db.collection('companies').doc(coyid).collection('response').add({ customer:Number(client), agentid:agentid, customerid:clientid })
			}
		  })
	}

	sendResponse = (coyid, agentID, id, agentMessage, agentName, serverTimestamp) => {
		db.collection('companies')
		  .doc(coyid)
		  .collection('users')
		  .doc(agentID)
		  .collection('customers')
		  .doc(id)
		  .collection('messages')
		  .add({
			message: agentMessage,
			name: agentName,
			timestamp: serverTimestamp
		})							  
	}
 
	submitAgentMessage = async (e) => {
		//send to db, pull from db and show on the screen, in the left bar, and pass to the server
		//to server
		e.preventDefault()
		const { agentMessage, customerNum, companyUid } = this.state
		const { agentUid, secret } = this.props

		//get code from sessionstorage and decrypt - customer id
		let codedcustomerId = sessionStorage.getItem('iio')
		let deCodedcustomerId = secret.decryption(codedcustomerId)
		let customerId  = deCodedcustomerId;
		//agent name
		let codedAgentName = sessionStorage.getItem('iii')
		let deCodedAgentName = secret.decryption(codedAgentName)
		let agentName = deCodedAgentName
		
		let agentID = agentUid
		//save agent message to db which is automatically shown on the screen
		if (customerId) {
			this.saveResponder(companyUid, customerNum, agentID, customerId, agentMessage, agentName, serverTimestamp)
		}
		//clear the form
		this.setState({
			agentMessage: ""
		})
	} 

	signOut = async () => {
		const { companyUid } = this.state
		const { agentUid } = this.props
		//signout the agent
		if (companyUid && agentUid) {
			let agentSnapshot = await db.collection('companies').doc(companyUid).collection('users').doc(agentUid)
			if (agentSnapshot) {
				await agentSnapshot.update({ loggedin: 'No'})
			}
		}
		this.props.firebase.doSignOut()
		sessionStorage.clear()
		history.push('/')
	}
  
	render() {
		const { agentMessage, customerNum, chats } = this.state
		//decrypt agent name
		let codedAgentName = sessionStorage.getItem('iii')
		let deCodedAgentName = this.props.secret.decryption(codedAgentName)
		let agentName = deCodedAgentName
		
		return(
			<div className="singlechat"> 
				<div className="chat__header"> 
					<Avatar />
					<div className="chat__headerInfo"> 
						<h3>{ customerNum }</h3>
						<p>
							Last seen{" "}
							{
								new Date(chats[chats.length - 1]?.timestamp?.toDate()).toUTCString()
							}
						</p>
					</div>
					<div className="chat__headerRight"> 
						<Button onClick={this.signOut} variant="outlined">Sign Out</Button>
						{
							//<IconButton><SearchOutlined /></IconButton>
							//<IconButton><MoreVert /></IconButton>
						}
					</div>
			    </div>
			    <div className="chat__body"> 
			    { chats.map((chat, idx) => (
			    	<p key={idx} className={`chat__message ${chat.name === agentName && "chat__receiver"}`}>
			    		{ chat.message }
			    		<span className="chat__timestamp">{ //new Date(chat.timestamp?.toDate()).toUTCString() 
			    		}</span> 
			    	</p>
			    )) }
			    </div>
			    <div className="chat__footer">  
			    	<IconButton>
			    		<InsertEmoticonIcon />
			    	</IconButton>
			    	<IconButton>
						<AttachFile />
					</IconButton>
			    	<form>
						<input value={agentMessage} autoComplete="off" onChange={this.getAgentMessage} placeholder=" Type a message" type="text" />
						<button type="submit" onClick={this.submitAgentMessage}>Send</button>
					</form>
					<IconButton>
			    		<MicIcon />
			    	</IconButton>
			    </div>
			</div>
		)
	}
}

export default withFirebase(ExpandedSingleChat);
