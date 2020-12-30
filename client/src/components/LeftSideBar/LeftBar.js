import React from 'react';
import { Avatar } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import TopLeft from './TopLeft';
import AllClientArea from './AllClientArea';
import './leftbar.css';

const LeftBar = ({ customerList }) => {
	return(
		<div className="leftbar">
			<div className="leftbar__header">
				<Avatar />
				<div className="leftbar__headerRight">
					<DonutLargeIcon />
					<ChatIcon />
					<MoreVertIcon />
				</div>
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