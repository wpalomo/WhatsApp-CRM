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
	getAllMessages = id => {
		this.cleanMessageListener = db.collection('agent1')
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
		if (id) {
			this.getAllMessages(id)
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.selectedCustomer.customerNum !== this.props.selectedCustomer.customerNum) {
			this.getCustomerData()
			let id = this.props.selectedCustomer.id
			if (id) {
				this.getAllMessages(id)
			}
		}
	}
 
	getAgentMessage = e => {
		this.setState({
			agentMessage: e.target.value
		})
	}
 
	submitAgentMessage = async (e) => {
		//send to db, pull from db and show on the screen, in the left bar, and pass to the server
		//to server
		e.preventDefault()
		const { agentMessage } = this.state
		let id  = sessionStorage.getItem('cid')
		let agentName = sessionStorage.getItem('aun')
		//save agent message to db which is automatically shown on the screen
		if (id) {
			this.sendMessage = await db.collection('agent1')
								 .doc(id)
								 .collection('messages')
								 .add({
								 	message: agentMessage,
								 	name: agentName,
								 	timestamp: serverTimestamp
								 })
								 
		}
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
