import React from 'react';
import TopLeft from './TopLeft';
import AllClientArea from './AllClientArea';
import './leftbar.css';

const LeftBar = () => {
	return(
		<div className="all_messages">
			<TopLeft />
			<AllClientArea />
		</div>
	)
}

export default LeftBar;