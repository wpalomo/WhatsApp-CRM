import React from 'react';
import SingleClient from './SingleClient';
import MessageCustomer from './MessageCustomer';


const AllClientArea = ({ customerList, clickedCustomerId }) => {
	const sendCustomerId = data => {
		return clickedCustomerId(data)
	}
	return(
		<div className="all__clients_area">
			<MessageCustomer />
			{ customerList.map(obj => (<SingleClient sendCustomerId={sendCustomerId} key={obj.id} id={obj.id} dbObj={obj.data}/>)) }
		</div>
	) 
}  




export default AllClientArea;