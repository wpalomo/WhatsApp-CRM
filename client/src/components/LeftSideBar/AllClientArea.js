import React from 'react';
import SingleClient from './SingleClient'


const AllClientArea = ({ customerMsg }) => {
	return(
		<div className="all__clients_area">
			<SingleClient customerMsg={customerMsg}/> 
		</div>
	)
} 

export default AllClientArea;