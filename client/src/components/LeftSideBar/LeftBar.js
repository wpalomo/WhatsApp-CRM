import React from 'react';
import TopLeft from './TopLeft';
import AllClientArea from './AllClientArea';
import './leftbar.css';

const LeftBar = ({ customerList }) => {
	return(
		<div className="all_messages">
			<TopLeft />
			<AllClientArea customerList={customerList}/> 
		</div>
	)
}

export default LeftBar;