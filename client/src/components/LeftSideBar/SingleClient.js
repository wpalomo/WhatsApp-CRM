import React, { useState, useEffect, useContext } from 'react';
import { AuthUserContext } from "../../session/index";
import { Link } from 'react-router-dom';
import { Avatar } from "@material-ui/core";
import "../styles/singleclient.css";
import { db } from '../../firebase';


const SingleClient = ({ dbObj, id, currentCustomer, companyid }) => {
	
	const { name } = dbObj

	//state
	const [customerMessage, setCustomerMessage] = useState([])

	let coyid = sessionStorage.getItem('coy')
	let agent;
	const authUser = useContext(AuthUserContext)
	authUser ?  agent = authUser.uid : agent = authUser //if there is an authe'd user, get the id else return the default authUser which is null

	useEffect(() => {
		let agentSnapshot = db.collection('companies').doc(coyid).collection('users').doc(agent).collection('customers')
		if (id) { //if a customer sends a message, get the id of the customer and extract the message
			agentSnapshot
			    .doc(id)
			    .collection('messages')
				.orderBy('timestamp', 'desc')
				.onSnapshot(snapshot => {
					setCustomerMessage(snapshot.docs.map(doc => doc.data()))
			})					
		}
	}, [id, coyid, agent])

	const getCustomer = () => {
		currentCustomer({id, name})
		sessionStorage.setItem('cn', name)
		sessionStorage.setItem('cid', id)
	}
	
	return(
		<Link to={`/customers/${id}`}>
			<div className="singleclient" onClick={getCustomer}>
				<Avatar src=""/>
				<div className="singleclient__info">
				<h2>{ name }</h2>
				<p>{ customerMessage[0]?.message }</p> 
				</div>  
			</div> 
		</Link> 
	)
}


export default SingleClient;