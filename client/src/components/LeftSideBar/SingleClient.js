import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from "@material-ui/core";
import "../styles/singleclient.css";

const SingleClient = ({ dbObj, id, currentCustomer }) => {
	const { customerNum } = dbObj
	const getCustomer = () => {
		currentCustomer({id, customerNum})
		sessionStorage.setItem('cn', customerNum)
	}
	
	return(
		<Link to={`/customers/${id}`}>
			<div className="singleclient" onClick={getCustomer}>
				<Avatar src=""/>
				<div className="singleclient__info">
				<h2>{ customerNum }</h2>
				<p>Last message...</p> 
				</div> 
			</div> 
		</Link> 
	)
}

export default SingleClient;