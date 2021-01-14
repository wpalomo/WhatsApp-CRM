import React from "react";
import "./styles/navbar.css";

const Navbar = ({ sidebarOpen, openSideBar }) => {
	return (
		<nav classNmae="navbar">
			<div className="nav_icon" onClick={openSideBar}>
				<i className="fa fa-bars"></i>
			</div>
			<div className="navbar__left">
				<a href="#">Subscribers</a>
				<a href="#">Video Mgt</a>
				<a href="#" className="active_link">Admin</a>
			</div>
			<div className="navbar__right">
				<a href="#">
					<i className="fa fa-search"></i>
				</a>
				<a href="#">
					<i className="fa fa-clock-o"></i>
				</a>
			</div>
		</nav>
	)
}

export default Navbar; 