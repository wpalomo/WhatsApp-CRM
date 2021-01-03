import React, { Component } from 'react';
import { Avatar, IconButton } from "@material-ui/core";
import { SearchOutlined, MoreVert, AttachFile } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
//import db from "../firebase";
//import firebase from "firebase";
//import { db } from '../firebase'

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

	//this will get the currently selected customer from the db
	getCustomerData = () => {
		this.setState({
			customerNum: this.props.selectedCustomer.customerNum
		})
		// this.unsubscribe =  db.collection('agent1')
		// 					  .doc(id)
		// 					  .onSnapshot(snapshot => {
		// 					  	this.setState({
		// 					  		customerNum:snapshot.data().customerNum
		// 					  	})
		// 					  })
	}

	//get all messages between this customer and the agent
	// getAllMessages = id => {
	// 	this.cleanMessageListener = db.collection('agent1')
	// 								  .doc(id)
	// 								  .collection('messages')
	// 								  .orderBy('timestamp', 'asc')
	// 								  .onSnapshot(snapshot => {
	// 								  	this.setState({
	// 								  		chats: snapshot.docs.map(doc => doc.data())
	// 								  	})
	// 								  })
	// }


	componentDidMount() {
		this.getCustomerData()
		//const { id } = this.props.selectedCustomer
		// if (id) {
			
		// 	//this.getAllMessages(id)
		// }
	}

	componentDidUpdate(prevProps, prevState) {
		//const { id, customerNum } = this.props.selectedCustomer
		let cn = sessionStorage.getItem('cn')
		if (cn !== prevState.customerNum) {
			this.setState({
				customerNum: cn
			})
		}
		// if (id && (id !== prevProps.id)) {
		// 	//this.getAllMessages(id)
		// }
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
		//const { agentMessage } = this.state
		//const { id } = this.props.selectedCustomer
		//let agentName = sessionStorage.getItem('aun')
		//save agent message to db which is automatically shown on the screen
		// if (id) {
		// 	this.sendMessage = await db.collection('agent1')
		// 						 .doc(id)
		// 						 .collection('messages')
		// 						 .add({
		// 						 	message: agentMessage,
		// 						 	name: agentName,
		// 						 	timestamp: firebase.firestore.FieldValue.serverTimestamp()
		// 						 })
								 
		// }
		//send to server then to twilio
		// const { From } = this.props.customerMessage
		// let customerID = From.split(':')[1]
		// this.props.agentMessageToServer({agentMessage, customerID})
		this.setState({
			agentMessage: ""
		})
	} 

	// componentWillUnmount() {
	// 	//this.unsubscribe()
	// 	//this.cleanMessageListener()
	// 	//this.sendMessage()
	// }

	render() {
		const { agentMessage, customerNum, chats } = this.state
		//const { customerMessage } = this.props
		//const { Body, From } = customerMessage //destructure the customer message
		//pull the customer message from the db and display on the screen

		return(
			<div className="singlechat"> 
				<div className="chat__header"> 
					<Avatar />
					<div className="chat__headerInfo"> 
						<h3>{ customerNum }</h3>
						<p>Last seen at ...</p>
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
			    	<p key={idx} className={`chat__message ${true && "chat__receiver"}`}>
			    		{ chat.message }
			    		<span className="chat__timestamp">{  }</span> 
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


// return(
// 			<div className="singlechat"> 
// 				<ul id="messages">{ Body }</ul>
// 				 <div className="single_message">
// 			      <div className="input_area">
// 			        <input value={agentMessage} id="m" autoComplete="off" onChange={this.getAgentMessage}/>
// 			      </div>
// 			      <div>
// 			      	<button onClick={this.submitAgentMessage}>Send</button>
// 			      </div>
// 			    </div>
// 			</div>
// 		)