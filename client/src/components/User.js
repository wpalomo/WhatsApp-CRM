import React from 'react';
import LeftBar from "./LeftSideBar/LeftBar";
import ExpandedSingleChat from "./ExpandedSingleChat";
import './styles/user.css';

const User = () => {
  return (
   	<div className="container">
   		<LeftBar />
		<ExpandedSingleChat />
   	</div>
  );
}

export default User;
