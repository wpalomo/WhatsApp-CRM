import React from 'react';
import TopLeft from './TopLeft';
import AllClientArea from './AllClientArea';
import './leftbar.css';

const LeftBar = ({ customerList }) => {
	return(
		<div className="leftbar">
			<div className="leftbar__header">
				
			</div>
			<div className="leftbar__search">
				
			</div>
			<TopLeft />
			<div className="leftbar__chats"> 
				
			</div>
			<AllClientArea customerList={customerList}/> 
			
		</div> 
	)
}

export default LeftBar;