import React, { Component } from 'react';
import { withFirebase } from "../firebase/index";
import { withAuthorization } from "../session/index";
import history from "./History";
import { Avatar, IconButton, Button } from "@material-ui/core";
import { AttachFile } from "@material-ui/icons";
import axios from 'axios';
//import { SearchOutlined, MoreVert } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { db, serverTimestamp } from '../firebase';
 
import "./styles/chat.css";

//whatsapp credentials for sending message
const instanceUrl = process.env.REACT_APP_MAYTAPI_INSTANCE_URL;
const token = process.env.REACT_APP_MAYTAPI_TOKEN;
const productId = process.env.REACT_APP_MAYTAPI_PRODUCT_ID;


class ExpandedSingleChat extends Component {

	constructor(props) {
		super(props)
		this.chatRef = React.createRef();
		this.state = {  
			agentMessage:"", 
			agentUid: this.props.agentUid,
			customerNum: this.props.selectedCustomer.name,
			companyUid: this.props.secret.decryption(sessionStorage.getItem('iIi')),
			chats:[],
			phoneId: this.props.phoneId,
			showModal: false
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
			this.scrollToBottom()
		} 
	}

	componentDidUpdate(prevProps, prevState) {
		if ((prevProps.selectedCustomer.name !== this.props.selectedCustomer.name) || (prevProps.agentUid !== this.props.agentUid) || (prevProps.phoneId !== this.props.phoneId)) { //this condition handles when the agent selects another customer OR if the page is refreshed
			const { companyUid } = this.state
			const { agentUid, secret } = this.props
			//get code from sessionstorage and decrypt - customer id and customer number
			let codedcustomerId = sessionStorage.getItem('iio')
			let deCodedcustomerId = secret.decryption(codedcustomerId)
			let customerId  = deCodedcustomerId;

			let codedcustomerName = sessionStorage.getItem('iiI')
			let deCodedcustomerName = secret.decryption(codedcustomerName)
			this.setState({
				customerNum: deCodedcustomerName,
			})

			let agentID = agentUid
			if (customerId && agentID && companyUid) {
				this.getAllMessages(customerId, agentID, companyUid)
			}
			this.setState({
				phoneId: this.props.phoneId
			})
		}
		this.scrollToBottom()
	}
 
	getAgentMessage = e => {
		this.setState({
			agentMessage: e.target.value
		})
	}

	closeModal = () => {
		this.setState({
			showModal: false
		})
	}


	saveResponder = (coyid, client, agentid, clientid, agentMessage, agentName, serverTimestamp, phoneId) => {
		//for the db
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
					this.sendMessageToWhatsapp(client, agentMessage, phoneId)
				} else {
					this.setState({
						showModal: true
					})
				}
			} else {//no one has responded
				this.sendResponse(coyid, agentid, clientid, agentMessage, agentName, serverTimestamp)
				this.sendMessageToWhatsapp(client, agentMessage, phoneId)
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

	sendMessageToWhatsapp = (number, message, phoneId) => {
		let body = {
			to_number:number,
			message:message,
			type: "text"
		}
		let url = `${instanceUrl}/${productId}/${phoneId}/sendMessage`
		axios.post(url, body, {
			headers: {
				"x-maytapi-key":token
			}
		})
		.then()
		.catch(err => console.log('an error occurred when sending a message with maytapi >>', err))
	}
 
	submitAgentMessage = async (e) => {
		//send to db, pull from db and show on the screen, in the left bar, and pass to the server
		//to server
		e.preventDefault()
		const { agentMessage, customerNum, companyUid, phoneId } = this.state
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
			this.saveResponder(companyUid, customerNum, agentID, customerId, agentMessage, agentName, serverTimestamp, phoneId)
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

	scrollToBottom = () => {
		this.chatRef.current.scrollIntoView({ behavior: "smooth" })
	}

	//to prevent memory leaks
	componentWillUnmount() {
		this.setState = (state, cb) => {
			return;
		}
	}
  
	render() {
		const { agentMessage, customerNum, chats, showModal } = this.state
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
				    		<span className="chat__timestamp">{ new Date(chat.timestamp?.toDate()).toLocaleTimeString() }</span> 
				    	</p>
				    )) }
				    <div ref={this.chatRef}/>
				   { showModal && <p onClick={this.closeModal} className="already__responded">An agent already responded to this customer!</p> }
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

const condition = authUser => authUser != null 
//condition is a function (which was predefined as an argument in 
//private/withAuthorization.js) and it checks if the authUser is not null
//if it is null, it will redirect to the login page

export default withAuthorization(condition)(withFirebase(ExpandedSingleChat));
