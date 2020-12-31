import React from 'react';
import SingleClient from './SingleClient';
import MessageCustomer from './MessageCustomer';


const AllClientArea = ({ customerList }) => {
	return(
		<div className="all__clients_area">
			<MessageCustomer />
			{ customerList.map((obj, idx) => (<SingleClient key={idx} dbObj={obj}/>)) }
		</div>
	) 
} 




export default AllClientArea;