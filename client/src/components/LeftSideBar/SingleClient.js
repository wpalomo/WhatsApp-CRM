import React from 'react';

const SingleClient = ({ customerMsg }) => {
	const { Body, From } = customerMsg
	let customer = From.split(':')[1]
	return(
		<div className="singleclient">
		<div className="singleclient__inner">
			<h2>{ customer }</h2>
			{
				//<h4>16:35</h4>
			}
		</div>
			<p>{ Body }</p>
		</div>
	)
}

export default SingleClient;