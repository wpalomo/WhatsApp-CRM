import React from 'react';
import SingleClient from './SingleClient'


const AllClientArea = ({ customerList }) => {
	return(
		<div className="all__clients_area">
			{ customerList.map((obj, idx) => (<SingleClient key={idx} customerMsg={obj}/>)) }
		</div>
	)
}




export default AllClientArea;