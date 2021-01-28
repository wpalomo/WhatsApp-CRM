import React from 'react';
import SingleClient from './SingleClient';
import MessageCustomer from './MessageCustomer';


const AllClientArea = ({ customerList, clickedCustomer, companyid }) => {
	const currentCustomer = data => {
		clickedCustomer(data)
	} 
	
	return(
		<div className="all__clients_area">
			<MessageCustomer />
			{ 
				customerList.map(obj => (<SingleClient companyid={companyid} currentCustomer={currentCustomer} key={obj.id} id={obj.id} dbObj={obj.data}/>)) 
			}
		</div> 
	)  
}  

export default AllClientArea;
