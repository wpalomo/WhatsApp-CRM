import React from 'react';
import TopLeft from './TopLeft';
import AllClientArea from './AllClientArea';
import './leftbar.css';

const LeftBar = ({ customerMsg }) => {
	return(
		<div className="all_messages">
			<TopLeft />
			<AllClientArea customerMsg={customerMsg}/> 
		</div>
	)
}

export default LeftBar;