import React from 'react';
import { Avatar, IconButton } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
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
					<IconButton>
						<DonutLargeIcon />
					</IconButton>
					<IconButton>
						<ChatIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</div>
			</div>

			<div className="leftbar__search">
				<div className="leftbar__searchContainer">
					<SearchOutlined />
					<input type="text" placeholder="Search or start a new chat" />
				</div>
			</div>
			<TopLeft />
			<div className="leftbar__chats"> 
				
			</div>
			<AllClientArea customerList={customerList}/> 
			
		</div> 
	)
}

export default LeftBar;