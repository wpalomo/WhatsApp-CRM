import React from 'react';
import { Avatar } from "@material-ui/core";
import "../styles/singleclient.css";

const SingleClient = ({ dbObj }) => {
	const { data } = dbObj
	const { customerNum } = data
	return(
		<div className="singleclient">
			<Avatar src=""/>
			<div className="singleclient__info">
			<h2>{ customerNum }</h2>
			<p>Last message...</p> 
			</div>
		</div>
	)
}

export default SingleClient;