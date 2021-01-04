import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from "@material-ui/core";
import "../styles/singleclient.css";
import { db } from '../../firebase';

const SingleClient = ({ dbObj, id, currentCustomer }) => {
	const { customerNum } = dbObj
	const [customerMessage, setCustomerMessage] = useState([])

	useEffect(() => {
		if (id) {
			db.collection('agent1')
			    .doc(id)
			    .collection('messages')
				.orderBy('timestamp', 'desc')
				.onSnapshot(snapshot => {
					setCustomerMessage(snapshot.docs.map(doc => doc.data()))
				})					
		}
	}, [id])

	const getCustomer = () => {
		currentCustomer({id, customerNum})
		sessionStorage.setItem('cn', customerNum)
		sessionStorage.setItem('cid', id)
	}
	
	return(
		<Link to={`/customers/${id}`}>
			<div className="singleclient" onClick={getCustomer}>
				<Avatar src=""/>
				<div className="singleclient__info">
				<h2>{ customerNum }</h2>
				<p>{ customerMessage[0]?.message }</p> 
				</div>  
			</div> 
		</Link> 
	)
}

export default SingleClient;