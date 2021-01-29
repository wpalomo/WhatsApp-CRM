import React, { useContext } from 'react';
import { AuthUserContext } from "../../session/index";
import SingleClient from './SingleClient';
import MessageCustomer from './MessageCustomer';


const AllClientArea = ({ customerList, clickedCustomer, companyid }) => {
	const currentCustomer = data => {
		clickedCustomer(data)
	} 

	let agent;
	const authUser = useContext(AuthUserContext) //get auth context
	authUser ?  agent = authUser.uid : agent = authUser //if there is an authe'd user, get the id else return the default authUser which is null
	console.log('this agent code is >>', agent)
	
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
