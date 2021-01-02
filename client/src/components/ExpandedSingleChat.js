import React, { Component } from 'react';
import { Avatar, IconButton } from "@material-ui/core";
import { SearchOutlined, MoreVert, AttachFile } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";

import "./styles/chat.css";

class ExpandedSingleChat extends Component {

	constructor(props) {
		super(props)
		this.state = { 
			agentMessage:"",
		}
	}  
 
	getAgentMessage = e => {
		this.setState({
			agentMessage: e.target.value
		})
	}
 
	submitAgentMessage = (e) => {
		//show on the screen, in the left bar, and pass to the server
		//to server
		e.preventDefault()
		const { agentMessage } = this.state
		const { From } = this.props.customerMessage
		let customerID = From.split(':')[1]
		this.props.agentMessageToServer({agentMessage, customerID})
		this.setState({
			agentMessage: ""
		})
	} 

	render() {
		const { agentMessage } = this.state
		//const { customerMessage } = this.props
		//const { Body, From } = customerMessage //destructure the customer message
		return(
			<div className="singlechat"> 
				<div className="chat__header"> 
					<Avatar />
					<div className="chat__headerInfo"> 
						<h3>Customer Name</h3>
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
			    	<p className={`chat__message ${true && "chat__receiver"}`}>
			    		Hey Guys
			    		<span className="chat__timestamp">3:52pm</span> 
			    	</p>
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