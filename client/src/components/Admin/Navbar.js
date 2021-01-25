import React, { Component } from "react";
import "./styles/navbar.css";
//import { withAuthorization } from "../../session/index";

// const Navbar = ({ sidebarOpen, openSideBar }) => {
// 	return (
// 		<nav className="navbar">
// 			<div className="nav_icon" onClick={openSideBar}>
// 				<i className="fa fa-bars"></i>
// 			</div>
// 			{
// 				//this navbar__left div has been hidden in the css file with display:none
// 			}
// 			<div className="navbar__left">
// 				<a href="foo">Subscribers</a>
// 				<a href="foo">Video Mgt</a>
// 				<a href="foo" className="active_link">Admin</a>
// 			</div>
// 			<div className="navbar__right"> 
// 				{
// 					// <a href="foo">
// 					// 				<i className="fa fa-search"></i>
// 					// 			</a>
// 					// 			<a href="foo">
// 					// 				<i className="fa fa-clock-o"></i>
// 					// 			</a>
// 							}
// 				<a href="foo">
// 					<i className="fa fa-user-circle"></i>
// 				</a>
// 			</div>
// 		</nav>
// 	)
// }

class Navbar extends Component {

	render() {
		const { openSideBar } = this.props
		return (
			<nav className="navbar">
				<div className="nav_icon" onClick={openSideBar}>
					<i className="fa fa-bars"></i>
				</div>
				{
					//this navbar__left div has been hidden in the css file with display:none
				}
				<div className="navbar__left">
					<a href="foo">Subscribers</a>
					<a href="foo">Video Mgt</a>
					<a href="foo" className="active_link">Admin</a>
				</div>
				<div className="navbar__right"> 
					{
						// <a href="foo">
						// 				<i className="fa fa-search"></i>
						// 			</a>
						// 			<a href="foo">
						// 				<i className="fa fa-clock-o"></i>
						// 			</a>
								}
					<a href="foo">
						<i className="fa fa-user-circle"></i>
					</a>
				</div>
			</nav>
		)
	}
	
}

//const condition = authUser => authUser != null 
//condition is a function (which was predefined as an argument in 
//private/withAuthorization.js) and it checks if the authUser is not null
//if it is null, it will redirect to the login page

export default Navbar; 