import React from "react";
import history from "../History";
import "./styles/sidebar.css";

const Sidebar = ({ sidebarOpen, closeSideBar }) => {

	const getAgentsPage = () => {
		history.push('/admin/agents') 
	}

	const chatsPage = () => {
		history.push('/admin/chats') 
	}

	const adminHome = () => { 
		history.push('/admin/agents')  
	}

	const subscriptionPage = () => {
		history.push('/admin/subscription') 
	}

	const logOut = () => {
		history.push('/')
	}

	return(
		<div id="sidebar" className={sidebarOpen ? "sidebar_responsive" : ""}>
			<div className="sidebar__title">
				<div className="sidebar__img">
					<img src="" alt=""/>
					<h1>Company Name</h1>
				</div>
				<i className="fa fa-times" id="sidebarIcon" onClick={closeSideBar}></i>
			</div>
			<div className="sidebar__menu">
				<div onClick={adminHome} className="sidebar__link sidebar__test active_menu_link">
					<i className="fa fa-home"></i>
					<p>Dashboard</p>
				</div>
				{
					//<h2>MNG</h2>
				}
				<div onClick={chatsPage} className="sidebar__link sidebar__test">
					<i className="fa fa-comments"></i>
					<p>Chats</p>
				</div>
				<div onClick={getAgentsPage} className="sidebar__link sidebar__test">
					<i className="fa fa-users"></i>
					<p>Agents</p>
				</div>
				{
					// <div className="sidebar__link">
					// 				<i className="fa fa-line-chart"></i>
					// 				<a href="foo">Reports</a>
					// 			</div>
							}
				<div onClick={subscriptionPage} className="sidebar__link sidebar__test">
					<i className="fa fa-credit-card"></i>
					<p>Subscription</p>
				</div>
				{
					// <div className="sidebar__link">
					// 				<i className="fa fa-handshake-o"></i>
					// 				<a href="foo">Contracts</a>
					// 			</div>
							}
				{
					// <h2>LEAVE</h2>
					// 			<div className="sidebar__link">
					// 				<i className="fa fa-question"></i>
					// 				<a href="foo">Requests</a>
					// 			</div>
					// 			<div className="sidebar__link">
					// 				<i className="fa fa-sign-out"></i>
					// 				<a href="foo">Leave Policy</a>
					// 			</div>
					// 			<div className="sidebar__link">
					// 				<i className="fa fa-calendar-check-o"></i>
					// 				<a href="foo">Special Days</a>
					// 			</div>
					// 			<div className="sidebar__link">
					// 				<i className="fa fa-files-o"></i>
					// 				<a href="foo">Apply for leave</a>
					// 			</div>
					// 			<h2>PAYROLL</h2>
					// 			<div className="sidebar__link">
					// 				<i className="fa fa-money"></i>
					// 				<a href="foo">Payroll</a>
					// 			</div>
					// 			<div className="sidebar__link">
					// 				<i className="fa fa-briefcase"></i>
					// 				<a href="foo">Paygrade</a>
					// 			</div>
							}
				<div onClick={logOut} className="sidebar__logout">
					<i className="fa fa-power-off"></i>
					<p>Log out</p>
				</div>
			</div>
		</div>
	)
}

export default Sidebar;