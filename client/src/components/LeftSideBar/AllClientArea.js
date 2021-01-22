import React from 'react';
import SingleClient from './SingleClient';
import MessageCustomer from './MessageCustomer';


const AllClientArea = ({ customerList, clickedCustomer }) => {
	const currentCustomer = data => {
		clickedCustomer(data)
	} 
	
	return(
		<div className="all__clients_area">
			<MessageCustomer />
			{ 
				//customerList.map(obj => (<SingleClient currentCustomer={currentCustomer} key={obj.id} id={obj.id} dbObj={obj.data}/>)) 
			}
			{ 
				//<SingleClient /> 
			}
		</div>
	) 
}  

  


export default AllClientArea;