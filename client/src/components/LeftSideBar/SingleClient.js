import React from 'react';
import { Avatar } from "@material-ui/core";
import "../styles/singleclient.css";

// const SingleClient = ({ customerMsg }) => {
// 	const { Body, From } = customerMsg
// 	let customer = From.split(':')[1]
// 	return(
// 		<div className="singleclient">
// 		<div className="singleclient__inner">
// 			<h2>{ customer }</h2>
// 			{
// 				//<h4>16:35</h4>
// 			}
// 		</div>
// 			<p>{ Body }</p> 
// 		</div>
// 	)
// }

const SingleClient = () => {
	
	return(
		<div className="singleclient">
			<Avatar src=""/>
			<div className="singleclient__info">
			<h2>2347030117552</h2>
			<p>Last message...</p> 
			</div>
		</div>
	)
}

export default SingleClient;