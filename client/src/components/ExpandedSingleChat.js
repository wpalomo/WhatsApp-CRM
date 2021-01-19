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
			customerNum: "",
			chats:[]
		}
	}  

	//this will get the currently selected customer
	getCustomerData = () => {
		this.setState({
			customerNum: sessionStorage.getItem('cn')
		})
	}

	//get all messages between this customer and the agent
	getAllMessages = (id, agentID) => {
		this.cleanMessageListener = db.collection('agents')
									  .doc(agentID)
									  .collection('customers')
								      .doc(id)
									  .collection('messages')
									  .orderBy('timestamp', 'asc')
									  .onSnapshot(snapshot => {
									  	this.setState({
									  		chats: snapshot.docs.map(doc => doc.data())
									  	})
									  })
	}


	componentDidMount() {
		this.getCustomerData()
		const id  = sessionStorage.getItem('cid')
		let agentID = sessionStorage.getItem('aid')
		if (id && agentID) {
			this.getAllMessages(id, agentID)
		} else {
			console.log('no id present')
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.selectedCustomer.name !== this.props.selectedCustomer.name) {
			this.getCustomerData()
			let id = this.props.selectedCustomer.id
			let agentID = sessionStorage.getItem('aid')
			if (id) {
				this.getAllMessages(id, agentID)
			}
		}
	}
 
	getAgentMessage = e => {
		this.setState({
			agentMessage: e.target.value
		})
	}

	// saveResponder = async (client, agentid, clientid, agentMessage, agentName, serverTimestamp) => {
	// 	let currentResponder = await db.collection('response').get()
	// 	if (currentResponder.empty) {//nobody has responded
	// 		db.collection('response').add({ customer:Number(client), agentid:agentid })
	// 	} else {
	// 		let data = currentResponder.docs.map(doc => {
	// 			return doc.data()
	// 		}).filter(obj => obj.customer === Number(client))
	// 		if (data.length !== 0) { //someone has responded
	// 			//check who responded
	// 			let responder = data[0].agentid
	// 			if (responder === agentid) {
	// 				this.sendResponse(agentid, clientid, agentMessage, agentName, serverTimestamp)
	// 			} else {
	// 				alert('an agent already responded to this customer!')
	// 			}
	// 		} else {//no one has responded
	// 			this.sendResponse(agentid, clientid, agentMessage, agentName, serverTimestamp)
	// 			db.collection('response').add({ customer:Number(client), agentid:agentid })
	// 		}
	// 	}
	// }

	saveResponder = (client, agentid, clientid, agentMessage, agentName, serverTimestamp, cid) => {
		db.collection('response')
		  .get()
		  .then(snapshot => {
		  	let data = snapshot.docs.map(doc => {
		  		return doc.data()
		  	}).filter(obj => obj.customer === Number(client))

		  	if (data.length !== 0) { //someone has responded
				//check who responded
				let responder = data[0].agentid
				if (responder === agentid) {
					this.sendResponse(agentid, clientid, agentMessage, agentName, serverTimestamp)
				} else {
					alert('an agent already responded to this customer!')
				}
			} else {//no one has responded
				this.sendResponse(agentid, clientid, agentMessage, agentName, serverTimestamp)
				db.collection('response').add({ customer:Number(client), agentid:agentid, customerid:clientid })
			}
		  })
	}

	sendResponse = (agentID, id, agentMessage, agentName, serverTimestamp) => {
		db.collection('agents')
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
		const { agentMessage, customerNum } = this.state
		let id  = sessionStorage.getItem('cid')
		let agentName = sessionStorage.getItem('aun')
		let agentID = sessionStorage.getItem('aid')
		//save agent message to db which is automatically shown on the screen
		if (id) {
			// this.sendMessage = db.collection('agents')
			// 						  .doc(agentID)
			// 						  .collection('customers')
			// 					      .doc(id)
			// 						  .collection('messages')
			// 						  .add({
			// 						  	 message: agentMessage,
			// 						 	 name: agentName,
			// 						 	 timestamp: serverTimestamp
			// 						  })
			this.saveResponder(customerNum, agentID, id, agentMessage, agentName, serverTimestamp)
		}
		//send to twilio as a response
		this.setState({
			agentMessage: ""
		})
	} 

	componentWillUnmount() {
		this.cleanMessageListener()
	}

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
