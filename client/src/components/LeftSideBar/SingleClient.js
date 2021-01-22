import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from "@material-ui/core";
import "../styles/singleclient.css";
import { db } from '../../firebase';

const SingleClient = ({ dbObj, id, currentCustomer }) => {
	const { name } = dbObj
	const [customerMessage, setCustomerMessage] = useState([])
	let agentID = sessionStorage.getItem('aid')

	useEffect(() => {
		if (id) { 
			db.collection('agents')
				.doc(agentID)
				.collection('customers')
			    .doc(id)
			    .collection('messages')
				.orderBy('timestamp', 'desc')
				.onSnapshot(snapshot => {
					setCustomerMessage(snapshot.docs.map(doc => doc.data()))
				})					
		}
	}, [id, agentID])

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