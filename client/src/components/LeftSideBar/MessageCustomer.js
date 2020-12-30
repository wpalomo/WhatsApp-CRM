import React from 'react';
import "../styles/singleclient.css";

const MessageCustomer = () => {

	const createChat = () => {
		//this will bring up the option to enter the customer phone number
		//and the message will hit the endpoint for sending messages in twilio
	}
	
	return(
		<div className="singleclient" onClick={createChat}>
			<div className="message__customer">
				<h2>New Customer Chat</h2> 
			</div>
		</div>
	)
}

export default MessageCustomer;