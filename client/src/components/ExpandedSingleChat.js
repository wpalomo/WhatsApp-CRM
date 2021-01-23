import React, { Component } from 'react';
import { Avatar, IconButton } from "@material-ui/core";
import { SearchOutlined, MoreVert, AttachFile } from "@material-ui/icons";
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
			customerNum: sessionStorage.getItem('cn'),
			companyUid: sessionStorage.getItem('coy'),
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
		const customerId  = sessionStorage.getItem('cid')
		let agentID = agentUid
		if (customerId && agentID && companyUid) {
			this.getAllMessages(customerId, agentID, companyUid)
		} else {
			console.log('something went wrong in componentDidMount')
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if ((prevProps.selectedCustomer.name !== this.props.selectedCustomer.name) || (prevProps.agentUid !== this.props.agentUid)) { //this condition handles when the agent selects another customer OR if the page is refreshed
			const { companyUid } = this.state
			const { agentUid } = this.props
			let customerId = sessionStorage.getItem('cid')
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
		const { agentUid } = this.props
		let customerId  = sessionStorage.getItem('cid')
		let agentName = sessionStorage.getItem('aun')
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
 
	// componentWillUnmount() {
	// 	this.cleanMessageListener()
	// }

	render() {
		const { agentMessage, customerNum, chats } = this.state
		let agentName = sessionStorage.getItem('aun')
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
						<IconButton>
							<SearchOutlined />
						</IconButton>
						<IconButton>
							<MoreVert />
						</IconButton>
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

export default ExpandedSingleChat;
